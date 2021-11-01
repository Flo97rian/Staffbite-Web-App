import React from "react";
// core components
import { 
    DateOrWeekDayRow,
    ShiftDescription,
    CompanyClosed,
    ShowMultipleApplicants,
    ShowMultipleApplicantsWithPrio,
    ShowTwoApplicants,
    ShowTwoApplicantsWithPrio,
    ShowSingleApplicant,
    ShowSingleApplicantWithPrio,
    Default
} from "../../Application/functionalComponents/SchichtplanElements";
import { getIsObject, getSecondApplicant, getCompanyIsOpen, getAnzahl, getHasApplicants, getApplicantsLength, getFirstApplicant, getHasPrio, setPrioValue } from "../../Application/functionalComponents/ElementFunctions";

const SchichtplanElementPublished = (props) => {
    let ItemLength = props.ItemLength;
    let index = props.index;
    let col = props.col;
    let currentItem = props.currentItem[col];
    let isFree;
    let anzahl;
    let hasPrio;
    let prio;
    let hasApplicants;
    let ApplicantsLength;
    let FirstApplicant;
    let SecondApplicant;
    let isObj = getIsObject(currentItem);
    let isDiscribeWeekDay = (col === "Wochentag");
    if (isObj) {
        isFree = getCompanyIsOpen(currentItem);
        anzahl = getAnzahl(props.anzahl);
        hasPrio = getHasPrio(currentItem);
        prio = setPrioValue(currentItem);
        hasApplicants =  getHasApplicants(currentItem, "setApplicants");
        ApplicantsLength = getApplicantsLength(currentItem, "setApplicants");
        FirstApplicant = getFirstApplicant(currentItem, "setApplicants");
        SecondApplicant = getSecondApplicant(currentItem, "setApplicants");
    }
    if (index === 0 || index === 1 ||  index === ItemLength - 1 ) {
        return DateOrWeekDayRow(currentItem);
    } else if (!isFree && !isDiscribeWeekDay) {
        return CompanyClosed();
    } else if (!isFree && isDiscribeWeekDay){
        return ShiftDescription(currentItem, anzahl);
    }else if (isFree && hasApplicants  && ApplicantsLength === 2 &&  hasPrio && !isDiscribeWeekDay) {
        return ShowTwoApplicantsWithPrio(FirstApplicant, SecondApplicant, prio);
    }   else if (isFree && hasApplicants  && ApplicantsLength === 2 && !isDiscribeWeekDay) {
        return ShowTwoApplicants(FirstApplicant, SecondApplicant);
    }  else if (isFree && hasApplicants  && ApplicantsLength > 1 && hasPrio && !isDiscribeWeekDay) {
        return ShowMultipleApplicantsWithPrio(FirstApplicant, ApplicantsLength, prio);
    }   else if (isFree && hasApplicants  && ApplicantsLength > 1 && !isDiscribeWeekDay) {
        return ShowMultipleApplicants(FirstApplicant, ApplicantsLength);
    } else if (isFree && hasApplicants && hasPrio && !isDiscribeWeekDay) {
        return ShowSingleApplicantWithPrio(FirstApplicant, prio);
    }  else if (isFree && hasApplicants && !isDiscribeWeekDay) {
        return ShowSingleApplicant(FirstApplicant);
    } else {
        return Default(index, col);
    }
    };
export default SchichtplanElementPublished;

