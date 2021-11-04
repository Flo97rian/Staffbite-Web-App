/* Amplify Params - DO NOT EDIT
	AUTH_STAFFBITE58B5CA4D_USERPOOLID
	ENV
	REGION
	STORAGE_STAFFBITEDYNAMODB_ARN
	STORAGE_STAFFBITEDYNAMODB_NAME
	STORAGE_STAFFBITEDYNAMODB_STREAMARN
Amplify Params - DO NOT EDIT */

var AWS = require('aws-sdk');
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
AWS.config.apiVersions = {
  dynamodb: '2012-08-10',
  // other service API versions
};

var dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
    let user = JSON.parse(event.body);
    var params = {
    Key: {
    "PK": {
        "S": "ORG#" + user["custom:TenantId"]
        }, 
    "SK": {
        "S": event.queryStringParameters["id"]
        }
    }, 
    TableName: "Staffbite-DynamoDB"
    };

    let data = null
    let response = null
    try {
        data = await dynamodb.deleteItem(params).promise();
        response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
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
        },
        body: JSON.stringify(error),
        }
    }

    var str = event.queryStringParameters["id"];
    var res = str.split("#");
    console.log(res);
    
    var params = {
        UserPoolId: 'eu-central-1_e0g7ALwrg', /* required */
        Username:  res[1]/* required */
    };
    try {
        data = await cognitoidentityserviceprovider.adminDeleteUser(params).promise();
        response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
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
        },
        body: JSON.stringify(error),
        }
    }
    return response;
};
