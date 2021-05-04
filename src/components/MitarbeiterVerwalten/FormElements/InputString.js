import React from "react";
import PropTypes from "prop-types";
import Form from 'react-bootstrap/Form';
import {
    Col,
    Row
} from "reactstrap"

export default class InputString extends React.PureComponent {
    render() {
        return(
            <>
                <Row className="text-center">
                    <Col xs={6}>
                        <Form.Label>{this.props.label}</Form.Label>
                    </Col>
                    <Col xs={6}>
                        <input type="text" name={this.props.name} value={this.props.value} placeholder={this.props.placeholder} onChange={this.props.onChange}></input>
                    </Col>
                </Row>
            </>
        )
    }
}

InputString.propTypes = {
    value: PropTypes.string
}