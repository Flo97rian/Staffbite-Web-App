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
                    <Col xs={5}>
                        <Form.Label>{this.props.label}</Form.Label>
                    </Col>
                    <Col xs={5}>
                    <Button name={this.props.label} variant="primary" onClick={() => this.props.onSelect(this.props.label)}> Importieren</Button>{' '}
                    </Col>
                    <Col xs={2}>
                    <Button name={this.props.label} variant="danger" onClick={() => this.props.onDelete(this.props.id)}> Löschen </Button>{' '}
                    </Col>
                </Row>
                <br/>
            </>
        )
    }
}