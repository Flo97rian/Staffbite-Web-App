import { API, Auth } from "aws-amplify";
import constants from "../constants";

    // Läd alle Mitarbeiter aus der Datenbank
    export async function FetchOrg(dispatch, getState) {
        const apiName = constants.env.apiGatewayPath; // replace this with your api name.
        const path = '/organisation/get-profile'; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            headers: {
            Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
          }}; 
  
        const response = await API.get(apiName, path, myInit)
        dispatch({type: "All/GetOrgDetails", payload: response.Item})
      };