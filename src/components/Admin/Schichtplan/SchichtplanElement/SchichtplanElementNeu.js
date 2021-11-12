import { 
    CompanyClosed,
    DateOrWeekDayRow,
    shiftHasPrio,
    setShiftDetails,
    editShiftDetails,
    shiftSetPrio,
 } from "../../../Application/functionalComponents/SchichtplanElements";
import store from "../../../../store";
import { getIsObject, getCompanyIsOpen, getAnzahl, getHasPrio, getHasShiftName, setPrioValue, } from "../../../Application/functionalComponents/ElementFunctions";

export const SchichtplanElementNeu = (props) => {

    const setPrio = (index, col, bool) => {
        store.dispatch({type: "OPEN", payload: "prioIsActive"});
        store.dispatch({type: "setShiftSlot", payload: { row: index, col: col, prio: bool}});
    };


    const editShift = (index) => {
        store.dispatch({type: "OPEN", payload: index});
        store.dispatch({type: "setShiftSlot", payload: { row: index}});
    };
    let ItemLength = props.ItemLength;
    let index = props.index;
    let col = props.col;
    let currentItem = props.currentItem[col];
    let prio;
    let isFree;
    let hasPrio;
    let anzahl;
    let hasShiftName;
    let isObj = getIsObject(currentItem);
    let isDiscribeWeekDay = (col === "Wochentag");
    if (isObj) {
        isFree = getCompanyIsOpen(currentItem);
        anzahl = getAnzahl(props.anzahl);
        hasPrio = getHasPrio(currentItem);
        prio = setPrioValue(currentItem);
        hasShiftName = getHasShiftName(currentItem);
    }
    if (index === 0 || index === 1 || index === ItemLength - 1 ) {
        return DateOrWeekDayRow(currentItem);
    } else if (isFree && isDiscribeWeekDay && !hasShiftName){
        return setShiftDetails(index, editShift);
    } else if (!isFree && isDiscribeWeekDay){
        return editShiftDetails(currentItem, index, anzahl, editShift);
    }  else if (isFree && isDiscribeWeekDay) {
        return editShiftDetails(index, editShift);
    } else if (!isFree && !isDiscribeWeekDay) {
        return CompanyClosed();
    } else if (hasPrio) {
        return shiftHasPrio(index, col, prio, setPrio, props.handleActiveShift);
    } else {
        return shiftSetPrio(index, col, prio, setPrio, props.handleActiveShift);
    }

}

export default SchichtplanElementNeu;