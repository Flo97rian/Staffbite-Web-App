// Button der 3 Mal belegt werden kann
// Button um einen erstellten Schichtplan zu auszuwählen
import React from "react";
import Form from "react-bootstrap/Form";
import { Row, Col, Card, CardBody, Button, Badge, Input } from "reactstrap";
import InputForm from "./InputForm"
import InfoOverlay from "../../../Application/functionalComponents/InfoOverlay";
import { INFO_ORGANISATION_FIRSTNAME_AND_LASTNAME, INFO_ORGANISATION_NAME, INFO_ORGANISATION_POSITIONS, INFO_ORGANISATION_STUNDENERFASSUNG } from "../../../../constants/InfoTexts";
import store from "../../../../store";
import InfoLabel from "../../../Application/functionalComponents/InfoLabel";
import { validMeta, validMetaData } from "../../../Application/functionalComponents/ValidFunctions";
const Unternehmensprofil = (props) => {
    function handleKeyPress(event) {
        if(event.key === 'Enter'){
            props.handlePositionErstellen()
        }
      }
    function showPositions () {
        let meta = props.metaData;
        if(validMetaData(meta)) {
            let schichten = meta.schichten;
            let schichtenLength = schichten.length;
            if (schichtenLength > 1) {
                return(
                schichten.map((item, index) => {
                    return (
                        <Badge key={index} className="ml-2 mt-2" color="success" onClick={() => props.handleRemovePositions(item)}>{item}
                            {" "}
                            <i className="fas fa-times"></i>
                        </Badge>
                    )}))
            } else if(schichtenLength === 1) {
                return(
                    <Badge key={0} className="ml-2 mt-2" color="success" onClick={() => props.handleRemovePositions(schichten[0])}>{schichten[0]}
                            {" "}
                            <i className="fas fa-times"></i>
                        </Badge>
                )
            } else {
                return null;
            }
        }
        return null;
    }
        return (
            <>
            <Row className="mt-6">
            <Col xs={2}className="mt-4">
                <h3 className="float-left pt-4 font-weight-bold text-lg">Einstellungen</h3>
            </Col>
            <Col xs={10}>
                <Button className="float-right mt-4 button_speichern" color="primary" onClick={() => props.onClick()}><p className="m-0 text-white">Änderungen speichern</p></Button>
            </Col>
            </Row>
            <Card className="shadow">
                <CardBody>
                <InfoLabel title="Name des Betriebs" description={INFO_ORGANISATION_NAME}></InfoLabel>
                <InputForm name="name" placeholder={props.org?.name}{...props}/>
                <InfoLabel title="Dein Vor- & Nachname" description={INFO_ORGANISATION_NAME}></InfoLabel>
                <InputForm name="vorname" placeholder={"vorname" in props.org ? props.org.vorname : "Max Mustermann"} {...props}/>
                <InfoLabel title="Stundenerfassung" description={INFO_ORGANISATION_STUNDENERFASSUNG}></InfoLabel>
                <Form.Check custom type="switch" size="lg" disabled name="stundenerfassung"></Form.Check>
                </CardBody>
                <Row className="m-2 mb-4 input_position">
                    <Col xs={12}>
                    <InfoLabel title="Positionen bearbeiten" description={INFO_ORGANISATION_POSITIONS}></InfoLabel>
                    {props.showPositionHinzufuegen ?
                    <Input type="text" size="lg" className="form-control-alternative edit-event--description input-autosize form-control" label="Position" name="position"  placeholder="" onKeyPress={(event) => handleKeyPress(event)} onChange={(e) => props.handlePositionChange(e)}></Input>
                        :
                        <></>
                    }
                    {showPositions()}
                    {props.showPositionHinzufuegen ?
                        <>
                        <Badge className="mt-2 ml-2 mb-4 mr-2" color="primary" onClick={() => props.handlePositionErstellen()}>Position erstellen</Badge>
                        <Badge className="mt-2 mb-4" color="warning" onClick={() => props.handlePositionHinzufuegenClose()}>x</Badge>
                        </>
                        :
                        <Badge className="mt-2 mb-4 ml-2" color="light" onClick={() => props.handlePositionHinzufuegen()}>Position erstellen</Badge>
                        }
                    </Col>
                    </Row>
            </Card>
            </>
        );
}
export default Unternehmensprofil;