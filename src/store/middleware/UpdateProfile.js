import { API, Auth } from "aws-amplify";
import { FetchOrg } from "./FetchOrg";

export function thunkUpdateProfile(profile) {
  return async function updateProfile(dispatch, getState) {
    console.log(profile)
    const apiName = 'api00f496d2'; // replace this with your api name.
    const path = '/organisation/profile'; //replace this with the path you have configured on your API
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
