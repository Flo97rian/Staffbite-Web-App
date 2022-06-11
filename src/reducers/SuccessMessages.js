import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reportInProgress: false,
  employeeCreated: false,
  emailSend: false,
  shiftplanReleased: false,
  shiftplanPublished: false,
  shiftplanFilled: false,
  employeeChanged: false,
  sendReminderForApplication: false,

}

const successMessageSlice = createSlice({
  name: "successMessage",
  initialState,
  reducers: {
    settingReportInProgress(state) {
        state.reportInProgress = true;
    },
    settingEmployeeCreated(state) {
        state.employeeCreated = true;
    },
    settingEmailSend(state) {
        state.emailSend = true;
    },
    settingShiftplanReleased(state) {
        state.shiftplanReleased = true;
    },
    settingShiftplanPublished(state) {
        state.shiftplanPublished = true;
    },
    settingShiftplanFilled(state) {
        state.shiftplanFilled = true;
    },
    settingEmployeeChanged(state) {
        state.employeeChanged = true;
    },
    settingSendReminderForApplication(state) {
        state.sendReminderForApplication = true;
    },
    resettingSuccessMessages(state) {
        state.reportInProgress = false;
        state.employeeCreated = false;
        state.emailSend = false;
        state.shiftplanReleased = false;
        state.shiftplanPublished = false;
        state.shiftplanFilled = false;
        state.employeeChanged = false;
        state.sendReminderForApplication = false;
    }
  }
})

export const {
    settingEmailSend,
    settingEmployeeChanged,
    settingEmployeeCreated,
    settingReportInProgress,
    settingShiftplanFilled,
    settingShiftplanPublished,
    settingShiftplanReleased,
    settingSendReminderForApplication,
    resettingSuccessMessages
} = successMessageSlice.actions;

export default successMessageSlice.reducer;