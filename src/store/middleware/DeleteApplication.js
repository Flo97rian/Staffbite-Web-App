import { API, Auth } from "aws-amplify";
import { FetchEmployeePlansFromDB } from "./FetchPlansForEmployees";
import { updateShiftPlan } from "../../components/User/Schichtplan/processing.js/handleDeleteApplication";

export function thunkDeleteApplication(Plans, ShiftSlot, currentShiftPlan, User) {
    const currentShiftplan = {currentShiftPlan}
  return async function deleteApplication(dispatch, getState) {
    const plans = await updateShiftPlan(Plans, currentShiftplan.currentShiftPlan, ShiftSlot, User)
    console.log(plans[currentShiftPlan].plan)
    const apiName = 'api00f496d2'; // replace this with your api name.
    const path = '/schichtplan/update'; //replace this with the path you have configured on your API
    const myInit = { // OPTIONAL
        headers: {
        Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
      },
      body: plans[currentShiftPlan]
    };
    const response = await API.post(apiName, path, myInit)
    console.log(response)
    dispatch(FetchEmployeePlansFromDB)
    }
  }