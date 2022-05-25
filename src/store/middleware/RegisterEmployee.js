import { API, Auth } from "aws-amplify";
import { thunkFetchEmployees } from "./FetchEmployees";
import { API_HOSTNAME, REGISTER_EMPLOYEE } from "../../constants/ApiConstants";

export function thunkRegisterEmployee(Employee) {
return async function registerEmployee(dispatch, getState) {
  Auth.currentAuthenticatedUser().then( user => {
    const apiName = API_HOSTNAME; // replace this with your api name.
    const path = REGISTER_EMPLOYEE; //replace this with the path you have configured on your API
    const myInit = { // OPTIONAL
        body: {
          user: user.attributes,
          employee: Employee
        }
    };
    return API.post(apiName, path, myInit)
    })
    .then(response => {
      dispatch(thunkFetchEmployees());
    })
  }
};