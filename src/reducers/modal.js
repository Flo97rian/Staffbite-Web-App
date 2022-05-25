import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    settingModal(state, action) {
      state[action.payload] = true;
    },
    resettingModal(state) {  
    for (const [key, value] of Object.entries(state)) {
    state[key] = false;
    }
    state = initialState;
    }
  }
})

export const {
  settingModal,
  resettingModal
} = modalSlice.actions;

export default modalSlice.reducer;