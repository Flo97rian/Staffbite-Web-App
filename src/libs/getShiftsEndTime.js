import * as _ from 'lodash';
/**
 * Returns the End Time of a Shift if exsits else returns an empty string
 *
 * @param {array} plan
 * @param {number} index
 * @returns {string}
 */
 export default function getShiftsEndTime(plan, index) {
    return  _.get(plan, "[" + index + "].Wochentag.ShiftEnd", "")
}