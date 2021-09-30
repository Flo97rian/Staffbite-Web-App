import { API, Auth } from "aws-amplify";
import { FetchFromDB } from "./FetchPlansFromDB";

export function thunkUpdateShiftPlan(Plans, currentShiftPlan) {
  return async function updateShiftPlan(dispatch, getState) {
    const plans = { Plans }
    const currentShiftplan = { currentShiftPlan }
    const apiName = 'api00f496d2'; // replace this with your api name.
    const path = '/schichtplan/update'; //replace this with the path you have configured on your API
    const myInit = { // OPTIONAL
        headers: {
        Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
      },
      body: plans.Plans[currentShiftplan.currentShiftPlan]
    };
    await API.post(apiName, path, myInit)
    dispatch(FetchFromDB)
    }
  }