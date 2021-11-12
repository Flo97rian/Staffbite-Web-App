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

    console.log(event);
    console.log(event.queryStringParameters["id"]);
    let body = JSON.parse(event.body);
    let user = body.user;
    let plan = body.plan;
          var params = {
            Item: {
               PK: {
                 S: "ORG#" + user["custom:TenantId"]
                }, 
               SK: {
                 S: "PLAN#Entwurf#" + event.queryStringParameters["id"]
                }, 
               data: {
                 S:  JSON.stringify(plan)
                   
               }, 
               name: {
                 S: event.queryStringParameters["name"]
                }, 
               schichtentag: {
                 N: event.queryStringParameters["schichtentag"]
                }, 
               zeitraum: {
                 S: event.queryStringParameters["zeitraum"]
                }
                , 
               tauschanfrage: {
                 S: JSON.stringify([])
                }
            },
        ReturnConsumedCapacity: "TOTAL", 
        TableName: "Staffbite-DynamoDB"
        };
        
        try {
            await dynamodb.putItem(params).promise();
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
            body: JSON.stringify("Schiftplan created!")
    };
    return response
};

