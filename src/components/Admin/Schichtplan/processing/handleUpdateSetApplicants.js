import store from "../../../../store"

import { thunkUpdateShiftPlan } from "../../../../store/middleware/UpdateShiftPlan"
export const setApplicantsInShiftPlan = ({Plans, currentShiftPlan, ShiftSlot, updateApplicant, modal}) => {
    const PlansCopy = addApllicantsToShiftPlan({Plans, currentShiftPlan, ShiftSlot, updateApplicant})
    store.dispatch(thunkUpdateShiftPlan(PlansCopy, currentShiftPlan))
    store.dispatch({type: "CLOSE", payload: modal})
  }

  const addApllicantsToShiftPlan = ({Plans, currentShiftPlan, ShiftSlot, updateApplicant}) => {
    const PlansCopy = [...Plans]
    PlansCopy[currentShiftPlan].plan[ShiftSlot.row][ShiftSlot.col].setApplicants = {}
    updateApplicant.current.forEach( applicant => {
      if (applicant.id !== "0") {
      PlansCopy[currentShiftPlan].plan[ShiftSlot.row][ShiftSlot.col].setApplicants[applicant.id.substring(1)] = applicant.content
    }})
    return PlansCopy
  }