import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  start: "",
  end: "",
}
const datePickerSlice = createSlice({
  name: "datePicker",
  initialState,
  reducers: {
    settingStart(state, action) {
      state.start = action.payload;
    },
    settingEnd(state, action) {
      state.end = action.payload;
    },
    resettingStart(state, action) {
      state.start = initialState.start;
    },
    resettingEnd(state, action) {
      state.end = initialState.end;
    },
    resettingDatePicker(state, action) {
      state = initialState;
    }
  }
})

export const {
  settingStart,
  settingEnd,
  resettingStart,
  resettingEnd,
  resettingDatePicker
} = datePickerSlice.actions;

export default datePickerSlice.reducer;