import { createSlice } from "@reduxjs/toolkit"

const initialDemoAdmin = {
    securityQuestionId: false,
    securityQuestionAnswere: false,
    isAdmin: false,
}

const initialDemoMeta = {

}

const initialDemoEmployee = {
    isEmployee: false,
};

const initialState = {
    demoId: false,
    demoSignedIn: false,
    demoMeta: {},
    demoPlans: [],
    demoEmployees: [],
    demoAdmin: initialDemoAdmin,
    demoEmployee: initialDemoEmployee,
    demoProcessingCreateShiftplan: "idle",
    demoFetched: "idle",
}

const demoSlice = createSlice({
    name: "demo",
    initialState,
    reducers: {
        settingDemoMeta(state, action) {
            state.demoMeta = action.payload;
        },
        settingDemoPlans(state, action) {
            state.demoPlans = action.payload;
        },
        settingDemoEmployees(state, action) {
            state.demoEmployees = action.payload;
        },
        settingDemoId(state, action) {
            state.demoId = action.payload;
        },
        resettingDemoId(state, action) {
            state.demoId = action.payload;
        },
        settingDemoIsAdmin(state) {
            state.demoAdmin.isAdmin = true;
            state.demoSignedIn = true;
        },
        settingDemoIsEmployee(state) {
            state.demoEmployee.isEmployee = true;
            state.demoSignedIn = true;
        },
        resettingDemoIsSignedIn(state) {
            state.demoEmployee.isEmployee = false;
            state.demoAdmin.isAdmin = false;
            state.demoSignedIn = false;
        },
        settingDemoAdmin(state, action) {
            state.demoAdmin = action.payload;
        },
        settingAuthenticationForAdmin(state, action) {
            state.demoAdmin.securityQuestionId = action.payload.selectedAuthenticationIndex;
            state.demoAdmin.securityQuestionAnswere = action.payload.authenticationAnswere;
        },
        settingAuthenticateAdmin(state, action) {
            const validAdminQuestion = state.demoAdmin.securityQuestionId === action.payload.selectedAuthenticationIndex;
            const validAdminAnswere = state.demoAdmin.securityQuestionAnswere === action.payload.authenticationAnswere;
            if(validAdminAnswere && validAdminQuestion) {
                state.demoAdmin.isAdmin = true;
                state.demoSignedIn = true;
            }
        },
        settingAuthenticationEmployee(state, action) {
            const newEmployee = {
                id: state.demoEmployees.length,
                name: action.payload.employeeName,
                securityQuestionId: action.payload.selectedAuthenticationIndex,
                securityQuestionAnswere: action.payload.authenticationAnswere,

            }
            state.demoEmployees.push(newEmployee);
        },
        settingAuthenticateEmployee(state, action) {
            const currentEmployee = action.payload.employeeName;
            const Employee = state.demoEmployees.find(employee => employee.name === currentEmployee);
            const validEmployeeQuestion = Employee.securityQuestionId === action.payload.selectedAuthenticationIndex;
            const validEmployeeAnswere = Employee.securityQuestionAnswere === action.payload.authenticationAnswere;
            if(validEmployeeQuestion && validEmployeeAnswere) {
                state.demoEmployee = Employee;
                state.demoEmployee.isEmployee = true;
                state.demoSignedIn = true;
            }
        },
        updateDemoEvent(state, action) {
            const updatedEvent = action.payload;
            let currentEvents = state.demoPlans;
            let updatedEventIndex = currentEvents.findIndex(event => event.id === updatedEvent.id);
            currentEvents.splice(updatedEventIndex, 1, updatedEvent);
            state.demoPlans = currentEvents;

        },
        settingDummyShifts(state, action) {
            const employeeId = action.payload;
            if(state.demoEmployees[employeeId]) {

                if(state.demoEmployees[employeeId].dummyShifts) {
                    state.demoEmployees[employeeId].dummyShifts += 1;
                }

                if(!state.demoEmployees[employeeId].dummyShifts) {
                    state.demoEmployees[employeeId].dummyShifts = 1;
                }
            }
        },
        resettingDummyShift(state, action) {
            const employeeId = action.payload;
            if(state.demoEmployees[employeeId]) {

                if(state.demoEmployees[employeeId].dummyShifts) {
                    state.demoEmployees[employeeId].dummyShifts -= 1;
                }
            }
        },
        resettingDummyShifts(state, action) {
            state.demoEmployees.forEach(employee => {
                if(state.demoEmployees[employee.id]) {
                    if(state.demoEmployees[employee.id].dummyShifts) {
                        delete state.demoEmployees[employee.id].dummyShifts;    
                    }
                }
            })
        },
        settingApplicationsCounterForEmployee(state, action) {
            const employeeId = action.payload;
            if(state.demoEmployees[employeeId]) {

                if(state.demoEmployees[employeeId].applications) {
                    state.demoEmployees[employeeId].applications += 1;
                }

                if(!state.demoEmployees[employeeId].applications) {
                    state.demoEmployees[employeeId].applications = 1;
                }
            }
        },
        settingShiftsCounterForEmployee(state, action) {
            const employeeId = action.payload;
            if(state.demoEmployees[employeeId]) {

                if(state.demoEmployees[employeeId].shifts) {
                    state.demoEmployees[employeeId].shifts += 1;
                }

                if(!state.demoEmployees[employeeId].shifts) {
                    state.demoEmployees[employeeId].shifts = 1;
                }
            }
        },
        resettingCouterForEmployees(state) {
            state.demoEmployees.forEach(employee => {
                if(state.demoEmployees[employee.id]) {
                    if(state.demoEmployees[employee.id].shifts) {
                        delete state.demoEmployees[employee.id].shifts;    
                    }

                    if(state.demoEmployees[employee.id].applications) {
                        delete state.demoEmployees[employee.id].applications;    
                    }
                }
            })
        },
        deleteEmployee(state, action) {
            const employeeId = action.payload;
            const indexOfEmployee = state.demoEmployees.findIndex(employee => employee.id === employeeId);
            if(indexOfEmployee !== -1) {
                state.demoEmployees.splice(indexOfEmployee, 1);
            }
            
        },
        settingProcessingStartCreateShiftplan(state) {
            state.demoProcessingCreateShiftplan = "loading";
        },
        settingProcessingFullfilledCreateShiftplan(state) {
            state.demoProcessingCreateShiftplan = "fullfilled";
        },
        resettingProcessingCreateShiftplan(state) {
            state.demoProcessingCreateShiftplan = "idle";
        },
        settingDemoFetched(state) {
            state.demoFetched = "fulfilled";
        },
        resettingDemoFetched(state) {
            state.demoFetched = "idle";
        }

    }
})

export const {
    settingDemoEmployees,
    settingDemoMeta,
    settingDemoPlans,
    settingDemoId,
    resettingDemoId,
    settingAuthenticateAdmin,
    settingAuthenticationForAdmin,
    settingDemoAdmin,
    settingAuthenticationEmployee,
    settingAuthenticateEmployee,
    updateDemoEvent,
    settingDemoIsAdmin,
    settingDemoIsEmployee,
    resettingDemoIsSignedIn,
    settingDummyShifts,
    resettingDummyShift,
    resettingDummyShifts,
    settingApplicationsCounterForEmployee,
    settingShiftsCounterForEmployee,
    resettingCouterForEmployees,
    deleteEmployee,
    settingProcessingFullfilledCreateShiftplan,
    settingProcessingStartCreateShiftplan,
    resettingProcessingCreateShiftplan,
    settingDemoFetched,
    resettingDemoFetched,
} = demoSlice.actions;

export default demoSlice.reducer;