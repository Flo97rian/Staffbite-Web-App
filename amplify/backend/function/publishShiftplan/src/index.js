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

exports.handler = async (event, context, callback) => {
    let body = JSON.parse(event.body);
    let plan = await getPlan(event, body);
    let employees = await getEmployees(event);
    let updatedEmployeesAndPlan = await setSchichten(employees, plan);
    let newEmployees = updatedEmployeesAndPlan[0]
    let newPlan = updatedEmployeesAndPlan[1]
    Object.keys(employees).map(item => {
        let newEmployeesData = newEmployees[item]
        updateEmployees(event, body, item, newEmployeesData );
    });
    
    let response = await updatePlan(event, plan, newPlan)
    return response
};


const getPlan = async (event, body) => {
    var ORG = "ORG#" + body.user["custom:TenantId"];
    console.log(body.id)
     var params = {
      Key: {
       "PK": {
         S: ORG
        }, 
       "SK": {
         S: body.id
        }
      }, 
      TableName: "Staffbite-DynamoDB"
     };
    let data = null;
    try {
        data = await dynamodb.getItem(params).promise();
    } catch(error) {
      console.log(error);
      };
 return data.Item
};

const getEmployees = async (event) => {
    let body = JSON.parse(event.body)
    let user = body.user
      var ORG = "ORG#" + user["custom:TenantId"];
     var params = {
        TableName: "Staffbite-DynamoDB",
        KeyConditionExpression: "#PK = :PK AND begins_with(#SK, :SK)",
        ExpressionAttributeNames: { "#PK": "PK" , "#SK": "SK" }, 
        ExpressionAttributeValues: { 
          ":PK": {"S": ORG},
          ":SK": {"S": "EMP#"}
        },
     };
    let data = null;
    try {
        data = await dynamodb.query(params).promise();
    } catch(error) {
      console.log(error);
      };
      
    let employees = {};
    data.Items.forEach(item => {
        employees[item.SK["S"]]  = {
            frei: item.frei["BOOL"],
            name: item.name["S"],
            aktiv: item.aktiv["BOOL"],
            id: item.SK["S"],
            email: item.email["S"],
            stundenlohn: item.stundenlohn["N"],
            zielmtleuro: item.zielmtleuro["N"],
            akutellerverdienst: item.akutellerverdienst["N"],
            zielmtlh: item.zielmtlh["N"],
            ueberstunden: item.ueberstunden["BOOL"],
            erfahrung: item.erfahrung["S"],
            schichtenwoche: item.schichtenwoche["N"],
            position: item.position["S"],
            bewerbungen: JSON.parse(item.bewerbungen["S"]),
            schichten: JSON.parse(item.schichten["S"])
        };
    });
    
 return employees
};

function setSchichten(employees, plan) {
    let schichtplan = JSON.parse(plan.data["S"])
    let Employees = employees;
    let lastRow = schichtplan.length - 1
    schichtplan.forEach((row, index) => {
        if (index !== 0 && index !== 1 && index !== schichtplan.length - 1) {
                let SplitStart = schichtplan[index].Wochentag.ShiftStart.split(":")
                let SplitEnd = null;
                let diff = 0;
                if (typeof schichtplan[index].Wochentag.ShiftEnd === "boolean") {
                    console.log(schichtplan[index].Wochentag)
                    SplitEnd = [String(Number(SplitStart[0]) + 6 ), "00"];
                     diff = (new Date("1970", "1", "1", SplitEnd[0], SplitEnd[1]).getTime() - new Date("1970", "1", "1", SplitStart[0], SplitStart[1]).getTime())
                } else if (SplitStart === [ "00", "00"] && schichtplan[index].Wochentag.ShiftEnd.split(":") === [ "24", "00" ]) {
                    diff = (new Date("1970", "1", "1", SplitEnd[0], SplitEnd[1]).getTime() - new Date("1970", "1", "2", SplitStart[0], SplitStart[1]).getTime())
                } else {
                    SplitEnd = schichtplan[index].Wochentag.ShiftEnd.split(":")
                    diff = (new Date("1970", "1", "1", SplitEnd[0], SplitEnd[1]).getTime() - new Date("1970", "1", "1", SplitStart[0], SplitStart[1]).getTime())
                }
                let diffInHours = (diff / 3600) / 1000
                Object.keys(schichtplan[lastRow]).forEach( day => {
                    let hasSetApplicantsKey = Object.keys(schichtplan[index][day]).includes("setApplicants")
                    console.log(hasSetApplicantsKey);
                    let hasSetApplicants = hasSetApplicantsKey  && Object.keys(schichtplan[index][day]["setApplicants"]).length > 0 ? !0 : !1
                    if ( day !== "Wochentag" && hasSetApplicantsKey && hasSetApplicants) {
                        console.log(diffInHours);
                        schichtplan[lastRow][day] = Number(schichtplan[lastRow][day]) + Number(diffInHours)
                    }
                })
                Object.keys(schichtplan[lastRow]).forEach( day => {
                    if ( day !== "Wochentag") {
                        Employees = setEmployeesShifts(row[day].setApplicants, Employees, index, row.Wochentag.ShiftName, String(day), plan.zeitraum["S"]);
                    }
                })
        }
    });
    return [Employees, schichtplan];
}

