import store from "../../../../store";

export const setPrioShift = ({Plans, ShiftSlot, currentShiftPlan, daysIsActive}) => {
    let plans = [...Plans];
    let row = ShiftSlot.row
    let col = ShiftSlot.col
    let currentPlan = plans[currentShiftPlan]
    daysIsActive.Prioschicht ? (currentPlan.plan[row][col]["prio"] = !0) : (currentPlan.plan[row][col]["prio"] = !1);
    store.dispatch({type: "All/setPlans", payload: plans})
  }
  
export const setNewPrioShift = ({NewShiftPlan, ShiftSlot, daysIsActive}) => {
    let shiftplan = NewShiftPlan;
    let row = ShiftSlot.row
    let col = ShiftSlot.col
    daysIsActive.Prioschicht ? (shiftplan[row][col]["prio"] = !0) : (shiftplan[row][col]["prio"] = !1);
    store.dispatch({type: "SetNewShiftPlan", payload: shiftplan})
  }