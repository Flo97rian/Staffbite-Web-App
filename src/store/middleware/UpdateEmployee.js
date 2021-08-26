import { API, Auth } from "aws-amplify";
export function thunkUpdateEmployee(updatedEmployee) { 
    // Aktualisiert einen Mitarbeiter in der Datenbank
    return async function updateEmployee(dispatch, getState) {
        const apiName = 'api00f496d2'; // replace this with your api name.
        const path = '/employee/update'; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            headers: {
            Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
          },
          body: updatedEmployee
        };
        await API.post(apiName, path, myInit)
      }
}