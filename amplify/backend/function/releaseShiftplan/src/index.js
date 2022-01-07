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
        let keys = Object.keys(shiftplan[0]);
        let createDates = {}
        createDates["Wochentag"] = "Datum";
        keys.shift()
        if (shiftplan[0].Wochentag === "Wochentag") {
            if(body.newDate !== !1) {
                keys.forEach((key, index) => {
                    var startDate = new Date(body.newDate.startDate)
                    var nextDate = new Date(body.newDate.startDate)
                    console.log(body.newDate, body.newDate.startDate, startDate)
                    nextDate.setDate(startDate.getDate() + index + 1);
                    var day = nextDate.getUTCDate()
                    var month = Number(nextDate.getUTCMonth()) + 1
                    var year = nextDate.getUTCFullYear()
                    console.log(day, month, year)
                    createDates[key] = day + "." + month + "." + year;
                })
            } else {
                keys.forEach((key, index) => {
                    var startDate = new Date("2021-01-01T00:00:00.000Z")
                    var nextDate = new Date("2021-01-01T00:00:00.000Z")
                    nextDate.setDate(startDate.getDate() + index);
                    var day = nextDate.getUTCDate()
                    var month = Number(nextDate.getUTCMonth()) + 1
                    var year = nextDate.getUTCFullYear()
                    console.log(day, month, year)
                    createDates[key] = day + "." + month + "." + year;
                })
            }
            shiftplan.unshift(createDates)
        } else {
             if(body.newDate !== !1) {
                keys.forEach((key, index) => {
                    var startDate = new Date(body.newDate.startDate)
                    var nextDate = new Date(body.newDate.startDate)
                    console.log(body.newDate, body.newDate.startDate, startDate)
                    nextDate.setDate(startDate.getDate() + index + 1);
                    var day = nextDate.getUTCDate()
                    var month = Number(nextDate.getUTCMonth()) + 1
                    var year = nextDate.getUTCFullYear()
                    console.log(day, month, year)
                    createDates[key] = day + "." + month + "." + year;
                })
                shiftplan[0] = createDates;
             }
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
    let newsfeed = [];
    if("newsfeed" in meta) {
        newsfeed = JSON.parse(meta.newsfeed["S"])
    }
    let currentDate = new Date();
    let message = "Der Schichtplan " + planName + " wurde zum Eintragen freigeben."
    let feedObject = {timestamp:currentDate,title: "Zum Entragen bereit",message:message,type:"Eintragen"}
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
