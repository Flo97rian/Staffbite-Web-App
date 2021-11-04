/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_STAFFBITEDYNAMODB_ARN
	STORAGE_STAFFBITEDYNAMODB_NAME
	STORAGE_STAFFBITEDYNAMODB_STREAMARN
Amplify Params - DO NOT EDIT */

var AWS = require('aws-sdk');
AWS.config.apiVersions = {
  dynamodb: '2012-08-10',
  // other service API versions
};
var dynamodb = new AWS.DynamoDB();
const { 
    getShiftPlan,
    getEmployeeDetails,
    setReviewShiftPlan
} = require('./DB.js');

const { preprocessing } = require("./preprocessing.js")
const { mergeReviewShiftplan } = require("./mergeEnd.js")
const { 
    isApplicantsMax,
    isApplicantShiftMax,
    updateApplicantGotShift,
    isValidApplicant,
    getUserDetail,
    updateEmployeesVerdienst,
    updateEmployeesShift,
    removeEmployeesVerdienst,
    } = require("./processing.js")

exports.handler = async (event) => {
    // preprocessing
    const {
        ORG,
        shiftPlan,
        idreview,
        minerfahrung,// wenn gegeben
        copyShiftPlan,
        shiftsOrderedByDay,
        lookUpUser,
        reverse,
        stundenerfassung
    } = await preprocessing(event);
    console.log(reverse, stundenerfassung)
    //Algorithmus
    let filledShiftData = await forEachWeekDay({shiftsOrderedByDay, minerfahrung, copyShiftPlan, lookUpUser, reverse, stundenerfassung});
    let filledShiftPlan = filledShiftData[0]
    let filledShifts = filledShiftData[1]
    let shiftcount = filledShiftData[2] - 7
    console.log(filledShifts / shiftcount);
    //merge and clean
    const reviewShiftPlan = await mergeReviewShiftplan(filledShiftPlan, copyShiftPlan);
    await setReviewShiftPlan({reviewShiftPlan, idreview, shiftPlan, ORG});
    
    //response
      const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify("Befüllung done"),
    };
    return response
};

// Aufbau der Data Structure für den Algorithmus
function forEachWeekDay({shiftsOrderedByDay, lookUpUser, minerfahrung, copyShiftPlan, reverse, stundenerfassung}) {
    let keys = Object.keys(shiftsOrderedByDay)
    let filledShifts = 0
    let shiftcount = 0
    if(reverse) {
        keys.reverse().forEach( key => {
            // for each day of the week, the alg sets the applicants. One after another
            let singleShift = shiftsOrderedByDay[key];
            let weekDay = key
            let alg = testAlg({weekDay, singleShift, lookUpUser, filledShifts, stundenerfassung});
            shiftsOrderedByDay[weekDay] = alg[0]
            filledShifts += alg[1]
            shiftcount +=alg[2]
        })
    return [shiftsOrderedByDay, filledShifts, shiftcount];
    }
    
    console.log(keys)
    for (let [weekDay, singleShift] of Object.entries(shiftsOrderedByDay)) {
        // for each day of the week, the alg sets the applicants. One after another
        let alg = testAlg({weekDay, singleShift, lookUpUser, filledShifts, stundenerfassung});
        shiftsOrderedByDay[weekDay] =alg[0]
        filledShifts += alg[1]
        shiftcount +=alg[2]
        
        }
    return [shiftsOrderedByDay, filledShifts, shiftcount];
    }

