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
    let user = JSON.parse(event.body);
    var ORG = "ORG#" + user["custom:TenantId"];
     var params1 = {
        TableName: "Staffbite-DynamoDB",
        KeyConditionExpression: "#PK = :PK AND begins_with(#SK, :SK) ",
        ExpressionAttributeNames: { "#PK": "PK" , "#SK": "SK" }, 
        ExpressionAttributeValues: { 
          ":PK": {"S": ORG},
          ":SK": {"S": "PLAN#Freigeben#"}
          
        },
     };
     let response;
     let data1;
     let data2;
     try {
        data1 = await dynamodb.query(params1).promise();
        response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify("Fetched Applications Shiftplans"),
        }
    } catch(error) {
        response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify(error),
        }
    }
          
    var params2 = {
        TableName: "Staffbite-DynamoDB",
        KeyConditionExpression: "#PK = :PK AND begins_with(#SK, :SK) ",
        ExpressionAttributeNames: { "#PK": "PK" , "#SK": "SK" }, 
        ExpressionAttributeValues: { 
          ":PK": {"S": ORG},
          ":SK": {"S": "PLAN#Veröffentlicht#"}
          
        },
     };

     try {
        data2 = await dynamodb.query(params2).promise();
        response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify("Fetched Published Shiftplans"),
        }

    } catch(error) {
        response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify(error),
        }
    }
     
    function setToMonday( date ) {
        var day = date.getDay() || 7;  
        if( day !== 1 ) 
            date.setHours(-24 * (day - 1)); 
        return date;
    }
    
    data2 = data2.Items.filter(plan => {
        let zeitraum = plan.zeitraum.S;
        if(zeitraum) {
            let planStart = zeitraum.split(" - ");
            let planStartSplit = planStart[0].split('.');
            let date = new Date(planStartSplit[2], planStartSplit[1] - 1, planStartSplit[0]);
            let today = new Date();
            let monday = setToMonday(date)
            if(date > today || (monday < today && monday > today.setDate(today.getDate() - 7))) {
                return true;
        }}
        return false;
    }) 

    data1 = data1.Items.filter(plan => {
        let zeitraum = plan.zeitraum.S;
        if(zeitraum) {
            let planStart = zeitraum.split(" - ");
            let planStartSplit = planStart[0].split('.');
            let date = new Date(planStartSplit[2], planStartSplit[1] - 1, planStartSplit[0]);
            let today = new Date();
            let monday = setToMonday(date)
            if(date > today || (monday < today && monday > today.setDate(today.getDate() - 7))) {
                return true;
        }}
        return false;
    }) 

     let data = []
     data2.forEach(item => 
     data.push(item))
     
     data1.forEach(item => {
     let id = item.SK["S"];
     let idSplit = id.split("#")
     let testId = idSplit[0] + "#Veröffentlicht#" + idSplit[2]
     let match = (element) => element.SK["S"] === testId;
        if(data.some(match)) {
        } else {
            data.unshift(item);
     }});

    if(data.length > 0 ) {
        response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers" : "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            },
            body: JSON.stringify(data),
            }
    }

    return response;
};