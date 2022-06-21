import { API, Auth } from "aws-amplify";
import { thunkFetchEmployees } from "./FetchEmployees";
import { API_HOSTNAME, UPDATE_EMPLOYEE } from "../../constants/ApiConstants";
import store from "../../store";

export function thunkUpdateEmployee(employeeID = false) { 
  // Aktualisiert einen Mitarbeiter in der Datenbank
  return async function updateEmployee(dispatch, getState) {
    Auth.currentAuthenticatedUser().then( user => {
      const state = getState();
      const Employee = employeeID ? state.DB.employees[employeeID] : state.DB.employees[state.temporary.employeeID];
      console.log(Employee);
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
      if(employeeID) {
        console.log("not reload");
      }

      if(!employeeID) {
        dispatch(thunkFetchEmployees());  
      }
    })
  }
}