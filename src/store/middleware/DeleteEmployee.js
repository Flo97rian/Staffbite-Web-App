import { API, Auth } from "aws-amplify";
import { API_HOSTNAME, DELETE_EMPLOYEE } from "../../constants/ApiConstants";
import { FetchEmployees } from "./FetchEmployees";
  export function thunkDeleteEmployee(employeeId) {
    return async function deleteEmployee(dispatch, getState) {
    Auth.currentAuthenticatedUser().then( user => {
      const apiName = API_HOSTNAME; // replace this with your api name.
      const path = DELETE_EMPLOYEE; //replace this with the path you have configured on your API
      const myInit = { // OPTIONAL
          body: user.attributes,
          queryStringParameters: {
            id: employeeId,
          }
      };
      return API.post(apiName, path, myInit)
      })
      .then(response => {
        dispatch(FetchEmployees)
      })
  };
};