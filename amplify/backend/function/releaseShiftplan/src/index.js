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
var pinpoint = new AWS.Pinpoint();

var dynamodb = new AWS.DynamoDB();

exports.handler = async (event, context, callback) => {
    
    let body = JSON.parse(event.body);
    console.log(body);
    let user = body.user;
    let plan = await getPlan(body);
    let meta = await getMeta(body);
    let name = plan.name["S"];
    if (name !== body.name && body.name !== "Name" && body.name !== "") {
        name = body.name;
    }
    await addNews(body, meta, name);
    console.log(body)
    console.log(name, body.name);
    
    let newShiftplan = null;
    let shiftplan = JSON.parse(plan.data["S"])
    if(body.newDate !== false) {
        shiftplan.unshift(body.newDate);
    }
    plan.SK["S"] = "PLAN#Freigeben#" + body.uuid;
    plan.zeitraum["S"] = shiftplan[0]["Montag"] + " - " + shiftplan[0]["Sonntag"]
    newShiftplan = shiftplan;
    
    console.log(plan.data["S"])
          var params = {
            Item: {
               PK: {
                 S: "ORG#" + user["custom:TenantId"]
                }, 
               SK: {
                 S: plan.SK["S"]
                }, 
               data: {
                 S:  JSON.stringify(newShiftplan)
               }, 
               name: {
                 S: name
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
        body: JSON.stringify("Schiftplan released!")
    };
    if (data !== null) {
        let employees = await getEmployees(user)
        let [tokensIOS, tokensAndroid] = await getTokens(employees);
        if(tokensIOS.length > 0 || tokensAndroid.length > 0) {
            console.log("send push");
            await SendMessage(tokensIOS, tokensAndroid);
    }
    }
    return response
};


const getPlan = async (body) => {
    var ORG = "ORG#" + body.user["custom:TenantId"];
    console.log(ORG)
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
      console.log(data);
 return data.Item
};

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
    let message = planName + " wurde zum Eintragen freigeben."
    let feedObject = {timestamp:currentDate,title: "Schichtplan zum Eintragen bereit",message:message,type:"Eintragen"}
    if (newsfeed.length > 10) {
        let copyNewsfeed = newsfeed.slice(0, 11);
        newsfeed = copyNewsfeed;
    }
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

const getEmployees = async (user) => {
    var ORG = "ORG#" + user["custom:TenantId"];
    console.log(ORG);
     var params = {
        TableName: "Staffbite-DynamoDB",
        KeyConditionExpression: "#PK = :PK AND begins_with(#SK, :SK)",
        ExpressionAttributeNames: { "#PK": "PK" , "#SK": "SK" }, 
        ExpressionAttributeValues: { 
          ":PK": {"S": ORG},
          ":SK": {"S": "EMP#"}
        },
     };
    let data = null
    let response = null
    try {
        data = await dynamodb.query(params).promise();
        response = data;
    } catch(error) {
        console.log("Error");
    }
    let employees = {};
    console.log(response);
    
    if (data !== null) {
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
        })
    }
    return employees
};
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
var title = 'Trage dich jetzt ein.';

// The content of the push notification.
var message = 'Ein neuer Schichtplan steht zum Eintragen bereit.';

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
          'ChannelType' : 'APNS_SANDBOX'
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
  if(tokensIOS.length > 0) {
  try {
      let response = await pinpoint.sendMessages(paramsIOS).promise();
      console.log("doneIOS")
  } catch(er) {
   console.log(er)   
  }
  }
  if(tokensAndroid.length > 0) {
    try {
      let response = await pinpoint.sendMessages(paramsAndroid).promise();
      console.log("doneAndroid")
  } catch(er) {
   console.log(er)   
  }
  }
}