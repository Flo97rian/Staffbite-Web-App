import * as _ from 'lodash';
/**
 * Returns the Name of a Shift if exsits else returns an empty string
 *
 * @param {array} plan
 * @param {number} index
 * @returns {string}
 */
 export default function getShiftsName(plan, index) {
    return  _.get(plan, "[" + index + "].Wochentag.ShiftName", "")
}