import { API, Auth } from "aws-amplify";
import { thunkFetchShiftplans } from "./FetchShiftplans";
import { API_HOSTNAME, SEND_REMINDER_FOR_APPLICATION } from "../../constants/ApiConstants";
import { resettingShiftplan } from "../../reducers/Shiftplan";
import { resettingCurrentShiftplanIndex } from "../../reducers/currentShiftPlan";
import { resettingDisplayShiftplan } from "../../reducers/display";
import { settingSendReminderForApplication, settingShiftplanReleased } from "../../reducers/SuccessMessages";
import { settingRemindShiftplanID } from "../../reducers/temporary";
import { resettingProcessing, settingProcessingRejectedSendReminderForApplication, settingProcessingStartSendReminderForApplication } from "../../reducers/processing";
import { resettingModal } from "../../reducers/modal";

export function thunkSendReminderForApplication() {
    return async function sendReminderForApplication(dispatch, getState) {
        const state = getState();
        let zeitraum = state.Shiftplan.zeitraum;
        dispatch(settingProcessingStartSendReminderForApplication());
        dispatch(settingRemindShiftplanID(state.Shiftplan.id));
        Auth.currentAuthenticatedUser().then( user => {
            const apiName = API_HOSTNAME; // replace this with your api name.
            const path = SEND_REMINDER_FOR_APPLICATION; //replace this with the path you have configured on your API
            const myInit = { // OPTIONAL
                body: {
                    zeitraum: zeitraum,
                    user: user.attributes,
                }
            };
            return API.post(apiName, path, myInit)
            })
            .then(response => {
                dispatch(thunkFetchShiftplans());
                dispatch(settingSendReminderForApplication())
                dispatch(resettingDisplayShiftplan())
                dispatch(resettingModal());
                dispatch(resettingCurrentShiftplanIndex())
                dispatch(resettingShiftplan());
                dispatch(resettingProcessing());
            })
            .catch(error => {
                dispatch(settingProcessingRejectedSendReminderForApplication());
                console.log(error);
            })
    }
}