//Algorithmus Version 0
   function testAlg({weekDay, singleShift, lookUpUser, stundenerfassung}) {
    let keys = Object.keys(singleShift);
    let len = keys.length;
    let counter = 0;
    let shiftcount = 0
    let setted = {};
    while (counter < len) {
        let currentShift = singleShift[keys[counter]];
        shiftcount += Number(currentShift.anzahl)
        if (currentShift.applicants) {currentShift = getValidApplicants({singleShift, lookUpUser, currentShift})}
        let zeroSetApplicants =  Object.keys(currentShift.setApplicants).length === 0 ? !0 : !1
        let shiftName = keys[counter]
        if (zeroSetApplicants) {
            setValidApplicants({currentShift, setted, lookUpUser, shiftName, stundenerfassung})
            let newSettedApplicants = setSettedApplicants(currentShift)
            if (Object.keys(setted).length > 0) {
                let merged = {...setted, ...newSettedApplicants}
                setted = merged
            } else {
                setted = newSettedApplicants
            }
        }
        for (let i = 0; i < counter; i++) {
            let shift = singleShift[keys[i]];
            let hasSettedApplicants = Object.keys(setted).length > 0 ? !0 : !1
            let sameShift = i == counter
            if (hasSettedApplicants && !sameShift) {
                console.log(weekDay, keys[counter], keys[i], currentShift, shift)
                let refratored = refractorShifts({shift, currentShift, lookUpUser, setted, stundenerfassung});
                currentShift = {...refratored[1]}
                let newSettedApplicantsShift = setSettedApplicants(refratored[0])
                let newSettedApplicantsCurrentShift = setSettedApplicants(currentShift)
                let merged = {...setted, ...newSettedApplicantsCurrentShift, ...newSettedApplicantsShift}
                setted = merged
            }
            console.log(weekDay, keys[counter], keys[i], currentShift, shift)
        }
        if (stundenerfassung) {
            updateEmployeesVerdienst(singleShift, lookUpUser)
        }
        counter++
    }
    let filledShifts  = Object.keys(setted).length
    return [singleShift, filledShifts, shiftcount];
}

// wenn es die möglichkeit gibt die Mitarbeiter:innen an einem Tag besser zu Verteilen - strukturiert diese Funktion die mitarbeiterinnen neu
function refractorShifts({shift, currentShift, lookUpUser, setted, stundenerfassung}) {
        const currentShiftNeedsApplicants = countApplicantsWithoutAlreadySetted(currentShift, setted) <= currentShift.anzahl
        const NotSameShift = currentShift !== shift;
        const shiftHasEnoughValidApplicants = Object.keys(shift.setValidApplicants).length > shift.anzahl
        Object.keys(currentShift.setValidApplicants).forEach(applicant => {
        const settedApplicantsIncludesApplicant = Object.keys(setted).includes(applicant)
        const settedThisShift = Object.keys(shift.setApplicants).includes(applicant)
        if (settedApplicantsIncludesApplicant && currentShiftNeedsApplicants && shiftHasEnoughValidApplicants && NotSameShift && settedThisShift) {
            swapApplicants(shift, currentShift, applicant, lookUpUser, setted, stundenerfassung)
            }
        })
        return [shift, currentShift,lookUpUser]
}

function swapApplicants(shift, currentShift, applicant, lookUpUser, setted, stundenerfassung) {
    let lowestNotSettedFromShift = !1
        if (stundenerfassung) {
            lowestNotSettedFromShift = getLowestVerdienstApplicant(shift,lookUpUser, setted, 0)   
        } else {
            lowestNotSettedFromShift = getLowestShiftsApplicant(shift,lookUpUser, setted, 0)
        }
    if ( lowestNotSettedFromShift !== !1) {
        const shiftfilled = isApplicantsMax(currentShift.setApplicants, currentShift.anzahl);
        const lowestNotShiftsMax = isApplicantShiftMax(lookUpUser, lowestNotSettedFromShift);
        if (!shiftfilled && !lowestNotShiftsMax) {
            console.log("swap", lowestNotSettedFromShift, applicant)
            shift.setApplicants[lowestNotSettedFromShift] = shift.setValidApplicants[lowestNotSettedFromShift];
            updateApplicantGotShift(lowestNotSettedFromShift, lookUpUser)
            currentShift.setApplicants[applicant] = currentShift.setValidApplicants[applicant];
            delete shift.setApplicants[applicant]
            
        }
    }
    return {shift:shift, currentShift:currentShift, lookUpUser:lookUpUser}
}

