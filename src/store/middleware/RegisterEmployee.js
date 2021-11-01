import { API, Auth } from "aws-amplify";
import { checkerfahrung } from "../../components/Admin/MitarbeiterVerwalten/processing/CheckErfahrung";
import { FetchEmployees } from "./FetchEmployees";
import { API_HOSTNAME, REGISTER_EMPLOYEE } from "../../constants/ApiConstants";

export function thunkRegisterEmployee(Employee) {
return async function registerEmployee(dispatch, getState) {
    const apiName = API_HOSTNAME; // replace this with your api name.
    const path = REGISTER_EMPLOYEE; //replace this with the path you have configured on your API
    const myInit = { // OPTIONAL
        headers: {
        Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
      }, // OPTIONAL
      body: Employee
    };
    await API.post(apiName, path, myInit)
    dispatch(FetchEmployees)
    }
}