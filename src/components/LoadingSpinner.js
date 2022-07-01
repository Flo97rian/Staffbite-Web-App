import React from 'react';
import PropTypes from "prop-types"
import { Spinner } from "reactstrap";

function LoadingSpinner ({isVisible}) {
    LoadingSpinner.propType = {
        isVisible: PropTypes.bool.isRequired
    }
    if(!isVisible) return null;
    return <Spinner animation="grow" variant="light"/>
}
export default LoadingSpinner;
