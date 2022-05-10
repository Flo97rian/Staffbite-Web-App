import store from "../../../../store";

const setApplicantsToShiftPlan = ({Applicants, Plans, currentShiftPlan, ShiftSlot}) => {
    const ShiftSlotTarget = Plans[currentShiftPlan].plan[ShiftSlot.row][ShiftSlot.col]
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
    plan[currentShiftPlan].plan[ShiftSlot.row][ShiftSlot.col] = updatedShiftSlot
    store.dispatch({type: "All/updateShiftPlanInDB", payload: plan})
  }