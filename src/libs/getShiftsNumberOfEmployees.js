import * as _ from 'lodash';
/**
 * Returns the Number of Required Employees of a Shift (takes Monday as reference Value) if exsits else returns zero
 *
 * @param {array} plan
 * @param {number} index
 * @returns {number}
 */
 export default function getShiftsNumberOfEmployees(plan, index) {
    return  _.get(plan, "[" + index + "].Montag.anzahl", 0)
}