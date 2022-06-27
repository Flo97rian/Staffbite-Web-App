import { API, Auth } from "aws-amplify";
import { API_HOSTNAME, CREATE_DEMO } from "../../constants/ApiConstants";
import { v4 as uuidv4 } from 'uuid';

export function thunkCreateDemo(id = false) {
  return async function createDemo(dispatch, getState) {
    const newID = id ? id : uuidv4();
    const apiName = API_HOSTNAME; // replace this with your api name.
    const path = CREATE_DEMO; //replace this with the path you have configured on your API
    const myInit = {
        body: newID
    };
    console.log(newID);
    return API.post(apiName, path, myInit)
    .then(response => {
      console.log(newID);
        console.log(response);
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = urlSearchParams.entries();
        console.log(newID);
        urlSearchParams.append("id", newID);
        var url = window.location.href;
        console.log(newID);
        window.location.href = url + "?" + urlSearchParams;
    })
    .catch(error => {
        console.log(error);
    })
  }
}