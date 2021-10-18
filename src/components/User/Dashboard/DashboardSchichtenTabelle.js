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
import DashboardElementApplication from "./DashboardElementApplication";
import DashboardElementPublished from "./DashboardElementPublished"
import { Badge } from "reactstrap";
import UserPlanId from "../Schichtplan/FormElements/UserPlanId";

const DashboardSchichtenTabelle = (props) => {
    const id = props.plaene[props.plan].id
    const idVeröffentlicht = id.split("#").includes("Veröffentlicht")
    const shiftplan = props.plaene[props.plan].plan
    const ShiftPlanIsActive = props.bearbeiten
    const Montag = props.plaene[props.plan].zeitraum.split(" - ")[0]
    const Sonntag = props.plaene[props.plan].zeitraum.split(" - ")[1]

    return (
        <>
        <Card>
            <CardBody>
            <Row className="text-center mt-4" noGutters={true}>
                <Col xs={3}>
                    <p>Status</p>
                    <UserPlanId id={id} ></UserPlanId>
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
                        <tr>
                            <td style={{"padding": "0"}}>
                                {idVeröffentlicht
                                ?
                                <DashboardElementPublished wochentag={item.Wochentag} index={index} col="Wochentag" {...props}></DashboardElementPublished>
                                :
                                <DashboardElementApplication wochentag={item.Wochentag} index={index} col="Wochentag" {...props}></DashboardElementApplication>
                                }
                            </td>
                            <td style={{"padding": "0"}}>
                                {idVeröffentlicht
                                ?
                                <DashboardElementPublished wochentag={item.Montag} index={index} col="Montag" {...props}></DashboardElementPublished>
                                :
                                    <DashboardElementApplication wochentag={item.Montag} index={index} col="Montag" {...props}></DashboardElementApplication>
                                }
                            </td>
                            <td style={{"padding": "0"}}>
                                {idVeröffentlicht
                                ?
                                <DashboardElementPublished wochentag={item.Dienstag} index={index} col="Dienstag" {...props}></DashboardElementPublished>
                                :
                                    <DashboardElementApplication wochentag={item.Dienstag} index={index} col="Dienstag" {...props}></DashboardElementApplication>
                                }
                            </td>
                            <td style={{"padding": "0"}}>
                                {idVeröffentlicht
                                ?
                                <DashboardElementPublished wochentag={item.Mittwoch} index={index} col="Mittwoch" {...props}></DashboardElementPublished>
                                :
                                    <DashboardElementApplication wochentag={item.Mittwoch} index={index} col="Mittwoch" {...props}></DashboardElementApplication>
                                }
                            </td>
                            <td style={{"padding": "0"}}>
                                {idVeröffentlicht
                                ?
                                <DashboardElementPublished wochentag={item.Donnerstag} index={index} col="Donnerstag" {...props}></DashboardElementPublished>
                                :
                                    <DashboardElementApplication wochentag={item.Donnerstag} index={index} col="Donnerstag" {...props}></DashboardElementApplication>
                                }
                            </td>
                            <td style={{"padding": "0"}}>
                                {idVeröffentlicht
                                ?
                                <DashboardElementPublished wochentag={item.Freitag} index={index} col="Freitag" {...props}></DashboardElementPublished>
                                :
                                    <DashboardElementApplication wochentag={item.Freitag} index={index} col="Freitag" {...props}></DashboardElementApplication>
                                }
                            </td>
                            <td style={{"padding": "0"}}>
                                {idVeröffentlicht
                                ?
                                <DashboardElementPublished wochentag={item.Samstag} index={index} col="Samstag" {...props}></DashboardElementPublished>
                                :
                                    <DashboardElementApplication wochentag={item.Samstag} index={index} col="Samstag" {...props}></DashboardElementApplication>
                                }
                            </td>
                                <td style={{"padding": "0"}}>
                                {idVeröffentlicht
                                ?
                                <DashboardElementPublished wochentag={item.Sonntag} index={index} col="Sonntag" {...props}></DashboardElementPublished>
                                :
                                <DashboardElementApplication wochentag={item.Sonntag} index={index} col="Sonntag" {...props}></DashboardElementApplication>
                                }
                            </td>
                        </tr>
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
export default DashboardSchichtenTabelle;