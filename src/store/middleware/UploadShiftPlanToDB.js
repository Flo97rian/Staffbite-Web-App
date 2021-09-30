import { API, Auth } from "aws-amplify";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import { FetchFromDB } from "./FetchPlansFromDB";

export function thunkUploadShiftPlanToDB({daysIsActive, NewShiftPlan}) {
  return async function uploadShiftPlanToDB(dispatch, getState) {
    const details = {daysIsActive}
    console.log(details)
    const Zeitraum = moment(getState().date.start.startDate).locale("de").format("l") + " - " + moment(getState().date.ende.endDate).locale("de").format("l")
    console.log(Zeitraum)
    console.log(details.daysIsActive)
    const schichtentag = details.daysIsActive?.schichtentag ? details.daysIsActive["schichtentag"] : 0
    console.log(details.daysIsActive?.schichtentag)
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
          schichtentag: schichtentag,
          zeitraum: Zeitraum
      }, // OPTIONAL
      body: {
        plan: plan.NewShiftPlan
      }
    };
    const response = await API.post(apiName, path, myInit)
    console.log("response", response)
    dispatch(FetchFromDB)
    }
  }