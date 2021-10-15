import React from "react";
// core components
import { 
    DateOrWeekDayRow,
    ShiftDescription,
    CompanyClosed,
    ShowMultipleApplicantsWithOutUser,
    ShowSingleApplicantWithOutUser,
    TradeShiftSingleSetApplicant,
    TradeShiftMultiSetApplicant,
    Default
} from "../../../Application/functionalComponents/SchichtplanElements";
import store from "../../../../store";

const tradeShift = (index, col) => {
     store.dispatch({type: "OPEN", payload: "tradeShift"});
     store.dispatch({type: "setShiftSlot", payload: { row: index, col: col}});
 };

const SchichtplanElementPublished = (props) => {

    const dataModal = (e) => {
        const index = props.index;
        const col = props.col;
        const obj = e[index][col];
        const isObj = typeof obj === "object";
        const isFree = obj.frei;
        const currentUser = props.currentUser;
        let anzahl = e[index].Montag.anzahl;
        //const ApplicantMatchesPosition = currentUser.position["S"].includes(e[index]["Wochentag"].ShiftName)
        const hasSetApplicants =  isObj && "setApplicants" in obj && Object.keys(obj["setApplicants"]).length > 0 ? !0 : !1;
        const ShiftIncludesApplicant = hasSetApplicants ? currentUser.SK["S"] in obj["setApplicants"] : !1;
        const ApplicantsLength = hasSetApplicants ? Object.keys(obj.setApplicants).length : 0;
        const FirstApplicant = hasSetApplicants ? obj.setApplicants[Object.keys(obj.setApplicants)[0]] : !1;
        const ApplicantName = currentUser.name["S"];
        const isDiscribeWeekDay = (col === "Wochentag");
        if (index === 0 || index === 1) {
            return DateOrWeekDayRow(obj);
        } else if (index === e.length - 1 ) {
        } else if (!isFree && !isDiscribeWeekDay) {
            return CompanyClosed();
        } else if (!isFree && isDiscribeWeekDay){
            return ShiftDescription(obj, anzahl);
        } else if (isFree && hasSetApplicants && ApplicantsLength > 1 && ShiftIncludesApplicant) {
            return TradeShiftMultiSetApplicant(index, col, ApplicantName, ApplicantsLength, tradeShift);
        } else if (isFree && hasSetApplicants && ApplicantsLength > 1) {
            return ShowMultipleApplicantsWithOutUser(FirstApplicant, ApplicantsLength);
        }  else if (isFree && hasSetApplicants && ApplicantsLength === 1 && ShiftIncludesApplicant) {
            return TradeShiftSingleSetApplicant(index, col, ApplicantName, tradeShift);
        }  else if (isFree && hasSetApplicants && ApplicantsLength === 1) {
            return ShowSingleApplicantWithOutUser(FirstApplicant);
        } else if (isFree && !isDiscribeWeekDay) {
            return Default(index, col);
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
export default SchichtplanElementPublished;

