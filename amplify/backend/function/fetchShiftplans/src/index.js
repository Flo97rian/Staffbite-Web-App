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
    console.log(event)
    let user = JSON.parse(event.body);
    let ORG = "ORG#" + user["custom:TenantId"];
     var params = {
        TableName: "Staffbite-DynamoDB",
        KeyConditionExpression: "#PK = :PK AND begins_with(#SK, :SK)",
        ExpressionAttributeNames: { "#PK": "PK" , "#SK": "SK" }, 
        ExpressionAttributeValues: { 
          ":PK": {"S": ORG},
          ":SK": {"S": "PLAN#"}
        },
     };
     
    let data = null
    try {
        data = await dynamodb.query(params).promise();
    } catch(error) {
        
    }
    
    function setToMonday( date ) {
    var day = date.getDay() || 7;  
    if( day !== 1 ) 
        date.setHours(-24 * (day - 1)); 
    return date;
}

    data = data.Items.filter(plan => {
        const Id = plan.SK.S.split('#')
        if(Id.includes("Entwurf")) {
            return true;
        }
        let zeitraum = plan.zeitraum.S;
        if(zeitraum) {
            let planStart = zeitraum.split(" - ");
            let planStartSplit = planStart[0].split('.');
            let date = new Date(planStartSplit[2], planStartSplit[1] - 1, planStartSplit[0]);
            let today = new Date();
            let monday = setToMonday(date)
            if(date > today || (monday < today && monday > today.setDate(today.getDate() - 7))) {
                return true;
        }}
        return false;
    }) 
    
        let response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify(data),
        }
    return response;
};


