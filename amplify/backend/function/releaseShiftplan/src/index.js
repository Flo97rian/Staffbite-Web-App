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
    let newShiftplan = null
    if (body.newDate !== !1) {
        let shiftplan = JSON.parse(plan.data["S"])
        let keys = Object.keys(shiftplan[0]);
        let createDates = {}
        createDates["Wochentag"] = "Datum";
        keys.shift()
        keys.forEach((key, index) => {
            var startDate = new Date(body.newDate.startDate)
            var nextDate = new Date(body.newDate.startDate)
            nextDate.setDate(startDate.getDate() + index + 1);
            var day = nextDate.getUTCDate()
            var month = Number(nextDate.getUTCMonth()) + 1
            var year = nextDate.getUTCFullYear()
            console.log(day, month, year)
            createDates[key] = day + "." + month + "." + year;
        })
        if (shiftplan[0].Wochentag === "Wochentag") {
            shiftplan.unshift(createDates)
        } else if (shiftplan[0].Wochentag === "Datum"){
            shiftplan[0] = createDates;
        }
        plan.SK["S"] = "PLAN#Freigeben#" + body.uuid;
        plan.zeitraum["S"] = shiftplan[0]["Montag"] + " - " + shiftplan[0]["Sonntag"]
        newShiftplan = shiftplan;
    } else {
        plan.SK["S"] = "PLAN#Freigeben#" + body.uuid;
        newShiftplan = JSON.parse(plan.data["S"])
    }
    
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
