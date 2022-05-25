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
import { useSelector, useDispatch } from "react-redux";
import { settingModal } from "../reducers/modal";
import { settingShiftSlot } from "../reducers/ShiftSlot";

export const ShiftplanElementNew = (props) => {
    const dispatch = useDispatch();
    const setPrio = (index, day, bool) => {
        dispatch(settingModal("prioIsActive"))
        dispatch(settingShiftSlot({index: index, day: day}))
    };


    const editShift = (index) => {
        dispatch(settingModal("editShiftDescription"))
        dispatch(settingShiftSlot({index: index}))
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