import { 
    DateOrWeekDayRow,
    MultipleApplicants,
    TwoApplicants,
    CompanyClosedEntwurf,
    SingleApplicant,
    MultipleApplicantsWithPrio,
    TwoApplicantsWithPrio,
    SingleApplicantWithPrio,
    DefaultWithPrio,
    setShiftDetailsErr,
    editShiftDetails,
    Default
 } from "../../../Application/functionalComponents/SchichtplanElements";

import { getIsObject, setPrioValue, getSecondApplicant, getHasNotice, getCompanyIsOpen, getAnzahl, getHasApplicants, getApplicantsLength, getHasPrio, getFirstApplicant, getHasShiftName} from "../../../Application/functionalComponents/ElementFunctions";
import store from "../../../../store";

const SchichtplanElementFreigegeben = (props) => {

    function setPrio(index, col, prio) {
        store.dispatch({ type: "OPEN", payload: "prioIsActive" });
        store.dispatch({ type: "setShiftSlot", payload: { row: index, col: col, prio: prio } });
    }
    function editShift(index) {
        store.dispatch({ type: "OPEN", payload: index });
        store.dispatch({ type: "setShiftSlot", payload: { row: index } });
    }
    let ItemLength = props.ItemLength;
    let index = props.index;
    let col = props.col;
    let currentItem = props.currentItem[col];
    let isFree;
    let hasPrio;
    let hasNotice;
    let anzahl;
    let prio;
    let hasApplicants;
    let ApplicantsLength;
    let FirstApplicant;
    let SecondApplicant;
    let hasShiftName;
    let isObj = getIsObject(currentItem);
    let isDiscribeWeekDay = (col === "Wochentag");
    if (isObj) {
        isFree = getCompanyIsOpen(currentItem);
        anzahl = getAnzahl(props.anzahl);
        hasApplicants =  getHasApplicants(currentItem, "applicants");
        ApplicantsLength = getApplicantsLength(currentItem, "applicants")
        hasPrio = getHasPrio(currentItem);
        hasNotice = getHasNotice(currentItem);
        prio = setPrioValue(currentItem);
        FirstApplicant = getFirstApplicant(currentItem, "applicants")
        SecondApplicant = getSecondApplicant(currentItem, "applicants")
        hasShiftName = getHasShiftName(currentItem);
    }
    if (index === 0 || index === 1 || index === ItemLength - 1 ) {
        return DateOrWeekDayRow(currentItem);
    } else if (!isFree && isDiscribeWeekDay){
        return editShiftDetails(currentItem, index, anzahl, editShift);
    } else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay && (hasPrio || hasNotice)) {
        return MultipleApplicantsWithPrio(ApplicantsLength, FirstApplicant, index, col, setPrio);
    } else if (isFree && hasApplicants && ApplicantsLength === 2 && !isDiscribeWeekDay && (hasPrio || hasNotice)) {
        return TwoApplicantsWithPrio(FirstApplicant, SecondApplicant, index, col, setPrio);
    }  else if (isFree && hasApplicants && ApplicantsLength === 2 && !isDiscribeWeekDay) {
        return TwoApplicants(FirstApplicant, SecondApplicant, index, col, setPrio);
    }  else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay) {
        return MultipleApplicants(ApplicantsLength, FirstApplicant, index, col, setPrio);
    } else if (!isFree && !isDiscribeWeekDay) {
        return CompanyClosedEntwurf(index, col, setPrio);
    } else if (isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay && (hasPrio || hasNotice)) {
        return SingleApplicantWithPrio(FirstApplicant, index, col, setPrio);
    }  else if (isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay) {
        return SingleApplicant(FirstApplicant, index, col, setPrio);
    } else if ((hasPrio || hasNotice)) {
        return DefaultWithPrio(index, col, setPrio);
    }  else {
        return Default(index, col, setPrio);
    }
}
export default SchichtplanElementFreigegeben;