function countApplicantsWithoutAlreadySetted(shift, setted) {
    let notSettedArr = []
    for (const [key, value] of Object.entries(shift.setValidApplicants)) {
        const isSetted = Object.keys(setted).includes(key)
        if (!isSetted) {
            notSettedArr.push(key)
        }
    }
    return notSettedArr.length
    }
    
function getLowestShiftsApplicant(shift, lookUpUser, setted, i) {
    let notSettedArr = []
    for (const [key, value] of Object.entries(shift.setValidApplicants)) {
        const isMax = isApplicantShiftMax(lookUpUser, key);
        const isSetted = Object.keys(setted).includes(key)
    if (!isMax && !isSetted) {
            notSettedArr.push({id:key, shifts: Number(lookUpUser[key]["shifts"])})
        }
    }
    console.log(notSettedArr);
    if (notSettedArr.length > i) {
        notSettedArr.sort((a, b) => parseFloat(a.shifts) - parseFloat(b.shifts));
        console.log(notSettedArr);
        return notSettedArr[i].id
    } else {
        return !1
    }
}

function getLowestVerdienstApplicant(shift, lookUpUser, setted, i) {
    let notSettedArr = []
    for (const [key, value] of Object.entries(shift.setValidApplicants)) {
        const isMax = isApplicantShiftMax(lookUpUser, key);
        const isSetted = Object.keys(setted).includes(key)
    if (!isMax && !isSetted) {
            notSettedArr.push({id:key, akutellerverdienst: lookUpUser[key]["akutellerverdienst"]["N"]})
        }
    }
    if (notSettedArr.length > i) {
        notSettedArr.sort((a, b) => parseFloat(a.akutellerverdienst) - parseFloat(b.akutellerverdienst));
        return notSettedArr[i].id
    } else {
        return !1
    }
}

//Diese Funktion gibt einem Bewerber eine Schicht, wenn die Bedingungen erfüllt sind
function setValidApplicants({currentShift, setted, lookUpUser, shiftName, stundenerfassung}) {
        const currentAnzahl = Number(currentShift.anzahl)
        for (let i = 0; i < currentAnzahl; i++) {
        // set Values
            let applicant = !1
            if (stundenerfassung) {
                applicant = getLowestVerdienstApplicant(currentShift, lookUpUser, setted, i)
            } else {
                applicant = getLowestShiftsApplicant(currentShift, lookUpUser, setted, i)
            }
            let settedToday = Object.keys(setted).includes(applicant)
            if(applicant !== !1 && !settedToday) {
                    currentShift.setApplicants[applicant] = currentShift.setValidApplicants[applicant];
                    updateApplicantGotShift(applicant, lookUpUser)
                }
        else {
            console.log("Err: No Valid Applicant to Set")
        }
    }
    return currentShift;
}

// Diese Funktion speichert die bereits eingesetzten Bewerber
function setSettedApplicants(currentShift) {
    let alreadysetted = getAlreadySettedApplicants(currentShift);
    return alreadysetted
}


function getAlreadySettedApplicants(currentShift) {
    let settedApplicants = {};
    if (Object.keys(currentShift.setApplicants).length > 0) {
        for (let [id, name] of Object.entries(currentShift.setApplicants)) {
            settedApplicants[id] = name;
        }
    }
    return settedApplicants;
}


// Diese Funktion filtert alle Bewerber, die potenziell eine bestimmte Schicht erhalten dürfen, da diese die Voraussetzungen erfüllen
function getValidApplicants({singleShift, lookUpUser, currentShift, currentShift: {applicants, anzahl, setApplicants}}) {
    let keys = Object.keys(applicants);
    let validApplicants = Object.values(applicants);
    keys.forEach(applicant => {
        let anzahlApplicants = Object.keys(setApplicants).length;
        const applicantIsValid = isValidApplicant({lookUpUser, currentShift, applicant})
        const setApplicantsIsFilled =  anzahlApplicants >= Number(anzahl)
        if(applicantIsValid && !setApplicantsIsFilled) {
            currentShift["setValidApplicants"][applicant] = applicants[applicant];
        }
    });
  return currentShift;  
}


// goal: liste von pro tag von mitarbeitern die arbeiten
