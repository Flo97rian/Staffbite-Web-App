import React from "react";
// core components
import { 
    CompanyClosed,
    DateOrWeekDayRow,
    shiftHasPrio,
    setShiftDetails,
    editShiftDetails,
    shiftSetPrio,
    CreateShiftPlanHasApplicants,
    CreateShiftPlanHasApplicantsWithPrio,
 } from "../../../Application/functionalComponents/SchichtplanElements";
import store from "../../../../store";

const SchichtplanElementEntwurf = (props) => {

    const setPrio = (index, col, bool) => {
        store.dispatch({type: "OPEN", payload: "prioIsActive"});
        store.dispatch({type: "setShiftSlot", payload: { row: index, col: col, prio: bool}});
    };


    const editShift = (index) => {
        store.dispatch({type: "OPEN", payload: index});
        store.dispatch({type: "setShiftSlot", payload: { row: index}});
    };

    const dataModal = (e) => {
        let ItemLength = props.ItemLength;
        let col = props.col;
        let index = props.index;
        let currentItem = props.currentItem[col];
        let isObj = typeof currentItem === "object";
        let anzahl = props.anzahl;
        let hasFree = isObj && "frei" in currentItem;
        let isFree = hasFree && currentItem.frei ? !0 : !1;
        const hasShiftName = isObj && "ShiftName" in currentItem ? !0 : !1; 
        const hasPrio = isObj && "prio" in currentItem && currentItem.prio ? !0 : !1;
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

    };
        return (
        <>
            {dataModal(props.plaene[props.plan].plan)}
        </>
        )
    }
export default SchichtplanElementEntwurf;