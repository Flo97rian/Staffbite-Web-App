import React from "react";
// core components
import store from "../../../../store";
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
    Default
} from "../../../Application/functionalComponents/SchichtplanElements";

const setApplicant = (index, col) => {
    store.dispatch({type: "OPEN", payload: "applyIsActive"})
    store.dispatch({type: "setShiftSlot", payload: { row: index, col: col}})
}

const SchichtplanElement = (props) => {

    const dataModal = (e) => {
        const index = props.index;
        const col = props.col;
        const obj = e[index][col];
        const isObj = typeof obj === "object";
        const isFree = obj.frei;
        const currentUser = props.currentUser;
        let anzahl = e[index].Montag.anzahl;
        const ApplicantMatchesPosition = currentUser.position.includes(e[index]["Wochentag"].ShiftName);
        const hasPrio = isObj && "prio" in obj ? !0 : !1;
        const ApplicantMatchesPrio = "Experte" in currentUser;
        const hasApplicants =  isObj && "applicants" in obj && Object.keys(obj["applicants"]).length > 0 ? !0 : !1;
        const ShiftIncludesApplicant = hasApplicants ? currentUser.SK in obj.applicants : !1;
        const ApplicantsLength = hasApplicants ? Object.keys(obj.applicants).length : 0;
        const FirstApplicant = hasApplicants ? obj.applicants[Object.keys(obj.applicants)[0]] : !1;
        const ApplicantName = currentUser.name;
        const isDiscribeWeekDay = (col === "Wochentag");
        if (index === 0 || index === 1) {
            return DateOrWeekDayRow(obj);
        } else if (index === e.length - 1 ) {
        } else if (!isFree && !isDiscribeWeekDay) {
            return CompanyClosed();
        } else if (isFree && !ApplicantMatchesPosition && !isDiscribeWeekDay) {
            return ApplicantDoesntMatchesPosition();
        } else if (isFree && hasPrio && !ApplicantMatchesPrio) {
            return ApplicantDoesntMatchesPrio();
        } else if (!isFree && isDiscribeWeekDay){
            return ShiftDescription(obj, anzahl);
        } else if (isFree && hasApplicants && ApplicantMatchesPosition && ShiftIncludesApplicant && ApplicantsLength > 1 && !isDiscribeWeekDay) {
            return MultipleApplicantsWithUser(index, col, ApplicantName, ApplicantsLength, setApplicant);
        } else if (isFree && hasApplicants && ApplicantMatchesPosition && ShiftIncludesApplicant && !isDiscribeWeekDay) {
            return SingleApplicantWithUser(index, col, ApplicantName, setApplicant);
        }else if (isFree && hasApplicants && ApplicantMatchesPosition && ApplicantsLength > 1 && !isDiscribeWeekDay) {
            return MultipleApplicantsWithOutUser(index, col, FirstApplicant, ApplicantsLength, setApplicant);
        } else if (isFree && hasApplicants && ApplicantMatchesPosition && !isDiscribeWeekDay) {
            return SingleApplicantWithOutUser(index, col, FirstApplicant, setApplicant);
        }  else if (isFree && !isDiscribeWeekDay) {
            return ZeroApplicants(index, col, setApplicant);
        } else {
            return Default(index, col);
        }
    };
        return (
        <>
            {dataModal(props.shiftplan.plan)}
        </>
        );
    }
export default SchichtplanElement;

