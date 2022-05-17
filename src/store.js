import { configureStore } from '@reduxjs/toolkit';
import modalReducer from "./reducers/modal";
import currentShiftPlanReducer from "./reducers/currentShiftPlan";
import datePickerReducer from "./reducers/DatePicker";
import DBReducer from "./reducers/DB";
import singleStateReducer from "./reducers/state";
import loadingsReducer from "./reducers/loadings";
import userReducer from "./reducers/user";
import visibilityReducer from "./reducers/visibility";
import newShiftPlanReducer from "./reducers/NewShiftPlan";
import ShiftSlotReducer from "./reducers/ShiftSlot";
import ShiftplanReducer from "./reducers/Shiftplan";
import MetaReducer from "./reducers/Meta";
import errorMessagesReducer from "./reducers/ErrorMessages"
import infoSidebarReducer from "./reducers/InfoModal";
import shiftplanChangedReducer from "./reducers/shiftplanChanged";
import shiftDetailsReducer from './reducers/ShiftDetails';
import userInputReducer from './reducers/userInput';

const store = configureStore({
    reducer: {
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
    ShiftplanChanged: shiftplanChangedReducer,
    shiftDetails: shiftDetailsReducer,
    userInput: userInputReducer
    }
});

export default store;
  