import * as _ from 'lodash';
/**
 * Returns the Number of Employees within a Tenant
 *
 * @param {object} employees
 * @returns {number}
 */
 export default function getNumberOfEmployees(employees) {
    return  _.size(employees) || 0
}