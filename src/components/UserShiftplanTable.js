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
import SchichtplanElementPublished from "./UserShiftplanElementPublish";
import { Badge } from "reactstrap";
import { useSelector } from "react-redux";
import { de } from 'date-fns/locale';
import format from "date-fns/format";


const UserShiftplanTable = (props) => {
    const Shiftplan = useSelector(state => state.Shiftplan);
    const DisplayShiftplan = useSelector(state => state.display.displayShiftplan)
    const Montag = Shiftplan.startOfWeek ?  format(Shiftplan.startOfWeek, 'do.MMMM.yyyy', { locale: de, weekStartsOn: 1}) : Shiftplan.zeitraum.split(" - ")[0];
    const Sonntag = Shiftplan.startOfWeek ?  format(Shiftplan.startOfWeek, 'do.MMMM.yyyy', { locale: de, weekStartsOn: 1}) :  Shiftplan.zeitraum.split(" - ")[1]
    const ShiftplanLength = Shiftplan.plan.length;

    if(DisplayShiftplan) {
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
                        <tbody>
                        {Shiftplan.plan.map((item, index) => {
                            return (
                        <tr key={index}>
                            <td style={{"padding": "0"}}>
                                <SchichtplanElementPublished wochentag={item.Wochentag} index={index} currentItem={item} anzahl={item.Montag.anzahl} ItemLength={ShiftplanLength} col="Wochentag"></SchichtplanElementPublished>
                            </td>
                            <td style={{"padding": "0"}}>
                                <SchichtplanElementPublished wochentag={item.Montag} index={index} currentItem={item} anzahl={item.Montag.anzahl}ItemLength={ShiftplanLength} col="Montag"></SchichtplanElementPublished>
                            </td>
                            <td style={{"padding": "0"}}>
                                <SchichtplanElementPublished wochentag={item.Dienstag} index={index} currentItem={item} anzahl={item.Montag.anzahl}ItemLength={ShiftplanLength} col="Dienstag"></SchichtplanElementPublished>
                            </td>
                            <td style={{"padding": "0"}}>
                                <SchichtplanElementPublished wochentag={item.Mittwoch} index={index} currentItem={item} anzahl={item.Montag.anzahl}ItemLength={ShiftplanLength} col="Mittwoch"></SchichtplanElementPublished>
                            </td>
                            <td style={{"padding": "0"}}>
                                <SchichtplanElementPublished wochentag={item.Donnerstag} index={index} currentItem={item} anzahl={item.Montag.anzahl}ItemLength={ShiftplanLength} col="Donnerstag"></SchichtplanElementPublished>
                            </td>
                            <td style={{"padding": "0"}}>
                                <SchichtplanElementPublished wochentag={item.Freitag} index={index} currentItem={item} anzahl={item.Montag.anzahl}ItemLength={ShiftplanLength} col="Freitag"></SchichtplanElementPublished>
                            </td>
                            <td style={{"padding": "0"}}>
                                <SchichtplanElementPublished wochentag={item.Samstag} index={index} currentItem={item} anzahl={item.Montag.anzahl}ItemLength={ShiftplanLength} col="Samstag"></SchichtplanElementPublished>
                            </td>
                                <td style={{"padding": "0"}}>
                                <SchichtplanElementPublished wochentag={item.Sonntag} index={index} currentItem={item} anzahl={item.Montag.anzahl} ItemLength={ShiftplanLength} col="Sonntag"></SchichtplanElementPublished>
                            </td>
                        </tr>
                            )})}
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
export default UserShiftplanTable;