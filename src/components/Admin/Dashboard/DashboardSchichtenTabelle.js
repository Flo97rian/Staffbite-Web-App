import React from "react";

// reactstrap components
import {
  Row,
  Col,
  Table
}
from "reactstrap";
// core components
import DashboardElementApplication from "./DashboardElementApplication";
import DashboardElementPublished from "./DashboardElementPublished"
import { Badge } from "reactstrap";
import PlanId from "../Schichtplan/FormElements/PlanId";

const DashboardSchichtenTabelle = (props) => {
    const id = props.shiftplan.id
    const idVeröffentlicht = id.split("#").includes("Veröffentlicht")
    const shiftplan = props.shiftplan.plan
    const ShiftPlanIsActive = props.bearbeiten
    const Montag = props.shiftplan.zeitraum.split(" - ")[0]
    const Sonntag = props.shiftplan.zeitraum.split(" - ")[1]

    return (
        <>
            <Row className="text-center mt-4" noGutters={true}>
                <Col xs={3}>
                    <p>Status</p>
                    <PlanId id={id} ></PlanId>
                </Col>
                <Col xs={6}>
                <p>Zeitraum</p>
                <p>{Montag} - {Sonntag}</p>
                </Col>
                <Col xs={3}>
                    <p>Legende</p>
                    <Badge color="success">Eingetragen</Badge>
                    <Badge color="warning">Weitere Bewerber vorhanden</Badge>
                    <Badge color="light">Nicht verfügbar</Badge>
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
                        <tr>
                            <td style={{"padding": "0"}}>
                                {idVeröffentlicht
                                ?
                                <DashboardElementPublished wochentag={item.Wochentag} index={index} anzahl={shiftplan[index].Montag} currentItem={item} ItemLength={shiftplan.length} col="Wochentag" {...props}></DashboardElementPublished>
                                :
                                <DashboardElementApplication wochentag={item.Wochentag} index={index} anzahl={shiftplan[index].Montag} currentItem={item} ItemLength={shiftplan.length} col="Wochentag" {...props}></DashboardElementApplication>
                                }
                            </td>
                            <td style={{"padding": "0"}}>
                                {idVeröffentlicht
                                ?
                                <DashboardElementPublished wochentag={item.Montag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Montag" {...props}></DashboardElementPublished>
                                :
                                    <DashboardElementApplication wochentag={item.Montag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Montag" {...props}></DashboardElementApplication>
                                }
                            </td>
                            <td style={{"padding": "0"}}>
                                {idVeröffentlicht
                                ?
                                <DashboardElementPublished wochentag={item.Dienstag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Dienstag" {...props}></DashboardElementPublished>
                                :
                                    <DashboardElementApplication wochentag={item.Dienstag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Dienstag" {...props}></DashboardElementApplication>
                                }
                            </td>
                            <td style={{"padding": "0"}}>
                                {idVeröffentlicht
                                ?
                                <DashboardElementPublished wochentag={item.Mittwoch} index={index} currentItem={item} ItemLength={shiftplan.length} col="Mittwoch" {...props}></DashboardElementPublished>
                                :
                                    <DashboardElementApplication wochentag={item.Mittwoch} index={index} currentItem={item} ItemLength={shiftplan.length} col="Mittwoch" {...props}></DashboardElementApplication>
                                }
                            </td>
                            <td style={{"padding": "0"}}>
                                {idVeröffentlicht
                                ?
                                <DashboardElementPublished wochentag={item.Donnerstag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Donnerstag" {...props}></DashboardElementPublished>
                                :
                                    <DashboardElementApplication wochentag={item.Donnerstag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Donnerstag" {...props}></DashboardElementApplication>
                                }
                            </td>
                            <td style={{"padding": "0"}}>
                                {idVeröffentlicht
                                ?
                                <DashboardElementPublished wochentag={item.Freitag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Freitag" {...props}></DashboardElementPublished>
                                :
                                    <DashboardElementApplication wochentag={item.Freitag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Freitag" {...props}></DashboardElementApplication>
                                }
                            </td>
                            <td style={{"padding": "0"}}>
                                {idVeröffentlicht
                                ?
                                <DashboardElementPublished wochentag={item.Samstag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Samstag" {...props}></DashboardElementPublished>
                                :
                                    <DashboardElementApplication wochentag={item.Samstag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Samstag" {...props}></DashboardElementApplication>
                                }
                            </td>
                                <td style={{"padding": "0"}}>
                                {idVeröffentlicht
                                ?
                                <DashboardElementPublished wochentag={item.Sonntag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Sonntag" {...props}></DashboardElementPublished>
                                :
                                <DashboardElementApplication wochentag={item.Sonntag} index={index} currentItem={item} ItemLength={shiftplan.length} col="Sonntag" {...props}></DashboardElementApplication>
                                }
                            </td>
                        </tr>
                        </>
                        )):
                        <></>}
                        </tbody>
                    </Table>
                    </Row> 
            </>
        );
    }
export default DashboardSchichtenTabelle;