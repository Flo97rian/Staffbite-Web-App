import { 
    CompanyClosed,
    CompanyClosedEntwurf,
    DateOrWeekDayRow,
    shiftHasPrio,
    DefaultWithPrio,
    Default,
    setShiftDetails,
    editShiftDetails,
    shiftSetPrio,
 } from "./ShiftplanElements";
import store from "../store";
import _ from "lodash";

export const ShiftplanElementNew = (props) => {

    const setPrio = (index, col, bool) => {
        store.dispatch({type: "OPEN", payload: "prioIsActive"});
        store.dispatch({type: "setShiftSlot", payload: { row: index, col: col, prio: bool}});
    };

    function setActive(index, col) {
        props.handleActive(index, col);
    }


    const editShift = (index) => {
        store.dispatch({type: "OPEN", payload: "editShiftDescription"});
        store.dispatch({type: "setShiftSlot", payload: { row: index}});
    };

    const ItemLength = props.ItemLength;
    const index = props.index;
    const  day = props.col;
    const currentItem = props.currentItem[day];
    const prio = _.get(currentItem, "prio", false)
    const notice = _.get(currentItem, "notice", "");
    const isFree = _.get(currentItem, "frei", false)
    const hasPrio = !_.isBoolean(prio);
    const hasNotice = !_.isEmpty(notice)
    const anzahl = props.anzahl;
    const hasShiftName = _.get(currentItem, "Wochentag.ShiftName", "");
    const isDiscribeWeekDay = day === "Wochentag";

    if (index === 0 || index === ItemLength - 1 ) {
        return DateOrWeekDayRow(currentItem);
    } else if (isFree && isDiscribeWeekDay && !hasShiftName){
        return setShiftDetails(index, editShift);
    } else if (!isFree && isDiscribeWeekDay){
        return editShiftDetails(currentItem, index, anzahl, editShift);
    }  else if (isFree && isDiscribeWeekDay) {
        return editShiftDetails(index, editShift);
    } else if (!isFree && !isDiscribeWeekDay) {
        return CompanyClosedEntwurf(index, day, setPrio);
    } else if (hasPrio || hasNotice) {
        return DefaultWithPrio(index, day, setPrio);
    } else {
        return Default(index, day, setPrio);
    }

}

export default ShiftplanElementNew;