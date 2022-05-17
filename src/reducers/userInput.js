import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    positions: [],
    shiftName: "Name",
    shiftPosition: "Name",
    shiftStart: "00:00",
    shiftEnd: "24:00",
    numberOfEmployees: 0,
    minQualification: !1,
    shiftsPerDay: 1,
    shiftNotice: "",
    shiftIsDayly: !1
}

const userInputSlice = createSlice({
    name: "userInput",
    initialState,
    reducers: {
        settingShiftName(state, action) {
            state.shiftName = action.payload;
        },
        settingShiftStart(state, action) {
            state.shiftStart = action.payload
        },
        settingShiftEnd(state, action) {
            state.shiftEnd = action.payload
        },
        settingShiftPosition(state, action) {
            state.shiftPosition = action.payload
        },
        settingShiftMinQualification(state, action) {
            state.minQualification = action.payload
        },
        settingShiftNumberOfEmployees(state, action) {
            state.numberOfEmployees = action.payload
        },
        settingShiftsPerDay(state, action) {
            state.shiftsPerDay = action.payload
        },
        settingShiftNotice(state, action) {
            state.shiftNotice = action.payload
        },
        settingShiftIsDayly(state, action) {
            state.shiftIsDayly = action.payload
        },
        settingCompanyPositions(state, action) {
            state.positions = action.payload
        },
        resettingUserInput(state) {
            state = initialState;
        }
    }
});

export const {
    settingShiftName,
    settingShiftStart,
    settingShiftEnd,
    settingShiftPosition,
    settingShiftMinQualification,
    settingShiftNumberOfEmployees,
    settingShiftsPerDay,
    settingShiftNotice,
    settingShiftIsDayly,
    settingCompanyPositions,
    resettingUserInput
} = userInputSlice.actions;
  
export default userInputSlice.reducer