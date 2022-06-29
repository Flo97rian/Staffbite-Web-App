import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    index: 0,
    day: "",
    employeeID: "",
    deleteShiftplanId: "",
    shiftplanId: "",
    eventId: "",
    calendarFilter: false,
    calenderWeekIndicator: false,
    changeShiftDayOrSelectedDays: false,
    updateType : false,
}

const temporarySlice = createSlice({
    name: "temporaryValues",
    initialState,
    reducers: {
        settingTemporaryEmployeeID(state, action) {
            state.employeeID = action.payload;
        },
        resettingTemporaryEmployeeID(state, action) {
            state.employeeID = initialState.employeeID
        },
        settingDeleteShiftplanID(state, action) {
            state.deleteShiftplanId = action.payload;
        },
        resettingDeleteShiftplanID(state, action) {
            state.deleteShiftplanId = initialState.deleteShiftplanId;
        },
        settingRemindShiftplanID(state, action) {
            state.shiftplanId = action.payload;
        },
        resettingRemindShiftplanID(state) {
            state.shiftplanId = initialState.shiftplanId;
        },
        settingTemporaryEventId(state, action) {
            state.eventId = action.payload;
        },
        resettingTemporaryEventId(state) {
            state.eventId = initialState.eventId;
        },
        settingCalendarFilter(state, action) {
            state.calendarFilter = action.payload;
        },
        resettingCalendarFilter(state) {
            state.calendarFilter = false;
        },
        settingTemporaryCalendarWeekIndicator(state, action) {
            state.calenderWeekIndicator = action.payload;
        },
        resettingTemporaryCalendarWeekIndicator(state, action) {
            state.calenderWeekIndicator = false;
        },
        settingChangeDayOrSelectedDays(state) {
            state.changeShiftDayOrSelectedDays = true;
        },
        resettingChangeDayOrSelectedDays(state) {
            state.changeShiftDayOrSelectedDays = false;
        },
        settingUpdateType(state, action) {
            state.updateType = action.payload;
        },
        resettingUpdateType(state) {
            state.updateType = false;
        }
    }
})

export const {
    settingTemporaryEmployeeID,
    resettingTemporaryEmployeeID,
    settingDeleteShiftplanID,
    resettingDeleteShiftplanID,
    settingRemindShiftplanID,
    resettingRemindShiftplanID,
    settingTemporaryEventId,
    resettingTemporaryEventId,
    settingCalendarFilter,
    resettingCalendarFilter,
    settingTemporaryCalendarWeekIndicator,
    resettingTemporaryCalendarWeekIndicator,
    settingChangeDayOrSelectedDays,
    resettingChangeDayOrSelectedDays,
    settingUpdateType,
    resettingUpdateType
} = temporarySlice.actions;

export default temporarySlice.reducer;