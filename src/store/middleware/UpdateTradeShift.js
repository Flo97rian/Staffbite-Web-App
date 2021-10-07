import { API, Auth } from "aws-amplify";
import { FetchEmployeePlansFromDB } from "./FetchPlansForEmployees";
import constants from "../constants";

export function thunkUpdateTradeShift(plan) {
  return async function updateTradeShift(dispatch, getState) {
    const apiName = constants.env.apiGatewayPath; // replace this with your api name.
    const path = '/schichtplan/employee-post-trade'; //replace this with the path you have configured on your API
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