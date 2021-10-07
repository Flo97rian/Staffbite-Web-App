import { API, Auth } from "aws-amplify";
import constants from "../constants";
import { FetchEmployees } from "./FetchEmployees";
  export function thunkDeleteEmployee(employeeId) {
    // Löscht einen Mitarbeiter aus der Datenbank
    return async function deleteEmployee(disptach, getState) {
      const apiName = constants.env.apiGatewayPath; // replace this with your api name.
      const path = '/employee/delete'; //replace this with the path you have configured on your API
      const myInit = { // OPTIONAL
          headers: {
          Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
        },
        queryStringParameters: {
          id: employeeId,
        } // OPTIONAL
      };
      await API.post(apiName, path, myInit)
      disptach(FetchEmployees)
      }
  }