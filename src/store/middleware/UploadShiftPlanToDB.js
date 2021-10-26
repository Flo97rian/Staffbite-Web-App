import { API, Auth } from "aws-amplify";
import { FetchFromDB } from "./FetchPlansFromDB";
import { API_HOSTNAME } from "../../constants/ApiConstants";
import { UPLOAD_SHIFTPLAN } from "../../constants/ApiConstants";

export function thunkUploadShiftPlanToDB(shiftplan) {
  return async function uploadShiftPlanToDB(dispatch, getState) {
    const apiName = API_HOSTNAME; // replace this with your api name.
    const path = UPLOAD_SHIFTPLAN; //replace this with the path you have configured on your API
    const myInit = { // OPTIONAL
        headers: {
        Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
      },
      queryStringParameters: {
          id: shiftplan.id,
          name: shiftplan.name,
          schichtentag: shiftplan.schichtentag,
          zeitraum: shiftplan.zeitraum
      }, // OPTIONAL
      body: {
        plan: shiftplan.plan
      }
    };
    await API.post(apiName, path, myInit)
    dispatch(FetchFromDB)
    dispatch({type: "stopFetchingSafe"});
    dispatch({type: "stopShiftPlanIsActive"})
    dispatch({type: "stopShiftPlanIsImported"})
    dispatch({type: "resetNewShiftplan"})
    }
  }