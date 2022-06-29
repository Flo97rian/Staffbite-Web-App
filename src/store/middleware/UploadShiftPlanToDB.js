import { API, Auth } from "aws-amplify";
import { thunkFetchShiftplans } from "./FetchShiftplans";
import { API_HOSTNAME } from "../../constants/ApiConstants";
import { UPLOAD_SHIFTPLAN } from "../../constants/ApiConstants";
import { resettingDisplayShiftplan } from "../../reducers/display";
import { resettingProcessing } from "../../reducers/processing";
import { resettingNewShiftplan } from "../../reducers/NewShiftPlan";

export function thunkUploadShiftPlanToDB(shiftplan) {
  return async function uploadShiftPlanToDB(dispatch, getState) {
    dispatch(resettingNewShiftplan());
    Auth.currentAuthenticatedUser().then( user => {
      const apiName = API_HOSTNAME; // replace this with your api name.
      const path = UPLOAD_SHIFTPLAN; //replace this with the path you have configured on your API
      const myInit = {
        queryStringParameters: {
          id: shiftplan.id,
          name: shiftplan.name,
          schichtentag: shiftplan.schichtentag,
          zeitraum: shiftplan.zeitraum,
          startOfWeek: shiftplan?.startOfWeek || '',
          endOfWeek: shiftplan?.endOfWeek || '',
        },
        body: {
          plan: shiftplan.plan,
          user: user.attributes,
        }
      };
      return API.post(apiName, path, myInit)
      })
    .then(response => {
      dispatch(resettingProcessing());
      dispatch(resettingNewShiftplan());
      dispatch(thunkFetchShiftplans());
      dispatch(resettingDisplayShiftplan());
    })
  }
}