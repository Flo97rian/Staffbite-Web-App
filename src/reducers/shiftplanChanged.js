import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shiftplanChanged: false,
}

const shiftplanChangedSlice = createSlice({
  name: "shiftplanChanged",
  initialState,
  reducers:{
    settingShiftplanChanged(state) {
      state.shiftplanChanged = true;
    },
    resettingShiftplanChanged(state) {
      state.shiftplanChanged = false
    }
  }
})

export const {
  settingShiftplanChanged,
  resettingShiftplanChanged
} = shiftplanChangedSlice.actions;

export default shiftplanChangedSlice.reducer;