import { 
    DateOrWeekDayRow,
    ShiftDescription,
    CompanyClosed,
    ShowMultipleApplicantsWithOutUser,
    ShowSingleApplicantWithOutUser,
    TradeShiftSingleSetApplicant,
    TradeShiftSingleSetApplicantWithPrio,
    TradeShiftMultiSetApplicant,
    TradeShiftMultiSetApplicantWithPrio,
    UserDefault,
    ZeroApplicants,
} from "./ShiftplanElements";
import store from "../store";
import { 
    getIsObject,
    getSecondApplicant,
    getCompanyIsOpen,
    getAnzahl,
    getHasApplicants,
    getApplicantsLength,
    getFirstApplicant,
    getUserMatchesPosition,
    getUserMatchesPrio,
    getShiftIncludesApplicant,
    getHasNotice
 } from "./ElementFunctions";
 import { useSelector, useDispatch } from "react-redux";
import { settingModal } from "../reducers/modal";
import { settingShiftSlot } from "../reducers/ShiftSlot";
import * as _ from "lodash";

const UserShiftplanElementsPublish = (props) => {
    const dispatch = useDispatch()
    const Employee = useSelector(state => state.DB.employee);
    const Shiftplan = useSelector(state => state.Shiftplan);

    const tradeShift = (index, day) => {
        dispatch(settingModal("tradeShift"))
        dispatch(settingShiftSlot({index: index, day: day}))
    };

   const type = _.isString(Shiftplan.id) ? Shiftplan.id.split('#')[1] : "";
   const ItemLength = props.ItemLength - 1;
   const index = props.index;
   const day = props.col;
   const currentItem = props.currentItem[day];
   const notice = _.get(currentItem, "notice", "");
   const isFree = _.get(currentItem, "frei", false)
   const hasNotice = !_.isEmpty(notice)
   const anzahl = props.anzahl;
   const isDiscribeWeekDay = day === "Wochentag";
   const setApplicants = _.get(currentItem, "setApplicants", {})
   const hasApplicants = !_.isEmpty(_.get(currentItem, "setApplicants", {}));
   const ApplicantsLength = _.size(setApplicants);
   const ApplicantsKeys = _.keys(setApplicants)
   const FirstApplicant = _.get(setApplicants, [ApplicantsKeys[0]], "");
   const ShiftIncludesEmployee = _.includes(Object.keys(setApplicants), Employee.SK);
   const ApplicantName = Employee.name;
        if (index === 0 || index === 1) {
            return DateOrWeekDayRow(currentItem);
        } else if (index === ItemLength) {
            return null
        } else if (!isFree && !isDiscribeWeekDay) {
            return CompanyClosed();
        } else if (!isFree && isDiscribeWeekDay){
            return ShiftDescription(currentItem, anzahl);
        } else if (isFree && hasApplicants && ApplicantsLength > 1 && ShiftIncludesEmployee && hasNotice) {
            return TradeShiftMultiSetApplicantWithPrio(index, day, ApplicantName, ApplicantsLength, tradeShift);
        } else if (isFree && hasApplicants && ApplicantsLength > 1 && ShiftIncludesEmployee) {
            return TradeShiftMultiSetApplicant(index, day, ApplicantName, ApplicantsLength, tradeShift);
        } else if (isFree && hasApplicants && ApplicantsLength > 1) {
            return ShowMultipleApplicantsWithOutUser(FirstApplicant, ApplicantsLength);
        }  else if (isFree && hasApplicants && ApplicantsLength === 1 && ShiftIncludesEmployee && hasNotice) {
            return TradeShiftSingleSetApplicantWithPrio(index, day, ApplicantName, tradeShift);
        }  else if (isFree && hasApplicants && ApplicantsLength === 1 && ShiftIncludesEmployee) {
            return TradeShiftSingleSetApplicant(index, day, ApplicantName, tradeShift);
        }  else if (isFree && hasApplicants && ApplicantsLength === 1) {
            return ShowSingleApplicantWithOutUser(FirstApplicant);
        } else {
            return UserDefault(index, day);
        }

    };
export default UserShiftplanElementsPublish;

