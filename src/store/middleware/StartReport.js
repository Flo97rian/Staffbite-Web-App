import { API, Auth } from "aws-amplify";
import { API_HOSTNAME, START_REPORTING } from "../../constants/ApiConstants";

export function thunkStartReport(filter) {
    const auswahl = filter
    return async function startReport(dispatch, getState) {
        Auth.currentAuthenticatedUser().then( user => {
            const apiName = API_HOSTNAME; // replace this with your api name.
            const path = START_REPORTING; //replace this with the path you have configured on your API
            const myInit = { // OPTIONAL
                body: {
                    auswahl: auswahl,
                    user: user.attributes,
                }
            };
            return API.post(apiName, path, myInit)
            })
        .then( 
            response => {
            let employees = {}
            response.forEach(item => {
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
                    position: item.position["S"],
                    bewerbungen: JSON.parse(item.bewerbungen["S"]),
                    bewerbungscount: item.bewerbungscount,
                    schichtencount: item.schichtencount
                    }});
            dispatch({type: "All/Report", payload: employees});
            dispatch({type: "stopFetchingReport"});
            }
        )
    }
}