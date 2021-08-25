import React from "react";
import Form from 'react-bootstrap/Form';
import InfoOverlay from "./InfoOverlay";
import {
    Col,
    Row
} from "reactstrap"

export default class Input extends React.PureComponent {
    render() {
        return(
            <>
                <Row className="text-center">
                    {this.props.info ?
                    <>
                    <Col xs={6}>
                        <InfoOverlay infotitle={this.props.label} description={this.props.description}/>
                    </Col>
                    <Col xs={6}>
                        <Form>
                        <Form.Check custom type="switch" defaultChecked={this.props.value} name={this.props.name} id={this.props.name} onChange={this.props.onChange}></Form.Check>
                        </Form>
                    </Col>
                    </>
                    : 
                    <Col xs={12}>
                        <Form>
                            <Form.Check custom type="switch" defaultChecked={this.props.value} name={this.props.name} id={this.props.name} onChange={this.props.onChange}></Form.Check>
                        </Form>
                    </Col>
                    }
                </Row>                
            </>
        )
    }
}