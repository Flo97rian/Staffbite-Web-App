import { isObject } from "lodash";

export function getFirstApplicant(currentItem, applicantsType) {
    let FirstApplicant = !1;
    if (getHasApplicants(currentItem, applicantsType)) {
    FirstApplicant = currentItem[applicantsType][Object.keys(currentItem[applicantsType])[0]]
    let dividers = [" ", ", ", ","]
    let divider = dividers.find(substring => FirstApplicant.includes(substring));
        if (divider) {
            let copyFirstApplicant = currentItem[applicantsType][Object.keys(currentItem[applicantsType])[0]].split(divider);
            let FirstName = copyFirstApplicant[0]
            FirstApplicant = FirstName + " " + copyFirstApplicant[1].charAt(0) + "."
        }
    }
    return FirstApplicant
}

export function getApplicantsLength (currentItem, applicantsType) {
    let ApplicantsLength = 0;
        if (getHasApplicants(currentItem, applicantsType)) {
            ApplicantsLength = Object.keys(currentItem[applicantsType]).length
        }
    return ApplicantsLength;
    }

export function getHasPrio (currentItem) {
    let hasPrio = !1;
    let isObj = getIsObject(currentItem);
    if (isObj) {
        if ("prio" in currentItem ) {
            if (currentItem.prio !== !1) {
                hasPrio = !0;
            }
        }
    }
    return hasPrio;
}

export function getHasNotice (currentItem) {
    let hasNotice = !1;
    let isObj = getIsObject(currentItem);
    if (isObj) {
        if ("notice" in currentItem ) {
            if (currentItem.notice !== "") {
                hasNotice = !0;
            }
        }
    }
    return hasNotice;
}

export function getIsObject(currentItem) {
    let isObj = !1;
    if (typeof currentItem === "object") {
        isObj = !0;
    }
    return isObj;
}

export function getHasApplicants(currentItem, applicantsType) {
    let hasApplicantsType = !1;
    let isObj = getIsObject(currentItem);
    if (isObj) {
        if (applicantsType in currentItem) {
            if(Object.keys(currentItem[applicantsType]).length > 0) {
                hasApplicantsType = !0;
            } 
        } 
    }
    return hasApplicantsType;
}

export function getCompanyIsOpen(currentItem) {
    let frei = !1;
    if (currentItem.frei) {
        frei = !0;
    }
    return frei;
}


export function getAnzahl (anzahl) {
    let anzahlValue = !1;
    if (typeof anzahl === "object") {
        if ("anzahl" in anzahl) {
            anzahlValue = anzahl.anzahl
        }
    }
    return anzahlValue
}

export function getHasShiftName (currentItem) {
    let hasShiftName = !1;
    if (isObject(currentItem)) {
        if ("ShiftName" in currentItem) {
            hasShiftName = !0;
        }
    }
    return hasShiftName;
}

export function getSecondApplicant (currentItem, applicantsType) {
    let SecondApplicant = !1;
    if (getHasApplicants(currentItem, applicantsType)) {
        if(getApplicantsLength(currentItem, applicantsType) > 1) {
            SecondApplicant = currentItem[applicantsType][Object.keys(currentItem[applicantsType])[1]]
            let dividers = [" ", ", ", ","]
            let divider = dividers.find(substring => SecondApplicant.includes(substring));
                if (divider) {
                    let copyFirstApplicant = currentItem[applicantsType][Object.keys(currentItem[applicantsType])[1]].split(divider);
                    let FirstName = copyFirstApplicant[0]
                    SecondApplicant = FirstName + " " + copyFirstApplicant[1].charAt(0) + "."
                }
        }
    }
    return SecondApplicant;
}

export function setPrioValue (currentItem) {
    let prio = !1;
    if (getHasPrio) {
        prio = currentItem.prio;
    }
    return prio;
}

export function getUserMatchesPosition (currentUser, currentWeekday) {
    let matchesPosition = !1;
    if(currentUser.position.length > 0) {
        if (currentUser.position.includes(currentWeekday.ShiftPosition)) {
            matchesPosition = !0;
        };
    };
    return matchesPosition;
}


export function getUserMatchesPrio (currentItem, currentUser) {
    let matchesPrio = !1;
    if (getHasPrio(currentItem)) {
        if (currentItem.prio !== !1) {
            if (currentUser.qualifikation === currentItem.prio) {
                matchesPrio = !0;
            }
        }
    }
    return matchesPrio;
}

export function getShiftIncludesApplicant (currentItem, currentUser, applicantsType) {
    let shiftIncludesApplicant = !1;
    if (getHasApplicants(currentItem, applicantsType)) {
        if (currentUser.SK in currentItem[applicantsType]) {
            shiftIncludesApplicant = !0;
        }
    }
    return shiftIncludesApplicant;
}