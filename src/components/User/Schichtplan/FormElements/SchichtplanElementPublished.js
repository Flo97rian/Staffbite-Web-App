import React from "react";
// core components
import store from "../../../../store";
import { 
    DateOrWeekDayRow,
    ShiftDescription,
    CompanyClosed,
    TradeShiftSingleSetApplicant,
    TradeShiftMultiSetApplicant,
    SingleSetApplicant,
    MultiSetApplicant,
    ZeroSetApplicants,
    Default
} from "../../../Application/functionalComponents/SchichtplanElements";

const tradeShift = (index, col) => {
    store.dispatch({type: "OPEN", payload: "tradeShift"})
    store.dispatch({type: "setShiftSlot", payload: { row: index, col: col}})
}

const SchichtplanElementPublished = (props) => {

    const dataModal = (e) => {
        const index = props.index;
        const col = props.col;
        const obj = e[index][col];
        const isFree = obj.frei;
        const currentUser = props.currentUser;
        let anzahl = e[index].Montag.anzahl
        const ApplicantMatchesPosition = currentUser.position["S"].includes(e[index]["Wochentag"].ShiftName)
        const hasSetApplicants =  Object.keys(obj).includes("setApplicants") && Object.keys(obj["setApplicants"]).length > 0 ? !0 : !1
        const ShiftIncludesApplicant = hasSetApplicants ? Object.keys(obj["setApplicants"]).includes(currentUser.SK["S"]) : !1
        const ApplicantsLength = hasSetApplicants ? Object.keys(obj.setApplicants).length : 0
        const FirstApplicant = hasSetApplicants ? obj.setApplicants[Object.keys(obj.setApplicants)[0]] : !1
        const ApplicantName = currentUser.name["S"]
        const isDiscribeWeekDay = (col === "Wochentag");
        if (index === 0 || index === 1) {
            return DateOrWeekDayRow(obj)
        } else if (index === e.length - 1 ) {
        } else if (!isFree && !isDiscribeWeekDay) {
            return CompanyClosed()
        } else if (!isFree && isDiscribeWeekDay){
            return ShiftDescription(obj, anzahl)
        } else if (isFree && hasSetApplicants && ApplicantMatchesPosition && ShiftIncludesApplicant && ApplicantsLength > 1 && !isDiscribeWeekDay) {
            return TradeShiftMultiSetApplicant(index, col, ApplicantName, ApplicantsLength, tradeShift)
        } else if (isFree && hasSetApplicants && ApplicantMatchesPosition && ShiftIncludesApplicant && !isDiscribeWeekDay) {
            return TradeShiftSingleSetApplicant(index, col, ApplicantName, tradeShift)
        }else if (isFree && hasSetApplicants && ApplicantMatchesPosition && ApplicantsLength > 1 && !isDiscribeWeekDay) {
            return MultiSetApplicant(FirstApplicant, ApplicantsLength)
        } else if (isFree && hasSetApplicants && ApplicantMatchesPosition && !isDiscribeWeekDay) {
            return SingleSetApplicant(FirstApplicant)
        }  else if (isFree && !isDiscribeWeekDay) {
            return Default(index, col)
        } else {
            return Default(index, col)}

    }
        return (
        <>
            {dataModal(props.plaene[props.plan].plan)}
        </>
        );
    }
export default SchichtplanElementPublished;

