import { API, Auth } from "aws-amplify";
import { FetchFromDB } from "./FetchPlansFromDB";
import constants from "../constants";

export function thunkStartAlg(id) {
    return async function startAlg(dispatch, getState) {
    const planid = id
    const apiName = constants.env.apiGatewayPath; // replace this with your api name.
    const path = '/schichtplan/befuellen'; //replace this with the path you have configured on your API
    const myInit = { // OPTIONAL
        headers: {
            Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
      },
      body: planid
    };
    await API.post(apiName, path, myInit)
    dispatch(FetchFromDB)
    dispatch({type: "AlgResponse", payload: !0})
    dispatch({type: "stopFetchingAlg"})
    dispatch({type: "stopShiftPlanIsActive"})
    dispatch({type: "stopShiftPlanIsImported"})
    dispatch({type: "ResetCurrentShiftPlan"})
    dispatch({type: "resetShiftplan"});
    }
}