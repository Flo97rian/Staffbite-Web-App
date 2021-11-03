/* Amplify Params - DO NOT EDIT
	AUTH_STAFFBITE77674EBA_USERPOOLID
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

exports.handler = async (event, context, callback) => {
 console.log(event);
 console.log(event.queryStringParameters);
 console.log(event.requestContext.authorizer);
 var params = {
  Key: {
   "PK": {
     "S": "ORG#" + event.requestContext.authorizer["claims"]["custom:TenantId"]
    }, 
   "SK": {
     "S": event.queryStringParameters["id"]
    }
  }, 
  TableName: "Staffbite-DynamoDB"
 };
 await dynamodb.deleteItem(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
 }).promise();
 var str = event.queryStringParameters["id"];
 var res = str.split("#");
 console.log(res);
 var params = {
  UserPoolId: 'eu-central-1_e0g7ALwrg', /* required */
  Username:  res[1]/* required */
};
await cognitoidentityserviceprovider.adminDeleteUser(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
}).promise();
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify("Employee deleted!")
    };
    return response;
};