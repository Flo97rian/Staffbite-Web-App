import * as _ from 'lodash';
/**
 * Returns the Number of Employees within a Tenant
 *
 * @param {array} shifttrades
 * @returns {number}
 */
 export default function getNumberOfShifttrades(shifttrades) {
    return  _.size(shifttrades) || 0
}