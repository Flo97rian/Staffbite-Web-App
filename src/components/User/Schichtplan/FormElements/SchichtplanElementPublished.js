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
import { 
    getIsObject,
    getSecondApplicant,
    getCompanyIsOpen,
    getAnzahl,
    getHasApplicants,
    getApplicantsLength,
    getFirstApplicant,
    getUserMatchesPosition,
    getUserMatchesPrio,
    getShiftIncludesApplicant
 } from "../../../Application/functionalComponents/ElementFunctions";

const tradeShift = (index, col) => {
     store.dispatch({type: "OPEN", payload: "tradeShift"});
     store.dispatch({type: "setShiftSlot", payload: { row: index, col: col}});
 };

const SchichtplanElementPublished = (props) => {
    let ItemLength = props.ItemLength;
    let index = props.index;
    let col = props.col;
    let currentItem = props.currentItem[col];
    let currentWeekday = props.currentItem["Wochentag"];
    let currentUser = props.currentUser;
    let ApplicantName = currentUser.name;
    let isFree;
    let anzahl;
    let hasApplicants;
    let ApplicantsLength;
    let ShiftIncludesApplicant;
    let ApplicantMatchesPosition;
    let ApplicantMatchesPrio;
    let FirstApplicant;
    let SecondApplicant;
    let isObj = getIsObject(currentItem);
    let isDiscribeWeekDay = (col === "Wochentag");
    if (isObj) {
        isFree = getCompanyIsOpen(currentItem);
        anzahl = getAnzahl(props.anzahl);
        ApplicantMatchesPosition = getUserMatchesPosition(currentUser, currentWeekday);
        ApplicantMatchesPrio = getUserMatchesPrio(currentItem, currentUser)
        ShiftIncludesApplicant = getShiftIncludesApplicant(currentItem, currentUser, "setApplicants")
        hasApplicants =  getHasApplicants(currentItem, "setApplicants");
        ApplicantsLength = getApplicantsLength(currentItem, "setApplicants");
        FirstApplicant = getFirstApplicant(currentItem, "setApplicants");
        SecondApplicant = getSecondApplicant(currentItem, "setApplicants");
    }
        if (index === 0 || index === 1) {
            return DateOrWeekDayRow(currentItem);
        } else if (index === ItemLength - 1 ) {
            return null
        } else if (!isFree && !isDiscribeWeekDay) {
            return CompanyClosed();
        } else if (!isFree && isDiscribeWeekDay){
            return ShiftDescription(currentItem, anzahl);
        } else if (isFree && hasApplicants && ApplicantsLength > 1 && ShiftIncludesApplicant) {
            return TradeShiftMultiSetApplicant(index, col, ApplicantName, ApplicantsLength, tradeShift);
        } else if (isFree && hasApplicants && ApplicantsLength > 1) {
            return ShowMultipleApplicantsWithOutUser(FirstApplicant, ApplicantsLength);
        }  else if (isFree && hasApplicants && ApplicantsLength === 1 && ShiftIncludesApplicant) {
            return TradeShiftSingleSetApplicant(index, col, ApplicantName, tradeShift);
        }  else if (isFree && hasApplicants && ApplicantsLength === 1) {
            return ShowSingleApplicantWithOutUser(FirstApplicant);
        } else if (isFree && !isDiscribeWeekDay) {
            return Default(index, col);
        } else {
            return Default(index, col);
        }

    };
export default SchichtplanElementPublished;

