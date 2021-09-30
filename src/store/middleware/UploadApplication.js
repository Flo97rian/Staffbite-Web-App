import { API, Auth } from "aws-amplify";
import { FetchEmployeePlansFromDB } from "./FetchPlansForEmployees";

export function thunkUploadApplication({ShiftSlot, Plans, currentShiftPlan}) {
    const plans = Plans
    const shiftslot = ShiftSlot
    const currentPlan = currentShiftPlan
    return async function uploadApplication(dispatch, getState) {
        const apiName = 'api00f496d2'; // replace this with your api name.
        const path = '/schichtplan/post-bewerbung'; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            headers: {
                Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
        },
        body: {
            plan: plans[currentPlan].plan,
            row: shiftslot.row,
            id: plans[currentPlan].id,
            col: shiftslot.col
        }
        };
        await API.post(apiName, path, myInit)
        dispatch(FetchEmployeePlansFromDB)
}}