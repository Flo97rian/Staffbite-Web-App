// Button der 3 Mal belegt werden kann
// Button um einen erstellten Schichtplan zu auszuwählen
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "reactstrap";
import InputForm from "./InputForm"

export default class SchichtplanEinstellungen extends React.PureComponent {
    render() {
        return (
            <>
            <br/>
            <Row className="text-center">
                <Col xs={6}>
                    <Form.Label>Name</Form.Label>
                </Col>
                <Col xs={6}>
                    <InputForm {...this.props}/>
                </Col>
            </Row>
            <br/>
            <Row className="text-center">
                <Col xs={6}>
                    <Form.Label>Sollen Schichten bevorzugt befüllt werden?</Form.Label>
                </Col>
                <Col xs={6}>
                    <InputForm {...this.props}/>
                </Col>
            </Row>
            <br/>
            <Row className="text-center">
                <Col xs={6}>
                    <Form.Label>Soll jede:r etwa gleichviele Schichten bekommen?</Form.Label>
                </Col>
                <Col xs={6}>
                    <InputForm {...this.props}/>
                </Col>
            </Row>
            <br/>
            <Row className="text-center">
                <Col xs={6}>
                    <Form.Label>Mitarbeiter:inn darf freie Tage selbst bestimmen? Vlt. mit Begründung</Form.Label>
                    <Form.Label>Auswahl Mini-Job, Werkstudent etc.</Form.Label>
                    <Form.Label>Mitarebeiter:innen gleichmäßig auf Tag und Abendschicht verteilen?</Form.Label>
                    <Form.Label>Mitarebeiter:innen gleichmäßig auf Tag und Abendschicht verteilen?</Form.Label>
                    <Form.Label>Mitarebeiter:innen dürfen monatlichen Verdienst bis max. bzw. min. ändern?</Form.Label>
                    <Form.Label>Mitarbeiter:innen tagen sich bis z.B. 14 Uhr ein oder ab 14 Uhr</Form.Label>
                    <Form.Label>Mitarbeiter:innen dürfen eigenständig Schichten tauschen?</Form.Label>
                </Col>
                <Col xs={6}>
                    <InputForm {...this.props}/>
                </Col>
            </Row>
            <br/>
            <Row className="text-center">
                <Col xs={6}>
                    <Form.Label>Logo</Form.Label>
                </Col>
                <Col xs={6}>
                    <Form.Label></Form.Label>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col xs={10}></Col>
                <Col xs={2}>
                    <Button variant="primary" onClick={() => this.props.onClick()}>Änderungen speichern</Button>
                </Col>
            </Row>
            </>
        );
    }
}