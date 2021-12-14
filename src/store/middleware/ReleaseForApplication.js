import { API, Auth } from "aws-amplify";
import { v4 as uuidv4 } from 'uuid';
import { FetchFromDB } from "./FetchPlansFromDB";
import moment from "moment";
import { API_HOSTNAME, RELEASE_SHIFTPLAN_FOR_APPLICATION } from "../../constants/ApiConstants";
import shiftplanStates from "../../components/Application/defaults/ShiftplanDefault";

export function thunkReleaseForApplication(shiftplan, NewDate, userInput) {
    return async function releaseForApplication(dispatch, getState) {
        let id = shiftplan.id;
        let name = userInput.name !== shiftplan.name ? userInput.name : shiftplan.name;
        let newDate = NewDate ? NewDate : !1;
        Auth.currentAuthenticatedUser().then( user => {
            const apiName = API_HOSTNAME; // replace this with your api name.
            const path = RELEASE_SHIFTPLAN_FOR_APPLICATION; //replace this with the path you have configured on your API
            const myInit = { // OPTIONAL
                body: {
                    uuid: uuidv4(),
                    id: id,
                    name: name,
                    newDate: newDate,
                    user: user.attributes,
                }
            };
            return API.post(apiName, path, myInit)
            })
            .then(response => {
                dispatch(FetchFromDB);
                dispatch({type: "stopFetchingRelaese"});
                dispatch({type: "stopShiftPlanIsActive"});
                dispatch({type: "stopShiftPlanIsImported"});
                dispatch({type: "ResetCurrentShiftPlan"});
                dispatch({type: "resetShiftplan"});
            })
    }
}