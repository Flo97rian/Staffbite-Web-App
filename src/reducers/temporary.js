import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    index: 0,
    day: "",
    employeeID: "",
    deleteShiftplanId: "",
    shiftplanId: "",
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
        }
    }
})

export const {
    settingTemporaryEmployeeID,
    resettingTemporaryEmployeeID,
    settingDeleteShiftplanID,
    resettingDeleteShiftplanID,
    settingRemindShiftplanID,
    resettingRemindShiftplanID
} = temporarySlice.actions;

export default temporarySlice.reducer;