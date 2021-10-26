import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import InputButton from "./InputButton";
import Form from 'react-bootstrap/Form';

export default class FormSchichtplanAuswaehlen extends React.PureComponent {
    render() {
        return(
            <>
                <Row className="text-center">
                    <Col xs={4}>
                        <Form.Label>Bewerbungsstatus</Form.Label>
                    </Col>
                    <Col xs={4}>
                        <Form.Label>Zeitraum</Form.Label>
                    </Col>
                    <Col xs={4}>
                    <Form.Label>Zur Bewerbung</Form.Label>
                    </Col>
                </Row>
                <br/>
                <form>
                {this.props.plaene ? this.props.plaene.map((item, index) => (
                    <InputButton key={index} id={index} label={item.id.split("#")} start={item.zeitraum.split(" - ")[0]}  ende={item.zeitraum.split(" - ")[1]} {...this.props} placeholder=""></InputButton>
                 )) : <></>}
                </form>
            </>
        )
    }
}