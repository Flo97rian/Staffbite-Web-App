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
        var ItemLength = props.ItemLength;
        var index = props.index;
        console.log(index);
        var col = props.col;
        let currentItem = props.currentItem[col];
        let isObj = typeof currentItem === "object";
        var isFree = currentItem.frei ? !0 : !1;
        var anzahl = !1;
        if (typeof props.anzahl === "object") {
            if ("anzahl" in props.anzahl) {
                anzahl = props.anzahl.anzahl
            }
        }
        const hasApplicants =  isObj && "applicants" in currentItem && Object.keys(currentItem.applicants).length > 0 ? !0 : !1;
        const ApplicantsLength = hasApplicants ? Object.keys(currentItem.applicants).length : 0;
        const hasPrio = isObj && "prio" in currentItem && currentItem.prio !== !1  ? !0 : !1;
        const FirstApplicant = hasApplicants ? currentItem.applicants[Object.keys(currentItem.applicants)[0]] : !1;
        const isDiscribeWeekDay = (col === "Wochentag");
        const hasShiftName = isObj && "ShiftName" in currentItem;
        if (index === 0 || index === 1 || index === ItemLength - 1 ) {
            return DateOrWeekDayRow(currentItem);
        } else if (!isFree && isDiscribeWeekDay){
            return editShiftDetails(currentItem, index, anzahl, editShift);
        } else if (isFree && isDiscribeWeekDay && !hasShiftName){
            return setShiftDetailsErr();
        }  else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay) {
            return MultipleApplicants(currentItem, index, col, ApplicantsLength, FirstApplicant, setApplicant);
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