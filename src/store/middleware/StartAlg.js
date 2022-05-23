import { API, Auth } from "aws-amplify";
import { thunkFetchShiftplans } from "./FetchShiftplans";
import { API_HOSTNAME, START_ALGORITHM, TEST_ALGORITHM } from "../../constants/ApiConstants";
import { resettingShiftplan } from "../../reducers/Shiftplan";
import { resettingCurrentShiftplanIndex } from "../../reducers/currentShiftPlan";
import { settingAlgResponseStatus } from "../../reducers/DB";
import { resettingDisplayShiftplan } from "../../reducers/display";

export function thunkStartAlg(id) {
    return async function startAlg(dispatch, getState) {
    const planid = id
    Auth.currentAuthenticatedUser().then( user => {
        const apiName = API_HOSTNAME; // replace this with your api name.
        const path = TEST_ALGORITHM; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            body: {
                id: planid,
                user: user.attributes,
            }
        };
        return API.post(apiName, path, myInit)
        })
        .then(response => {
            dispatch(thunkFetchShiftplans());
            dispatch(settingAlgResponseStatus(!0))
            dispatch({type: "stopFetchingAlg"});
            dispatch(resettingDisplayShiftplan())
            dispatch(resettingCurrentShiftplanIndex())
            dispatch(resettingShiftplan());
        })
    }
}