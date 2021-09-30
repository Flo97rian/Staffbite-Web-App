import React from "react";
// core components
import { 
    DateOrWeekDayRow,
    ShiftDescription,
    MultipleApplicants,
    ZeroApplicants,
    CompanyClosed,
    SingleApplicant,
    setShiftDetails,
    MultipleApplicantsWithOutUserWithPrio,
    ZeroApplicantsWithOutUserWithPrio,
    SingleApplicantWithOutUserWithPrio,
    Default
 } from "../../../Application/functionalComponents/SchichtplanElements";
import store from "../../../../store";

const setApplicant = (index, col) => {
    store.dispatch({type: "OPEN", payload: "applyIsActive"})
    store.dispatch({type: "setApplicantSlot", payload: { row: index, col: col}})
}

const SchichtplanElementPublished = (props) => {
    const dataModal = (e) => {
        const index = props.index;
        const col = props.col;
        const obj = e[index][col];
        const isFree = obj.frei;
        let anzahl = e[index].Montag.anzahl
        const hasShiftName = Object.keys(obj).includes("ShiftName") ? !0 : !1
        const hasApplicants =  Object.keys(obj).includes("setApplicants") && Object.keys(obj["setApplicants"]).length > 0 ? !0 : !1
        const ApplicantsLength = hasApplicants ? Object.keys(obj.setApplicants).length : 0
        const hasPrio = Object.keys(obj).includes("prio") && obj.prio ? !0 : !1
        const FirstApplicant = hasApplicants ? obj.setApplicants[Object.keys(obj.setApplicants)[0]] : !1
        const isDiscribeWeekDay = (col === "Wochentag");
        if (index === 0 || index === 1 || index === e.length - 1 ) {
            return DateOrWeekDayRow(obj)
        } else if (!isFree && isDiscribeWeekDay){
            return ShiftDescription(obj, anzahl)
        } else if (isFree && isDiscribeWeekDay && !hasShiftName){
            return setShiftDetails(obj, index)
        } else if (hasPrio && ApplicantsLength > 1) {
            return MultipleApplicantsWithOutUserWithPrio(index, col, FirstApplicant, ApplicantsLength, setApplicant)
        }else if (hasPrio && ApplicantsLength === 1) {
            console.log("here")
            return SingleApplicantWithOutUserWithPrio(index, col, FirstApplicant, setApplicant)
        } else if (hasPrio) {
            return ZeroApplicantsWithOutUserWithPrio(index, col, setApplicant)
        }  else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay) {
            return MultipleApplicants(obj, index, col, ApplicantsLength, FirstApplicant, setApplicant)
        } else if (!isFree && !isDiscribeWeekDay) {
            return CompanyClosed()
        } else if (isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay) {
            return SingleApplicant(index, col, FirstApplicant, setApplicant)
        } else if (isFree && !hasApplicants && !isDiscribeWeekDay) {
            return ZeroApplicants(index, col, setApplicant)
        } else {
            return Default()
        }
    }
        return (
        <>
            {dataModal(props.plaene[props.plan].plan)}
        </>
        );
    }
export default SchichtplanElementPublished;

