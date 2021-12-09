import { 
    CompanyClosedEntwurf,
    DateOrWeekDayRow,
    Default,
    DefaultWithPrio,
    setShiftDetails,
    editShiftDetails,
 } from "../../../Application/functionalComponents/SchichtplanElements";
import store from "../../../../store";
import { getIsObject, getCompanyIsOpen, getHasNotice, getAnzahl, getHasPrio, getHasShiftName, setPrioValue} from "../../../Application/functionalComponents/ElementFunctions";

const SchichtplanElementEntwurf = (props) => {

    function setPrio(index, col, prio) {
        store.dispatch({ type: "OPEN", payload: "prioIsActive" });
        store.dispatch({ type: "setShiftSlot", payload: { row: index, col: col, prio: prio } });
    }

    function setActive(index, col) {
        props.handleActive(index, col);
    }


    function editShift(index) {
        store.dispatch({ type: "OPEN", payload: index });
        store.dispatch({ type: "setShiftSlot", payload: { row: index } });
    }

    let ItemLength = props.ItemLength;
    let index = props.index;
    let col = props.col;
    let currentItem = props.currentItem[col];
    let prio;
    let isFree;
    let hasPrio;
    let hasNotice;
    let anzahl;
    let hasShiftName;
    let isObj = getIsObject(currentItem);
    let isDiscribeWeekDay = (col === "Wochentag");
    if (isObj) {
        isFree = getCompanyIsOpen(currentItem);
        anzahl = getAnzahl(props.anzahl);
        hasPrio = getHasPrio(currentItem);
        hasNotice = getHasNotice(currentItem);
        prio = setPrioValue(currentItem);
        hasShiftName = getHasShiftName(currentItem);
    }
    if (index === 0 || index === ItemLength - 1 ) {
        return DateOrWeekDayRow(currentItem);  
    } else if (index === 1 && !isObj){
        return DateOrWeekDayRow(currentItem);  
    } else if (isFree && isDiscribeWeekDay && !hasShiftName){
        return setShiftDetails(index, editShift);
    } else if (!isFree && isDiscribeWeekDay){
        return editShiftDetails(currentItem, index, anzahl, editShift);
    } else if (!isFree && !isDiscribeWeekDay) {
        return CompanyClosedEntwurf(index, col, setPrio);
    } else if (hasPrio || hasNotice) {
        return DefaultWithPrio(index, col, setPrio);
    } else {
        return Default(index, col, setPrio);
    }

};
export default SchichtplanElementEntwurf;