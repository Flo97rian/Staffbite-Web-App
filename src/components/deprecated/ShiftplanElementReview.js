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

 } from "./ShiftplanElements";
import store from "../store";
import { getIsObject, setPrioValue, getHasNotice, getSecondApplicant, getCompanyIsOpen, getAnzahl, getHasApplicants, getApplicantsLength, getHasPrio, getFirstApplicant, getHasShiftName } from "./ElementFunctions";
import _ from "lodash";

const setApplicant = (index, col) => {
    store.dispatch({type: "OPEN", payload: "applyIsActive"});
    store.dispatch({type: "setApplicantSlot", payload: { row: index, col: col}});
    store.dispatch({type: "setShiftSlot", payload: { row: index, col: col}});
};

const editShift = (index) => {
    store.dispatch({type: "OPEN", payload: "editShiftDescription"});
    store.dispatch({type: "setShiftSlot", payload: { row: index}});
};
function setPrio(index, col, prio) {
    store.dispatch({ type: "OPEN", payload: "prioIsActive" });
    store.dispatch({ type: "setShiftSlot", payload: { row: index, col: col, prio: prio } });
}

const ShiftplanElementReview = (props) => {
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
    const isFilled =  Number(anzahl) === ApplicantsLength;

    let version = 1;
    if(version === 1) {
        if (index === 0 || index === 1 || index === ItemLength - 1 ) {
            return DateOrWeekDayRow(currentItem);
        } else if (!isFree && isDiscribeWeekDay){
            return editShiftDetails(currentItem, index, anzahl, editShift);
        } else if (isFree && isDiscribeWeekDay && !hasShiftName){
            return setShiftDetails(currentItem, index);
        } else if (isFree && hasApplicants && ApplicantsLength === 2 && !isDiscribeWeekDay &&  (hasPrio || hasNotice)) {
            return TwoSetApplicantsWithPrio(index, day, FirstApplicant, SecondApplicant, setApplicant);
        }  else if (isFree && hasApplicants && ApplicantsLength === 2 && !isDiscribeWeekDay) {
            return TwoSetApplicantsWithoutPrio(index, day, FirstApplicant, SecondApplicant, setApplicant);
        } else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay &&  (hasPrio || hasNotice)) {
            return MultipleSetApplicantsWithPrio(index, day, FirstApplicant, ApplicantsLength, setApplicant);
        }  else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay) {
            return MultiSetApplicantsWithoutPrio(index, day, FirstApplicant, ApplicantsLength, setApplicant);
        } else if (!isFree && !isDiscribeWeekDay) {
            return CompanyClosed();
        } else if (isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay &&  (hasPrio || hasNotice)) {
            return SingleSetApplicantWithPrio(index, day, FirstApplicant, setApplicant, setPrio);
        }  else if (isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay) {
            return SingleSetApplicantWithoutPrio(index, day, FirstApplicant, setApplicant);
        } else if (isFree && !hasApplicants && !isDiscribeWeekDay &&  (hasPrio || hasNotice)) {
            return ZeroApplicantsWithPrio(index, day, setApplicant);
        } else if (isFree && !hasApplicants && !isDiscribeWeekDay) {
            return ZeroApplicants(index, day, setApplicant);
        } else {
            return Default(index, day, setPrio);
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
                return TwoSetApplicantsWithoutPrioNotFilled(index, day, FirstApplicant, SecondApplicant, setApplicant);
            } else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay) {
                return MultiSetApplicantsWithoutPrioNotFilled(index, day, FirstApplicant, ApplicantsLength, setApplicant);
            } else if(isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay) {
                return SingleSetApplicantWithoutPrioNotFilled(index, day, FirstApplicant, setApplicant);
            } else {
                return ZeroApplicantsRed(index, day, setApplicant);
            }
        } else if (ApplicantsLength < Number(anzahl) && (hasPrio || hasNotice)) {
            if(isFree && hasApplicants && ApplicantsLength === 2 && !isDiscribeWeekDay) {
                return TwoSetApplicantsWithPrioNotFilled(index, day, FirstApplicant, SecondApplicant, setApplicant);
            } else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay) {
                return MultiSetApplicantsWithPrioNotFilled(index, day, FirstApplicant, ApplicantsLength, setApplicant);
            } else if(isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay) {
                return SingleSetApplicantWithPrioNotFilled(index, day, FirstApplicant, setApplicant);
            } else {
                return ZeroApplicantsWithPrioRed(index, day, setApplicant);
            }
        } else if (ApplicantsLength === Number(anzahl) && !(hasPrio || hasNotice)) {
            return MultiSetApplicantsWithoutPrioFilled(index, day, FirstApplicant, ApplicantsLength, setApplicant)
        } else if (ApplicantsLength === Number(anzahl) && (hasPrio || hasNotice)) {
            return MultiSetApplicantsWithPrioFilled(index, day, FirstApplicant, ApplicantsLength, setApplicant);
        } else {
            return Default(index, day, setPrio);
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
                return ProgessSetApplicantsWithoutPrioNotFilled(index, day, FirstApplicant, SecondApplicant, setApplicant);
            } else {
                return ProgessSetApplicantsWithoutPrioEmpty(index, day, setApplicant);
            }
        } else if (ApplicantsLength < Number(anzahl) && (hasPrio || hasNotice)) {
            if(isFree && hasApplicants && ApplicantsLength > 0 && !isDiscribeWeekDay) {
                return ProgessSetApplicantsWithPrioNotFilled(index, day, FirstApplicant, SecondApplicant, setApplicant);
            }  else {
                return ProgessSetApplicantsWithPrioEmpty(index, day, setApplicant);
            }
        } else if (ApplicantsLength === Number(anzahl) && !(hasPrio || hasNotice)) {
            return ProgessSetApplicantsWithoutPrioFilled(index, day, FirstApplicant, SecondApplicant, ApplicantsLength, setApplicant)
        } else if (ApplicantsLength === Number(anzahl) && (hasPrio || hasNotice)) {
            return ProgessSetApplicantsWithPrioFilled(index, day, FirstApplicant, SecondApplicant, ApplicantsLength, setApplicant);
        } else {
            return Default(index, day, setPrio);
        }
    } 
};
export default ShiftplanElementReview;

