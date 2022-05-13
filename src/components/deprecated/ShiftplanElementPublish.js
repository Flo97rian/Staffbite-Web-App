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
 } from "../ShiftplanElements";
import store from "../../store";
import * as _ from "lodash"
import { getIsObject, getSecondApplicant, getHasNotice, getCompanyIsOpen, getAnzahl, getHasApplicants, getApplicantsLength, getHasPrio, getFirstApplicant, getHasShiftName, setPrioValue } from "../ElementFunctions";

const setApplicant = (index, col) => {
    store.dispatch({type: "OPEN", payload: "applyIsActive"});
    store.dispatch({type: "setApplicantSlot", payload: { row: index, col: col}});
    store.dispatch({type: "setShiftSlot", payload: { row: index, col: col}});
};

const editShift = (index) => {
    store.dispatch({type: "OPEN", payload: "editShiftDescription"});
    store.dispatch({type: "setShiftSlot", payload: { row: index}});
};

const ShiftplanElementPublish = (props) => {
    const ItemLength = props.ItemLength;
    const index = props.index;
    const day = props.col;
    const currentItem = props.currentItem[day];
    const prio = _.get(currentItem, "prio", false)
    const notice = _.get(currentItem, "notice", "");
    const isFree = _.get(currentItem, "frei", false)
    const hasPrio = !_.isBoolean(prio);
    const hasNotice = !_.isEmpty(notice)
    const anzahl = _.get(props.anzahl, "anzahl", 0);
    const hasShiftName = _.get(currentItem, "Wochentag.ShiftName", "");
    const isDiscribeWeekDay = day === "Wochentag";
    const Applicants = _.get(currentItem, "applicants", [])
    const hasApplicants = !_.isEmpty(_.get(currentItem, "applicants", []));
    const ApplicantsLength = Applicants.length;
    const FirstApplicant = hasApplicants ? Applicants[0] : "";
    const SecondApplicant = hasApplicants && ApplicantsLength > 1 ? Applicants[1] : "" 

    if (index === 0 || index === 1 || index === ItemLength - 1 ) {
        return DateOrWeekDayRow(currentItem);
    } else if (!isFree && isDiscribeWeekDay){
        return editShiftDetails(currentItem, index, anzahl, editShift);
    } else if (isFree && isDiscribeWeekDay && !hasShiftName){
        return setShiftDetails(currentItem, index);
    } else if (isFree && hasApplicants && ApplicantsLength === 2 && !isDiscribeWeekDay && (hasPrio || hasNotice)) {
        return TwoSetApplicantsWithPrio(index, day, FirstApplicant, SecondApplicant, setApplicant, prio);
    }  else if (isFree && hasApplicants && ApplicantsLength === 2 && !isDiscribeWeekDay) {
        return TwoSetApplicantsWithoutPrio(index, day, FirstApplicant, SecondApplicant, setApplicant);
    } else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay && (hasPrio || hasNotice)) {
        return MultipleSetApplicantsWithPrio(index, day, FirstApplicant, ApplicantsLength, setApplicant, prio);
    }  else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay) {
        return MultiSetApplicantsWithoutPrio(index, day, FirstApplicant, ApplicantsLength, setApplicant);
    } else if (!isFree && !isDiscribeWeekDay) {
        return CompanyClosed();
    } else if (isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay && (hasPrio || hasNotice)) {
        return SingleSetApplicantWithPrio(index, day, FirstApplicant, setApplicant, prio);
    }  else if (isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay) {
        return SingleSetApplicantWithoutPrio(index, day, FirstApplicant, setApplicant);
    }  else if (isFree && !hasApplicants && !isDiscribeWeekDay && (hasPrio || hasNotice)) {
        return ZeroApplicantsWithPrio(index, day, setApplicant, prio);
    } else if (isFree && !hasApplicants && !isDiscribeWeekDay) {
        return ZeroApplicants(index, day, setApplicant);
    } else {
        return Default();
    }
};
export default ShiftplanElementPublish;


