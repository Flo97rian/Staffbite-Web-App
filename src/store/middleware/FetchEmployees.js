import { API, Auth } from "aws-amplify";
import _ from "lodash";

    // Läd alle Mitarbeiter aus der Datenbank
    export async function FetchEmployees(dispatch, getState) {
        const apiName = 'api00f496d2'; // replace this with your api name.
        const path = '/employee/getall'; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            headers: {
            Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
          }}; 
  
    const response = await API.get(apiName, path, myInit)
    let employees = _.map(response.Items, item => {
        return {
            frei: item.frei["BOOL"],
            name: item.name["S"],
            aktiv: item.aktiv["BOOL"],
            email: item.email["S"],
            stundenlohn: item.stundenlohn["N"],
            zielmtleuro: item.zielmtleuro["N"],
            akutellerverdienst: item.akutellerverdienst["N"],
            zielmtlh: item.zielmtlh["N"],
            ueberstunden: item.ueberstunden["BOOL"],
            id: item.SK["S"],
            erfahrung: item.erfahrung["S"],
            schichtenwoche: item.schichtenwoche["N"],
            position: item.position["S"]
        };
        });
        dispatch({type: "All/Employees", payload: employees})
      };