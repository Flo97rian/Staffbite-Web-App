
const stripe = require('stripe')("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");
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
    const taxRate = await stripe.taxRates.retrieve(
      'txr_1Kw43nAQ7Ygg2HBEi4UCXOF4'
    );
    
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
    
    if (priceID === "price_1Kz0JnAQ7Ygg2HBEvDlPKKAu") {
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
