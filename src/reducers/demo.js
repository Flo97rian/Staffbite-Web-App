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
} = demoSlice.actions;

export default demoSlice.reducer;