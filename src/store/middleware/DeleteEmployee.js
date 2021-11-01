import { API, Auth } from "aws-amplify";
import { API_HOSTNAME, DELETE_EMPLOYEE } from "../../constants/ApiConstants";
import { FetchEmployees } from "./FetchEmployees";
  export function thunkDeleteEmployee(employeeId) {
    // Löscht einen Mitarbeiter aus der Datenbank
    return async function deleteEmployee(dispatch, getState) {
      const apiName = API_HOSTNAME; // replace this with your api name.
      const path = DELETE_EMPLOYEE; //replace this with the path you have configured on your API
      const myInit = { // OPTIONAL
          headers: {
          Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
        },
        queryStringParameters: {
          id: employeeId,
        } // OPTIONAL
      };
      await API.post(apiName, path, myInit)
      dispatch(FetchEmployees)
      }
  }