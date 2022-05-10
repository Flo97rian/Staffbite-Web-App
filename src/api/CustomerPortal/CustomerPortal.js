import React from "react";
import {Button} from "reactstrap";
import PropTypes from "prop-types";
import * as _ from "lodash"
import { API } from "aws-amplify";
import { API_HOSTNAME } from "../../constants/ApiConstants";

const CustomerPortal = ({CustomerID}) => {
    CustomerPortal.propTypes = {
        CustomerID: PropTypes.string.isRequired
    }

    CustomerPortal.defaultProps = {
        CustomerID: ""
    }

    async function handleCreateCustomerPortal() {
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
        <Button color="primary" hidden={_.isEmpty(CustomerID)} onClick={() =>handleCreateCustomerPortal()}>Zum Kundenportal</Button>
    )
}
export default CustomerPortal;