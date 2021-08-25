import _ from "lodash";
import { API, Auth } from "aws-amplify";
import { v4 as uuidv4 } from 'uuid';

export function thunkUploadShiftPlanToDB({daysIsActive, NewShiftPlan}) {
  return async function uploadShiftPlanToDB(dispatch, getState) {
    const details = {daysIsActive}
    const plan = {NewShiftPlan}
    const apiName = 'api00f496d2'; // replace this with your api name.
    const path = '/schichtplan/speichern'; //replace this with the path you have configured on your API
    const myInit = { // OPTIONAL
        headers: {
        Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
      },
      queryStringParameters: {
          id: uuidv4(),
          name: details.daysIsActive["name"],
          schichtentag: details.daysIsActive["schichtentag"]
      }, // OPTIONAL
      body: {
        plan: plan.NewShiftPlan
      }
    };
    const response = await API.post(apiName, path, myInit)
    console.log("response", response)
    }
  }