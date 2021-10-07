import { API, Auth } from "aws-amplify";
import { checkerfahrung } from "../../components/Admin/MitarbeiterVerwalten/processing/CheckErfahrung";
import { FetchEmployees } from "./FetchEmployees";
import constants from "../constants";

export function thunkRegisterEmployee({employeeIsActive}) {
    const erfahrung = checkerfahrung({employeeIsActive})
    const neuerMitarbeiter = employeeIsActive
return async function registerEmployee(dispatch, getState) {
    const apiName = constants.env.apiGatewayPath; // replace this with your api name.
    const path = '/register'; //replace this with the path you have configured on your API
    const myInit = { // OPTIONAL
        headers: {
        Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
      },
      queryStringParameters: {
        erfahrung: erfahrung,
      }, // OPTIONAL
      body: neuerMitarbeiter
    };
    await API.post(apiName, path, myInit)
    dispatch(FetchEmployees)
    }
}