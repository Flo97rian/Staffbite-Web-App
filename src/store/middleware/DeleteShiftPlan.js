import { API, Auth } from "aws-amplify";
import { API_HOSTNAME, DELETE_SHIFTPLAN } from "../../constants/ApiConstants";
import { thunkFetchShiftplans } from "./FetchShiftplans";
export function thunkDeleteShiftPlan(ShiftplanId) {
  return async function deleteShiftPlan(dispatch, getState) {
    Auth.currentAuthenticatedUser().then( user => {
      const apiName = API_HOSTNAME; // replace this with your api name.
      const path = DELETE_SHIFTPLAN; //replace this with the path you have configured on your API
      const myInit = { // OPTIONAL
          body: user.attributes,
          queryStringParameters: {
            id: ShiftplanId
          }
      };
      return API.post(apiName, path, myInit)
      })
      .then( response => {
        dispatch(thunkFetchShiftplans())
      });
  }
};