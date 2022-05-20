import { API, Auth } from "aws-amplify";
import { FetchEmployees } from "./FetchEmployees";
import { API_HOSTNAME, UPDATE_EMPLOYEE } from "../../constants/ApiConstants";
import store from "../../store";

export function thunkUpdateEmployee() { 
  // Aktualisiert einen Mitarbeiter in der Datenbank
  return async function updateEmployee(dispatch, getState) {
    Auth.currentAuthenticatedUser().then( user => {
      const state = getState();
      const Employee = state.DB.employees[state.temporary.employeeID];
      const apiName = API_HOSTNAME; // replace this with your api name.
      const path = UPDATE_EMPLOYEE; //replace this with the path you have configured on your API
      const myInit = { // OPTIONAL
          body: {
              employee: Employee,
              user: user.attributes,
          }
      };
      return API.post(apiName, path, myInit)
      })
    .then(response => {
      dispatch(FetchEmployees);
    })
  }
}