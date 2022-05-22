import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userType: "",
}

const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        settingIsAdmin(state, action) {
            state.userType = "isAdmin";
        },
        settingIsEmployee(state, action) {
            state.userType = "isEmployee";
        },
        resettingUserType(state) {
            state.userType = initialState.userType;
        }
    }
})

export const {
    settingIsAdmin,
    settingIsEmployee,
    resettingUserType
} = currentUserSlice.actions;

export default currentUserSlice.reducer;