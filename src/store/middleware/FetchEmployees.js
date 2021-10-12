import { API, Auth } from "aws-amplify";
import constants from "../constants";
import _ from "lodash";

    // Läd alle Mitarbeiter aus der Datenbank
    export async function FetchEmployees(dispatch, getState) {
        const apiName = constants.env.apiGatewayPath; // replace this with your api name.
        const path = '/employee/getall'; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            headers: {
            Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
          }}; 
  
    const response = await API.get(apiName, path, myInit)
    let employees = {}
    response.Items.forEach(item => {
        employees[item.SK["S"]]  = {
            frei: item.frei["BOOL"],
            name: item.name["S"],
            aktiv: item.aktiv["BOOL"],
            id: item.SK["S"],
            email: item.email["S"],
            stundenlohn: item.stundenlohn["N"],
            zielmtleuro: item.zielmtleuro["N"],
            akutellerverdienst: item.akutellerverdienst["N"],
            zielmtlh: item.zielmtlh["N"],
            ueberstunden: item.ueberstunden["BOOL"],
            erfahrung: item.erfahrung["S"],
            schichtenwoche: item.schichtenwoche["N"],
            position: JSON.parse(item.position["S"]),
            bewerbungen: JSON.parse(item.bewerbungen["S"])
        };
    });
        dispatch({type: "All/Employees", payload: employees})
      };