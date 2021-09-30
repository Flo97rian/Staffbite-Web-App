import { API, Auth } from "aws-amplify";

    // Läd alle Mitarbeiter aus der Datenbank
    export async function FetchOrg(dispatch, getState) {
        const apiName = 'api00f496d2'; // replace this with your api name.
        const path = '/organisation/get-profile'; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            headers: {
            Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
          }}; 
  
        const response = await API.get(apiName, path, myInit)
        console.log(response)
        console.log("moin", response)
        dispatch({type: "All/GetOrgDetails", payload: response.Item})
      };