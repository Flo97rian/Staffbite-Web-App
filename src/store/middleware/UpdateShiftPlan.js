import { API, Auth } from "aws-amplify";
import { thunkFetchShiftplans } from "./FetchShiftplans";
import { API_HOSTNAME, UPDATE_SHIFTPLAN } from "../../constants/ApiConstants";
import { resettingShiftplan } from "../../reducers/Shiftplan";
import { resettingCurrentShiftplanIndex } from "../../reducers/currentShiftPlan";
import { resettingDisplayShiftplan } from "../../reducers/display";
import { resettingShiftplanChanged } from "../../reducers/shiftplanChanged";
import { resettingShiftSlot } from "../../reducers/ShiftSlot";
import { resettingEmployeesDummyshifts } from "../../reducers/DB";
import { resettingUpdateType } from "../../reducers/temporary";

export function thunkUpdateShiftPlan(shiftplan, reload = !1) {
  return async function updateShiftPlan(dispatch, getState) {
    const state = getState();
    const index = state.shiftSlot.index;
    const day = state.shiftSlot.day;
    const updateType = state.temporary.updateType;
    dispatch(resettingEmployeesDummyshifts())
    Auth.currentAuthenticatedUser().then( user => {
      const apiName = API_HOSTNAME; // replace this with your api name.
      const path = UPDATE_SHIFTPLAN; //replace this with the path you have configured on your API
      const myInit = { // OPTIONAL
          body: {
              type: updateType,
              index: index,
              day: day,
              shiftplan: shiftplan,
              user: user.attributes,
          }
      };
      return API.post(apiName, path, myInit)
      })
    .then(response => {
      dispatch(thunkFetchShiftplans());
      dispatch(resettingUpdateType());
      dispatch(resettingShiftplanChanged())
      if(reload) {
        dispatch(resettingDisplayShiftplan())
        dispatch(resettingShiftplan());
        dispatch(resettingShiftSlot())
        dispatch(resettingCurrentShiftplanIndex())
        dispatch(resettingShiftplanChanged())
      }
    })
  }
}