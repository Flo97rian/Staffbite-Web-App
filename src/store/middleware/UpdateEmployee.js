import { API, Auth } from "aws-amplify";
import { FetchEmployees } from "./FetchEmployees";
import constants from "../constants";

export function thunkUpdateEmployee(updatedEmployee) { 
    // Aktualisiert einen Mitarbeiter in der Datenbank
    return async function updateEmployee(dispatch, getState) {
        const apiName = constants.env.apiGatewayPath; // replace this with your api name.
        const path = '/employee/update'; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            headers: {
            Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
          },
          body: updatedEmployee
        };
        await API.post(apiName, path, myInit)
        dispatch(FetchEmployees)
      }
}