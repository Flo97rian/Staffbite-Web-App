import { API, Auth } from "aws-amplify";
import { FetchEmployeePlansFromDB } from "./FetchPlansForEmployees";
import { API_HOSTNAME, DELETE_APPLICATION } from "../../constants/ApiConstants";

export function thunkDeleteApplication(ShiftSlot, Shiftplan) {
    return async function uploadApplication(dispatch, getState) {
        const apiName = API_HOSTNAME; // replace this with your api name.
        const path = DELETE_APPLICATION; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            headers: {
                Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
        },
        body: {
            plan: Shiftplan.plan,
            row: ShiftSlot.row,
            id: Shiftplan.id,
            col: ShiftSlot.col
        }
        };
        await API.post(apiName, path, myInit)
        dispatch(FetchEmployeePlansFromDB)
}}