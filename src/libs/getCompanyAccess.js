import { Auth } from 'aws-amplify';
import * as _ from 'lodash';
import { LANGUAGES } from '../constants/Titles';
/**
 * Returns the selected Konfiguration of a Company based on if user is Admin or Employee
 *
 * @param {object} Meta
 * @returns {array}
 */

const access = {
    admin: [LANGUAGES.DE.NAV_DASHBOARD, LANGUAGES.DE.NAV_SHIFTPLAN, LANGUAGES.DE.NAV_EMPLOYEES, LANGUAGES.DE.NAV_SETTINGS],
    employee: [LANGUAGES.DE.NAV_DASHBOARD, LANGUAGES.DE.NAV_SHIFTPLAN, LANGUAGES.DE.NAV_PROFILE]
}
const getCompanyAccess = async (meta) => {
    let user = await Auth.currentAuthenticatedUser();
    const noUsername = _.isEmpty(_.get(user, "username", ""))
    const noTenantId = _.isEmpty(_.get(user, "attributes[custom:TenantId]", ""))
    const username = _.get(user, "username", "");
    const tenantId = _.get(user, "attributes[custom:TenantId]", "");
    const isAdmin = username === tenantId;
    const isEmployee = username !== tenantId;
    if(noUsername || noTenantId) 
        return []

    if(isAdmin) 
        return [...access.admin, ..._.get(meta, "accessCompany.admin", [])]

    if(isEmployee) 
        return [...access.employee, ..._.get(meta, "accessCompany.employee", [])]
}

export default getCompanyAccess;