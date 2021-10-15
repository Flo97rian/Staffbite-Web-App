import React from "react";
// core components
import { 
    DateOrWeekDayRow,
    MultiSetApplicantsWithPrio,
    MultiSetApplicantsWithoutPrio,
    ZeroApplicants,
    CompanyClosed,
    SingleSetApplicantWithPrio,
    SingleSetApplicantWithoutPrio,
    TwoSetApplicantsWithPrio,
    TwoSetApplicantsWithoutPrio,
    setShiftDetails,
    editShiftDetails,
    Default
 } from "../../../Application/functionalComponents/SchichtplanElements";
import store from "../../../../store";

const setApplicant = (index, col) => {
    store.dispatch({type: "OPEN", payload: "applyIsActive"});
    store.dispatch({type: "setApplicantSlot", payload: { row: index, col: col}});
    store.dispatch({type: "setShiftSlot", payload: { row: index, col: col}});
};

const editShift = (index) => {
    store.dispatch({type: "OPEN", payload: index});
    store.dispatch({type: "setShiftSlot", payload: { row: index}});
};

const SchichtplanElementReview = (props) => {
    const dataModal = (e) => {
        const index = props.index;
        const col = props.col;
        const obj = e[index][col];
        const isFree = obj.frei;
        let isObj = typeof obj === "object";
        let anzahl = e[index].Montag.anzahl;
        const hasShiftName = isObj && "ShiftName" in obj ? !0 : !1;
        const hasApplicants = isObj && "setApplicants" in obj && Object.keys(obj.setApplicants).length > 0 ? !0 : !1;
        const ApplicantsLength = hasApplicants ? Object.keys(obj.setApplicants).length : 0;
        const hasPrio = isObj && "prio" in obj && obj.prio ? !0 : !1;
        const FirstApplicant = hasApplicants ? obj.setApplicants[Object.keys(obj.setApplicants)[0]] : !1;
        const SecondApplicant = hasApplicants && Object.keys(obj.setApplicants).length === 2 ? obj.setApplicants[Object.keys(obj.setApplicants)[1]] : !1;
        const isDiscribeWeekDay = (col === "Wochentag");
        if (index === 0 || index === 1 || index === e.length - 1 ) {
            return DateOrWeekDayRow(obj);
        } else if (!isFree && isDiscribeWeekDay){
            return editShiftDetails(obj, index, anzahl, editShift);
        } else if (isFree && isDiscribeWeekDay && !hasShiftName){
            return setShiftDetails(obj, index);
        } else if (isFree && hasApplicants && ApplicantsLength === 2 && !isDiscribeWeekDay && hasPrio) {
            return TwoSetApplicantsWithPrio(index, col, FirstApplicant, SecondApplicant, setApplicant);
        }  else if (isFree && hasApplicants && ApplicantsLength === 2 && !isDiscribeWeekDay) {
            return TwoSetApplicantsWithoutPrio(index, col, FirstApplicant, SecondApplicant, setApplicant);
        } else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay && hasPrio) {
            return MultiSetApplicantsWithPrio(index, col, ApplicantsLength, FirstApplicant, setApplicant);
        }  else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay) {
            return MultiSetApplicantsWithoutPrio(index, col, ApplicantsLength, FirstApplicant, setApplicant);
        } else if (!isFree && !isDiscribeWeekDay) {
            return CompanyClosed();
        } else if (isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay && hasPrio) {
            return SingleSetApplicantWithPrio(index, col, FirstApplicant, setApplicant);
        }  else if (isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay) {
            return SingleSetApplicantWithoutPrio(index, col, FirstApplicant, setApplicant);
        } else if (isFree && !hasApplicants && !isDiscribeWeekDay) {
            return ZeroApplicants(index, col, setApplicant);
        } else {
            return Default();
        }
    };
        return (
        <>
            {dataModal(props.plaene[props.plan].plan)}
        </>
        );
    }
export default SchichtplanElementReview;

