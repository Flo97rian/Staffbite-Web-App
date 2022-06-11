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

const _ = require('lodash');
const aws = require('aws-sdk');

exports.handler = async (event) => {
    const { Parameters } = await (new aws.SSM())
    .getParameters({
      Names: ["STRIPE_SK"].map(secretName => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();
    const STRIPE_SK =  process.env.ENV === "dev" ? "sk_test_51KskmIAQ7Ygg2HBETJXq8xsJSMQDK7FrmhHfDiGPURifLt6UvCEsdRFqoFoG8jXcB7H3jVW072zuQFw7qY5ClTtw00xeycp1wf" : Parameters.pop().Value;
    const stripe = require('stripe')(STRIPE_SK);
    const body = JSON.parse(event.body);
    const Email = _.get(body, "email", "");
    
    
    const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
        }, 
        body: JSON.stringify('Something went wrong!'),
    };
    
    if(_.isEmpty(Email)) {
        return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify('TenantID not defined!'),
        };
    }
    const isYearly = body.isYearly;
    const getMothly = process.env.ENV === "dev" ? "price_1KwM8EAQ7Ygg2HBE2pzPSSnR" : "price_1Kz0IIAQ7Ygg2HBEOnTJLow2";
    const getYearly = process.env.ENV === "dev" ?  "price_1KwLzOAQ7Ygg2HBEBaASvLcn" : "price_1Kz0JnAQ7Ygg2HBEvDlPKKAu";
    const priceID = isYearly ? getYearly : getMothly
    if( _.isEmpty(priceID)) {
        return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify('PriceID not set!'),
        };
    }
    
    let params = {line_items: [
        {
          price: priceID,
        },
      ],
      mode: 'subscription',
      success_url: "https://www.staffbite.de/payment-success",
      cancel_url: "https://www.staffbite.de/payment-decline",
      customer_email: Email,
      locale: "de",
      automatic_tax: {
        enabled: true
      },
      allow_promotion_codes: true
    };
    
    if (priceID === getYearly) {
      params.line_items[0].quantity = 1;
      params.allow_promotion_codes = true;
    }
    console.log(params);
  try {
    const session = await stripe.checkout.sessions.create(params);
    console.log(session)
    return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
        }, 
        body: JSON.stringify({message: 'Checkout Session completed!', session: session}),
    };
  } catch (err) {
      console.log(err)
          return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
        }, 
        body: JSON.stringify(err),
    };
  };
};
