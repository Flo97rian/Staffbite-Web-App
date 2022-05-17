import store from "../../../../store"

import { thunkUpdateShiftPlan } from "../../../../store/middleware/UpdateShiftPlan"
import { resettingModal } from "../reducers/modal"
export const setApplicantsInShiftPlan = ({Plans, currentShiftPlan, ShiftSlot, updateApplicant, modal}) => {
    const PlansCopy = addApllicantsToShiftPlan({Plans, currentShiftPlan, ShiftSlot, updateApplicant})
    store.dispatch(thunkUpdateShiftPlan(PlansCopy, currentShiftPlan))
    store.dispatch(resettingModal())
  }

  const addApllicantsToShiftPlan = ({Plans, currentShiftPlan, ShiftSlot, updateApplicant}) => {
    const PlansCopy = [...Plans]
    const index = store.get(state => state.shiftSlot.index);
    const day = store.get(state => state.shiftSlot.day);
    PlansCopy[currentShiftPlan].plan[index][day].setApplicants = {}
    updateApplicant.current.forEach( applicant => {
      if (applicant.id.length !== 1) {
      PlansCopy[currentShiftPlan].plan[index][day].setApplicants[applicant.id.substring(1)] = applicant.content
    }})
    return PlansCopy
  }