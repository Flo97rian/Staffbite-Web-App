import { createSlice } from "@reduxjs/toolkit";
import employeeStates from "../constants/EmployeeDefault";
const initialState = {
  plans: [],
  plansStatus: "idle",
  employees: {},
  employeesStatus: "idle",
  employee: {},
  employeeStatus: "idle",
  report: {},
  reportStatus: "idle",
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
      state.reportStatus = "loading";
    },
    settingReportFulfilled(state) {
      state.reportStatus = "fulfilled";
    },
    settingReportRejected(state) {
      state.reportStatus = "rejected";
    },
    settingEmployeeFormDetails(state, action) {
      const employeeID = action.payload.employeeID;
      const userInput = action.payload.userInput;
      if( userInput.employeeName !== state.employees[employeeID].name && 
          userInput.employeeName !== employeeStates.employeeName
        ) {
          state.employees[employeeID].name = userInput.employeeName
        }

      if( userInput.employeePositions !== state.employees[employeeID].position &&
          userInput.employeePositions !== employeeStates.employeePositions
        ) {
          state.employees[employeeID].position = userInput.employeePositions
        }

      if( userInput.employeeShiftsPerWeek !== state.employees[employeeID].schichtenwoche &&
        userInput.employeeShiftsPerWeek !== employeeStates.employeeShiftsPerWeek
      ) {
        state.employees[employeeID].schichtenwoche = Number(userInput.employeeShiftsPerWeek);
      }

      if( userInput.employeeQualification !== state.employees[employeeID].erfahrung &&
        userInput.employeeQualification !== employeeStates.employeeQualification
      ) {
        state.employees[employeeID].erfahrung = userInput.employeeQualification
      }

      state.employees[employeeID].aktiv = userInput.employeeActive
      state.employees[employeeID].frei = userInput.employeeFree
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
  settingEmployeeRejected,
  settingEmployeeFormDetails,
  settingReportFetching,
  settingReportFulfilled,
  settingReportRejected
} = DBSlice.actions;

export default DBSlice.reducer;