import { API, Auth } from "aws-amplify";
import { FetchFromDB } from "./FetchPlansFromDB";
import { API_HOSTNAME, START_ALGORITHM } from "../../constants/ApiConstants";

export function thunkStartAlg(id) {
    return async function startAlg(dispatch, getState) {
    const planid = id
    Auth.currentAuthenticatedUser().then( user => {
        const apiName = API_HOSTNAME; // replace this with your api name.
        const path = START_ALGORITHM; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            body: {
                id: planid,
                user: user.attributes,
            }
        };
        return API.post(apiName, path, myInit)
        })
        .then(response => {
            dispatch(FetchFromDB);
            dispatch({type: "AlgResponse", payload: !0});
            dispatch({type: "stopFetchingAlg"});
            dispatch({type: "stopShiftPlanIsActive"});
            dispatch({type: "stopShiftPlanIsImported"});
            dispatch({type: "ResetCurrentShiftPlan"});
            dispatch({type: "resetShiftplan"});
        })
    }
}