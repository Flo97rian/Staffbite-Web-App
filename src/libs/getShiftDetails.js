import * as _ from 'lodash';
/**
 * Returns the Details of a Shift (Shiftname, ShiftStart, ShiftEnd etc.)if exsits else returns an empty Object
 *
 * @param {array} plan
 * @param {number} index
 * @returns {object}
 */
 export default function getShiftDescriptionDetails(plan, index) {
    return  _.get(plan, "[" + index + "].Wochentag", {})
}