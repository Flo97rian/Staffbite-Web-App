import React from "react";
// core components
import store from "../../../../store";
import { 
    DateOrWeekDayRow,
    ShiftDescription,
    CompanyClosed,
    ApplicantDoesntMatchesPosition,
    ApplicantDoesntMatchesPrio,
    MultipleApplicantsWithUser,
    SingleApplicantWithUser,
    MultipleApplicantsWithOutUser,
    SingleApplicantWithOutUser,
    ZeroApplicants,
    Default
} from "../../../Application/functionalComponents/SchichtplanElements";
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
const setApplicant = (index, col) => {
    store.dispatch({type: "OPEN", payload: "applyIsActive"})
    store.dispatch({type: "setShiftSlot", payload: { row: index, col: col}})
}

const SchichtplanElement = (props) => {
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
        ShiftIncludesApplicant = getShiftIncludesApplicant(currentItem, currentUser, "applicants")
        hasApplicants =  getHasApplicants(currentItem, "applicants");
        ApplicantsLength = getApplicantsLength(currentItem, "applicants");
        FirstApplicant = getFirstApplicant(currentItem, "applicants");
        SecondApplicant = getSecondApplicant(currentItem, "applicants");
    }
        if (index === 0 || index === 1) {
            return DateOrWeekDayRow(currentItem);
        } else if (index === ItemLength - 1 ) {
            return null
        } else if (!isFree && !isDiscribeWeekDay) {
            return CompanyClosed();
        } else if (isFree && hasApplicants && ApplicantMatchesPosition && ShiftIncludesApplicant && ApplicantsLength > 1 && !isDiscribeWeekDay) {
            return MultipleApplicantsWithUser(index, col, ApplicantName, ApplicantsLength, setApplicant);
        } else if (isFree && hasApplicants && ApplicantMatchesPosition && ShiftIncludesApplicant && !isDiscribeWeekDay) {
            return SingleApplicantWithUser(index, col, ApplicantName, setApplicant);
        }else if (isFree && hasApplicants && ApplicantMatchesPosition && ApplicantsLength > 1 && !isDiscribeWeekDay) {
            return MultipleApplicantsWithOutUser(index, col, FirstApplicant, ApplicantsLength, setApplicant);
        } else if (isFree && hasApplicants && ApplicantMatchesPosition && !isDiscribeWeekDay) {
            return SingleApplicantWithOutUser(index, col, FirstApplicant, setApplicant);
        } else if (isFree && !ApplicantMatchesPosition && !isDiscribeWeekDay) {
            return ApplicantDoesntMatchesPosition();
        } else if (isFree && !isDiscribeWeekDay) {
            return ZeroApplicants(index, col, setApplicant);
        } else if (!isFree && isDiscribeWeekDay){
            return ShiftDescription(currentItem, anzahl);
        }   else {
            return Default(index, col);
        }
    };
export default SchichtplanElement;

