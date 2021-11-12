import { split } from "lodash";

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