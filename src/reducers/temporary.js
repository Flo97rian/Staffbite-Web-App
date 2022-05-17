import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    index: 0,
    day: "",
    employeeID: "",
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
        }
    }
})

export const {
    settingTemporaryEmployeeID,
    resettingTemporaryEmployeeID,
} = temporarySlice.actions;

export default temporarySlice.reducer;