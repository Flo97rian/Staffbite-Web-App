import { API, Auth } from "aws-amplify";
import { thunkFetchOrg } from "./FetchOrg";
import { API_HOSTNAME, UPDATE_DEMO, UPDATE_ORGANISATION } from "../../constants/ApiConstants";
import { settingMetaFetching, settingMetaRejected } from "../../reducers/DB";
import { thunkFetchDemo } from "./FetchDemo";
import { settingIsAdmin } from "../../reducers/currentUser";
import { settingDemoIsAdmin } from "../../reducers/demo";
import { resettingShiftplanChanged } from "../../reducers/shiftplanChanged";

export function thunkUpdateDemo(profile) {
  return async function updateDemo(dispatch, getState) {
    const state = getState();
    const demoAdmin = state.demo.demoAdmin;
    const demo = {...state.demo, demoAdmin: {...demoAdmin, isAdmin: false}};
      const apiName = API_HOSTNAME; // replace this with your api name.
      const path = UPDATE_DEMO; //replace this with the path you have configured on your API
      const myInit = { // OPTIONAL
          body: demo
      };
      return API.post(apiName, path, myInit)
    .then(response => {
        dispatch(thunkFetchDemo());
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        if(Object.keys(params).length > 1) {
          var url = window.location.href;
          const newUrl = url.slice(0, url.lastIndexOf('&'));
          window.location.href = newUrl;
        }
        dispatch(resettingShiftplanChanged());
    })
    .catch(error => {
      console.log(error);
    })
  }
}
