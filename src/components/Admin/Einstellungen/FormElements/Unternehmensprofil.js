// Button der 3 Mal belegt werden kann
// Button um einen erstellten Schichtplan zu auszuwählen
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "reactstrap";
import InputForm from "./InputForm"
import InfoOverlay from "../../SchichtplanErstellen/FormElements/InfoOverlay";

export default class Unternehmensprofil extends React.PureComponent {
    render() {
        return (
            <>
            <br/>
            <Row className="text-center">
                <Col xs={6}>
                <InfoOverlay
                    infotitle={"Name"}
                    description={"Tragen Sie hier den Namen ihres Betriebs ein."}/>
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