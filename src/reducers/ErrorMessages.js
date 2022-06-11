import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  InvalidReportInput: !1,
  missingDate: false,
  MissingShiftDetails: !1,
  EmailNotSend: !1,
  EmailIsSend: !1,
  missingShiftplanName: false,
  missingReportFilter: false,
  missingReportDate: false,
  missingNewEmployeeName: false,
  missingNewEmployeeEmail: false,
  missingNewEmployeePosition: false,
  authExpiredCodeException: false,
  authCodeMismatchException: false,
  authNotAuthorizedException: false,
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
    },
    settingMissingDate(state) {
      state.missingDate = true;
    },
    settingMissingShiftplanName(state) {
      state.missingShiftplanName = true;
    },
    settingMissingReportFilter(state) {
      state.missingReportFilter = true;
    },
    settingMissingReportDate(state) {
      state.missingReportDate = true;
    },
    settingMissingNewEmployeeName(state) {
      state.missingNewEmployeeName = true;
    },
    settingMissingNewEmployeeEmail(state) {
      state.missingNewEmployeeEmail = true;
    },
    settingMissingNewEmployeePosition(state) {
      state.missingNewEmployeePosition = true;
    },
    resettingErrorMessages(state) {
      state.InvalidReportInput = initialState.InvalidReportInput;
      state.MissingShiftDetails = initialState.MissingShiftDetails;
      state.EmailNotSend = initialState.EmailNotSend;
      state.EmailIsSend = initialState.EmailIsSend;
      state.missingDate = initialState.missingDate;
      state.missingShiftplanName = initialState.missingShiftplanName;
      state.missingReportFilter = initialState.missingReportFilter;
      state.missingReportDate = initialState.missingReportDate;
      state.missingNewEmployeeName = initialState.missingNewEmployeeName;
      state.missingNewEmployeeEmail = initialState.missingNewEmployeeEmail;
      state.missingNewEmployeePosition = initialState.missingNewEmployeePosition;
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
  resettingEmailIsSend,
  settingMissingDate,
  settingMissingShiftplanName,
  settingMissingReportDate,
  settingMissingReportFilter,
  settingMissingNewEmployeeName,
  settingMissingNewEmployeeEmail,
  settingMissingNewEmployeePosition,
  resettingErrorMessages
} = errorMessageSlice.actions;

export default errorMessageSlice.reducer;