import { API, Auth } from "aws-amplify";
import { FetchFromDB } from "./FetchPlansFromDB";
import { API_HOSTNAME, PUBLISH_SHIFTPLAN } from "../../constants/ApiConstants";


export function thunkPublishShiftPlan(plan) {
    return async function publishShiftPlan(dispatch, getState) {
        const shiftplan = plan
        const apiName = API_HOSTNAME; // replace this with your api name.
        const path = PUBLISH_SHIFTPLAN; //replace this with the path you have configured on your API
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
        dispatch({type: "stopShiftPlanIsActive"})
        dispatch({type: "stopShiftPlanIsImported"})
        dispatch({type: "ResetCurrentShiftPlan"})
        dispatch({type: "resetShiftplan"});
    }
}