import React from "react";
import Form from 'react-bootstrap/Form';
import {
    Col,
    Row
} from "reactstrap"

export default class Control extends React.PureComponent {
    render() {
        return(
            <>
            <Row className="text-center">
                  <Col xs={6}>
                      <Form.Label>{this.props.label}</Form.Label>
                  </Col>
                  <Col xs={6}>
                      <Form.Control style={{ width:"50%", marginLeft: "25%" }} as="select" type="text" defaultValue={this.props.defaultVal} name={this.props.name} onChange={(e) => this.props.onChange(e, "mitarbeiterBearbeiten")}>
                        <option>Anfänger</option>
                        <option>Fortgeschritten</option>
                        <option>Experte</option>
                      </Form.Control>
                  </Col>
                  </Row>
            </>
        )
    }
}