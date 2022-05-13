import React from "react";
// reactstrap components
import {
  Row,
  Col,
  Table
}
from "reactstrap";
// core components
import InfoOverlay from "../../Application/functionalComponents/InfoOverlay";
import { Available } from "../../Application/functionalComponents/SchichtplanElements";

const SchichtenTabelle = (props) => {
    return (
        <>
        <Row className="text-center" noGutters={true}>
            <Col xs={3}>
            </Col>
            <Col xs={6}>
                <InfoOverlay infotitle="Verfügbarkeiten" description="Manchmal kommt es vor, dass sich niemand auf eine Schicht beworben hat. Aus diesem Grund müssen manchmal Schichten entgegen der Wunscharbeitszeiten aufgefüllt werden. In erster Linie zählen deine angegebenen Verfügbarkeiten. Lediglich im Notfall möchten wir dafür sorgen, dass alle Mitarbeitenden bei der Auffüllung gleich behandelt werden. Trag hier bitte dennoch ein, an welchen Tagen du auf keinen Fall arbeiten kannst. Wir versuchen deine Angaben bestmöglich zu berücksichtigen! Zusatz: Diese Angaben sind streng vertraulich und können weder von deinem Vorgesetzten noch von deinen Kollegen eingesehen werden!" ></InfoOverlay>
            </Col>
            <Col xs={3}>
            </Col>
        </Row>
                <br/>
                <Row className="text-center" noGutters={true}>
                <Table responsive={true} borderless={true} style={{"padding": "0"}}>
                    <tdead>
                    </tdead>
                    <tbody>
                    <td>{Available("Montag")}</td>
                    <td>{Available("Dienstag")}</td>
                    <td>{Available("Mittwoch")}</td>
                    <td>{Available("Donnerstag")}</td>
                    <td>{Available("Freitag")}</td>
                    <td>{Available("Samstag")}</td>
                    <td>{Available("Sonntag")}</td>
                    </tbody>
                </Table>
                </Row> 
            </>
        );
    }
export default SchichtenTabelle;