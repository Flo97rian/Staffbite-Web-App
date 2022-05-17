import store from "../../../../store";
import { useSelector, useDispatch } from "react-redux";
import { settingShiftplans } from "../reducers/DB";

const setApplicantsToShiftPlan = ({Applicants, Plans, currentShiftPlan, ShiftSlot}) => {
    const index = store.get(state => state.shiftSlot.index);
    const day = store.get(state => state.shiftSlot.day);
    const ShiftSlotTarget = Plans[currentShiftPlan].plan[index][day]
    Applicants.forEach((element, index) => {
      element.forEach(employee => {
        if (index === 0) {ShiftSlotTarget.applicants[employee.id.substring(1)] = employee.content}
        else if (index === 1) {ShiftSlotTarget.setValidApplicants[employee.id.substring(1)] = employee.content}
        else if (index === 2) {ShiftSlotTarget.setApplicants[employee.id.substring(1)] = employee.content}
        else {return null}
      })
    });
    return ShiftSlotTarget
  }
  export const setApplicant = ({Applicants, Plans, currentShiftPlan, ShiftSlot}) => {
    const updatedShiftSlot = setApplicantsToShiftPlan({Applicants, Plans, currentShiftPlan, ShiftSlot})
    const plan = [...Plans]
    const index = store.get(state => state.shiftSlot.index);
    const day = store.get(state => state.shiftSlot.day);
    plan[currentShiftPlan].plan[index][day] = updatedShiftSlot
    store.dispatch(settingShiftplans(plan));
  }