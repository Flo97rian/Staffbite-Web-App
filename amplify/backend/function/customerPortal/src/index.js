const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');

const stripe = require('stripe')("sk_test_51KskmIAQ7Ygg2HBETJXq8xsJSMQDK7FrmhHfDiGPURifLt6UvCEsdRFqoFoG8jXcB7H3jVW072zuQFw7qY5ClTtw00xeycp1wf");
exports.handler = async (event, context) => {
  console.log(JSON.parse(event.body));
  let response;
  const body = JSON.parse(event.body)
  const customer = body.CustomerID
  console.log("customer",customer);
  try {
    response = await stripe.billingPortal.sessions.create({
    customer: customer,
    return_url: "https://www.staffbite.de",
    configuration: "bpc_1Kuv0oAQ7Ygg2HBE6kQdlOp9"
    });
  } catch(err) {
    response = err;
    console.log("error starting", err);
  }
  console.log("response", response);
  return {
        statusCode: 200,
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
      }, 
        body: JSON.stringify(response),
    };
};
