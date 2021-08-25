import modalReducer from "./modal";
import currentShiftPlanReducer from "./currentShiftPlan";
import datePickerReducer from "./DatePicker";
import DBReducer from "./DB";
import singleStateReducer from "./state";
import loadingsReducer from "./loadings";
import { combineReducers } from "redux";
import userReducer from "./user";
import visibilityReducer from "./visibility";
import newShiftPlanReducer from "./NewShiftPlan";
import ShiftSlotReducer from "./ShiftSlot";


const rootReducer = combineReducers({
    modal: modalReducer,
    singleState: singleStateReducer,
    DB: DBReducer,
    user: userReducer,
    currentShiftPlan: currentShiftPlanReducer,
    date: datePickerReducer,
    laodings: loadingsReducer,
    visibility: visibilityReducer,
    newShiftPlan: newShiftPlanReducer,
    shiftSlot: ShiftSlotReducer
})

export default rootReducer;