function setEmployeesShifts(setApplicants, Employees, row, schichtname, tag, zeitraum) {
    let copyEmployees = Employees;
    if(setApplicants) {
    Object.keys(setApplicants).forEach(applicant => {
        let schichtenObject = copyEmployees[applicant]["schichten"];
        if( !Object.keys(schichtenObject).includes(zeitraum)) {
            schichtenObject[zeitraum] = [];
            schichtenObject[zeitraum].push(String(row) + "#" + String(schichtname) + "#" + String(tag));
        } else {
        schichtenObject[zeitraum].push(String(row) + "#" + String(schichtname) + "#" + String(tag));
        }
        copyEmployees[applicant]["schichten"] = schichtenObject;
    })}
    return copyEmployees;
}

const updateEmployees = async (event, body, employee, employeeData) => {
         var params = {
    Key: {
   "PK": {
     "S": "ORG#" + body.user["custom:TenantId"]
    }, 
   "SK": {
     "S": employee
    }
},
  ExpressionAttributeNames: {
   "#aktiv": "aktiv",
   "#frei": "frei",
   "#name": "name",
   "#email": "email",
   "#stundenlohn": "stundenlohn",
   "#zielmtleuro": "zielmtleuro",
   "#ueberstunden": "ueberstunden",
   "#zielmtlh": "zielmtlh",
   "#erfahrung": "erfahrung",
   "#schichtenwoche": "schichtenwoche",
   "#position": "position",
   "#bewerbungen": "bewerbungen",
   "#schichten": "schichten"
  }, 
  ExpressionAttributeValues: {
                ":name": {
                 "S":  employeeData.name
                }, 
                ":stundenlohn": {
                 "N": employeeData.stundenlohn
                }, 
                ":zielmtleuro": {
                 "N": employeeData.zielmtleuro
                },
                ":zielmtlh": {
                 "N": employeeData.zielmtlh
                }, 
                ":ueberstunden": {
                 "BOOL": employeeData.ueberstunden
                }, 
                ":frei": {
                 "BOOL": employeeData.frei
                },
                ":aktiv": {
                 "BOOL": employeeData.aktiv
                },
                ":email": {
                 "S": employeeData.email
                },
                ":erfahrung": {
                 "S": employeeData.erfahrung
                },
                ":schichtenwoche": {
                 "N": employeeData.schichtenwoche
                },
                ":position": {
                 "S": employeeData.position
                },
                ":bewerbungen": {
                 "S": JSON.stringify(employeeData.bewerbungen)
                },
                ":schichten": {
                 "S": JSON.stringify(employeeData.schichten)
                }
  }, 
  ReturnValues: "NONE", 
  TableName: "Staffbite-DynamoDB", 
  UpdateExpression: "SET #name = :name, #stundenlohn = :stundenlohn, #zielmtleuro = :zielmtleuro, #zielmtlh = :zielmtlh, #ueberstunden = :ueberstunden, #frei = :frei, #aktiv = :aktiv, #email = :email, #erfahrung = :erfahrung, #schichtenwoche = :schichtenwoche, #position = :position, #bewerbungen = :bewerbungen, #schichten = :schichten"
    };
    try {
        await dynamodb.updateItem(params).promise();
    } catch(error) {
      console.log("iserror", error);
      }
};

const updatePlan = async (event, plan, newPlan) => {
    let body = JSON.parse(event.body);
    let user = body.user;
     let updatedID = plan.SK["S"].replace(/Review/i, "Veröffentlicht");
          var params = {
            Item: {
               PK: {
                 S: "ORG#" + user["custom:TenantId"]
                }, 
               SK: {
                 S: updatedID
                }, 
               data: {
                 S:  JSON.stringify(newPlan)
               }, 
               name: {
                 S: plan.name["S"]
                }, 
               schichtentag: {
                 N: plan.schichtentag["N"]
                }, 
               zeitraum: {
                 S: plan.zeitraum["S"]
                }, 
               tauschanfrage: {
                 S: plan.tauschanfrage["S"]
                }
            },
  ReturnConsumedCapacity: "TOTAL", 
  TableName: "Staffbite-DynamoDB"
 };
     let data = null;
    try {
        data = await dynamodb.putItem(params).promise();
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
    return response
}