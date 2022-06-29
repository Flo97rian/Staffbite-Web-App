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

exports.handler = async (event) => {
    let body = JSON.parse(event.body);
    const id = body.demoId;
    console.log(body)
 var params = {
    Key: {
   "PK": {
     "S": "DEMO#" + id,
    }, 
   "SK": {
     "S": "DEMO#METADATA" + id,
    }
},
  ExpressionAttributeNames: {
   "#demoId": "demoId",
   "#demoEmployees": "demoEmployees",
   "#demoPlans": "demoPlans",
   "#demoMeta": "demoMeta",
   "#demoAdmin": "demoAdmin",
  }, 
  ExpressionAttributeValues: {
                ":demoId": {
                 "S": body.demoId,
                }, 
                ":demoEmployees": {
                 "S": JSON.stringify(body.demoEmployees),
                }, 
                ":demoPlans": {
                 "S": JSON.stringify(body.demoPlans)
                }, 
                ":demoMeta": {
                 "S": JSON.stringify(body.demoMeta)
                }, 
                ":demoAdmin": {
                    "S": JSON.stringify(body.demoAdmin),
                }
  }, 
  ReturnValues: "ALL_NEW", 
  TableName: "Staffbite-DynamoDB", 
  UpdateExpression: "SET #demoId = :demoId, #demoEmployees = :demoEmployees, #demoMeta = :demoMeta, #demoPlans = :demoPlans, #demoAdmin = :demoAdmin",
    };

    try {
        await dynamodb.updateItem(params).promise();
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
    return response;
};