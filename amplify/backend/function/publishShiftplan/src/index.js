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
    let planName = plan.name["S"]
    let updatedEmployeesAndPlan = await setSchichten(employees, plan);
    let newEmployees = updatedEmployeesAndPlan[0]
    let newPlan = updatedEmployeesAndPlan[1]
    Object.keys(employees).map(item => {
        let newEmployeesData = newEmployees[item]
        updateEmployees(event, body, item, newEmployeesData );
    });
    let meta = await getMeta(body);
    await addNews(body, meta, planName);
    let response = await updatePlan(event, plan, newPlan)
        console.log(employees);
        let [tokensIOS, tokensAndroid] = await getTokens(employees);
        if(tokensIOS.length > 0 || tokensAndroid.length > 0) {
            console.log("send push");
            await SendMessage(tokensIOS, tokensAndroid);
        }
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
            schichten: JSON.parse(item.schichten["S"]),
        };
        if (Object.keys(item).includes('pushToken')) {
            employees[item.SK["S"]].pushToken = JSON.parse(item.pushToken["S"])
        }
        if (Object.keys(item).includes('notificationPermissions')) {
            employees[item.SK["S"]].notificationPermissions = JSON.parse(item.notificationPermissions["S"])
        }
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
                    let hasSetApplicants = hasSetApplicantsKey  && Object.keys(schichtplan[index][day]["setApplicants"]).length > 0
                    if ( day !== "Wochentag" && hasSetApplicantsKey && hasSetApplicants) {
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
            if(applicant !== "TENANT" && copyEmployees[applicant]) {
                let schichtenObject = copyEmployees[applicant]["schichten"];
                if( !Object.keys(schichtenObject).includes(zeitraum)) {
                    schichtenObject[zeitraum] = [];
                    schichtenObject[zeitraum].push(String(row) + "#" + String(schichtname) + "#" + String(tag));
                } else {
                schichtenObject[zeitraum].push(String(row) + "#" + String(schichtname) + "#" + String(tag));
                }
                copyEmployees[applicant]["schichten"] = schichtenObject;
            }
        })
    }
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
   "#schichten": "schichten",
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
    
    if(Object.keys(employeeData).includes("pushToken")) {
        params.ExpressionAttributeValues[":pushToken"] = {
                 "S": JSON.stringify(employeeData.pushToken)
                };
        params.ExpressionAttributeNames["#pushToken"] = "pushToken";
        params.UpdateExpression = params.UpdateExpression + ", #pushToken = :pushToken";
        
        }
    if(Object.keys(employeeData).includes("notificationPermissions")) {
        params.ExpressionAttributeValues[":notificationPermissions"] = {
                 "S": JSON.stringify(employeeData.notificationPermissions)
                };
        params.ExpressionAttributeNames["#notificationPermissions"] = "notificationPermissions";
        params.UpdateExpression = params.UpdateExpression + ", #notificationPermissions = :notificationPermissions";
        
        }
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

