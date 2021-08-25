import { API, Auth } from "aws-amplify";
import { FetchFromDB } from "./FetchPlansFromDB";

export function thunkUpdateShiftPlan({Plans, currentShiftPlan}) {
  console.log("moinoi", Plans, currentShiftPlan)
  return async function updateShiftPlan(dispatch, getState) {
    const plans = { Plans }
    const currentShiftplan = {currentShiftPlan}
    console.log("moinniini")
    const apiName = 'api00f496d2'; // replace this with your api name.
    const path = '/schichtplan/update'; //replace this with the path you have configured on your API
    const myInit = { // OPTIONAL
        headers: {
        Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
      },
      body: plans.Plans[currentShiftplan.currentShiftPlan]
    };
    const response = await API.post(apiName, path, myInit)
    console.log("response", response)
    dispatch(FetchFromDB)
    }
  }