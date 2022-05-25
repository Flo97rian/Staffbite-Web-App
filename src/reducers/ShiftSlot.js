import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  index: 0,
  day: "",
}

const ShiftSlotSlice = createSlice({
  name: "shiftSlot",
  initialState,
  reducers: {
    settingShiftSlot(state, action) {
      state.index = action.payload.index;
      state.day = action.payload.day;
    },
    resettingShiftSlot(state, action) {
      state = initialState
    }
  }
})

export const {
  settingShiftSlot,
  resettingShiftSlot
} = ShiftSlotSlice.actions

export default ShiftSlotSlice.reducer;