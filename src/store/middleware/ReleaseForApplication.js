import { API, Auth } from "aws-amplify";
import { v4 as uuidv4 } from 'uuid';
import { thunkFetchShiftplans } from "./FetchShiftplans";
import { API_HOSTNAME, RELEASE_SHIFTPLAN_FOR_APPLICATION } from "../../constants/ApiConstants";
import { resettingShiftplan } from "../../reducers/Shiftplan";
import { resettingCurrentShiftplanIndex } from "../../reducers/currentShiftPlan";
import { resettingDisplayShiftplan } from "../../reducers/display";
import { settingShiftplanReleased } from "../../reducers/SuccessMessages";
import { resettingProcessing, settingProcessingFulfilledRelease, settingProcessingRejectedRelease, settingProcessingStartRelease } from "../../reducers/processing";
import { settingRemindShiftplanID } from "../../reducers/temporary";
import { resettingDatePicker } from "../../reducers/DatePicker";
import addDays from "date-fns/addDays";
import toDate from "date-fns/toDate";
import parse from "date-fns/parse";
import parseISO from "date-fns/parseISO";
import getDate from "date-fns/getDate";
import getMonth from "date-fns/getMonth";
import getYear from 'date-fns/getYear';

export function thunkReleaseForApplication() {
    return async function releaseForApplication(dispatch, getState) {
        const state = getState();
        const Shiftplan = state.Shiftplan;
        let id = state.Shiftplan.id;
        const uuid = uuidv4()
        let name = state.userInput.shiftplanName !== Shiftplan.name ? state.userInput.shiftplanName : Shiftplan.name;

        
        let dateKeys = Object.keys(state.Shiftplan.plan[0]);
        let dateRow = {};
        dateKeys.shift();
        dateKeys.forEach((day, index) => {
            if(state?.date?.start) {
                let newDate = addDays(parseISO(state.date.start), index);
                dateRow[day] = getDate(newDate) + '.' + (getMonth(newDate) + 1) + '.' + getYear(newDate);
            }
        });
        dateRow["Wochentag"] = "Datum";
        let newDate = state.date.start ? dateRow : !1;
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