exports.transformErfahrungToNumber = (erfahrung) => {
    console.log(erfahrung);
    if (erfahrung === "Anfänger") {return 1}
    else if (erfahrung === "Fortgeschritten") {return 2}
    else if (erfahrung === "Experte") {return 3}
    else {return !1}
    }

exports.getEmployeeVerdienstInProzent = (applicant, lookUpUser) => {
    let aktuellerverdienst = exports.getUserDetail(applicant, lookUpUser, "akutellerverdienst", "N");
    let verdienstziel = exports.getUserDetail(applicant, lookUpUser, "zielmtleuro", "N");
    let verdienstInProzent = aktuellerverdienst / verdienstziel;
    return verdienstInProzent;
    }
    
exports.updateApplicantGotShift = (applicant, lookUpUser) => {
        lookUpUser[applicant].shifts += 1;
        return lookUpUser
    
}

exports.updateApplicantRemoveShift = (applicant, lookUpUser) => {
    lookUpUser[applicant].shifts -= 1;
}

exports.isApplicantShiftMax = (lookUpUser, applicant) => {
    let isMax = !1
    if ( Object.keys(lookUpUser[applicant]).includes("shifts")) {
    isMax = Number(lookUpUser[applicant]["shifts"]) >= Number(lookUpUser[applicant]["schichtenwoche"]["N"]) ? !0 : !1
    return isMax
    }
    return isMax;
}

exports.isApplicantsMax = (setApplicants, maxApplicants) => {
    const setApplicantsLength = Number(Object.keys(setApplicants).length);
    const numberMaxApplicants = Number(maxApplicants);
    
    const isMax = setApplicantsLength >= numberMaxApplicants ? !0 : !1
    return isMax;
}

exports.isValidApplicant = ({applicant, singleShift, lookUpUser, currentShift: {applicants, minQualifikation}}) => {
        let erfahrung = exports.checkErfahrung({applicant, lookUpUser, minQualifikation});
        return erfahrung;
}

exports.checkErfahrung = ({applicant, lookUpUser, minQualifikation}) => {
    let employeeErfahrung = exports.getEmployeeErfahrung({applicant, lookUpUser});
    const employeeErfahrungMatchesMinQualifikation = employeeErfahrung >= minQualifikation;
    return employeeErfahrungMatchesMinQualifikation
}

exports.getEmployeeErfahrung = ({applicant, lookUpUser}) => {
    console.log(applicant)
    let erfahrung = exports.getUserDetail(applicant, lookUpUser, "erfahrung", "S");
    let employeeErfahrung = exports.transformErfahrungToNumber(erfahrung);
    return employeeErfahrung;
}

exports.getUserDetail = (employee, lookUpUser, detail, type) => {
    let requiredDetail = lookUpUser[employee][detail][type];
    return requiredDetail;
}

exports.updateEmployeesVerdienst = (singleShift, lookUpUser) => {
        for (let [shiftday, shift] of Object.entries(singleShift)) {
            const hasSetApplicants = Object.keys(shift["setApplicants"]).length > 0 ? !0 : !1
            if (hasSetApplicants) {
             Object.keys(shift["setApplicants"]).forEach(applicant => {
                let workinghours = Date.parse('01 Jan 1970 ' + shiftday.split("#")[3] + ' GMT') - Date.parse('01 Jan 1970 ' + shiftday.split("#")[2] + ' GMT') ;
                workinghours = workinghours / 3600000;
                exports.updateEmployeeVerdienst(applicant, lookUpUser, workinghours);
        })}}
    return lookUpUser;
}

exports.updateEmployeesShift = (singleShift, lookUpUser) => {
        for (let [shiftday, shift] of Object.entries(singleShift)) {
            const hasSetApplicants = Object.keys(shift["setApplicants"]).length > 0 ? !0 : !1
            if (hasSetApplicants) {
             Object.keys(shift["setApplicants"]).forEach(applicant => {
                exports.updateApplicantGotShift(applicant, lookUpUser);
        })}}
    return lookUpUser;
}

exports.handleUpdateEmployeeVerdienst = (currentShift, applicant, lookUpUser, shiftName) => {
        let workinghours = Date.parse('01 Jan 1970 ' + shiftName.split("#")[3] + ' GMT') - Date.parse('01 Jan 1970 ' + shiftName.split("#")[2] + ' GMT') ;
        workinghours = workinghours / 3600000;
        exports.updateEmployeeVerdienst(applicant, lookUpUser, workinghours);
    return lookUpUser
}

exports.removeEmployeesVerdienst = (singleShift, lookUpUser) => {
        for (let [shiftday, shift] of Object.entries(singleShift)) {
            const hasSetApplicants = Object.keys(shift["setApplicants"]).length > 0 ? !0 : !1
            if (hasSetApplicants) {
             Object.keys(shift["setApplicants"]).forEach(applicant => {
                let workinghours = Date.parse('01 Jan 1970 ' + shiftday.split("#")[3] + ' GMT') - Date.parse('01 Jan 1970 ' + shiftday.split("#")[2] + ' GMT') ;
                workinghours = workinghours / 3600000;
                exports.removeEmployeeVerdienst(applicant, lookUpUser, workinghours);
        })}}
    return lookUpUser;
}

exports.updateEmployeeVerdienst = (employee, lookUpUser, workinghours) => {
    let aktuellerverdienst = lookUpUser[employee]["akutellerverdienst"]["N"];
    let stundenlohn = lookUpUser[employee]["stundenlohn"]["N"];
    let verdienst = Number(workinghours) * Number(stundenlohn);
    lookUpUser[employee]["akutellerverdienst"]["N"] = Number(verdienst) + Number(aktuellerverdienst);
    return lookUpUser;
}

exports.removeEmployeeVerdienst = (employee, lookUpUser, workinghours) => {
    let aktuellerverdienst = lookUpUser[employee]["akutellerverdienst"]["N"];
    let stundenlohn = lookUpUser[employee]["stundenlohn"]["N"];
    let verdienst = Number(workinghours) * Number(stundenlohn);
    lookUpUser[employee]["akutellerverdienst"]["N"] = Number(aktuellerverdienst) - Number(verdienst) ;
    return lookUpUser;
}