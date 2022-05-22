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
  metaStatus: "idle",
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
    settingEmployeeDummyShift(state, action) {
      const employeeId = action.payload;
      if(Object.keys(state.employees[employeeId]).includes("dummyshifts")) {
        state.employees[employeeId].dummyshifts += 1;
      }

      if(!Object.keys(state.employees[employeeId]).includes("dummyshifts")) {
        state.employees[employeeId].dummyshifts = 1;
      }

    },
    resettingEmployeeDummyShift(state, action) {
      const employeeId = action.payload;
      if( Object.keys(state.employees[employeeId]).includes("dummyshifts") &&
          state.employees[employeeId].dummyshifts > 0
        ) {
          state.employees[employeeId].dummyshifts -= 1;
      }

      if( Object.keys(state.employees[employeeId]).includes("dummyshifts") &&
          state.employees[employeeId].dummyshifts === 0
        ) {
          delete state.employees[employeeId].dummyshifts;
        }
    },
    resettingEmployeesDummyshifts(state) {
      for (const [key, value] of Object.entries(state.employees)) {
        delete value.dummyshifts;
      }
    },
    createDummyshifts(state, action) {
      const shiftplan = state.plans[action.payload];
      const shiftplanLength = shiftplan.plan.length;
      const shiftplanIdSplit = shiftplan.id.split('#');
      if(shiftplanIdSplit.includes("Review") || shiftplanIdSplit.includes("Veröffentlicht")) {
        shiftplan.plan.forEach((shiftRow, index) => {
          if (index !== 0 && index !== 1 && index !== shiftplanLength) {
            for ( const [key, value] of Object.entries(shiftRow)) {
              if( key !== "Wochentag" && value.setApplicants) {
                const employeeIds = Object.keys(value.setApplicants);
                employeeIds.forEach(employeeId => {
                  if( state.employees[employeeId] && 
                      Object.keys(state.employees[employeeId]).includes("dummyshifts")
                    ) {
                      state.employees[employeeId].dummyshifts += 1;
                    }
            
                  if( state.employees[employeeId] &&
                      !Object.keys(state.employees[employeeId]).includes("dummyshifts")
                    ) {
                      state.employees[employeeId].dummyshifts = 1;
                    }
                })
              }
            }
          }
        })
      }
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
    },
    settingMetaFetching(state) {
      state.metaStatus = "loading";
    },
    settingMetaFulfilled(state) {
      state.metaStatus = "fulfilled"
    },
    settingMetaRejected(state) {
      state.metaStatus = "rejected";
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
  settingReportRejected,
  settingEmployeeDummyShift,
  resettingEmployeeDummyShift,
  resettingEmployeesDummyshifts,
  createDummyshifts,
  settingMetaFetching,
  settingMetaFulfilled,
  settingMetaRejected
} = DBSlice.actions;

export default DBSlice.reducer;