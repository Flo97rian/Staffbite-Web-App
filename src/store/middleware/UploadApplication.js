import { API, Auth } from "aws-amplify";
import { FetchEmployeePlansFromDB } from "./FetchPlansForEmployees";
import constants from "../constants";

export function thunkUploadApplication(Shiftplan, ShiftSlot) {
    return async function uploadApplication(dispatch, getState) {
        const apiName = constants.env.apiGatewayPath; // replace this with your api name.
        const path = '/schichtplan/post-bewerbung'; //replace this with the path you have configured on your API
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
        dispatch({type: "stopFetchPlansFromDB"});
}}