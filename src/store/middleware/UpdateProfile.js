import { API, Auth } from "aws-amplify";
import { FetchOrg } from "./FetchOrg";
import { API_HOSTNAME, UPDATE_ORGANISATION } from "../../constants/ApiConstants";

export function thunkUpdateProfile(profile) {
  return async function updateProfile(dispatch, getState) {
    const apiName = API_HOSTNAME; // replace this with your api name.
    const path = UPDATE_ORGANISATION; //replace this with the path you have configured on your API
    const myInit = { // OPTIONAL
        headers: {
        Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
      },
      body: profile
    };
    await API.post(apiName, path, myInit)
    dispatch(FetchOrg)
    }
  }
