import React from "react";
// core components
import store from "../store";
import { 
    DateOrWeekDayRow,
    ShiftDescription,
    CompanyClosed,
    ApplicantDoesntMatchesPosition,
    ApplicantDoesntMatchesPrio,
    MultipleApplicantsWithUser,
    SingleApplicantWithUser,
    MultipleApplicantsWithOutUser,
    SingleApplicantWithOutUser,
    ZeroApplicants,
    Default,
    DefaultWithPrio,
    MultipleApplicantsWithUserWithNotice,
    SingleApplicantWithUserWithNotice,
    MultipleApplicantsWithOutUserWithNotice,
    ZeroApplicantsWithNotice,
    SingleApplicantWithOutUserWithNotice
} from "./ShiftplanElements";
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
import * as _ from "lodash";
import { settingModal } from "../reducers/modal";
import { useSelector, useDispatch } from "react-redux";
import { settingShiftSlot } from "../reducers/ShiftSlot";

const UserApplicationShiftplanElements = (props) => {
    const dispatch = useDispatch()
    const Employee = useSelector(state => state.DB.employee);
    const Shiftplan = useSelector(state => state.Shiftplan);
    const setApplicant = (index, day) => {
        dispatch(settingModal("userApply"))
        dispatch(settingShiftSlot({index: index, day: day}))
    }

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
    const Applicants = _.get(currentItem, "applicants", {})
    const hasApplicants = !_.isEmpty(_.get(currentItem, "applicants", {}));
    const ApplicantsLength = _.size(Applicants);
    const ApplicantsKeys = _.keys(Applicants)
    const FirstApplicant = _.get(Applicants, [ApplicantsKeys[0]], "");
    const ShiftIncludesApplicant = _.includes(Object.keys(_.get(currentItem, "applicants", {}), Employee.SK))
    const ApplicantMatchesPosition = _.includes(Employee.position, _.get(Shiftplan, "plan[" + index + "].Wochentag.ShiftPosition"));
    const ApplicantName = Employee.name;

        if (index === 0 || index === 1) {
            return DateOrWeekDayRow(currentItem);
        } else if (index === ItemLength ) {
            return null
        } else if (!isFree && !isDiscribeWeekDay) {
            return CompanyClosed();
        } else if (isFree && hasApplicants && ApplicantMatchesPosition && ShiftIncludesApplicant && ApplicantsLength > 1 && !isDiscribeWeekDay && hasNotice) {
            return MultipleApplicantsWithUserWithNotice(index, day, ApplicantName, ApplicantsLength, setApplicant);
        } else if (isFree && hasApplicants && ApplicantMatchesPosition && ShiftIncludesApplicant && ApplicantsLength > 1 && !isDiscribeWeekDay) {
            return MultipleApplicantsWithUser(index, day, ApplicantName, ApplicantsLength, setApplicant);
        } else if (isFree && hasApplicants && ApplicantMatchesPosition && ShiftIncludesApplicant && !isDiscribeWeekDay && hasNotice) {
            return SingleApplicantWithUserWithNotice(index, day, ApplicantName, setApplicant);
        } else if (isFree && hasApplicants && ApplicantMatchesPosition && ShiftIncludesApplicant && !isDiscribeWeekDay) {
            return SingleApplicantWithUser(index, day, ApplicantName, setApplicant);
        } else if (isFree && hasApplicants && ApplicantMatchesPosition && ApplicantsLength > 1 && !isDiscribeWeekDay && hasNotice) {
            return MultipleApplicantsWithOutUserWithNotice(index, day, FirstApplicant, ApplicantsLength, setApplicant);
        }  else if (isFree && hasApplicants && ApplicantMatchesPosition && ApplicantsLength > 1 && !isDiscribeWeekDay) {
            return MultipleApplicantsWithOutUser(index, day, FirstApplicant, ApplicantsLength, setApplicant);
        } else if (isFree && hasApplicants && ApplicantMatchesPosition && !isDiscribeWeekDay && hasNotice) {
            return SingleApplicantWithOutUserWithNotice(index, day, FirstApplicant, setApplicant);
        } else if (isFree && hasApplicants && ApplicantMatchesPosition && !isDiscribeWeekDay) {
            return SingleApplicantWithOutUser(index, day, FirstApplicant, setApplicant);
        } else if (isFree && !ApplicantMatchesPosition && !isDiscribeWeekDay) {
            return ApplicantDoesntMatchesPosition();
        } else if (isFree && !isDiscribeWeekDay && hasNotice) {
            return ZeroApplicantsWithNotice(index, day, setApplicant);
        }  else if (isFree && !isDiscribeWeekDay) {
            return ZeroApplicants(index, day, setApplicant);
        } else if (!isFree && isDiscribeWeekDay){
            return ShiftDescription(currentItem, anzahl);
        } else if (hasNotice){
            return DefaultWithPrio(currentItem, anzahl);
        }   else {
            return Default(index, day);
        }
    };
export default UserApplicationShiftplanElements;

