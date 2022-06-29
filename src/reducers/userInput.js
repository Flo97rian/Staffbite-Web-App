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
    shiftIsDayly: false,
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
    employeeTargetShiftTrade: "",
    shiftCustomDays: [],
    selectedAuthenticationIndex: 0,
    authenticationAnswere: "",
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
        resettingShiftEnd(state, action) {
            state.shiftEnd = initialState.shiftEnd;
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
        settingShiftIsDayly(state) {
            state.shiftIsDayly = true;
        },
        resettingShiftIsDayly(state) {
            state.shiftIsDayly = false;
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
        settingCurrentShiftCustomsDays(state, action) {
            state.shiftCustomDays = action.payload;
        },
        resettingCurrentShiftCustomDays(state) {
            state.shiftCustomDays = initialState.shiftCustomDays;
        },
        settingShiftCustomDays(state, action) {
            state.shiftCustomDays.push(action.payload);
        },
        resettingShiftCustomDays(state, action) {
            const removeDay = action.payload;
            const filteredDays = state.shiftCustomDays.filter(day => day !== removeDay);
            state.shiftCustomDays = filteredDays;
        },
        settingSelectedAuthenticationIndex(state, action) {
            state.selectedAuthenticationIndex = action.payload;
        },
        settingAuthenticationAnswere(state, action) {
            state.authenticationAnswere = action.payload;
        },
        resettingUserInput(state) {
            state.positions = initialState.positions;
            state.companyName = initialState.companyName;
            state.companySurname = initialState.companySurname;
            state.shiftplanName = initialState.shiftplanName;
            state.shiftName = initialState.shiftName;
            state.shiftPosition = initialState.shiftPosition;
            state.shiftStart = initialState.shiftStart;
            state.shiftEnd = initialState.shiftEnd;
            state.numberOfEmployees = initialState.numberOfEmployees;
            state.minQualification = initialState.minQualification;
            state.shiftsPerDay = initialState.shiftsPerDay;
            state.shiftNotice = initialState.shiftNotice;
            state.shiftIsDayly = initialState.shiftIsDayly;
            state.shiftplanFillingReverse = initialState.shiftplanFillingReverse;
            state.shiftplanFillingFair = initialState.shiftplanFillingFair;
            state.employeeName = initialState.employeeName;
            state.employeeShiftsPerWeek = initialState.employeeShiftsPerWeek;
            state.employeeQualification = initialState.employeeQualification;
            state.employeePositions = initialState.employeePositions;
            state.employeeActive = initialState.employeeActive;
            state.employeeFree = initialState.employeeFree;
            state.employeeEmail = initialState.employeeEmail;
            state.newPosition = initialState.newPosition;
            state.reportFilter = initialState.reportFilter;
            state.employeeTargetShiftTrade = initialState.employeeTargetShiftTrade;
            state.shiftplanNumberOfShifts = initialState.shiftplanNumberOfShifts;
            state.shiftplanCompanyIsOpen = initialState.shiftplanCompanyIsOpen;
            state.shiftCustomDays = initialState.shiftCustomDays;
            state.authenticationAnswere = initialState.authenticationAnswere;
            state.selectedAuthenticationIndex = initialState.selectedAuthenticationIndex;
        }
    }
});

export const {
    settingShiftName,
    settingShiftStart,
    settingShiftEnd,
    resettingShiftEnd,
    settingShiftPosition,
    settingShiftMinQualification,
    settingShiftNumberOfEmployees,
    settingShiftsPerDay,
    settingShiftNotice,
    settingShiftIsDayly,
    resettingShiftIsDayly,
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
    settingShiftCustomDays,
    resettingShiftCustomDays,
    settingCurrentShiftCustomsDays,
    resettingCurrentShiftCustomDays,
    settingAuthenticationAnswere,
    settingSelectedAuthenticationIndex
} = userInputSlice.actions;
  
export default userInputSlice.reducer