import { API, Auth } from "aws-amplify";
import { API_HOSTNAME, FETCH_USER } from "../../constants/ApiConstants";

export async function getUser(dispatch, getState) {
    Auth.currentAuthenticatedUser().then( user => {
        const apiName = API_HOSTNAME; // replace this with your api name.
        const path = FETCH_USER; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            body: user.attributes
        };
        return API.post(apiName, path, myInit)
        })
        .then(response => {
            let user = {
                frei: response.Item.frei.BOOL,
                name: response.Item.name.S,
                aktiv: response.Item.aktiv.BOOL,
                SK: response.Item.SK.S,
                email: response.Item.email.S,
                stundenlohn: response.Item.stundenlohn.N,
                zielmtleuro: response.Item.zielmtleuro.N,
                akutellerverdienst: response.Item.akutellerverdienst.N,
                zielmtlh: response.Item.zielmtlh.N,
                ueberstunden: response.Item.ueberstunden.BOOL,
                erfahrung: response.Item.erfahrung.S,
                schichtenwoche: response.Item.schichtenwoche.N,
                position: JSON.parse(response.Item.position.S),
                bewerbungen: JSON.parse(response.Item.bewerbungen.S)
            };
            dispatch({type: "setUser", payload: user});
            })
        }