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
import SchichtplanElement from "./UserApplicationShiftplanElements";
import { Badge } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";

const UserApplicationsTable = (props) => {
    const id = props.shiftplan.id
    const idApplications = id.split("#").includes("Freigeben")
    const shiftplan = props.shiftplan.plan
    const DisplayShiftplan = useSelector(state => state.display.displayShiftplan);
    const Montag = props.shiftplan.zeitraum.split(" - ")[0]
    const Sonntag = props.shiftplan.zeitraum.split(" - ")[1]

    return (
        <>
        <Card>
            <CardBody>
            <Row className="text-center mt-4">
                <Col xs={3}>
                    <p>Status</p>
                    <p style={{"color": "#5e72e4"}}>Bereit zum eintragen</p>
                </Col>
                <Col xs={6}>
                <p>Zeitraum</p>
                <p>{Montag} - {Sonntag}</p>
                </Col>
                <Col xs={3}>
                    <p>Legende</p>
                    <Badge className="m-1" color="success">Eingetragen</Badge>
                    <Badge className="m-1" color="light" >Weitere Bewerber vorhanden</Badge>
                    <Badge className="m-1" color="default">Nicht verfügbar</Badge>
                </Col>
            </Row>
                    <br/>
                    <Row className="text-center" noGutters={true}>
                    <Table responsive={true} borderless={true} style={{"padding": "0"}}>
                        <thead>
                        </thead>
                        <tbody>
                        {DisplayShiftplan ? shiftplan.map((item, index) => (
                        <>
                        { idApplications ? 
                        <tr key={index}>
                            <td style={{"padding": "0"}}>
                                <SchichtplanElement wochentag={item.Wochentag} index={index} currentItem={item} anzahl={item.Montag} ItemLength={shiftplan.length} col="Wochentag" {...props}></SchichtplanElement>
                            </td>
                            <td style={{"padding": "0"}}>
                                    <SchichtplanElement wochentag={item.Montag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Montag" {...props}></SchichtplanElement>
                            </td>
                            <td style={{"padding": "0"}}>
                                    <SchichtplanElement wochentag={item.Dienstag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Dienstag" {...props}></SchichtplanElement>
                            </td>
                            <td style={{"padding": "0"}}>
                                    <SchichtplanElement wochentag={item.Mittwoch} index={index} currentItem={item} ItemLength={shiftplan.length} col="Mittwoch" {...props}></SchichtplanElement>
                            </td>
                            <td style={{"padding": "0"}}>
                                    <SchichtplanElement wochentag={item.Donnerstag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Donnerstag" {...props}></SchichtplanElement>
                            </td>
                            <td style={{"padding": "0"}}>
                                    <SchichtplanElement wochentag={item.Freitag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Freitag" {...props}></SchichtplanElement>
                            </td>
                            <td style={{"padding": "0"}}>
                                    <SchichtplanElement wochentag={item.Samstag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Samstag" {...props}></SchichtplanElement>
                            </td>
                                <td style={{"padding": "0"}}>
                                <SchichtplanElement wochentag={item.Sonntag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Sonntag" {...props}></SchichtplanElement>
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
export default UserApplicationsTable;