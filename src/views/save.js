var AWS = require('aws-sdk');
AWS.config.apiVersions = {
  dynamodb: '2012-08-10',
  // other service API versions
};
var dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
    let ORG = "ORG#" + event.requestContext.authorizer["claims"]["custom:TenantId"]
    let body = JSON.parse(event.body)
    let shiftPlan = await getShiftPlan(ORG, body)
    let employees = await getEmployeeDetails(ORG)
    let idreview = body.replace("Freigeben", "Review")
    const minerfahrung = 2;
    const getShifts = 2;
    let plan = await JSON.parse(shiftPlan.Item.data.S);
    let copyShiftPlan = plan
    let shiftsOrderedByDay = await shiftHasApplicant({plan, minerfahrung});
    let allEmployees = await getEmployeeDetails(ORG)
    let lookUpUser = await createUserDetailsLookUp(allEmployees)
    shiftsOrderedByDay = await forEachWeekDay({shiftsOrderedByDay, minerfahrung, copyShiftPlan, lookUpUser})
    let reviewShiftPlan = await mergeReviewShiftplan(shiftsOrderedByDay, copyShiftPlan)
    console.log(reviewShiftPlan);
    console.log("plan", reviewShiftPlan);
    await setReviewShiftPlan({reviewShiftPlan, idreview, shiftPlan, ORG})
     
      const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify("Done"),
    };
    return response
};


async function getShiftPlan(PK, SK) {
         var params = {
      Key: {
       "PK": {
         S: PK
        }, 
       "SK": {
         S: SK
        }
      }, 
      TableName: "Staffbite-DynamoDB"
     };
     var data = await dynamodb.getItem(params, function(err, data) {
       if (err) console.log(err, err.stack); // an error occurred
       else     console.log(data); // successful response
     }).promise();
    return data
}

function shiftHasApplicant({plan, minerfahrung}) {
     let shifts = filterShifts(plan);
     console.log(shifts);
     let shiftsWithApplicants = filterShiftsPerDay({shifts, plan, minerfahrung});
     return shiftsWithApplicants
     
}

function filterShifts(plan) {
        let keys = Object.keys(plan[0]);
        keys.shift()
        var shiftsDay = {}
        keys.forEach((item, index) => {
            shiftsDay[item] = {};
     });
     return shiftsDay;
}

function filterShiftsPerDay({shifts, plan, minerfahrung}) {
    let copyplan = plan
    let len = plan.length - 1
    copyplan.forEach((item, index) => {
        if (index == 0 || index == 1 || index == len) {
            return !1
        } else {
         inverseShiftPlan({item, shifts, plan, index, minerfahrung})
        }
    });
    return shifts
}


function inverseShiftPlan({item, shifts, plan, index, minerfahrung}) {
    let keys = Object.keys(shifts);
    keys.forEach(element => {
        setInverseDetails({item, plan, shifts, index, element, minerfahrung})
    })
    return shifts
}

function createInverseDetails({plan, index, item, element }) {
        let ShiftName = plan[index].Wochentag.ShiftName
        let ShiftStart = plan[index].Wochentag.ShiftStart
        let ShiftEnd = plan[index].Wochentag.ShiftEnd
        let frei = plan[index][element].frei
        let anzahl = plan[index][element].anzahl
        let applicants = plan[index][element]["applicants"]
        let setApplicants = {}
        let setValidApplicants = {}
        let sumMinErfahrung = 0
        let filled = !1
        return {ShiftName: ShiftName, filled:filled, ShiftStart:ShiftStart, ShiftEnd:ShiftEnd, anzahl:anzahl, applicants:applicants, sumMinErfahrung:sumMinErfahrung, frei: frei, setApplicants: setApplicants, setValidApplicants: setValidApplicants}
}

function setInverseDetails({plan, shifts, index, item, element, minerfahrung}) {
        let { ShiftName, ShiftStart, ShiftEnd, anzahl, applicants, sumMinErfahrung, frei, setApplicants, setValidApplicants} = createInverseDetails({plan, shifts, index, item, element})
        shifts[element][index + "#" + ShiftName + "#" + ShiftStart + "#" + ShiftEnd] = {anzahl:anzahl, sumMinErfahrung:sumMinErfahrung, frei: frei, minQualifikation: minerfahrung, setApplicants: setApplicants, setValidApplicants};
        if (applicants !== undefined) {shifts[element][index + "#" + ShiftName + "#" + ShiftStart + "#" + ShiftEnd]["applicants"] = applicants}
        return shifts
}

async function getEmployeeDetails(ORG) {
         var params = {
        TableName: "Staffbite-DynamoDB",
        KeyConditionExpression: "#PK = :PK AND begins_with(#SK, :SK)",
        ExpressionAttributeNames: { "#PK": "PK" , "#SK": "SK" }, 
        ExpressionAttributeValues: { 
          ":PK": {"S": ORG},
          ":SK": {"S": "EMP#"}
        },
     };
     var data = await dynamodb.query(params, function(err, data) {
       if (err) console.log(err, err.stack); // an error occurred
       else console.log(data); // successful response
     }).promise();
     return data
}