const getMeta = async (body) => {
    var ORG = "ORG#" + body.user["custom:TenantId"];
    var META = "ORG#" + "METADATA#" + body.user["custom:TenantId"];
    console.log(ORG)
     var params = {
      Key: {
       "PK": {
         S: ORG
        }, 
       "SK": {
         S: META
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
      console.log(data);
 return data.Item
};

const addNews = async (body, meta, planName) => {
    var META = "ORG#" + "METADATA#" + body.user["custom:TenantId"];
    let newsfeed = JSON.parse(meta.newsfeed["S"])
    let currentDate = new Date();
    let message = "Der Schichtplan " + planName + " kann nun eingesehen werden."
    let feedObject = {timestamp:currentDate,title: "Neuer Schichtplan",message:message,type:"Schichtplan"}
    newsfeed.unshift(feedObject)
     var params = {
    Key: {
   "PK": {
     "S": "ORG#" + body.user["custom:TenantId"]
    }, 
   "SK": {
     "S": META
    }
},
  ExpressionAttributeNames: {
   "#newsfeed": "newsfeed",
  }, 
  ExpressionAttributeValues: {
                ":newsfeed": {
                 "S": JSON.stringify(newsfeed)
                }
  }, 
  ReturnValues: "ALL_NEW", 
  TableName: "Staffbite-DynamoDB", 
  UpdateExpression: "SET #newsfeed = :newsfeed"
    };
    
     
    try {
      await dynamodb.updateItem(params).promise();
    } catch(error) {
      console.log(error);
      }
        const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify("META updated!")
    };
    return response;
}

const getTokens = async (employees) => {
    let tokensIOS = [];
    let tokensAndroid = [];
    if(employees !== null) {
        console.log(employees);
        if(Object.keys(employees).length > 0) {
            let keys = Object.keys(employees);
            console.log(keys);
            keys.forEach(employee => {
                if(Object.keys(employees[employee]).includes("pushToken")) {
                    if(Object.keys(employees[employee].pushToken).includes("token")) {
                        if(Object.keys(employees[employee]).includes("notificationPermissions")) {
                            console.log(employees[employee].notificationPermissions);
                            if (employees[employee].notificationPermissions.eintrage) {
                                let id = employees[employee].pushToken.token;
                                if(employees[employee].pushToken.deviceType === "ios") {
                                tokensIOS.push(id);    
                                }
                                if(employees[employee].pushToken.deviceType === "android") {
                                tokensAndroid.push(id);    
                                }
                            }
                        }
                    }
                }
                });
        }
    }
    return [tokensIOS, tokensAndroid];
};

// The AWS Region that you want to use to send the message. For a list of
// AWS Regions where the Amazon Pinpoint API is available, see
// https://docs.aws.amazon.com/pinpoint/latest/apireference/
const region = 'eu-central-1';

// The title that appears at the top of the push notification.
var title = 'Schichtplan steht zur Verfügung.';

// The content of the push notification.
var message = 'Der Schichtplan kann nun eingesehen werden.';

// The Amazon Pinpoint project ID that you want to use when you send this 
// message. Make sure that the push channel is enabled for the project that 
// you choose.
var applicationId = '0fd5abdf70be4dfa8ddea0537560306b';

var action = 'OPEN_APP';

// The priority of the push notification. If the value is 'normal', then the
// delivery of the message is optimized for battery usage on the recipient's
// device, and could be delayed. If the value is 'high', then the notification is
// sent immediately, and might wake a sleeping device.
var priority = 'normal';

// The amount of time, in seconds, that the push notification service provider
// (such as FCM or APNS) should attempt to deliver the message before dropping
// it. Not all providers allow you specify a TTL value.
var ttl = 30;

// Boolean that specifies whether the notification is sent as a silent
// notification (a notification that doesn't display on the recipient's device).
var silent = false;

function CreateMessageRequestIOS(recipient) {
  var tokens = recipient;
  console.log(tokens);
    var messageRequest = {
      'Addresses': {
      },
      'MessageConfiguration': {
        'APNSMessage': {
          'Action': action,
          'Body': message,
          'Priority': priority,
          'SilentPush': silent,
          'Title': title,
          'TimeToLive': ttl,
        }
      }
    };
    if (tokens.length > 0) {
    tokens.forEach(token => {
        messageRequest.Addresses[token] = {
          'ChannelType' : 'APNS'
        }
    })}

  return messageRequest
}

function CreateMessageRequestAndroid(recipient) {
  var tokens = recipient;
  console.log(tokens);
    var messageRequest = {
      'Addresses': {
      },
      'MessageConfiguration': {
        'GCMMessage': {
          'Action': action,
          'Body': message,
          'Priority': priority,
          'SilentPush': silent,
          'Title': title,
          'TimeToLive': ttl,
        }
      }
    };
        if (tokens.length > 0) {
    tokens.forEach(token => {
        messageRequest.Addresses[token] = {
          'ChannelType' : 'GCM'
        }
    })}

  return messageRequest
}

async function SendMessage(tokensIOS, tokensAndroid) {
    
  var messageRequestIOS = CreateMessageRequestIOS(tokensIOS);
  var messageRequestAndroid = CreateMessageRequestAndroid(tokensAndroid);

  //Create a new Pinpoint object.
  var pinpoint = new AWS.Pinpoint();
  var paramsIOS = {
    "ApplicationId": applicationId,
    "MessageRequest": messageRequestIOS
  };
  
  var paramsAndroid = {
    "ApplicationId": applicationId,
    "MessageRequest": messageRequestAndroid
  };

  // Try to send the message.
  console.log(messageRequestIOS);
  console.log(messageRequestAndroid);
  console.log(tokensIOS);
  console.log(tokensAndroid);
  if(tokensIOS.length > 0) {
  try {
      let response = await pinpoint.sendMessages(paramsIOS).promise();
      console.log("doneIOS")
      console.log(response);
  } catch(er) {
   console.log(er)   
  }
  }
  if(tokensAndroid.length > 0) {
    try {
      let response = await pinpoint.sendMessages(paramsAndroid).promise();
      console.log("doneAndroid")
      console.log(response);
  } catch(er) {
   console.log(er)   
  }
  }
}



