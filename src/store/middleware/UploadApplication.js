import { API, Auth } from "aws-amplify";
import { API_HOSTNAME, UPLOAD_APPLICATION } from "../../constants/ApiConstants";
import { resettingShiftplan } from "../../reducers/Shiftplan";
import { resettingCurrentShiftplanIndex } from "../../reducers/currentShiftPlan";
import { resettingDisplayShiftplan } from "../../reducers/display";
import { thunkFetchShiftplansForEmployee, thunkFetchShiftplansForEmployes } from "./FetchShiftplansForEmployee";

export function thunkUploadApplication(Shiftplan) {
    return async function uploadApplication(dispatch, getState) {
        Auth.currentAuthenticatedUser().then( user => {
            const apiName = API_HOSTNAME; // replace this with your api name.
            const path = UPLOAD_APPLICATION; //replace this with the path you have configured on your API
            const myInit = { // OPTIONAL
                body: {
                    plan: Shiftplan.plan,
                    id: Shiftplan.id,
                    user: user.attributes,
                }
            };
            return API.post(apiName, path, myInit)
            })
        .then(response => {
            dispatch(thunkFetchShiftplansForEmployee());
            dispatch({type: "stopFetchingEmployeePlans"});
            dispatch(resettingCurrentShiftplanIndex())
            dispatch(resettingDisplayShiftplan())
            dispatch(resettingShiftplan());
        })
    }
}