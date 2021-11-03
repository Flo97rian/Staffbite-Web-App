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
    await updateOrg(event, body)
     const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify("profile updated!")
    };
    return response;
}

function names(body) {
    let parameters = body;
    let keys = Object.keys(parameters);
    let len = keys.length
    let params = {}
    for (let i = 0; i < len; i++ ) {
        params["#" + keys[i]] = keys[i]
    }
    return params
}

function values(body) {
    let parameters = body;
    let keys = Object.keys(parameters);
    let len = keys.length
    let params = {}
    for (let i = 0; i < len; i++ ) {
        console.log(typeof parameters[keys[i]])
        if (typeof parameters[keys[i]] === "boolean") {
            params[":" + keys[i]] = {"BOOL": parameters[keys[i]]}
        } else if (typeof parameters[keys[i]] === "string") {
            params[":" + keys[i]] = {"S": parameters[keys[i]]}
        } else if (typeof parameters[keys[i]] == "object") {
            params[":" + keys[i]] = {"S": JSON.stringify(parameters[keys[i]])}
        }
    }
    console.log(params)
    return params
}

function Expression(body) {
     let parameters = body;
    let keys = Object.keys(parameters);
    let len = keys.length
    let expression = "SET "
        for (let i = 0; i < len; i++ ) {
        if (i == len - 1) {    
        expression = expression + "#" + keys[i] + " = :" + keys[i]
        } else {
        expression = expression + "#" + keys[i] + " = :" + keys[i] + ", "
        }
    }
    console.log(expression);
    return expression
     
} 

const updateOrg = async (event, body) => {
     var params = {
    Key: {
   "PK": {
     "S": "ORG#" + event.requestContext.authorizer["claims"]["custom:TenantId"]
    }, 
   "SK": {
     "S": "ORG#METADATA#" + event.requestContext.authorizer["claims"]["custom:TenantId"]
    }
    },
    ExpressionAttributeNames: names(body),
    ExpressionAttributeValues: values(body),
    ReturnValues: "ALL_NEW", 
    TableName: "Staffbite-DynamoDB", 
    UpdateExpression: Expression(body)
    };
    
    
    try {
      var profile = await dynamodb.updateItem(params).promise();
    } catch(error) {
      console.log(error);
      }
        
    return profile  
}