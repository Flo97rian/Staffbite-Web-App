import store from "../../../../store";

export const setPrioShift = (Plans, ShiftSlot, currentShiftPlan, userInput) => {
    let plans = [...Plans];
    let row = ShiftSlot.row
    let col = ShiftSlot.col
    let currentPlan = plans[currentShiftPlan]
    let hasuserInput = userInput !== null;
    currentPlan.plan[row][col]["prio"] = hasuserInput && "qualifikation" in userInput ? userInput.qualifikation : !1;
    store.dispatch({type: "All/setPlans", payload: plans})
    store.dispatch({type: "ResetShiftSlot"})
  }
  
export const setNewPrioShift = (NewShiftPlan, ShiftSlot, userInput) => {
    let shiftplan = NewShiftPlan;
    let row = ShiftSlot.row
    let col = ShiftSlot.col
    let hasuserInput = userInput !== null;
    shiftplan.plan[row][col]["prio"] = hasuserInput && "qualifikation" in userInput ? userInput.qualifikation : !1;
    store.dispatch({type: "setNewShiftplan", payload: shiftplan})
  }