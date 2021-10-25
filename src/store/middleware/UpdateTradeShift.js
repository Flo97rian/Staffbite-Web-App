import { API, Auth } from "aws-amplify";
import { FetchEmployeePlansFromDB } from "./FetchPlansForEmployees";
import { API_HOSTNAME, UPDATE_EMPLOYEE_POST_TRADE } from "../../constants/ApiConstants";

export function thunkUpdateTradeShift(plan) {
  return async function updateTradeShift(dispatch, getState) {
    const apiName = API_HOSTNAME; // replace this with your api name.
    const path = UPDATE_EMPLOYEE_POST_TRADE; //replace this with the path you have configured on your API
    const myInit = { // OPTIONAL
        headers: {
        Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
      },
      body: plan
    };
    await API.post(apiName, path, myInit)
    dispatch(FetchEmployeePlansFromDB)
    }
  }