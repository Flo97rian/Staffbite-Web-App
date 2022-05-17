import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  InvalidReportInput: !1,
  MissingShiftDetails: !1,
  EmailNotSend: !1,
  EmailIsSend: !1
}

const errorMessageSlice = createSlice({
  name: "errorMessage",
  initialState,
  reducers: {
    settingInvalidReportInput(state, action) {
      state.InvalidReportInput = true;
    },
    resettingInvalidReportInput(state, action) {
      state.InvalidReportInput = false;
    },
    settingMissingShiftDetails(state, action) {
      state.MissingShiftDetails = true;
    },
    resettingMissingShiftDetails(state, action) {
      state.MissingShiftDetails = false;
    },
    settingEmailNotSend(state, action) {
      state.EmailNotSend = true;
    },
    resettingEmailNotSend(state, action) {
      state.EmailNotSend = false;
    },
    settingEmailIsSend(state, action) {
      state.EmailIsSend = true;
    },
    resettingEmailIsSend(state, action) {
      state.EmailIsSend = false;
    }
  }
})

export const {
  settingMissingShiftDetails,
  resettingMissingShiftDetails,
  settingInvalidReportInput,
  resettingInvalidReportInput,
  settingEmailNotSend,
  resettingEmailNotSend,
  settingEmailIsSend,
  resettingEmailIsSend
} = errorMessageSlice.actions;

export default errorMessageSlice.reducer;