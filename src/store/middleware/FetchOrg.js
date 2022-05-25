import { API, Auth } from "aws-amplify";
import { API_HOSTNAME, FETCH_ORGANISATION } from "../../constants/ApiConstants";
import { settingMetaFetching, settingMetaFulfilled, settingMetaRejected } from "../../reducers/DB";
import { settingMeta } from "../../reducers/Meta";

export function thunkFetchOrg() { 
    // Läd alle Mitarbeiter aus der Datenbank
    return async function FetchOrg(dispatch, getState) {
      Auth.currentAuthenticatedUser().then( user => {
        const apiName = API_HOSTNAME; // replace this with your api name.
        const path = FETCH_ORGANISATION; //replace this wi
        const myInit = { // OPTIONAL
            body: user.attributes
        };
        dispatch(settingMetaFetching());
        return API.post(apiName, path, myInit)
        })
        .then(response => {
          let org = {
            name: response.Item.name["S"],
            stundenerfassung: response.Item.stundenerfassung["BOOL"],
            fair: response.Item.fair["BOOL"],
            reverse: response.Item.reverse["BOOL"],
            schichten: JSON.parse(response.Item.schichten["S"]),
            onboarding: JSON.parse(response.Item.onboarding["S"]),
          }
          if(Object.keys(response.Item).includes("newsfeed")) {
              org.newsfeed = JSON.parse(response.Item.newsfeed["S"])
          }
          if(Object.keys(response.Item).includes("vorname")) {
            org.vorname = response.Item.vorname["S"]
          }
          if(Object.keys(response.Item).includes("tenantCategorie")) {
            org.tenantCategorie = JSON.parse(response.Item.tenantCategorie["S"])
          }
          if(Object.keys(response.Item).includes("accessPosition")) {
            org.accessPosition = JSON.parse(response.Item.accessPosition["S"])
          }
          dispatch(settingMeta(org))
          dispatch(settingMetaFulfilled())
          })
        .catch(error => {
          dispatch(settingMetaRejected());
        })
      };
};