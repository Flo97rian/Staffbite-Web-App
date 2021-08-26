import { API, Auth } from "aws-amplify";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";

export function thunkUploadShiftPlanToDB({daysIsActive, NewShiftPlan}) {
  return async function uploadShiftPlanToDB(dispatch, getState) {
    const details = {daysIsActive}
    console.log(daysIsActive, getState().date)
    const Zeitraum = moment(getState().date.start, "DD.MM.YYYY").locale("de").format("l") + " - " + moment(getState().date.ende, "DD.MM.YYYY").locale("de").format("l")
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
          schichtentag: details.daysIsActive["schichtentag"],
          zeitraum: Zeitraum
      }, // OPTIONAL
      body: {
        plan: plan.NewShiftPlan
      }
    };
    const response = await API.post(apiName, path, myInit)
    console.log("response", response)
    }
  }