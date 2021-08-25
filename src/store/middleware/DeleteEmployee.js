import { API, Auth } from "aws-amplify";
import _ from "lodash";    
  export function thunkDeleteEmployee(employeeId) {
    // Löscht einen Mitarbeiter aus der Datenbank
    return async function deleteEmployee(disptach, getState) {
      const apiName = 'api00f496d2'; // replace this with your api name.
      const path = '/employee/delete'; //replace this with the path you have configured on your API
      const myInit = { // OPTIONAL
          headers: {
          Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
        },
        queryStringParameters: {
          id: employeeId,
        } // OPTIONAL
      };
      const response =  await API.post(apiName, path, myInit)
      }
  }