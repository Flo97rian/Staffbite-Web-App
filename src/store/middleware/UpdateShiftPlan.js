import { API, Auth } from "aws-amplify";
import { FetchFromDB } from "./FetchPlansFromDB";
import { API_HOSTNAME, UPDATE_SHIFTPLAN } from "../../constants/ApiConstants";

export function thunkUpdateShiftPlan(shiftplan) {
  return async function updateShiftPlan(dispatch, getState) {
    const apiName = API_HOSTNAME; // replace this with your api name.
    const path = UPDATE_SHIFTPLAN; //replace this with the path you have configured on your API
    const myInit = { // OPTIONAL
        headers: {
        Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
      },
      body: shiftplan
    };
    await API.post(apiName, path, myInit)
    dispatch(FetchFromDB)
    dispatch({type: "stopShiftPlanIsActive"})
    dispatch({type: "stopShiftPlanIsImported"})
    dispatch({type: "resetShiftplan"})
    dispatch({type: "ResetCurrentShiftPlan"})
    }
  }