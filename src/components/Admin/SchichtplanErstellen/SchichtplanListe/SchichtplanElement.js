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

export const SchichtplanElement = (props) => {

    const setPrio = (index, col, bool) => {
        store.dispatch({type: "OPEN", payload: "prioIsActive"})
        store.dispatch({type: "setShiftSlot", payload: { row: index, col: col, prio: bool}})
    }


    const editShift = (index) => {
        store.dispatch({type: "OPEN", payload: index})
    }

    const dataModal = (e) => {
        let ItemLength = props.ItemLength
        let col = props.col;
        let index = props.index;
        let currentItem = props.currentItem[col]
        let anzahl = props.anzahl
        let hasFree = typeof currentItem === "object" && Object.keys(currentItem).includes("frei")
        let isFree = hasFree && currentItem.frei ? !0 : !1
        const hasApplicants =  Object.keys(currentItem).includes("setApplicants") && Object.keys(currentItem["setApplicants"]).length > 0 ? !0 : !1
        const hasShiftName = Object.keys(currentItem).includes("ShiftName") ? !0 : !1
        const hasPrio = Object.keys(currentItem).includes("prio") && currentItem.prio ? !0 : !1
        let isDiscribeWeekDay = (col === "Wochentag");
        if (index === 0 || index === 1 || index === ItemLength - 1 ) {
            return DateOrWeekDayRow(currentItem)
        } else if (isFree && isDiscribeWeekDay && !hasShiftName){
            return setShiftDetails(index, editShift)
        } else if (!isFree && isDiscribeWeekDay){
            return editShiftDetails(currentItem, index, anzahl, editShift)
        }  else if (isFree && isDiscribeWeekDay) {
            return editShiftDetails(index, editShift)
        } else if (!isFree && !isDiscribeWeekDay) {
            return CompanyClosed()
        } else if (hasApplicants) {
            return CreateShiftPlanHasApplicants()
        } else if (hasPrio && hasApplicants) {
            return CreateShiftPlanHasApplicantsWithPrio(index, col, setPrio)
        } else if (hasPrio) {
            return shiftHasPrio(index, col, setPrio)
        } else {
            return shiftSetPrio(index, col, setPrio)
        }

    }
        return (
        <>
            {dataModal(props.plaene[props.plan].plan)}
        </>
        );
    }