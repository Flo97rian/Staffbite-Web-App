import { createSlice } from "@reduxjs/toolkit";
  const initialState = {
    currentShiftplanIndex: !1
  }
  const currentShiftplanSlice = createSlice({
    name: "currentShiftplanIndex",
    initialState,
    reducers: {
      settingCurrentShiftplanIndex(state, action) {
        state.currentShiftplanIndex = action.payload;
      },
      resettingCurrentShiftplanIndex(state, action) {
        state.currentShiftplanIndex = !1;
      }
    }
  })

  export const {
    settingCurrentShiftplanIndex,
    resettingCurrentShiftplanIndex,
  } = currentShiftplanSlice.actions;

  export default currentShiftplanSlice.reducer;