import { API } from "aws-amplify";
import { API_HOSTNAME, CREATE_DEMO } from "../../constants/ApiConstants";
import { v4 as uuidv4 } from 'uuid';
import { settingDemoIsAdmin, settingProcessingFullfilledCreateShiftplan } from "../../reducers/demo";

export function thunkCreateDemo(id = false) {
  return async function createDemo(dispatch, getState) {
    const newID = id ? id : uuidv4();
    const apiName = API_HOSTNAME; // replace this with your api name.
    const path = CREATE_DEMO; //replace this with the path you have configured on your API
    const myInit = {
        body: newID
    };
    return API.post(apiName, path, myInit)
    .then(response => {
        dispatch(settingProcessingFullfilledCreateShiftplan());
        const urlSearchParams = new URLSearchParams(window.location.search);
        urlSearchParams.append("id", newID);
        var url = window.location.href;
        dispatch(settingDemoIsAdmin());
        window.location.href = url + "?" + urlSearchParams;
        // setter
        localStorage.setItem('demoId', newID);

    })
    .catch(error => {
        dispatch(settingProcessingFullfilledCreateShiftplan());
        console.log(error);
    })
  }
}