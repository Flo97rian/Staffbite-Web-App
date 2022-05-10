import * as _ from 'lodash';
/**
 * Returns the Shifts min. Qualification if exsits else returns false
 *
 * @param {array} plan
 * @param {number} index
 * @param {string} WeekDayOfShift
 * @returns {string or boolean}
 */
 export default function getShiftsRequiredQualification(plan, index, WeekDayOfShift) {
    return  _.get(plan, "[" + index + "][" + WeekDayOfShift + "].prio", false)
}