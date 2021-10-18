import React from "react";
// core components
import { 
    DateOrWeekDayRow,
    ShiftDescription,
    MultipleApplicants,
    CompanyClosed,
    SingleApplicant,
    shiftWithPrio,
    setShiftDetailsErr,
    editShiftDetails,
    Default
 } from "../../../Application/functionalComponents/SchichtplanElements";

import store from "../../../../store";

const SchichtplanElementFreigegeben = (props) => {
    const setApplicant = (index, col) => {
        store.dispatch({type: "setApplicantSlot", payload: { row: index, col: col}});
        store.dispatch({type: "setShiftSlot", payload: { row: index, col: col}});
    };

    const editShift = (index) => {
        store.dispatch({type: "OPEN", payload: index});
        store.dispatch({type: "setShiftSlot", payload: { row: index}});
    };

    const dataModal = (e) => {
        const index = props.index;
        const col = props.col;
        const obj = e[index][col];
        const isFree = obj.frei ? !0 : !1;
        let isObj = typeof obj === "object";
        let anzahl = e[index].Montag.anzahl;
        const hasApplicants =  isObj && "applicants" in obj && Object.keys(obj.applicants).length > 0 ? !0 : !1;
        const ApplicantsLength = hasApplicants ? Object.keys(obj.applicants).length : 0;
        const hasPrio = isObj && "prio" in obj && obj.prio !== !1  ? !0 : !1;
        const FirstApplicant = hasApplicants ? obj.applicants[Object.keys(obj.applicants)[0]] : !1;
        const isDiscribeWeekDay = (col === "Wochentag");
        const hasShiftName = isObj && "ShiftName" in obj;
        if (index === 0 || index === 1 || index === e.length - 1 ) {
            return DateOrWeekDayRow(obj);
        } else if (!isFree && isDiscribeWeekDay){
            return editShiftDetails(obj, index, anzahl, editShift);
        } else if (isFree && isDiscribeWeekDay && !hasShiftName){
            return setShiftDetailsErr();
        }  else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay) {
            return MultipleApplicants(obj, index, col, ApplicantsLength, FirstApplicant, setApplicant);
        } else if (!isFree && !isDiscribeWeekDay) {
            return CompanyClosed();
        } else if (isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay) {
            return SingleApplicant(index, col, FirstApplicant, setApplicant);
        } else if (hasPrio) {
            return shiftWithPrio();
        }  else {
            return Default();
        }
    };
        return (
        <>
            {dataModal(props.plaene[props.plan].plan)}
        </>
        );
    }
export default SchichtplanElementFreigegeben;