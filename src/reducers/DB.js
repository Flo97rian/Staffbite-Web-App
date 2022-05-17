import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plans: [],
  plansStatus: "idle",
  employees: {},
  employeesStatus: "idle",
  employee: {},
  employeeStatus: "idle",
  report: {},
  resportStatus: "idle",
  status: false,
}

const DBSlice = createSlice({
  name: "DB",
  initialState,
  reducers: {
    settingShiftplans(state, action) {
      state.plans = action.payload;
    },
    settingEmployees(state, action) {
      state.employees = action.payload;
    },
    settingEmployee(state, action) {
      state.employee = action.payload;
    },
    settingReport(state, action) {
      state.report = action.payload;
    },
    settingAlgResponseStatus(state, action) {
      state.status = action.payload;
    },
    settingPlansFetching(state) {
      state.plansStatus = "loading";
    },
    settingPlansFulfilled(state) {
      state.plansStatus = "fulfilled";
    },
    settingPlansRejected(state) {
      state.plansStatus = "rejected";
    },
    settingEmployeesFetching(state) {
      state.employeesStatus = "loading";
    },
    settingEmployeesFulfilled(state) {
      state.employeesStatus = "fulfilled";
    },
    settingEmployeesRejected(state) {
      state.employeesStatus = "rejected";
    },
    settingEmployeeFetching(state) {
      state.employeeStatus = "loading";
    },
    settingEmployeeFulfilled(state) {
      state.employeeStatus = "fulfilled";
    },
    settingEmployeeRejected(state) {
      state.employeeStatus = "rejected";
    },
    settingReportFetching(state) {
      state.resportStatus = "loading";
    },
    settingReportFulfilled(state) {
      state.resportStatus = "fulfilled";
    },
    settingReportRejected(state) {
      state.resportStatus = "rejected";
    }
  }
})

export const {
  settingShiftplans,
  settingEmployees,
  settingEmployee,
  settingReport,
  settingAlgResponseStatus,
  settingPlansFetching,
  settingPlansFulfilled,
  settingPlansRejected,
  settingEmployeesFetching,
  settingEmployeesFulfilled,
  settingEmployeesRejected,
  settingEmployeeFetching,
  settingEmployeeFulfilled,
  settingEmployeeRejected

} = DBSlice.actions;

export default DBSlice.reducer;