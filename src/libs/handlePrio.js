import store from "../../../../store";
import { settingShiftplans } from "../reducers/DB";
import { settingNewShiftplan } from "../reducers/NewShiftPlan";
import { resettingShiftSlot } from "../reducers/ShiftSlot";

export const setPrioShift = (Plans, ShiftSlot, currentShiftPlan, userInput) => {
    const index = store.get(state => state.shiftSlot.index);
    const day = store.get(state => state.shiftSlot.day);
    let plans = [...Plans];
    let currentPlan = plans[currentShiftPlan]
    let hasuserInput = userInput !== null;
    currentPlan.plan[index][day]["prio"] = hasuserInput && "qualifikation" in userInput ? userInput.qualifikation : !1;
    store.dispatch(settingShiftplans(plans));
    store.dispatch(resettingShiftSlot())
  }
  
export const setNewPrioShift = (NewShiftPlan, ShiftSlot, userInput) => {
    let shiftplan = NewShiftPlan;
    const index = store.get(state => state.shiftSlot.index);
    const day = store.get(state => state.shiftSlot.day);
    let hasuserInput = userInput !== null;
    shiftplan.plan[index][day]["prio"] = hasuserInput && "qualifikation" in userInput ? userInput.qualifikation : !1;
    store.dispatch(settingNewShiftplan(shiftplan));
  }