export function validName(userName) {
        let isValid = !1;
        let isPlaceholder = (userName === "Max Mustermann")
        if (!isPlaceholder) {
            let dividers = [" ", ", ", ","]
            let divider = dividers.find(substring => userName.includes(substring));
                if (divider) {
                    let splitName = userName.split(divider)
                    if (splitName.length > 1 && splitName[1] !== '') {
                        isValid = !0;
                    }
                }
        }
        return isValid;
    }

export function validEmail(userEmail) {
    let isValid = !1;
    let isPlaceholder = (userEmail === "max@mustermann.de")
    if (!isPlaceholder) {
        let at = "@"
        let point = "."
        let includesAt = userEmail.includes(at);
        let includesPoint = userEmail.includes(point);
            if (includesAt && includesPoint) {
                isValid = !0;
            }
    }
    return isValid;
}
export function validShiftplanName(shiftName) {
    let isValid = !0;
    let isEmpty = shiftName.length === 0;
    let NameLength = shiftName.length > 20;
    if (isEmpty || NameLength) {
        isValid = !1;
        }
    return isValid;
}
export function validShiftName(userName, placeholder) {
    let isValid = !0;
    let minShiftNameLength = userName.length < 0;
    let maxShiftNameLength = userName.length > 20;
    if (minShiftNameLength || maxShiftNameLength) {
        isValid = !1
        }
    return isValid;
}

export function shiftplanNameIsPlaceholder(shiftName) {
    let isValid = !1;
    let isPlaceholder = (shiftName === "Name")
    if (isPlaceholder) {
        isValid = !0;
            }
    return isValid;
}

export function shiftNameIsPlaceholder(shiftName, placeholder) {
    let isValid = !1;
    let isPlaceholder = (shiftName === "Name")
    if (isPlaceholder) {
        isValid = !0;
            }
    return isValid;
}



export function getMeta(Meta) {
    let isValid = !1;
    if (Meta !== undefined) {
        if (Meta !== !1) {
            isValid = !0;
        }    
    }
    return isValid;
}

export function getStundenerfassung(Stundenerfassung) {
    let isValid = !1;
    if (Stundenerfassung !== undefined) {
        if (Stundenerfassung !== !1) {
            isValid = !0;
        }    
    }
    return isValid;
}