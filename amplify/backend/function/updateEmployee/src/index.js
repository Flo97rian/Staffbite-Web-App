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
    let body = JSON.parse(event.body)
    let employee = body.employee;
    let SK;
    if ("id" in employee) {
     SK = employee.id
    } else {
     SK = employee.SK
    }
    console.log(body);
    let user = body.user;
    
 var params = {
    Key: {
   "PK": {
     "S": "ORG#" + user["custom:TenantId"]
    }, 
   "SK": {
     "S": SK
    }
},
  ExpressionAttributeNames: {
   "#aktiv": "aktiv",
   "#frei": "frei",
   "#name": "name",
   "#email": "email",
   "#stundenlohn": "stundenlohn",
   "#zielmtleuro": "zielmtleuro",
   "#ueberstunden": "ueberstunden",
   "#zielmtlh": "zielmtlh",
   "#erfahrung": "erfahrung",
   "#schichtenwoche": "schichtenwoche",
   "#position": "position",
   "#onboarding": "onboarding"
  }, 
  ExpressionAttributeValues: {
                ":name": {
                 "S":  employee.name
                }, 
                ":stundenlohn": {
                 "N": employee.stundenlohn
                }, 
                ":zielmtleuro": {
                 "N": employee.zielmtleuro
                },
                ":zielmtlh": {
                 "N": employee.zielmtlh
                }, 
                ":ueberstunden": {
                 "BOOL": employee.ueberstunden
                }, 
                ":frei": {
                 "BOOL": employee.frei
                },
                ":aktiv": {
                 "BOOL": employee.aktiv
                },
                ":email": {
                 "S": employee.email
                },
                ":erfahrung": {
                 "S": employee.erfahrung
                },
                ":schichtenwoche": {
                 "N": employee.schichtenwoche
                },
                ":position": {
                 "S": JSON.stringify(employee.position)
                },
                ":onboarding": {
                 "S": JSON.stringify(employee.onboarding)
                }
  }, 
  ReturnValues: "ALL_NEW", 
  TableName: "Staffbite-DynamoDB", 
  UpdateExpression: "SET #name = :name, #stundenlohn = :stundenlohn, #zielmtleuro = :zielmtleuro, #zielmtlh = :zielmtlh, #ueberstunden = :ueberstunden, #frei = :frei, #aktiv = :aktiv, #email = :email, #erfahrung = :erfahrung, #schichtenwoche = :schichtenwoche, #position = :position, #onboarding = :onboarding"
    };
    
     
    try {
      await dynamodb.updateItem(params).promise();
      console.log("done")
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
        body: JSON.stringify("Employee updated!")
    };
    return response;
};



