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
        const org = {
          name: response.Item.name["S"],
          stundenerfassung: response.Item.stundenerfassung["BOOL"],
          abrechnungstart: response.Item.AbrechnungStart["S"],
          fair: response.Item.fair["BOOL"],
          abrechnungende: response.Item.AbrechnungEnde["S"],
          reverse: response.Item.reverse["BOOL"],
          schichten: JSON.parse(response.Item.schichten["S"]),
        }
        dispatch({type: "setMeta", payload: org})
      };