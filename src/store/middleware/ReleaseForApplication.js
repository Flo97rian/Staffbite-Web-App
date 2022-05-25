import { API, Auth } from "aws-amplify";
import { v4 as uuidv4 } from 'uuid';
import { thunkFetchShiftplans } from "./FetchShiftplans";
import moment from "moment";
import { API_HOSTNAME, RELEASE_SHIFTPLAN_FOR_APPLICATION } from "../../constants/ApiConstants";
import { resettingShiftplan } from "../../reducers/Shiftplan";
import { resettingCurrentShiftplanIndex } from "../../reducers/currentShiftPlan";
import { resettingDisplayShiftplan } from "../../reducers/display";
import { settingShiftplanReleased } from "../../reducers/SuccessMessages";
import { resettingProcessing, settingProcessingFulfilledRelease, settingProcessingRejectedRelease, settingProcessingStartRelease } from "../../reducers/processing";
import { settingRemindShiftplanID } from "../../reducers/temporary";
import { resettingDatePicker } from "../../reducers/DatePicker";

export function thunkReleaseForApplication() {
    return async function releaseForApplication(dispatch, getState) {
        const state = getState();
        const Shiftplan = state.Shiftplan;
        let id = state.Shiftplan.id;
        const uuid = uuidv4()
        let name = state.userInput.shiftplanName !== Shiftplan.name ? state.userInput.shiftplanName : Shiftplan.name;
        let newDate = state.date.start ? state.date.start : !1;
        let newId = "PLAN#Freigeben#" + uuid
        dispatch(settingProcessingStartRelease());
        dispatch(settingRemindShiftplanID(newId));
        Auth.currentAuthenticatedUser().then( user => {
            const apiName = API_HOSTNAME; // replace this with your api name.
            const path = RELEASE_SHIFTPLAN_FOR_APPLICATION; //replace this with the path you have configured on your API
            const myInit = { // OPTIONAL
                body: {
                    uuid: uuid,
                    id: id,
                    name: name,
                    newDate: newDate,
                    user: user.attributes,
                }
            };
            return API.post(apiName, path, myInit)
            })
            .then(response => {
                dispatch(thunkFetchShiftplans());
                dispatch(settingShiftplanReleased())
                dispatch(resettingDisplayShiftplan())
                dispatch(resettingCurrentShiftplanIndex())
                dispatch(resettingShiftplan());
                dispatch(resettingDatePicker())
                dispatch(resettingProcessing());
            })
            .catch(error => {
                dispatch(settingProcessingRejectedRelease());
            })
    }
}