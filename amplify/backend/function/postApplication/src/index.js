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

exports.handler = async (event) => {
    let body = JSON.parse(event.body);
    let user = body.user;
    let id = body.id;
    let planDB = await getShiftplan(user, id);
    let mitarbeiter = await getUser(user);
    if(mitarbeiter) {
        mitarbeiter.bewerbungen = JSON.parse(mitarbeiter.bewerbungen.S);
        mitarbeiter.schichten = JSON.parse(mitarbeiter.schichten.S);
    }
    let testDBPlan = JSON.parse(planDB.data["S"]);
    let {plan, employee } = await mergeShiftplans(testDBPlan, body.plan, mitarbeiter, planDB.zeitraum["S"]);
    await setUpdatedPlan(user, plan, body);
    await updateEmployeeBewerbungen(body, user, employee);
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify("Done!"),
    };
    return response;
};

const updateEmployeeBewerbungen = async (body, user, mitarbeiter) => {
    console.log(mitarbeiter);
    var empparams = {
    Key: {
    "PK": {
     "S": "ORG#" + user["custom:TenantId"]
    }, 
    "SK": {
     "S": mitarbeiter.SK["S"]
    }
    },
    ExpressionAttributeNames: {
    "#bewerbungen": "bewerbungen",
    "#schichten": "schichten",
    }, 
    ExpressionAttributeValues: {
                ":bewerbungen": {
                 "S": JSON.stringify(mitarbeiter.bewerbungen)
                },
                ":bewerbungen": {
                 "S": JSON.stringify(mitarbeiter.schichten)
                }
    }, 
    ReturnValues: "ALL_NEW", 
    TableName: "Staffbite-DynamoDB", 
    UpdateExpression: "SET #bewerbungen = :bewerbungen, #schichten = :schichten"
    };
    let data = null
    try {
        data = await dynamodb.updateItem(empparams).promise();
    } catch(error) {
        data = error
    }
    return data;
}

const getShiftplan = async (user, id) => {
    var plan = null
    var params = {
      Key: {
       "PK": {
         S: "ORG#" + user["custom:TenantId"]
        }, 
       "SK": {
         S: id
        }
      }, 
      TableName: "Staffbite-DynamoDB"
     };

    try {
        plan = await dynamodb.getItem(params).promise();
    } catch(error) {
        console.log(JSON.stringify(error))
    }
    return plan.Item;
}

const getUser = async (user) => {
    var params = {
      Key: {
       "PK": {
         S: "ORG#" + user["custom:TenantId"]
        }, 
       "SK": {
         S: "EMP#" + user.sub
        }
      }, 
      TableName: "Staffbite-DynamoDB"
     };
     
    var mitarbeiter = null

    try {
        mitarbeiter = await dynamodb.getItem(params).promise();
    } catch(error) {
        console.log(JSON.stringify(error))
    }
    return mitarbeiter.Item;
}


const setUpdatedPlan = async (user, plan, body) => {
    console.log("done", plan);
    var params = {
        Key: {
        "PK": {
         "S": "ORG#" + user["custom:TenantId"]
        }, 
        "SK": {
          "S": body.id
        }
    },
      ExpressionAttributeNames: {
       "#data": "data",
      }, 
      ExpressionAttributeValues: {
                    ":data": {
                     "S": JSON.stringify(plan)
                    }
      }, 
      ReturnValues: "ALL_NEW", 
      TableName: "Staffbite-DynamoDB", 
      UpdateExpression: "SET #data = :data"
        };
     
    var updated = null

    try {
        updated = await dynamodb.updateItem(params).promise();
    } catch(error) {
        updated = error
    }
    return updated;
}

const mergeShiftplans = async (planDB, planUser, currentEmployee, zeitraum) => {
    planDB.forEach((shiftRow, index) => {
        if(index !== 0 && index !== 1 && index !== planDB.length - 1) {
            for (let [key, value] of Object.entries(shiftRow)) {
                if(key !== "Wochentag") {
                    checkChange(planDB, planUser, index, key, currentEmployee, zeitraum)
                }
            }
        }
    })
    return {plan: planDB, employee: currentEmployee};
}

