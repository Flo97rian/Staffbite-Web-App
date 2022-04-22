import { API, Auth } from "aws-amplify";
import { FetchFromDB } from "./FetchPlansFromDB";
import { API_HOSTNAME, DEMO_ALGORITHM } from "../../constants/ApiConstants";

export function thunkStartDemoAlg(plan, employees) {
    return async function startDemoAlg(dispatch, getState) {
        const apiName = API_HOSTNAME; // replace this with your api name.
        const path = DEMO_ALGORITHM; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            body: {
                plan: plan,
                employees: employees,
            }
        };
        return API.post(apiName, path, myInit)
        .then(response => {
            return response;
        })
    }
}