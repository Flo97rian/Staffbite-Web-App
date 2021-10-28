// core components
import { 
    DateOrWeekDayRow,
    MultiSetApplicantsWithPrio,
    MultiSetApplicantsWithoutPrio,
    SingleSetApplicantWithPrio,
    SingleSetApplicantWithoutPrio,
    TwoSetApplicantsWithPrio,
    TwoSetApplicantsWithoutPrio,
    ZeroApplicants,
    CompanyClosed,
    setShiftDetails,
    editShiftDetails,
    Default
 } from "../../../Application/functionalComponents/SchichtplanElements";
import store from "../../../../store";

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
    let ItemLength = props.ItemLength
    var index = props.index;
    var col = props.col;
    let currentItem = props.currentItem[col];
    let isObj = typeof currentItem === "object";
    const isFree = currentItem.frei;
    let anzahl = !1;
    if (typeof props.anzahl === "object") {
        if ("anzahl" in props.anzahl) {
            anzahl = props.anzahl.anzahl
        }
    }
    const hasShiftName = isObj && "ShiftName" in currentItem ? !0 : !1;
    const hasApplicants =  isObj && "setApplicants" in currentItem && Object.keys(currentItem["setApplicants"]).length > 0 ? !0 : !1;
    const ApplicantsLength = hasApplicants ? Object.keys(currentItem.setApplicants).length : 0;
    const hasPrio = isObj && "prio" in currentItem && currentItem.prio !== !1 ? !0 : !1;
    const FirstApplicant = hasApplicants ? currentItem.setApplicants[Object.keys(currentItem.setApplicants)[0]] : !1;
    const SecondApplicant = hasApplicants && Object.keys(currentItem["setApplicants"]).length === 2 ? currentItem.setApplicants[Object.keys(currentItem.setApplicants)[1]] : !1;
    const isDiscribeWeekDay = (col === "Wochentag");
    if (index === 0 || index === 1 || index === ItemLength - 1 ) {
        return DateOrWeekDayRow(currentItem);
    } else if (!isFree && isDiscribeWeekDay){
        return editShiftDetails(currentItem, index, anzahl, editShift);
    } else if (isFree && isDiscribeWeekDay && !hasShiftName){
        return setShiftDetails(currentItem, index);
    } else if (isFree && hasApplicants && ApplicantsLength === 2 && !isDiscribeWeekDay && hasPrio) {
        return TwoSetApplicantsWithPrio(index, col, FirstApplicant, SecondApplicant, setApplicant);
    }  else if (isFree && hasApplicants && ApplicantsLength === 2 && !isDiscribeWeekDay) {
        return TwoSetApplicantsWithoutPrio(index, col, FirstApplicant, SecondApplicant, setApplicant);
    } else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay && hasPrio) {
        return MultiSetApplicantsWithPrio(currentItem, index, col, ApplicantsLength, FirstApplicant, setApplicant);
    }  else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay) {
        return MultiSetApplicantsWithoutPrio(currentItem, index, col, ApplicantsLength, FirstApplicant, setApplicant);
    } else if (!isFree && !isDiscribeWeekDay) {
        return CompanyClosed();
    } else if (isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay) {
        return SingleSetApplicantWithPrio(index, col, FirstApplicant, setApplicant);
    }  else if (isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay) {
        return SingleSetApplicantWithoutPrio(index, col, FirstApplicant, setApplicant);
    }  else if (isFree && !hasApplicants && !isDiscribeWeekDay) {
        return ZeroApplicants(index, col, setApplicant);
    } else {
        return Default();
    }
};
export default SchichtplanElementVeröffentlicht;


