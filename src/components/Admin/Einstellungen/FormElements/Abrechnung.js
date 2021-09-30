// Button der 3 Mal belegt werden kann
// Button um einen erstellten Schichtplan zu auszuwählen
import React from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import Datepicker from "../../../Application/functionalComponents/DateRangePickerExample";
import InfoOverlay from "../../../Application/functionalComponents/InfoOverlay";

const Abrechnung = (props) => {
        return (
            <>
            <Row className="mt-6">
            <Col xs={2}className="mt-4">
                <h3 className="float-left pt-4 font-weight-bold text-lg">Einstellungen</h3>
            </Col>
            <Col xs={10}>
                <Button className="float-right mt-4" color="primary" onClick={() => props.onClick()}><p className="m-0 text-white">Änderungen speichern</p></Button>
            </Col>
            </Row>
            <Card className="shadow">
                <CardBody>
            <>
                    <InfoOverlay infotitle={"Abrechnungszeitraum"} description={"Tragen Sie hier ihren individuellen Abrechnungszeitraum ein. Somit können wir Montat für Monat einen flüssigen Übergang ihrer Schichtpläne ermöglichen"}/>
                    <Datepicker size="lg" getDates={props.getDates} start="WochenStart" ende="WochenEnde" placeholderAnfang={props.org?.AbrechnungStart ? props.org.AbrechnungStart["S"] : "Beginn"} placeholderEnde={props.org?.AbrechnungEnde ? props.org.AbrechnungEnde["S"] : "Ende"} />  
            </>
            </CardBody>
            </Card>
            </>
        );
    }
export default Abrechnung;