var AWS = require('aws-sdk');
AWS.config.apiVersions = {
  dynamodb: '2012-08-10',
  // other service API versions
};
var dynamodb = new AWS.DynamoDB();

exports.getShiftPlan = async (PK, SK) => {
         var params = {
      Key: {
       "PK": {
         S: PK
        }, 
       "SK": {
         S: SK
        }
      }, 
      TableName: "Staffbite-DynamoDB"
     };
     var data = await dynamodb.getItem(params, function(err, data) {
       if (err) console.log(err, err.stack); // an error occurred
       else     console.log(data); // successful response
     }).promise();
    return data.Item;
}

exports.getEmployeeDetails = async (ORG) => {
         var params = {
        TableName: "Staffbite-DynamoDB",
        KeyConditionExpression: "#PK = :PK AND begins_with(#SK, :SK)",
        ExpressionAttributeNames: { "#PK": "PK" , "#SK": "SK" }, 
        ExpressionAttributeValues: { 
          ":PK": {"S": ORG},
          ":SK": {"S": "EMP#"}
        },
     };
     var data = await dynamodb.query(params, function(err, data) {
       if (err) console.log(err, err.stack); // an error occurred
       else console.log(data); // successful response
     }).promise();
     return data;
}

exports.setReviewShiftPlan = async (config) => {
    let {reviewShiftPlan, idreview, shiftPlan, ORG} = config;
    console.log(config);
    let name = shiftPlan.name["S"];
    let schichtentag = shiftPlan.schichtentag["N"];
          var params = {
            Item: {
               PK: {
                 S: ORG
                }, 
               SK: {
                 S: idreview
                }, 
               data: {
                 S:  JSON.stringify(reviewShiftPlan)
               }, 
               name: {
                 S: name
                }, 
               schichtentag: {
                 N: schichtentag
                }, 
               zeitraum: {
                 S: shiftPlan.zeitraum["S"]
                }, 
               tauschanfrage: {
                 S: JSON.stringify([])
                }
            },
  ReturnConsumedCapacity: "TOTAL", 
  TableName: "Staffbite-DynamoDB"
 };
 await dynamodb.putItem(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log("donedasda", data);
        }).promise();
    console.log("Successful failed :)")
}
exports.getMetaData = async (PK, SK) => {
         var params = {
      Key: {
       "PK": {
         S: PK
        }, 
       "SK": {
         S: SK
        }
      }, 
      TableName: "Staffbite-DynamoDB"
     };
     var data = await dynamodb.getItem(params, function(err, data) {
       if (err) console.log(err, err.stack); // an error occurred
       else     console.log(data); // successful response
     }).promise();
    return data;
}