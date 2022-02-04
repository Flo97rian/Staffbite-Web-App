import { API, Auth } from "aws-amplify";
import { API_HOSTNAME, DELETE_SHIFTPLAN } from "../../constants/ApiConstants";
import { FetchFromDB } from "./FetchPlansFromDB";

export function thunkDeleteShiftPlan({index, Plans}) {
  return async function deleteShiftPlan(dispatch, getState) {
    const plans = { Plans }
    const shiftplanIndex = { index }
    Auth.currentAuthenticatedUser().then( user => {
      const apiName = API_HOSTNAME; // replace this with your api name.
      const path = DELETE_SHIFTPLAN; //replace this with the path you have configured on your API
      const myInit = { // OPTIONAL
          body: user.attributes,
          queryStringParameters: {
            id: plans.Plans[shiftplanIndex.index].id
          }
      };
      return API.post(apiName, path, myInit)
      })
      .then( response => {
        dispatch(FetchFromDB)
      });
  }
};