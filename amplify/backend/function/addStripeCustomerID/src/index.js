
const _ = require('lodash');
var AWS = require('aws-sdk');
AWS.config.apiVersions = {
  dynamodb: '2012-08-10',
  // other service API versions
};
var dynamodb = new AWS.DynamoDB();
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();


exports.handler = async function (event, context, callback) {
   const body = JSON.parse(event.body);
   console.log(body);
   console.log(event);
   const email = _.get(body, "data.object.email", "");
   const customerID = _.get(body, "data.object.id", "");
   console.log("email", email)
   
    if(_.isEmpty(customerID)) {
        return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify('CustomerID not defined!'),
        };
   }
   if(_.isEmpty(email)) {
        return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify('Email not defined!'),
        };
   }
   
   const user = await getUser(email);
   console.log(user);
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
   
   const meta = await getMeta(TenantID);
   console.log(meta);
   const updatedPaymentDetails = updatePaymentDetails(meta, customerID);
   await updateMeta(meta, TenantID, updatedPaymentDetails)
   
   
   
}

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

const getMeta = async (tenantID) => {
     var params = {
      Key: {
       "PK": {
         S: "ORG#" + tenantID
        }, 
       "SK": {
         S: "ORG#METADATA#" + tenantID
        }
      }, 
      TableName: "Staffbite-DynamoDB"
     };
    let meta;
    try {
        meta = await dynamodb.getItem(params).promise();
    } catch (err) {
        console.log(err);
        return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify('Meta not found!'),
        }; 
    }
    
    return meta.Item;
}

const updatePaymentDetails = (meta, customerID) => {
    
    
    let tenantCategorie = _.get(meta, "tenantCategorie.S", "")
    
    
    if (_.isEmpty(tenantCategorie)) {
       return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify('tenantCategorie not found!'),
        };  
    }
    
    
    tenantCategorie = JSON.parse(tenantCategorie);
    
    
    if(!_.isBoolean(tenantCategorie.paymentDetails)) {
              return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify('PaymentDetails already set!'),
        };  
    }
    tenantCategorie.paymentDetails = {customerID: customerID};
    
    return tenantCategorie;
    
}

const updateMeta = async (meta, tenantID, tenantCategorie) => {
    let AttributesNames = names(meta);
    console.log(AttributesNames)
    if(_.isEmpty(AttributesNames)) {
        return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify('AttributesNames not set!'),
        }; 
    }
    
    let AttributesValues = values(meta, tenantCategorie);
    console.log(AttributesValues)
        if(_.isEmpty(AttributesValues)) {
        return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify('AttributesValues not set!'),
        }; 
    }
    let UpdateExpress = Expression(meta);
    console.log(UpdateExpress);
        if(_.isEmpty(UpdateExpress)) {
        return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify('UpdateExpression not set!'),
        }; 
    }
    
     var params = {
    Key: {
   "PK": {
     "S": "ORG#" + tenantID
    }, 
   "SK": {
     "S": "ORG#METADATA#" + tenantID
    }
    },
    ExpressionAttributeNames: AttributesNames,
    ExpressionAttributeValues: AttributesValues,
    ReturnValues: "ALL_NEW", 
    TableName: "Staffbite-DynamoDB", 
    UpdateExpression: UpdateExpress,
    };
    
    console.log("param", params);
    try {
      await dynamodb.updateItem(params).promise();
    } catch(error) {
      console.log(error);
      return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify('Meta failed to update!'),
        }; 
      }
    return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
        }, 
        body: JSON.stringify('Successfully updated!'),
    };
}

function names(org) {
    let parameters = org;
    let params = {}
    _.forIn(parameters,function(value, key) {
        if(key !== "SK" && key !== "PK") {
            params["#" + key] = key
        }
    })
    return params
}

function values(org, tenantCategorie) {
    let parameters = org;
    let params = {}
    _.forIn(parameters, function (value, key) {
        if(key !== "SK" && key !== "PK") {
            params[":" + key] = value
        }
    })
        
    console.log(params)
    params[":tenantCategorie"].S = JSON.stringify(tenantCategorie);
    console.log(params)
    return params
}

function Expression(org) {
     let parameters = org;
     let expression = "SET ";
    _.forIn(parameters, function (value, key) {
        if(key !== "SK" && key !== "PK") {
            expression = expression + "#" + key + " = :" + key + ", ";
        }
    });
    
    let expressionLength = expression.length;
    expressionLength = expressionLength - 2
    expression = expression.substring(0, expressionLength);
    console.log(expression);
    return expression
     
}
