

var AWS = require('aws-sdk');
AWS.config.apiVersions = {
  dynamodb: '2012-08-10',
  // other service API versions
};

var dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
    let user = JSON.parse(event.body)
    let id = event['queryStringParameters']["id"]
    console.log(user)
    var params = {
    Key: {
    "PK": {
        "S": "ORG#" + user["custom:TenantId"]
        }, 
    "SK": {
        "S": id
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
    return response;
};
