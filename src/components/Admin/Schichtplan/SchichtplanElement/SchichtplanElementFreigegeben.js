import { 
    DateOrWeekDayRow,
    MultipleApplicants,
    TwoApplicants,
    CompanyClosed,
    SingleApplicant,
    MultipleApplicantsWithPrio,
    TwoApplicantsWithPrio,
    SingleApplicantWithPrio,
    DefaultWithPrio,
    setShiftDetailsErr,
    editShiftDetails,
    Default
 } from "../../../Application/functionalComponents/SchichtplanElements";

import { getIsObject, setPrioValue, getSecondApplicant, getCompanyIsOpen, getAnzahl, getHasApplicants, getApplicantsLength, getHasPrio, getFirstApplicant, getHasShiftName} from "../../../Application/functionalComponents/ElementFunctions";
import store from "../../../../store";

const SchichtplanElementFreigegeben = (props) => {
    function editShift(index) {
        store.dispatch({ type: "OPEN", payload: index });
        store.dispatch({ type: "setShiftSlot", payload: { row: index } });
    }
    let ItemLength = props.ItemLength;
    let index = props.index;
    let col = props.col;
    let currentItem = props.currentItem[col];
    let isFree;
    let hasPrio;
    let anzahl;
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
        hasApplicants =  getHasApplicants(currentItem, "applicants");
        ApplicantsLength = getApplicantsLength(currentItem, "applicants")
        hasPrio = getHasPrio(currentItem);
        prio = setPrioValue(currentItem);
        FirstApplicant = getFirstApplicant(currentItem, "applicants")
        SecondApplicant = getSecondApplicant(currentItem, "applicants")
        hasShiftName = getHasShiftName(currentItem);
    }
    if (index === 0 || index === 1 || index === ItemLength - 1 ) {
        return DateOrWeekDayRow(currentItem);
    } else if (!isFree && isDiscribeWeekDay){
        return editShiftDetails(currentItem, index, anzahl, editShift);
    } else if (isFree && isDiscribeWeekDay && !hasShiftName){
        return setShiftDetailsErr();
    } else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay && hasPrio) {
        return MultipleApplicantsWithPrio(ApplicantsLength, FirstApplicant, prio);
    }   else if (isFree && hasApplicants && ApplicantsLength === 2 && !isDiscribeWeekDay) {
        return TwoApplicants(FirstApplicant, SecondApplicant);
    }  else if (isFree && hasApplicants && ApplicantsLength > 1 && !isDiscribeWeekDay) {
        return MultipleApplicants(ApplicantsLength, FirstApplicant);
    } else if (!isFree && !isDiscribeWeekDay) {
        return CompanyClosed();
    } else if (isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay && hasPrio) {
        return SingleApplicantWithPrio(FirstApplicant, prio);
    }  else if (isFree && hasApplicants && ApplicantsLength === 1 && !isDiscribeWeekDay) {
        return SingleApplicant(FirstApplicant);
    } else if (hasPrio) {
        return DefaultWithPrio(prio);
    }  else {
        return Default();
    }
}
export default SchichtplanElementFreigegeben;