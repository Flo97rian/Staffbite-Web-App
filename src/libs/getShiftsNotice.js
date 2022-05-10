import * as _ from 'lodash';
/**
 * Returns the Notice of a Shift if exsits else returns an empty string
 *
 * @param {array} plan
 * @param {number} index
 * @param {string} WeekDayOfShift
 * @returns {string}
 */
 export default function getShiftsNotice(plan, index, WeekDayOfShift) {
    return  _.get(plan, "[" + index + "][" + WeekDayOfShift + "].notice", "")
}