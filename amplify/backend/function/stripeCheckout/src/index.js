
const stripe = require('stripe')("sk_test_51KskmIAQ7Ygg2HBETJXq8xsJSMQDK7FrmhHfDiGPURifLt6UvCEsdRFqoFoG8jXcB7H3jVW072zuQFw7qY5ClTtw00xeycp1wf");
const _ = require('lodash');

exports.handler = async (event) => {
    const body = JSON.parse(event.body);
    const Email = _.get(body, "email", "");
    const NumberOfEmployees = _.get(body, "MitarbeiterAnzahl", 0);
    const priceID = _.get(body, "priceID", "");
    
    
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
    
  try {
    const session = await stripe.checkout.sessions.create({
    line_items: [
        {price: priceID,
          quantity: NumberOfEmployees,
        },
      ],
      mode: 'subscription',
      success_url: "http://localhost:3000/payment-success",
      cancel_url: "http://localhost:3000/payment-decline",
      customer_email: Email
      

    });
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
