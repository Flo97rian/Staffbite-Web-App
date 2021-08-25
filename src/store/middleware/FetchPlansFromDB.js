import _ from "lodash";
import { API, Auth } from "aws-amplify";

export async function FetchFromDB(dispatch, getState) {
    const apiName = 'api00f496d2'; // replace this with your api name.
    const path = '/schichtplan/getall'; //replace this with the path you have configured on your API
    const myInit = { // OPTIONAL
        headers: {
        Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
      } // OPTIONAL
    };
    return await API.get(apiName, path, myInit)
     .then(response => {
         console.log(response);
        let plans = _.map(response.Items, item => {
            return {
                id: item.SK["S"],
                name: item.name["S"],
                plan: JSON.parse(item.data["S"]),
                schichtentag: item.schichtentag["N"]
            };
        });
        // Add your code here
        dispatch({type: "All/GetPlansFromDB", payload: plans})
        })
}