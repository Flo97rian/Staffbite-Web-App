import { API, Auth } from "aws-amplify";
import { v4 as uuidv4 } from 'uuid';
import { FetchFromDB } from "./FetchPlansFromDB";
import constants from "../constants";

export function thunkReleaseForApplication(Plans, currentShiftPlan, NewDate) {
    return async function releaseForApplication(dispatch, getState) {
        var id = Plans[currentShiftPlan].id;
        var newDate = NewDate ? NewDate : !1;
        const apiName = constants.env.apiGatewayPath; // replace this with your api name.
        const path = '/schichtplan/freigeben'; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            headers: {
                Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
        },
            body: {
                uuid: uuidv4(),
                id: id,
                newDate: newDate
            }
        };
        await API.post(apiName, path, myInit)
        dispatch(FetchFromDB)
        dispatch({type: "stopFetchingRelaese"})
        dispatch({type: "stopShiftPlanIsActive"})
        dispatch({type: "stopShiftPlanIsImported"})
        dispatch({type: "ResetCurrentShiftPlan"})
    }
}