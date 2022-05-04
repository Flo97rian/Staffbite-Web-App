/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const stripe = require('stripe')("sk_test_51KskmIAQ7Ygg2HBETJXq8xsJSMQDK7FrmhHfDiGPURifLt6UvCEsdRFqoFoG8jXcB7H3jVW072zuQFw7qY5ClTtw00xeycp1wf");
// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


app.post('/create-customer-portal-session', async (req, res) => {
  // Authenticate your user.
  try {
  const session = await stripe.billingPortal.sessions.create({
    customer: req.body.CustomerID,
    return_url: 'https://www.staffbite.de',
  });
    res.redirect(session.url);
  } catch(err) {
    res.json({ err: err })
  }
  return res;
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
