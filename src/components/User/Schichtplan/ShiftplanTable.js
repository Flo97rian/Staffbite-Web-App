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
import SchichtplanElementPublished from "./FormElements/SchichtplanElementPublished";
import { Badge } from "reactstrap";


const ShiftplanTable = (props) => {
    const id = props.shiftplan.id
    const idVeröffentlicht = id.split("#").includes("Veröffentlicht")
    const shiftplan = props.shiftplan.plan
    const ShiftPlanIsActive = props.bearbeiten
    const Montag = props.shiftplan.zeitraum.split(" - ")[0]
    const Sonntag = props.shiftplan.zeitraum.split(" - ")[1]

    return (
        <>
        <Card>
            <CardBody>
            <Row className="text-center mt-4" >
                <Col xs={3}>
                    <p>Status</p>
                    <p style={{"color": "#2dce89"}}>Veröffentlicht</p>
                </Col>
                <Col xs={6}>
                <p>Zeitraum</p>
                <p>{Montag} - {Sonntag}</p>
                </Col>
                <Col xs={3}>
                    <p>Legende</p>
                    <Badge color="success">Schicht erhalten</Badge>
                    <Badge color="light">Schicht nicht erhalten</Badge>
                    <Badge color="default">nicht verfügbar</Badge>
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
                        {idVeröffentlicht ? 
                        <tr key={index}>
                            <td style={{"padding": "0"}}>
                                <SchichtplanElementPublished wochentag={item.Wochentag} index={index} currentItem={item} anzahl={item.Montag} ItemLength={shiftplan.length} col="Wochentag" {...props}></SchichtplanElementPublished>
                            </td>
                            <td style={{"padding": "0"}}>
                                <SchichtplanElementPublished wochentag={item.Montag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Montag" {...props}></SchichtplanElementPublished>
                            </td>
                            <td style={{"padding": "0"}}>
                                <SchichtplanElementPublished wochentag={item.Dienstag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Dienstag" {...props}></SchichtplanElementPublished>
                            </td>
                            <td style={{"padding": "0"}}>
                                <SchichtplanElementPublished wochentag={item.Mittwoch} index={index} currentItem={item} ItemLength={shiftplan.length} col="Mittwoch" {...props}></SchichtplanElementPublished>
                            </td>
                            <td style={{"padding": "0"}}>
                                <SchichtplanElementPublished wochentag={item.Donnerstag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Donnerstag" {...props}></SchichtplanElementPublished>
                            </td>
                            <td style={{"padding": "0"}}>
                                <SchichtplanElementPublished wochentag={item.Freitag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Freitag" {...props}></SchichtplanElementPublished>
                            </td>
                            <td style={{"padding": "0"}}>
                                <SchichtplanElementPublished wochentag={item.Samstag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Samstag" {...props}></SchichtplanElementPublished>
                            </td>
                                <td style={{"padding": "0"}}>
                                <SchichtplanElementPublished wochentag={item.Sonntag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Sonntag" {...props}></SchichtplanElementPublished>
                            </td>
                        </tr>
                        :
                        <></>}
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
export default ShiftplanTable;