/* Amplify Params - DO NOT EDIT
	AUTH_STAFFBITE58B5CA4D_USERPOOLID
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
    let id = JSON.parse(event.body)
    let response = await createDemo(id);
    return response;
};


const createDemo = async (id) => {
          var params = {
            Item: {
               PK: {
                 S: "DEMO#" + id,
                }, 
               SK: {
                 S: "DEMO#METADATA" + id,
                },
                demoId: {
                    S: id,
                },
                demoPlans: {
                 S:  JSON.stringify([]),
                }, 
                demoMeta: {
                 S: JSON.stringify({}),
                }, 
                demoEmployees: {
                 S: JSON.stringify([])
                },
                demoAdmin: {
                 S: JSON.stringify({}),
                }
            },
          ReturnConsumedCapacity: "TOTAL", 
          TableName: "Staffbite-DynamoDB"
         };
 
    try {
        await dynamodb.putItem(params).promise();
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
    body: JSON.stringify("Demo created!")
}; 
return response;
};