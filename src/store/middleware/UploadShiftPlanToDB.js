import { API, Auth } from "aws-amplify";
import { FetchFromDB } from "./FetchPlansFromDB";
import { API_HOSTNAME } from "../../constants/ApiConstants";
import { UPLOAD_SHIFTPLAN } from "../../constants/ApiConstants";
import { resettingDisplayShiftplan } from "../../reducers/display";

export function thunkUploadShiftPlanToDB(shiftplan) {
  return async function uploadShiftPlanToDB(dispatch, getState) {
    Auth.currentAuthenticatedUser().then( user => {
      const apiName = API_HOSTNAME; // replace this with your api name.
      const path = UPLOAD_SHIFTPLAN; //replace this with the path you have configured on your API
      const myInit = {
        queryStringParameters: {
          id: shiftplan.id,
          name: shiftplan.name,
          schichtentag: shiftplan.schichtentag,
          zeitraum: shiftplan.zeitraum
        },
        body: {
          plan: shiftplan.plan,
          user: user.attributes,
        }
      };
      return API.post(apiName, path, myInit)
      })
    .then(response => {
      dispatch(FetchFromDB);
      dispatch({type: "stopFetchingSafe"});
      dispatch(resettingDisplayShiftplan());
      dispatch({type: "resetNewShiftplan"});
    })
  }
}