import { API, Auth } from "aws-amplify";
import { FetchOrg } from "./FetchOrg";
import constants from "../constants";

export function thunkUpdateProfile(profile) {
  return async function updateProfile(dispatch, getState) {
    const apiName = constants.env.apiGatewayPath; // replace this with your api name.
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
