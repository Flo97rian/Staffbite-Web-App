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
const { 
    getShiftPlan,
    getEmployeeDetails,
    setReviewShiftPlan
} = require('./DB.js');

const { preprocessing } = require("./preprocessing.js")
var Shiftplan = require('./Shiftplan');

exports.handler = async (event) => {
        // preprocessing
        const {
            ORG,
            idreview,
            plan,
            minerfahrung,// wenn gegeben
            lookUpUser,
            shiftPlan,
            reverse,
            stundenerfassung,
            Employees
        } = await preprocessing(event);
    
    let shiftplan = new Shiftplan(plan, Employees);
    await shiftplan.startAlg();
    let reviewShiftPlan = shiftplan.getPlan();
    await setReviewShiftPlan({reviewShiftPlan, idreview, shiftPlan, ORG});
    // TODO implement
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify("Befüllung done"),
    };
    return response
};
