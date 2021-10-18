import React from "react";
// core components
import { 
    DateOrWeekDayRow,
    ShiftDescription,
    CompanyClosed,
    ApplicantDoesntMatchesPosition,
    ApplicantDoesntMatchesPrio,
    ShowMultipleApplicantsWithOutUser,
    ShowMultipleApplicantsWithUser,
    ShowSingleApplicantWithOutUser,
    ShowSingleApplicantWithUser,
    Default
} from "../../Application/functionalComponents/SchichtplanElements";


const DashboardElementApplication = (props) => {

    const dataModal = (e) => {
        const index = props.index;
        const col = props.col;
        const obj = e[index][col];
        const isObj = typeof obj === "object";
        const isFree = obj.frei;
        const currentUser = props.currentUser;
        let anzahl = e[index].Montag.anzahl;
        const ApplicantMatchesPosition = currentUser.position["S"].includes(e[index]["Wochentag"].ShiftName);
        const hasPrio = isObj && "prio" in obj ? !0 : !1;
        const ApplicantMatchesPrio = "Experte" in currentUser;
        const hasApplicants =  isObj && "applicants" in obj && Object.keys(obj["applicants"]).length > 0 ? !0 : !1;
        const ShiftIncludesApplicant = hasApplicants ? currentUser.SK["S"] in obj.applicants : !1;
        const ApplicantsLength = hasApplicants ? Object.keys(obj.applicants).length : 0;
        const FirstApplicant = hasApplicants ? obj.applicants[Object.keys(obj.applicants)[0]] : !1;
        const ApplicantName = currentUser.name.S;
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
        } else if (isFree && hasApplicants && ShiftIncludesApplicant && ApplicantsLength > 1 && !isDiscribeWeekDay) {
            return ShowMultipleApplicantsWithUser(ApplicantName, ApplicantsLength);
        } else if (isFree && hasApplicants && ShiftIncludesApplicant && !isDiscribeWeekDay) {
            return ShowSingleApplicantWithUser(ApplicantName);
        }else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay) {
            return ShowMultipleApplicantsWithOutUser(FirstApplicant, ApplicantsLength);
        } else if (isFree && hasApplicants && !isDiscribeWeekDay) {
            return ShowSingleApplicantWithOutUser(FirstApplicant);
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

