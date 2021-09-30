import _ from "lodash";
import { Auth, API } from "aws-amplify";
export async function FetchEmployeePlansFromDB(dispatch, getState) {
    const apiName = 'api00f496d2'; // replace this with your api name.
    const path = '/schichtplan/getfreigegeben'; //replace this with the path you have configured on your API
    const myInit = { // OPTIONAL
        headers: {
        Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
      } // OPTIONAL
    };
    return await API.get(apiName, path, myInit)
     .then(response => {
        let plans = _.map(response, item => {
            return {
                id: item.SK["S"],
                name: item.name["S"],
                plan: JSON.parse(item.data["S"]),
                schichtentag: item.schichtentag["N"],
                zeitraum: item.zeitraum["S"],
                tauschanfrage: JSON.parse(item.tauschanfrage["S"])
            };
        });
        // Add your code here
        console.log(plans)
        dispatch({type: "All/GetPlansForEmployee", payload: plans})
        })
    }