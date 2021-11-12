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
import ShiftplanReducer from "./Shiftplan";
import MetaReducer from "./Meta";
import errorMessagesReducer from "./ErrorMessages"
import infoSidebarReducer from "./InfoModal";

const rootReducer = combineReducers({
    modal: modalReducer,
    singleState: singleStateReducer,
    DB: DBReducer,
    user: userReducer,
    currentShiftPlan: currentShiftPlanReducer,
    date: datePickerReducer,
    loadings: loadingsReducer,
    visibility: visibilityReducer,
    newShiftPlan: newShiftPlanReducer,
    Shiftplan: ShiftplanReducer,
    shiftSlot: ShiftSlotReducer,
    Meta: MetaReducer,
    ErrorMessages: errorMessagesReducer,
    InfoSidebar: infoSidebarReducer,
})

export default rootReducer;
