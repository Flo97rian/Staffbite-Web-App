import _ from "lodash";
import { API, Auth } from "aws-amplify";
import constants from "../constants";

export async function FetchFromDB(dispatch, getState) {
    Auth.currentSession().then( session => {
        const apiName = constants.env.apiGatewayPath; // replace this with your api name.
        const path = '/schichtplan/getall'; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            headers: {
            Authorizer:`Bearer ${session.getIdToken().getJwtToken()}`,
        }
        };
        return API.get(apiName, path, myInit)
        })
        .then(response => {
            let plans = response.Items.map(item => {
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
            dispatch({type: "All/GetPlansFromDB", payload: plans})
            dispatch({type: "stopFetchPlansFromDB"})
            })
        
}