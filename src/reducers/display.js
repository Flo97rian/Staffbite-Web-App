import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    displayShiftplan: false,
    displayNewShiftplan: false,
    displayBasicLayout: true,
    displayCalendarLayout: false,
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
        },
        settingBasicLayout(state) {
            state.displayBasicLayout = true;
        },
        resettingBasicLayout(state) {
            state.displayBasicLayout = false;
        },
        settingCalendarLayout(state) {
            state.displayCalendarLayout = true;
        },
        resettingCalendarLayout(state) {
            state.displayCalendarLayout = false;
        },
        switchToCalendarLayout(state) {
            state.displayBasicLayout = false;
            state.displayCalendarLayout = true;
        },
        switchToBasicLayout(state) {
            state.displayBasicLayout = true;
            state.displayCalendarLayout = false;
        }
    }
})

export const {
    settingDisplayShiftplan,
    resettingDisplayShiftplan,
    settingDisplayNewShiftplan,
    resettingDisplayNewShiftplan,
    settingBasicLayout,
    settingCalendarLayout,
    resettingBasicLayout,
    resettingCalendarLayout,
    switchToBasicLayout,
    switchToCalendarLayout
} = displaySlice.actions;

export default displaySlice.reducer;