import { API, Auth } from "aws-amplify";
import { FetchFromDB } from "./FetchPlansFromDB";
import constants from "../constants";


export function thunkPublishShiftPlan(plan) {
    return async function publishShiftPlan(dispatch, getState) {
        const shiftplan = plan
        const apiName = constants.env.apiGatewayPath; // replace this with your api name.
        const path = '/schichtplan/veroeffentlichen'; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            headers: {
                Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
        },
        body: {
            id: shiftplan.id
        }
        };
        await API.post(apiName, path, myInit)
        dispatch({type: "stopFetchingPublish"})
        dispatch(FetchFromDB)
    }
}