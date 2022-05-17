import { configureStore } from '@reduxjs/toolkit';
import modalReducer from "./reducers/modal";
import currentShiftPlanReducer from "./reducers/currentShiftPlan";
import datePickerReducer from "./reducers/DatePicker";
import DBReducer from "./reducers/DB";
import newShiftPlanReducer from "./reducers/NewShiftPlan";
import ShiftSlotReducer from "./reducers/ShiftSlot";
import ShiftplanReducer from "./reducers/Shiftplan";
import MetaReducer from "./reducers/Meta";
import errorMessagesReducer from "./reducers/ErrorMessages"
import infoSidebarReducer from "./reducers/InfoModal";
import shiftplanChangedReducer from "./reducers/shiftplanChanged";
import userInputReducer from './reducers/userInput';
import displayReducer from "./reducers/display"
import temporaryReducer from './reducers/temporary'

const store = configureStore({
    reducer: {
    modal: modalReducer,
    DB: DBReducer,
    currentShiftPlan: currentShiftPlanReducer,
    date: datePickerReducer,
    newShiftPlan: newShiftPlanReducer,
    Shiftplan: ShiftplanReducer,
    shiftSlot: ShiftSlotReducer,
    Meta: MetaReducer,
    ErrorMessages: errorMessagesReducer,
    InfoSidebar: infoSidebarReducer,
    ShiftplanChanged: shiftplanChangedReducer,
    userInput: userInputReducer,
    display: displayReducer,
    temporary: temporaryReducer
    }
});

export default store;
  