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
    const DisplayShiftplan = useSelector(state => state.display.displayShiftplan);
    const Shiftplan = useSelector(state => state.Shiftplan);
    const Montag = Shiftplan.zeitraum.split(" - ")[0]
    const Sonntag = Shiftplan.zeitraum.split(" - ")[1]
    const IsApplicationShiftplan = Shiftplan.id.split('#').includes("Freigeben");
    const ShiftplanLength = Shiftplan.plan.length
    if(DisplayShiftplan) {
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
                        {IsApplicationShiftplan ? Shiftplan.plan.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td style={{"padding": "0"}}>
                                        <SchichtplanElement wochentag={item.Wochentag} index={index} currentItem={item} anzahl={item.Montag.anzahl} ItemLength={ShiftplanLength} col="Wochentag"></SchichtplanElement>
                                    </td>
                                    <td style={{"padding": "0"}}>
                                            <SchichtplanElement wochentag={item.Montag} index={index} currentItem={item} anzahl={item.Montag.anzahl} ItemLength={ShiftplanLength} col="Montag"></SchichtplanElement>
                                    </td>
                                    <td style={{"padding": "0"}}>
                                            <SchichtplanElement wochentag={item.Dienstag} index={index} currentItem={item} anzahl={item.Montag.anzahl} ItemLength={ShiftplanLength} col="Dienstag"></SchichtplanElement>
                                    </td>
                                    <td style={{"padding": "0"}}>
                                            <SchichtplanElement wochentag={item.Mittwoch} index={index} currentItem={item} anzahl={item.Montag.anzahl} ItemLength={ShiftplanLength} col="Mittwoch"></SchichtplanElement>
                                    </td>
                                    <td style={{"padding": "0"}}>
                                            <SchichtplanElement wochentag={item.Donnerstag} index={index} currentItem={item} anzahl={item.Montag.anzahl} ItemLength={ShiftplanLength} col="Donnerstag"></SchichtplanElement>
                                    </td>
                                    <td style={{"padding": "0"}}>
                                            <SchichtplanElement wochentag={item.Freitag} index={index} currentItem={item} anzahl={item.Montag.anzahl} ItemLength={ShiftplanLength} col="Freitag"></SchichtplanElement>
                                    </td>
                                    <td style={{"padding": "0"}}>
                                            <SchichtplanElement wochentag={item.Samstag} index={index} currentItem={item} anzahl={item.Montag.anzahl} ItemLength={ShiftplanLength} col="Samstag"></SchichtplanElement>
                                    </td>
                                        <td style={{"padding": "0"}}>
                                        <SchichtplanElement wochentag={item.Sonntag} index={index} currentItem={item} anzahl={item.Montag.anzahl} ItemLength={ShiftplanLength} col="Sonntag"></SchichtplanElement>
                                    </td>
                                </tr>
                            )}
                            )
                        :
                        <>
                        </>
                        }
                        </tbody>
                    </Table>
                    </Row> 
                </CardBody>
            </Card>
            </>
        );
        }
    return null;
    }
export default UserApplicationsTable;