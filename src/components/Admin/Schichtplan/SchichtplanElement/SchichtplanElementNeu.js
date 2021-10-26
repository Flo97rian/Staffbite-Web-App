import React from "react";
// core components
import { 
    CompanyClosed,
    DateOrWeekDayRow,
    shiftHasPrio,
    setShiftDetails,
    editShiftDetails,
    shiftSetPrio,
 } from "../../../Application/functionalComponents/SchichtplanElements";
import store from "../../../../store";

export const SchichtplanElementNeu = (props) => {

    const setPrio = (index, col, bool) => {
        store.dispatch({type: "OPEN", payload: "prioIsActive"});
        store.dispatch({type: "setShiftSlot", payload: { row: index, col: col, prio: bool}});
    };


    const editShift = (index) => {
        store.dispatch({type: "OPEN", payload: index});
        store.dispatch({type: "setShiftSlot", payload: { row: index}});
    };

    let ItemLength = props.ItemLength;
    let col = props.col;
    let index = props.index;
    let currentItem = props.currentItem[col];
    let isObj = typeof currentItem === "object";
    let hasFree = isObj  && "frei" in currentItem ? !0 : !1;
    let isFree = hasFree && currentItem.frei ? !0 : !1;
    const hasShiftName = isObj && "ShiftName" in currentItem && currentItem.ShiftName !== undefined? !0 : !1;
    const hasPrio = isObj && "prio" in currentItem && currentItem.prio !== !1 ? !0 : !1;
    if(hasPrio) {
    }
    let anzahl = !1;
    if (typeof props.anzahl === "object" && "anzahl" in props.anzahl) {
        anzahl = props.anzahl.anzahl
    }
    let isDiscribeWeekDay = (col === "Wochentag");
    if (index === 0 || index === 1 || index === ItemLength - 1 ) {
        return DateOrWeekDayRow(currentItem);
    } else if (isFree && isDiscribeWeekDay && !hasShiftName){
        return setShiftDetails(index, editShift);
    } else if (!isFree && isDiscribeWeekDay){
        return editShiftDetails(currentItem, index, anzahl, editShift);
    }  else if (isFree && isDiscribeWeekDay) {
        return editShiftDetails(index, editShift);
    } else if (!isFree && !isDiscribeWeekDay) {
        return CompanyClosed();
    } else if (hasPrio) {
        return shiftHasPrio(index, col, setPrio);
    } else {
        return shiftSetPrio(index, col, setPrio);
    }

}

export default SchichtplanElementNeu;