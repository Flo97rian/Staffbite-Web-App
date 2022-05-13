
const stripe = require('stripe')("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");
const _ = require('lodash');
var AWS = require('aws-sdk');
AWS.config.apiVersions = {
  dynamodb: '2012-08-10',
  // other service API versions
};
var dynamodb = new AWS.DynamoDB();
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
    console.log(event.body);
    const body = JSON.parse(event.body);
    const email = _.get(body, 'data.object.customer_email', "");
    console.log(email);
    
    if (_.isEmpty(email)) {
        return {
            statusCode: 200,
            headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify('No EMail set!'),
        };
    }
    console.log(email);
    
    const currentNumberOfEmployees = _.get(body, 'data.object.lines.data[0].quantity', false)
    
    if(_.isBoolean(currentNumberOfEmployees)) {
        return {
            statusCode: 200,
            headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify('No NumberOfEmployees set!'),
        };
    }
    console.log(currentNumberOfEmployees);

    const subscriptionID = _.get(body, 'data.object.lines.data[0].subscription', "")
    
    if(_.isEmpty(subscriptionID)) {
        return {
            statusCode: 200,
            headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify('No substriptionId set!'),
        };
    }
    console.log(subscriptionID);
    const subscriptionItemID = _.get(body, 'data.object.lines.data[0].subscription_item', "");
    
    if(_.isEmpty(subscriptionItemID)) {
        return {
            statusCode: 200,
            headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify('No substription_ItemId set!'),
        };
    }
    console.log(subscriptionItemID);
    const user = await getUser(email);
    const TenantID = _.get(user, "Username", "");
    if(_.isEmpty(TenantID)) {
        return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify('Tenant not found!'),
        }; 
    }
    console.log(TenantID)
    
    const numberOfEmployees = await getEmployeesLength(TenantID);
    if(numberOfEmployees === currentNumberOfEmployees) {
        return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify('Number of Employees remained the same!'),
        }; 
    }
    console.log(numberOfEmployees, currentNumberOfEmployees);
    try {
            const usageRecord = await stripe.subscriptionItems.createUsageRecord(
              subscriptionItemID,
              {quantity: numberOfEmployees, action: "set", timestamp: "now"}
        );
        console.log("updated")
        return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify('Updateing Quantity completed!'),
        }; 
    } catch (error) {
        console.log(error);
        return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify('Updateing quantity failed!'),
        }; 
    }
};

const getUser = async (email) => {
    const params = {
          UserPoolId: 'eu-central-1_e0g7ALwrg',
          Username: email
    }
    let user;
    try {
        user = await cognitoidentityserviceprovider.adminGetUser(params).promise();
    } catch (err) {
        console.log(err);
        return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify('User not found!'),
        }; 
    }
    
    return user;
}

const getEmployeesLength = async (TenantId) => {
    var ORG = "ORG#" + TenantId
     var params = {
        TableName: "Staffbite-DynamoDB",
        KeyConditionExpression: "#PK = :PK AND begins_with(#SK, :SK)",
        ExpressionAttributeNames: { "#PK": "PK" , "#SK": "SK" }, 
        ExpressionAttributeValues: { 
          ":PK": {"S": ORG},
          ":SK": {"S": "EMP#"}
        },
     };
    try {
        let data = await dynamodb.query(params).promise();
        return data.Count;
    } catch(error) {
        console.log(error)
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers" : "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            },
            body: JSON.stringify("Employees unable to fetch"),
        }
    }
}