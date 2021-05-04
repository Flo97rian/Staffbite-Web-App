import React from "react";
import Form from 'react-bootstrap/Form';
import {
    Col,
    Row
} from "reactstrap"

export default class Input extends React.PureComponent {
    render() {
        return(
            <>
                <Row className="text-center">
                    <Col xs={6}>
                        <Form.Label>{this.props.label}</Form.Label>
                    </Col>
                    <Col xs={6}>
                        <Form>
                        <Form.Check custom type="switch" defaultChecked={this.props.value} name={this.props.name} id={this.props.name} onChange={this.props.onChange}></Form.Check>
                        </Form>
                    </Col>
                </Row>                
            </>
        )
    }
}