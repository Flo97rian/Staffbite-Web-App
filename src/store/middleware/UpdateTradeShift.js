import { API, Auth } from "aws-amplify";
import { API_HOSTNAME, UPDATE_EMPLOYEE_POST_TRADE } from "../../constants/ApiConstants";
import { thunkFetchShiftplansForEmployee } from "./FetchShiftplansForEmployee";

export function thunkUpdateTradeShift(plan) {
  return async function updateTradeShift(dispatch, getState) {
    const state = getState();
    const Shiftplan = state.Shiftplan;
    Auth.currentAuthenticatedUser().then( user => {
      const apiName = API_HOSTNAME; // replace this with your api name.
      const path = UPDATE_EMPLOYEE_POST_TRADE; //replace this with the path you have configured on your API
      const myInit = { // OPTIONAL
          body: {
              shiftplan: Shiftplan,
              user: user.attributes,
          }
      };
      return API.post(apiName, path, myInit)
      })
    .then(response => {
      dispatch(thunkFetchShiftplansForEmployee());
    })
    }
  }