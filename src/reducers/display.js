import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    displayShiftplan: false,
    displayNewShiftplan: false,
}

const displaySlice = createSlice({
    name: "display",
    initialState,
    reducers: {
        settingDisplayShiftplan(state) {
            state.displayShiftplan = true;
        },
        resettingDisplayShiftplan(state) {
            state.displayShiftplan = false;
        },
        settingDisplayNewShiftplan(state) {
            state.displayNewShiftplan = true;
        },
        resettingDisplayNewShiftplan(state) {
            state.displayNewShiftplan = false;
        }
    }
})

export const {
    settingDisplayShiftplan,
    resettingDisplayShiftplan,
    settingDisplayNewShiftplan,
    resettingDisplayNewShiftplan
} = displaySlice.actions;

export default displaySlice.reducer;