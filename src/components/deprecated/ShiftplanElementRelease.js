import { 
    DateOrWeekDayRow,
    MultipleApplicants,
    TwoApplicants,
    CompanyClosedEntwurf,
    SingleApplicant,
    MultipleApplicantsWithPrio,
    TwoApplicantsWithPrio,
    SingleApplicantWithPrio,
    DefaultWithPrio,
    setShiftDetailsErr,
    editShiftDetails,
    Default
 } from "./ShiftplanElements";

import _ from "lodash";
import store from "../store";

const ShiftplanElementRelease = (props) => {

    function setPrio(index, col, prio) {
        store.dispatch({ type: "OPEN", payload: "prioIsActive" });
        store.dispatch({ type: "setShiftSlot", payload: { row: index, col: col, prio: prio } });
    }
    function editShift(index) {
        store.dispatch({ type: "OPEN", payload: "editShiftDescription" });
        store.dispatch({ type: "setShiftSlot", payload: { row: index } });
    }
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
}
export default ShiftplanElementRelease;