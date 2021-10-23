import React from "react";
// core components
import { 
    DateOrWeekDayRow,
    ShiftDescription,
    CompanyClosed,
    ShowMultipleApplicants,
    ShowSingleApplicant,
    Default
} from "../../Application/functionalComponents/SchichtplanElements";

const SchichtplanElementPublished = (props) => {

    const dataModal = (e) => {
        const index = props.index;
        const col = props.col;
        const obj = e[index][col];
        const isObj = typeof obj === "object";
        const isFree = obj.frei;
        let anzahl = e[index].Montag.anzahl;
        //const ApplicantMatchesPosition = currentUser.position["S"].includes(e[index]["Wochentag"].ShiftName)
        const hasSetApplicants =  isObj && "setApplicants" in obj && Object.keys(obj["setApplicants"]).length > 0 ? !0 : !1;
        const ApplicantsLength = hasSetApplicants ? Object.keys(obj.setApplicants).length : 0;
        const FirstApplicant = hasSetApplicants ? obj.setApplicants[Object.keys(obj.setApplicants)[0]] : !1;
        const isDiscribeWeekDay = (col === "Wochentag");
        if (index === 0 || index === 1) {
            return DateOrWeekDayRow(obj);
        } else if (index === e.length - 1 ) {
        } else if (!isFree && !isDiscribeWeekDay) {
            return CompanyClosed();
        } else if (!isFree && isDiscribeWeekDay){
            return ShiftDescription(obj, anzahl);
        } else if (isFree && hasSetApplicants  && ApplicantsLength > 1 && !isDiscribeWeekDay) {
            return ShowMultipleApplicants(FirstApplicant, ApplicantsLength);
        } else if (isFree && hasSetApplicants && !isDiscribeWeekDay) {
            return ShowSingleApplicant(FirstApplicant);
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
export default SchichtplanElementPublished;