function forEachWeekDay({shiftsOrderedByDay, lookUpUser, minerfahrung, copyShiftPlan}) {
    for (let [weekDay, singleShift] of Object.entries(shiftsOrderedByDay)) {
        console.log("before", shiftsOrderedByDay[weekDay])
        shiftsOrderedByDay[weekDay] = testAlg({weekDay, singleShift, lookUpUser})
        console.log("after", shiftsOrderedByDay[weekDay])
        //for (let [shift, details] of Object.entries(singleShift)) {
        //    console.log("singleShift", singleShift);
        //    shiftsOrderedByDay[weekDay][shift] = createOverlapObject({singleShift, shift, details})
        //    console.log(shiftsOrderedByDay[weekDay][shift])
        //    shiftsOrderedByDay[weekDay][shift] = forEachShiftValue({singleShift, shift, lookUpUser, minerfahrung, copyShiftPlan, weekDay, details})
    
        
    //}
    
}
    return shiftsOrderedByDay
} 

function transformErfahrungToNumber(erfahrung) {
    if (erfahrung === "Anfänger") {return 1}
    else if (erfahrung === "Fortgeschritten") {return 2}
    else if (erfahrung === "Experte") {return 3}
    else {return !1}
}


function getEmployeeVerdienstInProzent(applicant, lookUpUser) {
    let aktuellerverdienst = getEmployeeDetail(applicant, lookUpUser, "akutellerverdienst", "N")
    let verdienstziel = getEmployeeDetail(applicant, lookUpUser, "zielmtleuro", "N")
    let verdienstInProzent = aktuellerverdienst / verdienstziel
    return verdienstInProzent
}

function testAlg({weekDay, singleShift, lookUpUser}) {
    let keys = Object.keys(singleShift)
    let len = keys.length
    let counter = 0;
    while (counter < len) {
        let currentShift = singleShift[keys[counter]]
        if (currentShift.applicants) {currentShift = getValidApplicants({singleShift, lookUpUser, currentShift})}
        let setted = {}
        for (let i = 0; i <= counter; i++) {
            let shift = singleShift[keys[i]]
            setSettedApplicants({setted, currentShift, shift})
            setValidApplicants({currentShift, shift, setted, lookUpUser})
            refractorShifts({shift, currentShift, lookUpUser, setted})
            //hasValidApplicants
            //hasApplicantsDoublicates
            //refractorShifts
        }
        counter++
    }
    updateEmployeesVerdienstForWeekDay({singleShift, lookUpUser})
    console.log("übersicht", singleShift)
    return singleShift
}

function refractorShifts({shift, currentShift, lookUpUser, setted}) {
    if (Object.keys(setted).length !== 0) {
        Object.keys(currentShift.setValidApplicants).forEach(applicant => {
       if (Object.keys(setted).includes(applicant) && Object.keys(currentShift.setValidApplicants).length <= currentShift.anzahl && Object.keys(shift.setValidApplicants).length > shift.anzahl) {
           console.log("hier könnte refractort werden")
       }
    })}
    // setted includes apllicant from setValidApplicants
    // shifthasValidApplicants > shift.anzahl && current.setApplicants < current.anzahl
    // shift.setApplicants delete settedapplicant
    // setApllicant next setValidApplicant
    // current.setApplicant set settedApplicant if in setValidApplicant
}
function setValidApplicants({currentShift, shift, setted, lookUpUser}) {
    Object.keys(currentShift.setValidApplicants).forEach(applicant => {
        if (Object.keys(currentShift.setApplicants).length < Number(currentShift.anzahl)) {
            if (!Object.keys(shift.setApplicants).includes(applicant) && Object.keys(shift.setValidApplicants).includes(applicant) && currentShift === shift && !Object.keys(setted).includes(applicant)) {
                currentShift.setApplicants[applicant] = currentShift.setValidApplicants[applicant]
        }} else if (Object.keys(currentShift.setApplicants).length >= Number(currentShift.anzahl)) {
                    console.log("not fair")
                    getLowestVerdienstApplicants({currentShift, applicant, lookUpUser})
    }})
    return currentShift
}

function setSettedApplicants({setted, currentShift, shift}) {
    let alreadysetted = getAlreadySettedApplicants({currentShift, shift})
    Object.keys(alreadysetted).forEach(id => {setted[id] = alreadysetted[id]})
    return alreadysetted = setted
}

function getAlreadySettedApplicants({currentShift, shift}) {
    let settedApplicants = {}
    for (let [id, name] of Object.entries(shift.setApplicants)) {
        if  (Object.keys(shift.setApplicants).includes(id) && shift !== currentShift) {
            settedApplicants[id] = name
        }
    }
    return settedApplicants
}



function getLowestVerdienstApplicants({currentShift, lookUpUser, applicant}) {
    let employeeverdienst = getEmployeeVerdienstInProzent(applicant, lookUpUser)
    Object.keys(currentShift.setApplicants).forEach(setapplicant => {
        if (getEmployeeVerdienstInProzent(setapplicant, lookUpUser) > employeeverdienst) {
            delete currentShift.setApplicants[setapplicant]
            currentShift.setApplicants[applicant] = currentShift.setValidApplicants[applicant]
        }
    })
    return currentShift
}

