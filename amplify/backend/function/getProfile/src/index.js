/* Amplify Params - DO NOT EDIT
	API_STAFFBITE_APIID
	API_STAFFBITE_APINAME
	AUTH_STAFFBITE77674EBA_USERPOOLID
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
    let user = JSON.parse(event.body)
     var params = {
      Key: {
       "PK": {
         S: "ORG#" + user["custom:TenantId"]
        }, 
       "SK": {
         S: "ORG#METADATA#" + user["custom:TenantId"]
        }
      }, 
      TableName: "Staffbite-DynamoDB"
     };
     
    let data = null
    let response = null
    try {
        data = await dynamodb.getItem(params).promise();
        response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify(data),
        }
    } catch(error) {
        response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify(error),
    }
}
     
    return response;
};