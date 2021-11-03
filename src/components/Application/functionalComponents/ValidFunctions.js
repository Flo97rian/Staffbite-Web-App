export function isValidShiftplan (Shiftplan) {
    let hasShfitplan = !1;
    if (Shiftplan !== undefined) {
        if (Shiftplan !== !1) {
            hasShfitplan = !0;
        }
    }
    return hasShfitplan;
}

export function isValidUser (User) {
    let hasUser = !1;
    if (User !== undefined) {
        if (User !== !1) {
            hasUser = !0;
        }
    }
    return hasUser;
}

export function isValidPlans (Plans) {
    let hasPlans = !1;
    if (Plans !== undefined) {
        if (Plans !== !1) {
            hasPlans = !0;
        }
    }
    return hasPlans;
}

export function isValidEmployees (Employees) {
    let hasEmployees = !1;
    if (Employees !== undefined) {
        if (Employees !== !1) {
            hasEmployees = !0;
        }
    }
    return hasEmployees;
}

export function isActivePlan (currentPlan) {
    let isActive = !1;
    if (currentPlan !== undefined) {
        if (currentPlan !== !1) {
            isActive = !0;
        }
    }
    return isActive;
}

export function hasValidTauschanfragen (Shiftplan) {
    let hasTauschanfragen = !1;
    if ("tauschanfrage" in Shiftplan ) {
        if (Shiftplan.tauschanfrage.length > 0) {
            hasTauschanfragen = !0
        }
    }
    return hasTauschanfragen;
}