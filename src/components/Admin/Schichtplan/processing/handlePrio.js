import store from "../../../../store";

export const setPrioShift = ({Plans, ShiftSlot, currentShiftPlan, daysIsActive}) => {
    let plans = [...Plans];
    let row = ShiftSlot.row
    let col = ShiftSlot.col
    let currentPlan = plans[currentShiftPlan]
    let hasDaysIsActive = daysIsActive !== null;
    currentPlan.plan[row][col]["prio"] = hasDaysIsActive && "qualifikation" in daysIsActive ? daysIsActive.qualifikation : !1;
    console.log(currentPlan.plan[row][col])
    store.dispatch({type: "All/setPlans", payload: plans})
    store.dispatch({type: "ResetShiftSlot"})
  }
  
export const setNewPrioShift = ({NewShiftPlan, ShiftSlot, daysIsActive}) => {
    let shiftplan = NewShiftPlan;
    let row = ShiftSlot.row
    let col = ShiftSlot.col
    daysIsActive.Prioschicht ? (shiftplan[row][col]["prio"] = !0) : (shiftplan[row][col]["prio"] = !1);
    store.dispatch({type: "SetNewShiftPlan", payload: shiftplan})
  }