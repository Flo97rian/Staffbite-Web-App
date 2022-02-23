import { 
    DateOrWeekDayRow,
    MultipleSetApplicantsWithPrio,
    MultiSetApplicantsWithoutPrio,
    ZeroApplicantsWithPrio,
    ZeroApplicants,
    CompanyClosed,
    SingleSetApplicantWithPrio,
    SingleSetApplicantWithoutPrio,
    TwoSetApplicantsWithPrio,
    TwoSetApplicantsWithoutPrio,
    setShiftDetails,
    editShiftDetails,
    Default,
    ZeroApplicantsRed,
    ZeroApplicantsWithPrioRed,
    TwoSetApplicantsWithoutPrioNotFilled,
    SingleSetApplicantWithoutPrioNotFilled,
    MultiSetApplicantsWithoutPrioNotFilled,
    TwoSetApplicantsWithPrioNotFilled,
    SingleSetApplicantWithPrioNotFilled,
    MultiSetApplicantsWithPrioNotFilled,
    MultiSetApplicantsWithoutPrioFilled,
    MultiSetApplicantsWithPrioFilled,
    ProgessSetApplicantsWithPrioEmpty,
    ProgessSetApplicantsWithPrioFilled,
    ProgessSetApplicantsWithPrioNotFilled,
    ProgessSetApplicantsWithoutPrioEmpty,
    ProgessSetApplicantsWithoutPrioFilled,
    ProgessSetApplicantsWithoutPrioNotFilled,

 } from "../../../Application/functionalComponents/SchichtplanElements";
import store from "../../../../store";
import { getIsObject, setPrioValue, getHasNotice, getSecondApplicant, getCompanyIsOpen, getAnzahl, getHasApplicants, getApplicantsLength, getHasPrio, getFirstApplicant, getHasShiftName } from "../../../Application/functionalComponents/ElementFunctions";

const setApplicant = (index, col) => {
    store.dispatch({type: "OPEN", payload: "applyIsActive"});
    store.dispatch({type: "setApplicantSlot", payload: { row: index, col: col}});
    store.dispatch({type: "setShiftSlot", payload: { row: index, col: col}});
};

const editShift = (index) => {
    store.dispatch({type: "OPEN", payload: index});
    store.dispatch({type: "setShiftSlot", payload: { row: index}});
};
function setPrio(index, col, prio) {
    store.dispatch({ type: "OPEN", payload: "prioIsActive" });
    store.dispatch({ type: "setShiftSlot", payload: { row: index, col: col, prio: prio } });
}

