import { 
    DateOrWeekDayRow,
    ShiftDescription,
    CompanyClosed,
    ProgressWithEmployeeApplicantsWithPrio,
    ProgressWithEmployeeApplicantsWithoutPrio,
    ZeroApplicants,
    ApplicantDoesntMatchesPosition,
    Default,
    DefaultWithPrio,
    ZeroApplicantsWithNotice,
    ProgressWithoutEmployeeApplicantsWithoutPrioNotFilled,
    ProgressWithoutEmployeeApplicantsWithPrioNotFilled,
    ProgressWithoutEmployeeApplicantsWithoutPrioFilled,
    ProgressWithoutEmployeeApplicantsWithPrioFilled,
} from "./ShiftplanElements";
 import { useSelector, useDispatch } from "react-redux";
import { settingModal } from "../reducers/modal";
import { settingShiftSlot } from "../reducers/ShiftSlot";
import * as _ from "lodash";

const UserShiftplanElementsPublish = (props) => {
    const dispatch = useDispatch()
    const Employee = useSelector(state => state.DB.employee);
    const Shiftplan = useSelector(state => state.Shiftplan);
    const AccessPermissions = useSelector(state => state.Meta.accessPosition);

    const tradeShift = (index, day) => {
        dispatch(settingModal("tradeShift"))
        dispatch(settingShiftSlot({index: index, day: day}))
    };

    const applyAfterPublish = (index, day) => {
        dispatch(settingShiftSlot({index: index, day: day}))
        dispatch(settingModal("applyAfterPublish"));
    }

    const type = _.isString(Shiftplan.id) ? Shiftplan.id.split('#')[1] : "";
    const ItemLength = props.ItemLength - 1;
    const index = props.index;
    const day = props.col;
    const currentItem = props.currentItem[day];
    const notice = _.get(currentItem, "notice", "");
    const prio = _.get(currentItem, "prio", false)
    const isFree = _.get(currentItem, "frei", false)
    const hasNotice = !_.isEmpty(notice)
    const hasPrio = !_.isBoolean(prio);
    const anzahl = props.anzahl;
    const isDiscribeWeekDay = day === "Wochentag";
    const Applicants = _.get(currentItem, "setApplicants", {})
    const hasApplicants = !_.isEmpty(_.get(currentItem, "setApplicants", {}));
    const ApplicantsLength = _.size(Applicants);
    const ApplicantsKeys = _.keys(Applicants)
    const ShiftPosition = _.get(Shiftplan, "plan[" + index + "].Wochentag.ShiftPosition")
    const FirstApplicant = _.get(Applicants, [ApplicantsKeys[0]], "");
    const ApplicantName = Employee.name;
    const SecondApplicant = _.get(Applicants, [ApplicantsKeys[1]], "") === ApplicantName ? FirstApplicant : _.get(Applicants, [ApplicantsKeys[1]], "");
    const ShiftIncludesApplicant = _.includes(ApplicantsKeys, Employee.SK);
    const ApplicantMatchesPosition = _.includes(Employee.position, ShiftPosition);
    const EmployeeAccessAdminView = _.includes(_.get(AccessPermissions, "[" + ShiftPosition + "]", ""), "accessAdminView");

        if (index === 0 || index === 1) {
            return DateOrWeekDayRow(currentItem);
        } else if (index === ItemLength ) {
            return null
        } else if (!isFree && !isDiscribeWeekDay) {
            return CompanyClosed();
        } else if (isFree && !ApplicantMatchesPosition && !isDiscribeWeekDay) {
            return ApplicantDoesntMatchesPosition();
        } else if (isFree && ShiftIncludesApplicant && hasApplicants && ApplicantMatchesPosition && !isDiscribeWeekDay && (hasPrio || hasNotice)) {
            return ProgressWithEmployeeApplicantsWithPrio(index, day, ApplicantName, SecondApplicant, ApplicantsLength, EmployeeAccessAdminView, tradeShift);
        } else if (isFree && ShiftIncludesApplicant && hasApplicants && ApplicantMatchesPosition && !isDiscribeWeekDay && !(hasPrio || hasNotice)) {
            return ProgressWithEmployeeApplicantsWithoutPrio(index, day, ApplicantName, SecondApplicant, ApplicantsLength, EmployeeAccessAdminView, tradeShift);
        } else if (isFree && hasApplicants && Number(anzahl) <= ApplicantsLength && ApplicantMatchesPosition && !isDiscribeWeekDay && (hasPrio || hasNotice)) {
            return ProgressWithoutEmployeeApplicantsWithPrioFilled(index, day, FirstApplicant, SecondApplicant, ApplicantsLength, EmployeeAccessAdminView);
        } else if (isFree && hasApplicants && Number(anzahl) <= ApplicantsLength && ApplicantMatchesPosition && !isDiscribeWeekDay && !(hasPrio || hasNotice)) {
            return ProgressWithoutEmployeeApplicantsWithoutPrioFilled(index, day, FirstApplicant, SecondApplicant, ApplicantsLength, EmployeeAccessAdminView);
        } else if (isFree && ApplicantMatchesPosition && !isDiscribeWeekDay && (hasPrio || hasNotice)) {
            return ProgressWithoutEmployeeApplicantsWithPrioNotFilled(index, day, FirstApplicant, SecondApplicant, ApplicantsLength, EmployeeAccessAdminView, applyAfterPublish);
        } else if (isFree && ApplicantMatchesPosition && !isDiscribeWeekDay && !(hasPrio || hasNotice)) {
            return ProgressWithoutEmployeeApplicantsWithoutPrioNotFilled(index, day, FirstApplicant, SecondApplicant, ApplicantsLength, EmployeeAccessAdminView, applyAfterPublish);
        } else if (isFree && !isDiscribeWeekDay && (hasPrio || hasNotice)) {
            return ZeroApplicantsWithNotice(index, day, applyAfterPublish);
        }  else if (isFree && !isDiscribeWeekDay && !(hasPrio || hasNotice)) {
            return ZeroApplicants(index, day, applyAfterPublish);
        } else if (!isFree && isDiscribeWeekDay){
            return ShiftDescription(currentItem, anzahl);
        } else if (hasNotice){
            return DefaultWithPrio(currentItem, anzahl);
        }   else {
            return Default(index, day);
        }
    };
export default UserShiftplanElementsPublish;

