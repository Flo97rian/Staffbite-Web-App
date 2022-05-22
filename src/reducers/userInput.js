import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    positions: [],
    companyName: "",
    companySurname: "",
    shiftplanName: "",
    shiftplanNumberOfShifts: 1,
    shiftplanCompanyIsOpen: [],
    shiftName: "",
    shiftPosition: "",
    shiftStart: "",
    shiftEnd: "",
    numberOfEmployees: 0,
    minQualification: !1,
    shiftsPerDay: 1,
    shiftNotice: "",
    shiftIsDayly: !1,
    shiftplanFillingReverse: !1,
    shiftplanFillingFair: !1,
    employeeName: "",
    employeeShiftsPerWeek: 0,
    employeeQualification: "Anfänger",
    employeePositions: [],
    employeeActive: false,
    employeeFree: false,
    employeeEmail: "",
    newPosition: "",
    reportFilter: {},
    employeeTargetShiftTrade: ""
}

const userInputSlice = createSlice({
    name: "userInput",
    initialState,
    reducers: {
        settingShiftName(state, action) {
            state.shiftName = action.payload;
        },
        settingShiftStart(state, action) {
            state.shiftStart = action.payload
        },
        settingShiftEnd(state, action) {
            state.shiftEnd = action.payload
        },
        settingShiftPosition(state, action) {
            state.shiftPosition = action.payload
        },
        settingShiftMinQualification(state, action) {
            state.minQualification = action.payload
        },
        settingShiftNumberOfEmployees(state, action) {
            state.numberOfEmployees = action.payload
        },
        settingShiftsPerDay(state, action) {
            state.shiftsPerDay = action.payload
        },
        settingShiftNotice(state, action) {
            state.shiftNotice = action.payload
        },
        settingShiftIsDayly(state, action) {
            state.shiftIsDayly = action.payload
        },
        settingCompanyPositions(state, action) {
            state.positions = action.payload
        },
        settingCompanyName(state, action) {
            state.companyName = action.payload
        },
        settingCompanySurname(state, action) {
            state.companySurname = action.payload
        },
        settingShiftplanFillingReverse(state, action) {
            console.log(action);
            state.shiftplanFillingReverse = action.payload;
        },
        settingShiftplanFillingFair(state, action) {
            state.shiftplanFillingFair = action.payload;
        },
        settingEmployeeName(state, action) {
            state.employeeName = action.payload;
        },
        resettingEmployeeName(state) {
            state.employeeName = initialState.employeeName;
        },
        settingEmployeeShiftsPerWeek(state, action) {
            state.employeeShiftsPerWeek = action.payload;
        },
        settingEmployeeQualification(state, action) {
            state.employeeQualification = action.payload;
        },
        settingEmployeePositions(state, action) {
            const newPositions = action.payload.filter(position => !state.employeePositions.includes(position))
            state.employeePositions = [...state.employeePositions, ...newPositions];
        },
        settingEmployeePosition(state, action) {
            state.employeePositions = [...state.employeePositions, action.payload];
        },
        resettingEmployeePositions(state, action) {
            state.employeePositions = state.employeePositions.filter(position => position !== action.payload);
        },
        settingEmployeeIsActive(state, action) {
            state.employeeActive = action.payload;
        },
        settingEmployeeIsFree(state, action) {
            state.employeeFree = action.payload;
        },
        settingEmployeeEmail(state, action) {
            state.employeeEmail = action.payload;
        },
        settingNewPosition(state, action) {
            state.newPosition = action.payload;
        },
        settingReportFilter(state, action) {
            state.reportFilter = {...state.reportFilter, [action.payload]: true}
        },
        resettingReportFilter(state, action) {
            delete state.reportFilter[action.payload]
        },
        settingEmployeeTargetShiftTrade(state, action) {
            console.log(action);
            state.employeeTargetShiftTrade = action.payload;
        },
        settingShiftplanName(state, action) {
            state.shiftplanName = action.payload;
        },
        settingShiftplanNumberOfShifts(state, action) {
            state.shiftplanNumberOfShifts = action.payload;
        },
        settingShiftplanCompanyIsOpen(state, action) {
            state.shiftplanCompanyIsOpen = [...state.shiftplanCompanyIsOpen, action.payload];
        },
        resettingShiftplanCompanyIsOpen(state, action) {
            state.shiftplanCompanyIsOpen = state.shiftplanCompanyIsOpen.filter(day => day !== action.payload);
        },
        resettingUserInput(state) {
            state.positions = [];
            state.companyName = "";
            state.companySurname = "";
            state.shiftplanName = "";
            state.shiftName = "";
            state.shiftPosition = "Name";
            state.shiftStart = "";
            state.shiftEnd = "";
            state.numberOfEmployees = 0;
            state.minQualification = !1;
            state.shiftsPerDay = 1;
            state.shiftNotice = "";
            state.shiftIsDayly = !1;
            state.shiftplanFillingReverse = !1;
            state.shiftplanFillingFair = !1;
            state.employeeName = "";
            state.employeeShiftsPerWeek = 0;
            state.employeeQualification = "Anfänger";
            state.employeePositions = [];
            state.employeeActive = false;
            state.employeeFree = false;
            state.employeeEmail = "";
            state.newPosition = "";
            state.reportFilter = {};
            state.employeeTargetShiftTrade = "";
            state.shiftplanNumberOfShifts = 1;
            state.shiftplanCompanyIsOpen = [];
        }
    }
});

export const {
    settingShiftName,
    settingShiftStart,
    settingShiftEnd,
    settingShiftPosition,
    settingShiftMinQualification,
    settingShiftNumberOfEmployees,
    settingShiftsPerDay,
    settingShiftNotice,
    settingShiftIsDayly,
    settingCompanyPositions,
    settingCompanyName,
    settingCompanySurname,
    settingShiftplanFillingReverse,
    settingShiftplanFillingFair,
    resettingUserInput,
    settingEmployeeName,
    resettingEmployeeName,
    settingEmployeeShiftsPerWeek,
    settingEmployeeQualification,
    settingEmployeePositions,
    settingEmployeePosition,
    settingEmployeeIsFree,
    settingEmployeeIsActive,
    settingEmployeeEmail,
    settingNewPosition,
    settingReportFilter,
    resettingReportFilter,
    settingEmployeeTargetShiftTrade,
    settingShiftplanName,
    settingShiftplanNumberOfShifts,
    settingShiftplanCompanyIsOpen,
    resettingShiftplanCompanyIsOpen,
    resettingEmployeePositions,
} = userInputSlice.actions;
  
export default userInputSlice.reducer