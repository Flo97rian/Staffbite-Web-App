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
const { 
    isApplicantsMax,
    isApplicantShiftMax,
    updateApplicantGotShift,
    isValidApplicant,
    getUserDetail,
    updateEmployeesVerdienst,
    updateEmployeesShift,
    removeEmployeesVerdienst,
    } = require("./processing.js")

exports.handler = async (event) => {
        // preprocessing
        const {
            ORG,
            shiftPlan,
            idreview,
            minerfahrung,// wenn gegeben
            copyShiftPlan,
            shiftsOrderedByDay,
            lookUpUser,
            reverse,
            stundenerfassung
        } = await preprocessing(event);
    // TODO implement
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
