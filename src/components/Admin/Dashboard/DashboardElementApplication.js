import React from "react";
// core components
import { 
    DateOrWeekDayRow,
    ShiftDescription,
    CompanyClosed,
    ShowSingleApplicant,
    ShowMultipleApplicants,
    Default
} from "../../Application/functionalComponents/SchichtplanElements";


const DashboardElementApplication = (props) => {

    const dataModal = (e) => {
        const index = props.index;
        const col = props.col;
        const obj = e[index][col];
        const isObj = typeof obj === "object";
        const isFree = obj.frei;
        let anzahl = e[index].Montag.anzahl;
        const hasPrio = isObj && "prio" in obj ? !0 : !1;
        const hasApplicants =  isObj && "applicants" in obj && Object.keys(obj["applicants"]).length > 0 ? !0 : !1;
        const ApplicantsLength = hasApplicants ? Object.keys(obj.applicants).length : 0;
        const FirstApplicant = hasApplicants ? obj.applicants[Object.keys(obj.applicants)[0]] : !1;
        const isDiscribeWeekDay = (col === "Wochentag");
        if (index === 0 || index === 1) {
            return DateOrWeekDayRow(obj);
        } else if (index === e.length - 1 ) {
        } else if (!isFree && !isDiscribeWeekDay) {
            return CompanyClosed();
        } else if (!isFree && isDiscribeWeekDay){
            return ShiftDescription(obj, anzahl);
        } else if (isFree && hasApplicants  && ApplicantsLength > 1 && !isDiscribeWeekDay) {
            return ShowMultipleApplicants(FirstApplicant, ApplicantsLength);
        } else if (isFree && hasApplicants && !isDiscribeWeekDay) {
            return ShowSingleApplicant(FirstApplicant);
        } else {
            return Default(index, col);
        }
    };
        return (
        <>
            {dataModal(props.plaene[props.plan].plan)}
        </>
        );
    }
export default DashboardElementApplication;

