import { API, Auth } from "aws-amplify";
import { thunkFetchShiftplans } from "./FetchPlansFromDB";
import { API_HOSTNAME, PUBLISH_SHIFTPLAN } from "../../constants/ApiConstants";
import { resettingShiftplan } from "../../reducers/Shiftplan";
import { resettingCurrentShiftplanIndex } from "../../reducers/currentShiftPlan";
import { resettingDisplayShiftplan } from "../../reducers/display";


export function thunkPublishShiftPlan(plan) {
    return async function publishShiftPlan(dispatch, getState) {
        let shiftplan = plan;
        Auth.currentAuthenticatedUser().then( user => {
            const apiName = API_HOSTNAME; // replace this with your api name.
            const path = PUBLISH_SHIFTPLAN; //replace this with the path you have configured on your API
            const myInit = { // OPTIONAL
                body: {
                    user: user.attributes,
                    id: shiftplan.id
                }
            };
            return API.post(apiName, path, myInit)
            })
            .then(response => {
                dispatch({type: "stopFetchingPublish"});
                dispatch(thunkFetchShiftplans());
                dispatch(resettingDisplayShiftplan())
                dispatch(resettingCurrentShiftplanIndex())
                dispatch(resettingShiftplan());
            })
    }
}