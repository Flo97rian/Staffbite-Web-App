/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["STRIPE_SK"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/

const aws = require('aws-sdk');

exports.handler = async (event) => {
    // TODO implement
    const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["STRIPE_SK"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();
    console.log(process.env.ENV);
    const STRIPE_SK =  process.env.ENV === "dev" ? "sk_test_51KskmIAQ7Ygg2HBETJXq8xsJSMQDK7FrmhHfDiGPURifLt6UvCEsdRFqoFoG8jXcB7H3jVW072zuQFw7qY5ClTtw00xeycp1wf" : Parameters.pop().Value;
    const stripe = require('stripe')(STRIPE_SK);
    const body = JSON.parse(event.body);
    const cumstomerId = body?.object?.data?.cumstomer ?  body.object.data.cumstomer : "";
    if(cumstomerId !== "") {
      const customer = await stripe.customers.update(
          cumstomerId,
        {preferred_locales: 'de-DE'}
      );
    }
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
