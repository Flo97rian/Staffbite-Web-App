/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_STAFFBITEDYNAMODB_ARN
	STORAGE_STAFFBITEDYNAMODB_NAME
	STORAGE_STAFFBITEDYNAMODB_STREAMARN
Amplify Params - DO NOT EDIT */

var aws = require("aws-sdk");
var ses = new aws.SES({ region: "eu-central-1" });
exports.handler = async function (event) {
    console.log(event)
    let body = JSON.parse(event.body);
    let message = body.message;
    let firstname = body.firstname;
    let lastname = body.lastname;
    let tel = body.tel;
    let email = body.email;
    let org = body.org;
    let subject = body.subject;
    let RecipientEmailAddress = "info@staffbite.de"
    var params = {
        Destination: {
        ToAddresses: [RecipientEmailAddress],
        },
        Message: {
        Body: {
            Text: { 
                Data: `Guten Tag, mein Name ist ${firstname} ${lastname}, ${message}. Meine Kontaktdaten sind ${email}, ${tel}, ${org}.`,
            }, 
        },

        Subject: { Data: subject },
        },
        Source: "info@staffbite.de",
    };
    let response;
    try {
        await ses.sendEmail(params).promise();
        response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify("Message send!"),
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
