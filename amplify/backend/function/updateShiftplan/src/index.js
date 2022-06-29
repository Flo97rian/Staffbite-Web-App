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
    let type = body.type;
    let index = body.index;
    let day = body.day;
    let user = body.user;
    console.log(body);
    let shiftplan = body.shiftplan;
    await updateEmployeesSchichten(shiftplan, type, index, day, user, shiftplan.id)
    console.log(body)
 var params = {
    Key: {
   "PK": {
     "S": "ORG#" + user["custom:TenantId"]
    }, 
   "SK": {
     "S": shiftplan.id
    }
},
  ExpressionAttributeNames: {
   "#name": "name",
   "#schichtentag": "schichtentag",
   "#data": "data",
   "#zeitraum": "zeitraum",
   "#tauschanfrage": "tauschanfrage"
  }, 
  ExpressionAttributeValues: {
                ":name": {
                 "S": shiftplan.name
                }, 
                ":schichtentag": {
                 "N": shiftplan.schichtentag
                }, 
                ":data": {
                 "S": JSON.stringify(shiftplan.plan)
                }, 
                ":zeitraum": {
                 "S": shiftplan.zeitraum
                }, 
                ":tauschanfrage": {
                 "S": JSON.stringify(shiftplan.tauschanfrage)
                }
  }, 
  ReturnValues: "ALL_NEW", 
  TableName: "Staffbite-DynamoDB", 
  UpdateExpression: "SET #name = :name, #schichtentag = :schichtentag, #data = :data, #zeitraum = :zeitraum, #tauschanfrage = :tauschanfrage",
    };

    try {
        await dynamodb.updateItem(params).promise();
    } catch(error) {
      console.log(error);
      };
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify("Schiftplan updated!")
    };
    return response;
};




const updateEmployeesSchichten = async (Plan, type, index, day, user, id) => {
    if(type === "updateShifts") {
        let planDB = await getShiftplan(user, id);
        if(JSON.stringify(Plan.plan[index][day].setApplicants) !== JSON.stringify(planDB[index][day].setApplicants)) {
            //get new and removed applicants
            let oldPlansSetApplicants = Object.keys(planDB[index][day].setApplicants);
            let newPlansSetApplicants = Object.keys(Plan.plan[index][day].setApplicants);
            let newApplicants = newPlansSetApplicants.filter(applicant => !oldPlansSetApplicants.includes(applicant));
            let removedApplicants = oldPlansSetApplicants.filter(applicant => !newPlansSetApplicants.includes(applicant));
            
            // get ShiftIndicator
            let ShiftIndicator = index + '#' + Plan.plan[index].Wochentag.ShiftPosition + '#' + day
            
            //update schichten of new applicants
            console.log(newApplicants, removedApplicants);
            for (const applicant of newApplicants) {
                if(applicant === "TENANT") return;
                console.log(applicant)
                let employeeSchichten = await getEmployeeSchichten(user, applicant);
                if(!employeeSchichten[Plan.zeitraum]) {
                    employeeSchichten[Plan.zeitraum] = [];
                }
                employeeSchichten[Plan.zeitraum].push(ShiftIndicator);
                await updateEmployeeSchichten(user, applicant, employeeSchichten);
            }
            
            //update schichten of removed applicants
            for (const applicant of removedApplicants) {
                if(applicant === "TENANT") return;
                console.log(applicant)
                let employeeSchichten = await getEmployeeSchichten(user, applicant);
                if(employeeSchichten[Plan.zeitraum]) {
                    
                    let indexInSchichten = employeeSchichten[Plan.zeitraum].indexOf(ShiftIndicator);
                    if( indexInSchichten !== -1) {
                        employeeSchichten[Plan.zeitraum].splice(indexInSchichten, 1);
                    }
                    
                    await updateEmployeeSchichten(user, applicant, employeeSchichten);
                }
            }
        }
        
    };
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
    if(plan) {
        return JSON.parse(plan.Item.data["S"]);
    }
    return null;
}

const getEmployeeSchichten = async (user, employeeId) => {
    var employee = null
    var params = {
      Key: {
       "PK": {
         S: "ORG#" + user["custom:TenantId"]
        }, 
       "SK": {
         S: "EMP#" + employeeId,
        }
      }, 
      TableName: "Staffbite-DynamoDB"
     };

    try {
        employee = await dynamodb.getItem(params).promise();
    } catch(error) {
        console.log(JSON.stringify(error))
    }
    if(employee) {
        return employee.Item?.schichten?.S ? JSON.parse(employee.Item.schichten.S) : {};
    }
    return null;
}

const updateEmployeeSchichten = async (user, employeeId, schichten) => {
 var params = {
        Key: {
        "PK": {
         "S": "ORG#" + user["custom:TenantId"]
        }, 
        "SK": {
          "S": employeeId,
        }
    },
      ExpressionAttributeNames: {
       "#schichten": "schichten",
      }, 
      ExpressionAttributeValues: {
                    ":schichten": {
                     "S": JSON.stringify(schichten)
                    }
      }, 
      ReturnValues: "ALL_NEW", 
      TableName: "Staffbite-DynamoDB", 
      UpdateExpression: "SET #schichten = :schichten"
        };
     
    var updated = null

    try {
        updated = await dynamodb.updateItem(params).promise();
    } catch(error) {
        updated = error
    }
    return updated;
}