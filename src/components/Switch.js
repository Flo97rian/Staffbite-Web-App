import React from "react";
import {
    Row,
    FormGroup,
    Col
} from "reactstrap"
import Form from 'react-bootstrap/Form';
import InfoLabel from "./InfoLabel";

export default class Switch extends React.PureComponent {
    render() {
        return(
            <Row>
                <Col>
                    <FormGroup>
                        <InfoLabel title={this.props.label} description={this.props.description}></InfoLabel>
                            <Form>
                                <Form.Check className="ml-5" custom type="switch" size="lg" defaultChecked={this.props.value} name={this.props.name} id={this.props.name} onChange={this.props.onChange}></Form.Check>
                            </Form>
                    </FormGroup>           
                </Col>
            </Row>
        )
    }
}