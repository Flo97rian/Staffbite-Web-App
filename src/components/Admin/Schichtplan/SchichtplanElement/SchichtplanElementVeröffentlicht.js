// core components
import { 
    DateOrWeekDayRow,
    MultipleSetApplicantsWithPrio,
    MultiSetApplicantsWithoutPrio,
    SingleSetApplicantWithPrio,
    SingleSetApplicantWithoutPrio,
    TwoSetApplicantsWithPrio,
    TwoSetApplicantsWithoutPrio,
    ZeroApplicantsWithPrio,
    ZeroApplicants,
    CompanyClosed,
    setShiftDetails,
    editShiftDetails,
    Default
 } from "../../../Application/functionalComponents/SchichtplanElements";
import store from "../../../../store";
import { getIsObject, getSecondApplicant, getCompanyIsOpen, getAnzahl, getHasApplicants, getApplicantsLength, getHasPrio, getFirstApplicant, getHasShiftName, setPrioValue } from "../../../Application/functionalComponents/ElementFunctions";

const setApplicant = (index, col) => {
    store.dispatch({type: "OPEN", payload: "applyIsActive"});
    store.dispatch({type: "setApplicantSlot", payload: { row: index, col: col}});
    store.dispatch({type: "setShiftSlot", payload: { row: index, col: col}});
};

const editShift = (index) => {
    store.dispatch({type: "OPEN", payload: index});
    store.dispatch({type: "setShiftSlot", payload: { row: index}});
};

const SchichtplanElementVeröffentlicht = (props) => {
    let ItemLength = props.ItemLength;
    let index = props.index;
    let col = props.col;
    let currentItem = props.currentItem[col];
    let isFree;
    let hasPrio;
    let prio;
    let anzahl;
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
        hasApplicants =  getHasApplicants(currentItem, "setApplicants");
        ApplicantsLength = getApplicantsLength(currentItem, "setApplicants");
        hasPrio = getHasPrio(currentItem);
        prio = setPrioValue(currentItem);
        FirstApplicant = getFirstApplicant(currentItem, "setApplicants");
        SecondApplicant = getSecondApplicant(currentItem, "setApplicants");
        hasShiftName = getHasShiftName(currentItem);
    }
    if (index === 0 || index === 1 || index === ItemLength - 1 ) {
        return DateOrWeekDayRow(currentItem);
    } else if (!isFree && isDiscribeWeekDay){
        return editShiftDetails(currentItem, index, anzahl, editShift);
    } else if (isFree && isDiscribeWeekDay && !hasShiftName){
        return setShiftDetails(currentItem, index);
    } else if (isFree && hasApplicants && ApplicantsLength === 2 && !isDiscribeWeekDay && hasPrio) {
        return TwoSetApplicantsWithPrio(index, col, FirstApplicant, SecondApplicant, setApplicant, prio);
    }  else if (isFree && hasApplicants && ApplicantsLength === 2 && !isDiscribeWeekDay) {
        return TwoSetApplicantsWithoutPrio(index, col, FirstApplicant, SecondApplicant, setApplicant);
    } else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay && hasPrio) {
        return MultipleSetApplicantsWithPrio(index, col, FirstApplicant, ApplicantsLength, setApplicant, prio);
    }  else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay) {
        return MultiSetApplicantsWithoutPrio(index, col, FirstApplicant, ApplicantsLength, setApplicant);
    } else if (!isFree && !isDiscribeWeekDay) {
        return CompanyClosed();
    } else if (isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay && hasPrio) {
        return SingleSetApplicantWithPrio(index, col, FirstApplicant, setApplicant, prio);
    }  else if (isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay) {
        return SingleSetApplicantWithoutPrio(index, col, FirstApplicant, setApplicant);
    }  else if (isFree && !hasApplicants && !isDiscribeWeekDay && hasPrio) {
        return ZeroApplicantsWithPrio(index, col, setApplicant, prio);
    } else if (isFree && !hasApplicants && !isDiscribeWeekDay) {
        return ZeroApplicants(index, col, setApplicant);
    } else {
        return Default();
    }
};
export default SchichtplanElementVeröffentlicht;