function checkChange(planDB, planUser, index, day, currentEmployee, zeitraum) {
    let ApplicantsDB = "applicants" in planDB[index][day] ? planDB[index][day].applicants : {};
    let ApplicantsEmployeePlan = "applicants" in planUser[index][day] ? planUser[index][day].applicants : {};
    
    if(JSON.stringify(ApplicantsDB) !== JSON.stringify(ApplicantsEmployeePlan)) {
        const deleteEmployees = Object.keys(ApplicantsDB).filter( employeeId => ApplicantsEmployeePlan[employeeId] === undefined);
        const addEmployees = Object.keys(ApplicantsEmployeePlan).filter( employeeId => ApplicantsDB[employeeId] === undefined);
        
        //delete outdate Employees
        deleteEmployees.forEach((employeeId => {
            if(Object.keys(planDB[index][day]).includes("applicants")) {
                delete planDB[index][day].applicants[employeeId];    
            }
        }))
        
        //addNewEmployees to Shiftplan
        addEmployees.forEach((employeeId) => {
            if(!Object.keys(planDB[index][day]).includes("applicants")) {
                planDB[index][day].applicants = {};
            }
            planDB[index][day].applicants[employeeId] = planUser[index][day].applicants[employeeId]
        })
        
        // add CurrentEmployee to Shiftplan
        if(ApplicantsEmployeePlan[currentEmployee.SK.S]) {
            if(!Object.keys(planDB[index][day]).includes("applicants")) {
                planDB[index][day].applicants = {};
            }
            planDB[index][day].applicants[currentEmployee.SK.S] = currentEmployee.name.S;
            
            const ShiftName = planDB[index].Wochentag.ShiftName;
            const WeekDay = planDB[1][day];
            
            if(currentEmployee.bewerbungen[zeitraum]) {
                currentEmployee.bewerbungen[zeitraum].push(index + '#' + ShiftName + '#' + WeekDay);
            }
            
            if(!currentEmployee.bewerbungen[zeitraum]) {
                currentEmployee.bewerbungen[zeitraum] = [index + '#' + ShiftName + '#' + WeekDay];
            }
        }
    }
    
    
    
    //get Users and DBs shiftSlot
    let ApplicantsAfterPublishDB = "applicantsAfterPublish" in planDB[index][day] ? planDB[index][day].applicantsAfterPublish : {};
    let ApplicantsAfterPublishEmployeePlan = "applicantsAfterPublish" in planUser[index][day] ? planUser[index][day].applicantsAfterPublish : {};
    
    
    
    //check if Shiftslot changed and update
    if(JSON.stringify(ApplicantsAfterPublishDB) !== JSON.stringify(ApplicantsAfterPublishEmployeePlan)) {
        const deleteEmployees = Object.keys(ApplicantsAfterPublishDB).filter( employeeId => ApplicantsAfterPublishEmployeePlan[employeeId] === undefined);
        const addEmployees = Object.keys(ApplicantsAfterPublishEmployeePlan).filter( employeeId => ApplicantsAfterPublishDB[employeeId] === undefined);
        
        //delete outdate Employees
        deleteEmployees.forEach((employeeId => {
            if(Object.keys(planDB[index][day]).includes("applicantsAfterPublish")) {
                delete planDB[index][day].applicantsAfterPublish[employeeId];    
            }
        }))
        
        //addNewEmployees to Shiftplan
        addEmployees.forEach((employeeId) => {
            if(!Object.keys(planDB[index][day]).includes("applicantsAfterPublish")) {
                planDB[index][day].applicantsAfterPublish = {};
            }
            planDB[index][day].applicantsAfterPublish[employeeId] = planUser[index][day].applicantsAfterPublish[employeeId]
        })
        
        // add CurrentEmployee to Shiftplan
        if(ApplicantsAfterPublishEmployeePlan[currentEmployee.SK.S]) {
            if(!Object.keys(planDB[index][day]).includes("applicantsAfterPublish")) {
                planDB[index][day].applicantsAfterPublish = {};
            }
            planDB[index][day].applicantsAfterPublish[currentEmployee.SK.S] = currentEmployee.name.S;
            
            const ShiftName = planDB[index].Wochentag.ShiftName;
            const WeekDay = planDB[1][day];
            if(currentEmployee.bewerbungen[zeitraum]) {
                currentEmployee.bewerbungen[zeitraum].push(index);
            }
            
            if(!currentEmployee.bewerbungen[zeitraum]) {
                currentEmployee.bewerbungen[zeitraum] = [index + '#' + ShiftName + '#' + WeekDay];
            }
                    console.log(currentEmployee)
        }
        
    };
    
        //get Users and DBs shiftSlot
    let setApplicantsAfterPublishDB = "setApplicants" in planDB[index][day] ? planDB[index][day].setApplicants : {};
    let setApplicantsAfterPublishEmployeePlan = "setApplicants" in planUser[index][day] ? planUser[index][day].setApplicants : {};
    
    
    
    //check if setApplicants Shiftslot changed and update
    if(JSON.stringify(setApplicantsAfterPublishDB) !== JSON.stringify(setApplicantsAfterPublishEmployeePlan)) {
        const deleteEmployees = Object.keys(setApplicantsAfterPublishDB).filter( employeeId => setApplicantsAfterPublishEmployeePlan[employeeId] === undefined);
        const addEmployees = Object.keys(setApplicantsAfterPublishEmployeePlan).filter( employeeId => setApplicantsAfterPublishDB[employeeId] === undefined);
        
        //delete outdate Employees
        deleteEmployees.forEach((employeeId => {
            if(Object.keys(planDB[index][day]).includes("setApplicants")) {
                delete planDB[index][day].setApplicants[employeeId];    
            }
        }))
        
        //addNewEmployees to Shiftplan
        addEmployees.forEach((employeeId) => {
            if(!Object.keys(planDB[index][day]).includes("setApplicants")) {
                planDB[index][day].setApplicants = {};
            }
            planDB[index][day].setApplicants[employeeId] = planUser[index][day].setApplicants[employeeId]
        })
        
        // add CurrentEmployee to Shiftplan
        if(setApplicantsAfterPublishEmployeePlan[currentEmployee.SK.S]) {
            if(!Object.keys(planDB[index][day]).includes("setApplicants")) {
                planDB[index][day].setApplicants = {};
            }
            planDB[index][day].setApplicants[currentEmployee.SK.S] = currentEmployee.name.S;
            
            const ShiftName = planDB[index].Wochentag.ShiftName;
            const WeekDay = planDB[1][day];
            if(currentEmployee.schichten[zeitraum]) {
                currentEmployee.schichten[zeitraum].push(index + '#' + ShiftName + '#' + WeekDay);
            }
            
            if(!currentEmployee.schichten[zeitraum]) {
                currentEmployee.schichten[zeitraum] = [index + '#' + ShiftName + '#' + WeekDay];
            }
        }
        
    };
    
    return {planDB, currentEmployee};
}