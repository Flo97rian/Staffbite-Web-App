import { API } from "aws-amplify";
import { API_HOSTNAME, FETCH_DEMO } from "../../constants/ApiConstants";
import { settingDemoAdmin, settingDemoEmployees, settingDemoFetched, settingDemoId, settingDemoIsAdmin, settingDemoMeta, settingDemoPlans } from "../../reducers/demo";

export function thunkFetchDemo(Id = false) { 
    return async function FetchDemo(dispatch, getState) {
        const state = getState();
        const demoId = Id ? Id : state.demo.demoId;
        const isAdmin = state.demo.demoAdmin.isAdmin;
        const apiName = API_HOSTNAME; // replace this with your api name.
        const path = FETCH_DEMO; //replace this wi
        const myInit = { // OPTIONAL
            body: demoId
        };
        return API.post(apiName, path, myInit)
        .then(response => {
            response?.Item?.demoId["S"] ? dispatch(settingDemoId(response.Item.demoId["S"])) : dispatch(settingDemoEmployees(""));
            response?.Item?.demoEmployees["S"] ? dispatch(settingDemoEmployees(JSON.parse(response.Item.demoEmployees["S"]))) : dispatch(settingDemoEmployees([]));
            response?.Item?.demoMeta["S"] ? dispatch(settingDemoMeta(JSON.parse(response.Item.demoMeta["S"]))) : dispatch(settingDemoMeta({}));
            response?.Item?.demoPlans["S"] ? dispatch(settingDemoPlans(JSON.parse(response.Item.demoPlans["S"]))) : dispatch(settingDemoPlans([]));
            response?.Item?.demoAdmin["S"] ? dispatch(settingDemoAdmin(JSON.parse(response.Item.demoAdmin["S"]))) : dispatch(settingDemoEmployees([]));
            if(isAdmin) {
                dispatch(settingDemoIsAdmin());
            }
            if(response?.Item?.demoAdmin) {
                let demoAdmin = JSON.parse(response.Item.demoAdmin["S"]);
                if(!("securityQuestionId" in demoAdmin) || demoAdmin.securityQuestionId === false) {
                    dispatch(settingDemoIsAdmin());
                }
            }
            dispatch(settingDemoFetched());
          })

        .catch(error => {
            console.log(error);
        })
      };
};