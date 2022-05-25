import { Auth } from 'aws-amplify';
import * as _ from 'lodash';
import { LANGUAGES } from '../constants/Titles';
import Einstellungen from '../views/MainViews/Admin/Einstellungen';
import Schichtplan from "../views/MainViews/Admin/Schichtplan"
import MitarbeiterVerwalten from '../views/MainViews/Admin/MitarbeiterVerwalten';
import { adminroutes, userroutes } from '../routes';
/**
 * Returns an array of Routes based on Companys Access Settings
 *
 * @param {object} companyAccess
 * @returns {array}
 */

const createCompanyRoutes = async (companyAccess) => {
    let user = await Auth.currentAuthenticatedUser();
    const noUsername = _.isEmpty(_.get(user, "username", ""))
    const noTenantId = _.isEmpty(_.get(user, "attributes[custom:TenantId]", ""))
    const username = _.get(user, "username", "");
    const tenantId = _.get(user, "attributes[custom:TenantId]", "");
    const isAdmin = username === tenantId;
    const isEmployee = username !== tenantId;
    if(noUsername || noTenantId) 
        return []

    if(isAdmin) {
        const routes = createRoutes(adminroutes, companyAccess, "/admin") 
        return routes
    }

    if(isEmployee) {
        const routes = createRoutes(userroutes, companyAccess, "/user")
        return routes
    }
}
var allRoutes = [
    {
        path: "/einstellungen",
        name: LANGUAGES.DE.NAV_SETTINGS,
        icon: "fas fa-cog",
        style: "text-primary",
        component: Einstellungen,
        layout: "/admin",
    },
    {
      path: "/schichtplan",
      name: LANGUAGES.DE.NAV_SHIFTPLAN,
      icon: "fas fa-calendar",
      style: "text-primary",
      component: Schichtplan,
      layout: "/admin",
    },
    {
      path: "/mitarbeiter",
      name: LANGUAGES.DE.NAV_EMPLOYEES,
      icon: "fas fa-users",
      style: "text-primary",
      component: MitarbeiterVerwalten,
      layout: "/admin",
    }
    ]

function createRoutes(initalRoutes, companyAccess, type) {
    let finalRoutes = [...initalRoutes];
    _.forEach(companyAccess, function(access) {
        _.forIn(allRoutes, function (value, key, allRoutes) {
            if (value.name === access && value.layout === type) {
                finalRoutes.push(allRoutes[key]);
            }
        })
    })
    return finalRoutes
}

export default createCompanyRoutes;