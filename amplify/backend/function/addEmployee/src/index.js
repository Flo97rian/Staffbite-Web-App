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
    let body = JSON.parse(event.body)
    let user = body.user;
    let data = await createUserInCognito(event, body, user);
    let response = await createUserInDynamoDB(event, body, data, user);
    return response;
};


const createUserInCognito = async (event, body, user) => {
         var params = {
          UserPoolId: 'eu-central-1_e0g7ALwrg', /* required */
          Username: body.employee.email , /* required */
          DesiredDeliveryMediums: [
            "EMAIL",
            /* more items */
          ],
          ForceAliasCreation: true,
          UserAttributes: [
            {
              Name: 'email', /* required */
              Value: body.employee.email
            },
                        {
              Name: 'custom:TenantId', /* required */
              Value: user["sub"]
            },
            {
                Name: "email_verified",
                Value: "true"
            }
          ],
          ValidationData: [
            {
              Name: 'STRING_VALUE_Mail', /* required */
              Value: 'STRING_VALUE'
            },
            /* more items */
          ]
        };
    let data = null;
    try {
        data = await cognitoidentityserviceprovider.adminCreateUser(params).promise();
    } catch(error) {
      console.log(error);
      };
    return data;
}

const createUserInDynamoDB = async (event, body, data, user) => {
            let onboarding = {
                overview: !0,
                eintragen: !0,
                shiftplan: !0,
                profile: !0
            }
          let zielmtleuroValue = Object.keys(body.employee).includes("zielmtleuro") ? String(body.employee.zielmtleuro) : "0"
          let stundenlohnValue = Object.keys(body.employee).includes("stundenlohn") ? String(body.employee.zielmtleuro) : "0"
          let schichtenwocheValue = Object.keys(body.employee).includes("schichtenwoche") ? String(body.employee.schichtenwoche) : "0"
          let positionValue = Object.keys(body.employee).includes("position") ? body.employee.position : []
          console.log(positionValue)
          let zielhValue = stundenlohnValue !== "0" && zielmtleuroValue !== "0" ? String(Number(stundenlohnValue) / Number(zielmtleuroValue)) : "0"
          console.log(zielhValue)
          var params = {
            Item: {
               PK: {
                 S: "ORG#" + user["custom:TenantId"]
                }, 
               SK: {
                 S: "EMP#" + data["User"]["Username"]
                },
                name: {
                 S:  body.employee.name
                }, 
                stundenlohn: {
                 N: stundenlohnValue
                }, 
                zielmtleuro: {
                 N: zielmtleuroValue
                },
                zielmtlh: {
                 N: zielhValue
                },
                akutellerverdienst: {
                    N: "0"
                },
                verdiensthistorie: {
                    S: "{}"
                },
                ueberstunden: {
                 BOOL: false
                }, 
                frei: {
                 BOOL: false
                },
                aktiv: {
                 BOOL: true
                },
                email: {
                 S: body.employee.email
                },
                erfahrung: {
                 S: body.employee.erfahrung
                },
                schichtenwoche: {
                 N: schichtenwocheValue
                },
                position: {
                 S: JSON.stringify(positionValue)
                },
                bewerbungen: {
                  S: "{}"
                },
                schichten: {
                  S: "{}"
                },
                onboarding: {
                    S: JSON.stringify(onboarding)
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
    body: JSON.stringify("User created!")
}; 
return response;
};