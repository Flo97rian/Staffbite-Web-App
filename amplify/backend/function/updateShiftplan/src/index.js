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
    let user = body.user;
    let shiftplan = body.shiftplan;
    console.log(body)
    console.log(typeof body.schichtentag)
 var params = {
    Key: {
   "PK": {
     "S": "ORG#" + user["custom:TenantId"]
    }, 
   "SK": {
     "S": shiftplan.id
    }
},
  ExpressionAttributeNames: {
   "#name": "name",
   "#schichtentag": "schichtentag",
   "#data": "data",
   "#zeitraum": "zeitraum",
   "#tauschanfrage": "tauschanfrage"
  }, 
  ExpressionAttributeValues: {
                ":name": {
                 "S": shiftplan.name
                }, 
                ":schichtentag": {
                 "N": shiftplan.schichtentag
                }, 
                ":data": {
                 "S": JSON.stringify(shiftplan.plan)
                }, 
                ":zeitraum": {
                 "S": shiftplan.zeitraum
                }, 
                ":tauschanfrage": {
                 "S": JSON.stringify(shiftplan.tauschanfrage)
                }
  }, 
  ReturnValues: "ALL_NEW", 
  TableName: "Staffbite-DynamoDB", 
  UpdateExpression: "SET #name = :name, #schichtentag = :schichtentag, #data = :data, #zeitraum = :zeitraum, #tauschanfrage = :tauschanfrage",
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




