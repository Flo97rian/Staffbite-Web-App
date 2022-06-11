import _ from "lodash";
import { Auth, API } from "aws-amplify";
import { API_HOSTNAME, FETCH_SHIFTPLANS_FOR_EMPLOYEE } from "../../constants/ApiConstants";
import { settingEmployees, settingPlansFetching, settingPlansFulfilled, settingPlansRejected, settingShiftplans } from "../../reducers/DB";
import { resettingShiftplanChanged } from "../../reducers/shiftplanChanged";
export function thunkFetchShiftplansForEmployee() {
    return async function FetchShiftplansForEmployee(dispatch, getState) {
        Auth.currentAuthenticatedUser().then( user => {
            const apiName = API_HOSTNAME; // replace this with your api name.
            const path = FETCH_SHIFTPLANS_FOR_EMPLOYEE; //replace this with the path you have configured on your API
            const myInit = { // OPTIONAL
                body: user.attributes
            };
            dispatch(settingPlansFetching())
            return API.post(apiName, path, myInit)
            })
            .then(response => {
                    let plans = response.map(item => {
                        return {
                            id: item.SK["S"],
                            name: item.name["S"],
                            plan: JSON.parse(item.data["S"]),
                            schichtentag: item.schichtentag["N"],
                            zeitraum: item.zeitraum["S"],
                            startOfWeek: item?.startOfWeek?.S || '',
                            endOfWeek: item?.endOfWeek?.S || '',
                            tauschanfrage: JSON.parse(item.tauschanfrage["S"])
                        };
                    });
                    // Add your code here
                    dispatch(settingShiftplans(plans));
                    dispatch(settingPlansFulfilled());
                    dispatch(resettingShiftplanChanged())
            })
            .catch(error => {
                dispatch(settingPlansRejected());
            })
    };
};