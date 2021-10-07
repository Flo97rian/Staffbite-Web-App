import { API, Auth } from "aws-amplify";
import { FetchFromDB } from "./FetchPlansFromDB";


export function thunkPublishShiftPlan(plan) {
    return async function publishShiftPlan(dispatch, getState) {
        const shiftplan = plan
        const apiName = 'api00f496d2'; // replace this with your api name.
        const path = '/schichtplan/freigeben'; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            headers: {
                Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
        },
            body: shiftplan
        };
        const response = await API.post(apiName, path, myInit)
        dispatch(FetchFromDB)
    }
}