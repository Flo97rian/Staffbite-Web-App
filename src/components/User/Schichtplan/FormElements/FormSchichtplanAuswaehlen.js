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
                    <Col xs={6}>
                        <Form.Label>Zeitraum</Form.Label>
                    </Col>
                    <Col xs={6}>
                    <Form.Label>Zur Bewerbung</Form.Label>
                    </Col>
                </Row>
                <br/>
                <form>
                {this.props.plaene ? this.props.plaene.map((item, index) => (
                    <InputButton key={index} id={index} label={item.plan[0].Montag} start={item.plan[0].Montag}  ende={item.plan[0].Sonntag} {...this.props} placeholder=""></InputButton>
                 )) : <></>}
                </form>
            </>
        )
    }
}