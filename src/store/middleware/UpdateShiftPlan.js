import { API, Auth } from "aws-amplify";
import { FetchFromDB } from "./FetchPlansFromDB";
import { API_HOSTNAME, UPDATE_SHIFTPLAN } from "../../constants/ApiConstants";

export function thunkUpdateShiftPlan(shiftplan, reload = !1) {
  return async function updateShiftPlan(dispatch, getState) {
    Auth.currentAuthenticatedUser().then( user => {
      const apiName = API_HOSTNAME; // replace this with your api name.
      const path = UPDATE_SHIFTPLAN; //replace this with the path you have configured on your API
      const myInit = { // OPTIONAL
          body: {
              shiftplan: shiftplan,
              user: user.attributes,
          }
      };
      return API.post(apiName, path, myInit)
      })
    .then(response => {
      dispatch(FetchFromDB);
      if(reload) {
        dispatch({type: "stopShiftPlanIsActive"});
        dispatch({type: "stopShiftPlanIsImported"});
        dispatch({type: "resetShiftplan"});
        dispatch({ type: "ResetShiftSlot"});
        dispatch({type: "ResetCurrentShiftPlan"});
        dispatch({type: "resetShiftplanChanged"});
      }
    })
  }
}