function getValidApplicants({singleShift, lookUpUser, currentShift, currentShift: {applicants, anzahl, setApplicants}}) {
    let keys = Object.keys(applicants)
    keys.forEach(applicant => {
        let anzahlApplicants = Object.keys(setApplicants).length
        if(employeeFulfillsMinQualifikation({lookUpUser, currentShift, applicant}) && anzahlApplicants <= Number(anzahl)) {currentShift["setValidApplicants"][applicant] = applicants[applicant] ;console.log("found Valid Applicant", applicant)
        }
    })
  return currentShift  
}

function employeeFulfillsMinQualifikation({applicant, singleShift, lookUpUser, currentShift: {applicants, minQualifikation}}) {
        let erfahrung = checkEmployeeFulfillsMinQualifikation({applicant, lookUpUser, minQualifikation})
        console.log(erfahrung, applicants[applicant])
        return erfahrung
}


function checkEmployeeFulfillsMinQualifikation({applicant, lookUpUser, minQualifikation}) {
    let employeeErfahrung = getEmployeeErfahrung({applicant, lookUpUser})
    if (employeeErfahrung >= minQualifikation) {return !0} else {return !1}
}

function getEmployeeErfahrung({applicant, lookUpUser}) {
    let erfahrung = getEmployeeDetail(applicant, lookUpUser, "erfahrung", "S");
    let employeeErfahrung = transformErfahrungToNumber(erfahrung);
    return employeeErfahrung
}

function createUserDetailsLookUp(employeelist) {
    let lookUpUserDetails = {}
    for (const [key, value] of Object.entries(employeelist.Items)) {
        lookUpUserDetails[value["SK"]["S"]] = value
    }
    return lookUpUserDetails
}

function getEmployeeDetail(employee, lookUpUser, detail, type) {
    console.log(employee, typeof employee);
    let requiredDetail = lookUpUser[employee][detail][type]
    return requiredDetail
}

function getIndexFromShift(shift) {
    let index = shift.split("#")[0]
    return index
}

function updateEmployeesVerdienstForWeekDay({singleShift, lookUpUser}) {
    console.log("singleShift", singleShift)
        for (let [shiftday, shift] of Object.entries(singleShift)) {
            console.log("shiftday", shiftday)
            console.log("shift", shift)
            if (Object.keys(shift["setApplicants"]).length !== 0) {
             Object.keys(shift["setApplicants"]).forEach(applicant => {
                console.log("start", Date.parse('01 Jan 1970 ' + shiftday.split("#")[3] + ' GMT'))
                let workinghours = Date.parse('01 Jan 1970 ' + shiftday.split("#")[3] + ' GMT') - Date.parse('01 Jan 1970 ' + shiftday.split("#")[2] + ' GMT') 
                workinghours = workinghours / 3600000
                console.log("applicant workinghours", applicant, workinghours)
                // time abziehen bla bla 
                updateSingleEmployeeVerdienst(applicant, lookUpUser, workinghours)
        })}}
    console.log("userlookUp", lookUpUser)
    return lookUpUser   
}

function updateSingleEmployeeVerdienst(employee, lookUpUser, workinghours) {
    let aktuellerverdienst = lookUpUser[employee]["akutellerverdienst"]["N"]
    let stundenlohn = lookUpUser[employee]["stundenlohn"]["N"]
    console.log("before verdienst", lookUpUser[employee]["akutellerverdienst"]["N"])
    let verdienst = Number(workinghours) * Number(stundenlohn)
    console.log(verdienst)
    console.log(lookUpUser[employee]["akutellerverdienst"]["N"])
    lookUpUser[employee]["akutellerverdienst"]["N"] = Number(verdienst) + Number(aktuellerverdienst)
    console.log("after verdienst", lookUpUser[employee]["akutellerverdienst"]["N"])
    return lookUpUser
}


function mergeReviewShiftplan(shiftsOrderedByDay, copyShiftPlan) {
    for (const [weekDay, singleShift] of Object.entries(shiftsOrderedByDay)) {
        for (const [shift, details] of Object.entries(singleShift)) {
            let index = getIndexFromShift(shift)
            copyShiftPlan[index][weekDay] = details
    }}
    console.log("fertig", copyShiftPlan)
    return copyShiftPlan
}

function setReviewShiftPlan(config) {
    let {reviewShiftPlan, idreview, shiftPlan, ORG} = config
    let name = shiftPlan.Item.name["S"]
    let schichtentag = shiftPlan.Item.schichtentag["N"]
          var params = {
            Item: {
               PK: {
                 S: ORG
                }, 
               SK: {
                 S: idreview
                }, 
               data: {
                 S:  JSON.stringify(reviewShiftPlan)
               }, 
               name: {
                 S: name
                }, 
               schichtentag: {
                 N: schichtentag
                }
            },
  ReturnConsumedCapacity: "TOTAL", 
  TableName: "Staffbite-DynamoDB"
 };
 dynamodb.putItem(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log("done", data);
        }).promise();
    console.log("Done")
}
// goal: liste von pro tag von mitarbeitern die arbeiten