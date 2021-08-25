import React from "react";
import {
    Col,
    Row
  } from "reactstrap";
import { InputButton } from "./InputButton";
import Form from 'react-bootstrap/Form';

export default class FormSchichtplanImportieren extends React.PureComponent {
    render() {
        return(
            <>
                <form>
                <Row className="text-center">
                        <Col xs={2}>
                            <Form.Label>Name</Form.Label>
                        </Col>
                        <Col xs={4}>
                            <Form.Label>Zeitraum</Form.Label>
                        </Col>
                        <Col xs={2}>
                            <Form.Label>Status</Form.Label>
                        </Col>
                        <Col xs={2}>
                            <Form.Label>Importieren</Form.Label>
                        </Col>
                        <Col xs={2}>
                            <Form.Label>Löschen</Form.Label>
                        </Col>
                    </Row>
                    <br/>
                {this.props.plaene ? this.props.plaene.map((item, index) => (
                    <InputButton key={index} id={index} status={item.id} montag={item.plan[0].Montag} sonntag={item.plan[0].Sonntag} label={item.name} name={item.name}  {...this.props} placeholder=""></InputButton>
                 )) : <></>}
                </form>
            </>
        )
    }
}