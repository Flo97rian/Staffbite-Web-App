import React from "react";
import {Button} from "reactstrap";
import PropTypes from "prop-types";
import * as _ from "lodash"
import { API } from "aws-amplify";
import { API_HOSTNAME } from "../../constants/ApiConstants";
const stripe = require('stripe')("sk_test_51KskmIAQ7Ygg2HBETJXq8xsJSMQDK7FrmhHfDiGPURifLt6UvCEsdRFqoFoG8jXcB7H3jVW072zuQFw7qY5ClTtw00xeycp1wf");

const CumstomerPortal = ({CustomerID}) => {
    CumstomerPortal.propTypes = {
        CustomerID: PropTypes.string.isRequired
    }

    async function handleCreateCustomerPortal() {
        console.log("create")
        try {
            let response = await API.post(API_HOSTNAME, "/customerPortal", {body: {CustomerID: CustomerID}})
            //console.log(response);
            console.log("session", response);
            if(_.hasIn(response, "url")) {
                window.open(_.get(response, ["url"]))
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Button color="primary" onClick={() =>handleCreateCustomerPortal()}>Zum Kundenportal</Button>
    )
}
export default CumstomerPortal;