const SchichtplanElementReview = (props) => {
    let ItemLength = props.ItemLength;
    let index = props.index;
    let col = props.col;
    let currentItem = props.currentItem[col];
    let isFree;
    let hasPrio;
    let hasNotice;
    let anzahl;
    let isFilled;
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
        hasApplicants =  getHasApplicants(currentItem, "setApplicants");
        ApplicantsLength = getApplicantsLength(currentItem, "setApplicants");
        hasPrio = getHasPrio(currentItem);
        hasNotice = getHasNotice(currentItem);
        isFilled = Number(anzahl) === ApplicantsLength;

        prio = setPrioValue(currentItem);
        FirstApplicant = getFirstApplicant(currentItem, "setApplicants");
        SecondApplicant = getSecondApplicant(currentItem, "setApplicants");
        hasShiftName = getHasShiftName(currentItem);
    }
    let version = 1;
    if(version === 1) {
        if (index === 0 || index === 1 || index === ItemLength - 1 ) {
            return DateOrWeekDayRow(currentItem);
        } else if (!isFree && isDiscribeWeekDay){
            return editShiftDetails(currentItem, index, anzahl, editShift);
        } else if (isFree && isDiscribeWeekDay && !hasShiftName){
            return setShiftDetails(currentItem, index);
        } else if (isFree && hasApplicants && ApplicantsLength === 2 && !isDiscribeWeekDay &&  (hasPrio || hasNotice)) {
            return TwoSetApplicantsWithPrio(index, col, FirstApplicant, SecondApplicant, setApplicant);
        }  else if (isFree && hasApplicants && ApplicantsLength === 2 && !isDiscribeWeekDay) {
            return TwoSetApplicantsWithoutPrio(index, col, FirstApplicant, SecondApplicant, setApplicant);
        } else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay &&  (hasPrio || hasNotice)) {
            return MultipleSetApplicantsWithPrio(index, col, FirstApplicant, ApplicantsLength, setApplicant);
        }  else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay) {
            return MultiSetApplicantsWithoutPrio(index, col, FirstApplicant, ApplicantsLength, setApplicant);
        } else if (!isFree && !isDiscribeWeekDay) {
            return CompanyClosed();
        } else if (isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay &&  (hasPrio || hasNotice)) {
            return SingleSetApplicantWithPrio(index, col, FirstApplicant, setApplicant, setPrio);
        }  else if (isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay) {
            return SingleSetApplicantWithoutPrio(index, col, FirstApplicant, setApplicant);
        } else if (isFree && !hasApplicants && !isDiscribeWeekDay &&  (hasPrio || hasNotice)) {
            return ZeroApplicantsWithPrio(index, col, setApplicant);
        } else if (isFree && !hasApplicants && !isDiscribeWeekDay) {
            return ZeroApplicants(index, col, setApplicant);
        } else {
            return Default(index, col, setPrio);
        }
    } else if ( version === 2) {
        if (index === 0 || index === 1 || index === ItemLength - 1 ) {
            return DateOrWeekDayRow(currentItem);
        } else if (!isFree && isDiscribeWeekDay){
            return editShiftDetails(currentItem, index, anzahl, editShift);
        } else if (isFree && isDiscribeWeekDay && !hasShiftName){
            return setShiftDetails(currentItem, index);
        } else if (!isFree && !isDiscribeWeekDay) {
            return CompanyClosed();
        } else if (ApplicantsLength < Number(anzahl) && !(hasPrio || hasNotice)) {
            if(isFree && hasApplicants && ApplicantsLength === 2 && !isDiscribeWeekDay) {
                return TwoSetApplicantsWithoutPrioNotFilled(index, col, FirstApplicant, SecondApplicant, setApplicant);
            } else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay) {
                return MultiSetApplicantsWithoutPrioNotFilled(index, col, FirstApplicant, ApplicantsLength, setApplicant);
            } else if(isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay) {
                return SingleSetApplicantWithoutPrioNotFilled(index, col, FirstApplicant, setApplicant);
            } else {
                return ZeroApplicantsRed(index, col, setApplicant);
            }
        } else if (ApplicantsLength < Number(anzahl) && (hasPrio || hasNotice)) {
            if(isFree && hasApplicants && ApplicantsLength === 2 && !isDiscribeWeekDay) {
                return TwoSetApplicantsWithPrioNotFilled(index, col, FirstApplicant, SecondApplicant, setApplicant);
            } else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay) {
                return MultiSetApplicantsWithPrioNotFilled(index, col, FirstApplicant, ApplicantsLength, setApplicant);
            } else if(isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay) {
                return SingleSetApplicantWithPrioNotFilled(index, col, FirstApplicant, setApplicant);
            } else {
                return ZeroApplicantsWithPrioRed(index, col, setApplicant);
            }
        } else if (ApplicantsLength === Number(anzahl) && !(hasPrio || hasNotice)) {
            return MultiSetApplicantsWithoutPrioFilled(index, col, FirstApplicant, ApplicantsLength, setApplicant)
        } else if (ApplicantsLength === Number(anzahl) && (hasPrio || hasNotice)) {
            return MultiSetApplicantsWithPrioFilled(index, col, FirstApplicant, ApplicantsLength, setApplicant);
        } else {
            return Default(index, col, setPrio);
        }
    } else if ( version === 3) {
        if (index === 0 || index === 1 || index === ItemLength - 1 ) {
            return DateOrWeekDayRow(currentItem);
        } else if (!isFree && isDiscribeWeekDay){
            return editShiftDetails(currentItem, index, anzahl, editShift);
        } else if (isFree && isDiscribeWeekDay && !hasShiftName){
            return setShiftDetails(currentItem, index);
        } else if (!isFree && !isDiscribeWeekDay) {
            return CompanyClosed();
        } else if (ApplicantsLength < Number(anzahl) && !(hasPrio || hasNotice)) {
            if(isFree && hasApplicants && ApplicantsLength > 0 && !isDiscribeWeekDay) {
                return ProgessSetApplicantsWithoutPrioNotFilled(index, col, FirstApplicant, SecondApplicant, setApplicant);
            } else {
                return ProgessSetApplicantsWithoutPrioEmpty(index, col, setApplicant);
            }
        } else if (ApplicantsLength < Number(anzahl) && (hasPrio || hasNotice)) {
            if(isFree && hasApplicants && ApplicantsLength > 0 && !isDiscribeWeekDay) {
                return ProgessSetApplicantsWithPrioNotFilled(index, col, FirstApplicant, SecondApplicant, setApplicant);
            }  else {
                return ProgessSetApplicantsWithPrioEmpty(index, col, setApplicant);
            }
        } else if (ApplicantsLength === Number(anzahl) && !(hasPrio || hasNotice)) {
            return ProgessSetApplicantsWithoutPrioFilled(index, col, FirstApplicant, SecondApplicant, ApplicantsLength, setApplicant)
        } else if (ApplicantsLength === Number(anzahl) && (hasPrio || hasNotice)) {
            return ProgessSetApplicantsWithPrioFilled(index, col, FirstApplicant, SecondApplicant, ApplicantsLength, setApplicant);
        } else {
            return Default(index, col, setPrio);
        }
    } 
};
export default SchichtplanElementReview;

