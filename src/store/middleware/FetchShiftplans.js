import { API, Auth } from "aws-amplify";
import { isBefore, isFuture, isPast, isThisWeek, startOfWeek } from "date-fns";
import { FETCH_ALL_PLANS, API_HOSTNAME, FETCH_SHIFTPLANS } from "../../constants/ApiConstants";
import { settingPlansFetching, settingPlansFulfilled, settingPlansRejected, settingShiftplans } from "../../reducers/DB";

export function thunkFetchShiftplans () {
    return async function FetchShiftplans(dispatch, getState) {
    Auth.currentAuthenticatedUser().then( user => {
        const apiName = API_HOSTNAME; // replace this with your api name.
        const path = FETCH_SHIFTPLANS; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            body: user.attributes
        };
        dispatch(settingPlansFetching())
        return API.post(apiName, path, myInit);
        }).then(response => {
            let plans = response.map(item => {
                return {
                    id: item.SK["S"],
                    name: item.name["S"],
                    plan: JSON.parse(item.data["S"]),
                    schichtentag: item.schichtentag["N"],
                    zeitraum: item.zeitraum["S"],
                    tauschanfrage: JSON.parse(item.tauschanfrage["S"])
                }
            });
            // Add your code here
            dispatch(settingShiftplans(plans));
            dispatch(settingPlansFulfilled())
            dispatch({type: "stopFetchPlansFromDB"});
        }).catch(error => {
            dispatch(settingPlansRejected())
        })        
}
}