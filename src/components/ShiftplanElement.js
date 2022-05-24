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
    MultipleApplicants,
    TwoApplicants,
    SingleApplicant,
    MultipleApplicantsWithPrio,
    TwoApplicantsWithPrio,
    SingleApplicantWithPrio,
    setShiftDetailsErr,
    MultipleSetApplicantsWithPrio,
    MultiSetApplicantsWithoutPrio,
    ZeroApplicantsWithPrio,
    ZeroApplicants,
    SingleSetApplicantWithPrio,
    SingleSetApplicantWithoutPrio,
    TwoSetApplicantsWithPrio,
    TwoSetApplicantsWithoutPrio,
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
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { settingModal } from "../reducers/modal";
import { settingShiftSlot } from "../reducers/ShiftSlot";

export const ShiftplanElement = (props) => {
    const dispatch = useDispatch();
    const Shiftplan = useSelector(state => state.Shiftplan);
    const setPrio = (index, day, bool) => {
        dispatch(settingModal("prioIsActive"))
        dispatch(settingShiftSlot({index: index, day: day}))
    };

    function setActive(index, col) {
        props.handleActive(index, col);
    }

    const editShift = (index) => {
        dispatch(settingModal("editShiftDescription"))
        dispatch(settingShiftSlot({index: index}))
    };

    const setApplicant = (index, day) => {
        dispatch(settingModal("applyIsActive"))
        dispatch(settingShiftSlot({index: index, day: day}))
    };
    const type = _.isString(Shiftplan.id) ? Shiftplan.id.split('#')[1] : "";
    const ItemLength = props.ItemLength;
    const index = props.index;
    const day = props.col;
    const currentItem = props.currentItem[day];
    const prio = _.get(currentItem, "prio", false)
    const notice = _.get(currentItem, "notice", "");
    const isFree = _.get(currentItem, "frei", false)
    const hasPrio = !_.isBoolean(prio);
    const hasNotice = !_.isEmpty(notice)
    const anzahl = _.get(Shiftplan, "plan.[" + index + "].Montag.anzahl", "0");
    const hasShiftName = _.get(currentItem, "Wochentag.ShiftName", "");
    const isDiscribeWeekDay = day === "Wochentag";
    const Applicants = _.get(currentItem, "applicants", {})
    const SetApplicants = _.get(currentItem, "setApplicants", {})
    const hasApplicants = !_.isEmpty(_.get(currentItem, "applicants", {}));
    const hasSetApplicants = !_.isEmpty(_.get(currentItem, "setApplicants", {}));
    const ApplicantsLength = _.size(Applicants);
    const SetAppplicantsLength = _.size(SetApplicants);
    const ApplicantsKeys = _.keys(Applicants)
    const FirstApplicant = _.get(Applicants, [ApplicantsKeys[0]], "");
    const SecondApplicant = _.get(Applicants, [ApplicantsKeys[1]], "");
    const SetApplicantsKeys = _.keys(SetApplicants);
    const FirstSetApplicant = _.get(SetApplicants, [SetApplicantsKeys[0]], "");
    const SecondSetApplicant = _.get(SetApplicants, [SetApplicantsKeys[1]], "");

    if(!_.isEmpty(type)) {
        if(type === "Entwurf") {
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
        } else if (type === "Freigeben") {
            if (index === 0 || index === 1 || index === ItemLength - 1 ) {
                return DateOrWeekDayRow(currentItem);
            } else if (!isFree && isDiscribeWeekDay){
                return editShiftDetails(currentItem, index, anzahl, editShift);
            } else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay && (hasPrio || hasNotice)) {
                return MultipleApplicantsWithPrio(ApplicantsLength, FirstApplicant, index, day, setPrio);
            } else if (isFree && hasApplicants && ApplicantsLength === 2 && !isDiscribeWeekDay && (hasPrio || hasNotice)) {
                return TwoApplicantsWithPrio(FirstApplicant, SecondApplicant, index, day, setPrio);
            }  else if (isFree && hasApplicants && ApplicantsLength === 2 && !isDiscribeWeekDay) {
                return TwoApplicants(FirstApplicant, SecondApplicant, index, day, setPrio);
            }  else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay) {
                return MultipleApplicants(ApplicantsLength, FirstApplicant, index, day, setPrio);
            } else if (!isFree && !isDiscribeWeekDay) {
                return CompanyClosedEntwurf(index, day, setPrio);
            } else if (isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay && (hasPrio || hasNotice)) {
                return SingleApplicantWithPrio(FirstApplicant, index, day, setPrio);
            }  else if (isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay) {
                return SingleApplicant(FirstApplicant, index, day, setPrio);
            } else if ((hasPrio || hasNotice)) {
                return DefaultWithPrio(index, day, setPrio);
            }  else {
                return Default(index, day, setPrio);
            }
        } else if (type === "Review") {
            if (index === 0 || index === 1 || index === ItemLength - 1 ) {
                return DateOrWeekDayRow(currentItem);
            } else if (!isFree && isDiscribeWeekDay){
                return editShiftDetails(currentItem, index, anzahl, editShift);
            } else if (isFree && isDiscribeWeekDay && !hasShiftName){
                return setShiftDetails(currentItem, index);
            } else if (!isFree && !isDiscribeWeekDay) {
                return CompanyClosed();
            } else if (SetAppplicantsLength < Number(anzahl) && !(hasPrio || hasNotice)) {
                if(isFree && hasSetApplicants && !isDiscribeWeekDay) {
                    return ProgessSetApplicantsWithoutPrioNotFilled(index, day, FirstSetApplicant, SecondSetApplicant, setApplicant);
                } else {
                    return ProgessSetApplicantsWithoutPrioEmpty(index, day, setApplicant);
                }
            } else if (SetAppplicantsLength < Number(anzahl) && (hasPrio || hasNotice)) {
                if(isFree && hasSetApplicants && SetApplicants > 0 && !isDiscribeWeekDay) {
                    return ProgessSetApplicantsWithPrioNotFilled(index, day, FirstSetApplicant, SecondSetApplicant, setApplicant);
                }  else {
                    return ProgessSetApplicantsWithPrioEmpty(index, day, setApplicant);
                }
            } else if (SetAppplicantsLength === Number(anzahl) && !(hasPrio || hasNotice)) {
                return ProgessSetApplicantsWithoutPrioFilled(index, day, FirstSetApplicant, SecondSetApplicant, SetApplicants, setApplicant)
            } else if (SetAppplicantsLength === Number(anzahl) && (hasPrio || hasNotice)) {
                return ProgessSetApplicantsWithPrioFilled(index, day, FirstSetApplicant, SecondSetApplicant, SetApplicants, setApplicant);
            } else {
                return Default(index, day, setApplicant);
            }
            {/*if (index === 0 || index === 1 || index === ItemLength - 1 ) {
                return DateOrWeekDayRow(currentItem);
            } else if (!isFree && isDiscribeWeekDay){
                return editShiftDetails(currentItem, index, anzahl, editShift);
            } else if (isFree && isDiscribeWeekDay && !hasShiftName){
                return setShiftDetails(currentItem, index);
            } else if (isFree && hasSetApplicants && SetAppplicantsLength === 2 && !isDiscribeWeekDay &&  (hasPrio || hasNotice)) {
                return TwoSetApplicantsWithPrio(index, day, FirstSetApplicant, SecondSetApplicant, setApplicant);
            }  else if (isFree && hasSetApplicants && SetAppplicantsLength === 2 && !isDiscribeWeekDay) {
                return TwoSetApplicantsWithoutPrio(index, day, FirstSetApplicant, SecondSetApplicant, setApplicant);
            } else if (isFree && hasSetApplicants && SetAppplicantsLength > 1 && !isDiscribeWeekDay &&  (hasPrio || hasNotice)) {
                return MultipleSetApplicantsWithPrio(index, day, FirstSetApplicant, SetAppplicantsLength, setApplicant);
            }  else if (isFree && hasSetApplicants && SetAppplicantsLength > 1 && !isDiscribeWeekDay) {
                return MultiSetApplicantsWithoutPrio(index, day, FirstSetApplicant, SetAppplicantsLength, setApplicant);
            } else if (!isFree && !isDiscribeWeekDay) {
                return CompanyClosed();
            } else if (isFree && hasSetApplicants && SetAppplicantsLength === 1 && !isDiscribeWeekDay &&  (hasPrio || hasNotice)) {
                return SingleSetApplicantWithPrio(index, day, FirstSetApplicant, setApplicant, setPrio);
            }  else if (isFree && hasSetApplicants && SetAppplicantsLength === 1 && !isDiscribeWeekDay) {
                return SingleSetApplicantWithoutPrio(index, day, FirstSetApplicant, setApplicant);
            } else if (isFree && !hasSetApplicants && !isDiscribeWeekDay &&  (hasPrio || hasNotice)) {
                return ZeroApplicantsWithPrio(index, day, setApplicant);
            } else if (isFree && !hasSetApplicants && !isDiscribeWeekDay) {
                return ZeroApplicants(index, day, setApplicant);
            } else {
                return Default(index, day, setPrio);
            }*/}
        } else if (type === "Veröffentlicht") {
            if (index === 0 || index === 1 || index === ItemLength - 1 ) {
                return DateOrWeekDayRow(currentItem);
            } else if (!isFree && isDiscribeWeekDay){
                return editShiftDetails(currentItem, index, anzahl, editShift);
            } else if (isFree && isDiscribeWeekDay && !hasShiftName){
                return setShiftDetails(currentItem, index);
            } else if (isFree && hasSetApplicants && SetAppplicantsLength === 2 && !isDiscribeWeekDay && (hasPrio || hasNotice)) {
                return TwoSetApplicantsWithPrio(index, day, FirstSetApplicant, SecondSetApplicant, setApplicant, prio);
            }  else if (isFree && hasSetApplicants && SetAppplicantsLength === 2 && !isDiscribeWeekDay) {
                return TwoSetApplicantsWithoutPrio(index, day, FirstSetApplicant, SecondSetApplicant, setApplicant);
            } else if (isFree && hasSetApplicants && SetAppplicantsLength > 1 && !isDiscribeWeekDay && (hasPrio || hasNotice)) {
                return MultipleSetApplicantsWithPrio(index, day, FirstSetApplicant, SetAppplicantsLength, setApplicant, prio);
            }  else if (isFree && hasSetApplicants && SetAppplicantsLength > 1 && !isDiscribeWeekDay) {
                return MultiSetApplicantsWithoutPrio(index, day, FirstSetApplicant, SetAppplicantsLength, setApplicant);
            } else if (!isFree && !isDiscribeWeekDay) {
                return CompanyClosed();
            } else if (isFree && hasSetApplicants && SetAppplicantsLength === 1 && !isDiscribeWeekDay && (hasPrio || hasNotice)) {
                return SingleSetApplicantWithPrio(index, day, FirstSetApplicant, setApplicant, prio);
            }  else if (isFree && hasSetApplicants && SetAppplicantsLength === 1 && !isDiscribeWeekDay) {
                return SingleSetApplicantWithoutPrio(index, day, FirstSetApplicant, setApplicant);
            }  else if (isFree && !hasSetApplicants && !isDiscribeWeekDay && (hasPrio || hasNotice)) {
                return ZeroApplicantsWithPrio(index, day, setApplicant, prio);
            } else if (isFree && !hasSetApplicants && !isDiscribeWeekDay) {
                return ZeroApplicants(index, day, setApplicant);
            } else {
                return Default(index, day, setApplicant);
            }
        }
    }

}

export default ShiftplanElement;