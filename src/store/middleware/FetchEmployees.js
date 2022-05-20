import { API, Auth } from "aws-amplify";
import { API_HOSTNAME, FETCH_ALL_EMPLOYEES } from "../../constants/ApiConstants";
import { settingEmployees, settingEmployeesFetching, settingEmployeesFulfilled, settingEmployeesRejected } from "../../reducers/DB";

    // Läd alle Mitarbeiter aus der Datenbank
    export async function FetchEmployees(dispatch, getState) {
        Auth.currentAuthenticatedUser().then( user => {
            const apiName = API_HOSTNAME; // replace this with your api name.
            const path = FETCH_ALL_EMPLOYEES; //replace this with the path you have configured on your API
            const myInit = { // OPTIONAL
                body: user.attributes
            };
            dispatch(settingEmployeesFetching())
            return API.post(apiName, path, myInit)
            })
            .then(response => {
                let employees = {};
                    response.Items.forEach(item => {
                        employees[item.SK.S]  = {
                            frei: item.frei.BOOL,
                            name: item.name.S,
                            aktiv: item.aktiv.BOOL,
                            id: item.SK.S,
                            email: item.email.S,
                            stundenlohn: item.stundenlohn.N,
                            zielmtleuro: item.zielmtleuro.N,
                            akutellerverdienst: item.akutellerverdienst.N,
                            zielmtlh: item.zielmtlh.N,
                            ueberstunden: item.ueberstunden.BOOL,
                            erfahrung: item.erfahrung.S,
                            schichtenwoche: item.schichtenwoche.N,
                            position: JSON.parse(item.position.S),
                            bewerbungen: JSON.parse(item.bewerbungen.S)
                        };
                        if(Object.keys(item).includes("onboarding")) {
                            employees[item.SK.S].onboarding = JSON.parse(item.onboarding.S)
                        }
                    });
                dispatch(settingEmployeesFulfilled())
                dispatch(settingEmployees(employees))
                })
            .catch(error => {
                dispatch(settingEmployeesRejected())
            })
    
      }