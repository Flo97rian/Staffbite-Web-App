import React from "react";

// reactstrap components
import {
  Row,
  Col,
  Card,
  CardBody,
  Table
}
from "reactstrap";
// core components
import SchichtplanElement from "../FormElements/SchichtplanElement";
import { Badge } from "reactstrap";

const ApplicationsTable = (props) => {
    const id = props.shiftplan.id
    const idApplications = id.split("#").includes("Freigeben")
    const shiftplan = props.shiftplan.plan
    const ShiftPlanIsActive = props.bearbeiten
    const Montag = props.shiftplan.zeitraum.split(" - ")[0]
    const Sonntag = props.shiftplan.zeitraum.split(" - ")[1]

    return (
        <>
        <Card>
            <CardBody>
            <Row className="text-center mt-4" noGutters={true}>
                <Col xs={3}>
                    <p>Status</p>
                    <p style={{"color": "#5e72e4"}}>offen für Bewerbungen</p>
                </Col>
                <Col xs={6}>
                <p>Zeitraum</p>
                <p>{Montag} - {Sonntag}</p>
                </Col>
                <Col xs={3}>
                    <p>Lengende</p>
                    <Badge color="success">beworben</Badge>
                    <Badge color="warning">Bewerber vorhanden</Badge>
                    <Badge color="light">nicht verfügbar</Badge>
                </Col>
            </Row>
                    <br/>
                    <Row className="text-center" noGutters={true}>
                    <Table responsive={true} borderless={true} style={{"padding": "0"}}>
                        <thead>
                        </thead>
                        <tbody>
                        {ShiftPlanIsActive ? shiftplan.map((item, index) => (
                        <>
                        { idApplications ? 
                        <tr key={index}>
                            <td style={{"padding": "0"}}>
                                <SchichtplanElement wochentag={item.Wochentag} index={index} col="Wochentag" {...props}></SchichtplanElement>
                            </td>
                            <td style={{"padding": "0"}}>
                                    <SchichtplanElement wochentag={item.Montag} index={index} col="Montag" {...props}></SchichtplanElement>
                            </td>
                            <td style={{"padding": "0"}}>
                                    <SchichtplanElement wochentag={item.Dienstag} index={index} col="Dienstag" {...props}></SchichtplanElement>
                            </td>
                            <td style={{"padding": "0"}}>
                                    <SchichtplanElement wochentag={item.Mittwoch} index={index} col="Mittwoch" {...props}></SchichtplanElement>
                            </td>
                            <td style={{"padding": "0"}}>
                                    <SchichtplanElement wochentag={item.Donnerstag} index={index} col="Donnerstag" {...props}></SchichtplanElement>
                            </td>
                            <td style={{"padding": "0"}}>
                                    <SchichtplanElement wochentag={item.Freitag} index={index} col="Freitag" {...props}></SchichtplanElement>
                            </td>
                            <td style={{"padding": "0"}}>
                                    <SchichtplanElement wochentag={item.Samstag} index={index} col="Samstag" {...props}></SchichtplanElement>
                            </td>
                                <td style={{"padding": "0"}}>
                                <SchichtplanElement wochentag={item.Sonntag} index={index} col="Sonntag" {...props}></SchichtplanElement>
                            </td>
                        </tr>
                        :
                        <></>
}
                        </>
                        )):
                        <></>}
                        </tbody>
                    </Table>
                    </Row> 
                </CardBody>
            </Card>
            </>
        );
    }
export default ApplicationsTable;