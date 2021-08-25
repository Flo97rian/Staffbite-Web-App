import React from "react";
import Form from 'react-bootstrap/Form';
import {
    Col,
    Row
} from "reactstrap"
import Button from 'react-bootstrap/Button';

export default class InputButton extends React.PureComponent {
    render() {
        return(
            <>
                <Row className="text-center">
                    <Col xs={6}>
                        <Form.Label>{this.props.start} - {this.props.ende}</Form.Label>
                    </Col>
                    <Col xs={6}>
                    <Button name={this.props.label} variant="primary" onClick={() => this.props.onSelect(this.props.id)}> Zur Bewerbung</Button>{' '}
                    </Col>
                </Row>
                <br/>
            </>
        )
    }
}