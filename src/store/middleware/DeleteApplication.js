import { API, Auth } from "aws-amplify";
import { FetchEmployeePlansFromDB } from "./FetchPlansForEmployees";
import { API_HOSTNAME, DELETE_APPLICATION } from "../../constants/ApiConstants";

export function thunkDeleteApplication(ShiftSlot, Shiftplan) {
    return async function uploadApplication(dispatch, getState) {
        const index = getState(state => state.shiftSlot.index);
        const day = getState(state => state.shiftSlot.day);
        const apiName = API_HOSTNAME; // replace this with your api name.
        const path = DELETE_APPLICATION; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            headers: {
                Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
        },
        body: {
            plan: Shiftplan.plan,
            row: index,
            id: Shiftplan.id,
            col: day
        }
        };
        await API.post(apiName, path, myInit)
        dispatch(FetchEmployeePlansFromDB)
}}