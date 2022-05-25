import { API, Auth } from "aws-amplify";
import { thunkFetchOrg } from "./FetchOrg";
import { API_HOSTNAME, UPDATE_ORGANISATION } from "../../constants/ApiConstants";
import { settingMetaFetching, settingMetaRejected } from "../../reducers/DB";

export function thunkUpdateProfile(profile) {
  return async function updateProfile(dispatch, getState) {
    Auth.currentAuthenticatedUser().then( user => {
      const apiName = API_HOSTNAME; // replace this with your api name.
      const path = UPDATE_ORGANISATION; //replace this with the path you have configured on your API
      const myInit = { // OPTIONAL
          body: {
              org: profile,
              user: user.attributes,
          }
      };
      return API.post(apiName, path, myInit)
      })
    .then(response => {
        dispatch(thunkFetchOrg());
    })
    .catch(error => {
      dispatch(settingMetaRejected())
    })
  }
}
