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
import PlanId from "../../Admin/Schichtplan/FormElements/PlanId";
import { isValidShiftplan, isValidUser } from "../../Application/functionalComponents/ValidFunctions";

const DashboardSchichtenTabelle = (props) => {
    let ShiftPlanIsActive = props.bearbeiten;
    let hasCurrentUser = isValidUser(props.currentUser);
    let hasShiftplan = isValidShiftplan(props.shiftplan);
    if (ShiftPlanIsActive && hasCurrentUser && hasShiftplan) {
        let id = props.shiftplan.id
        let idVeröffentlicht = id.split("#").includes("Veröffentlicht")
        let shiftplan = props.shiftplan.plan
        let Montag = props.shiftplan.zeitraum.split(" - ")[0]
        let Sonntag = props.shiftplan.zeitraum.split(" - ")[1]
        return (
            <>
            <Card>
                <CardBody>
                <Row className="text-center mt-4" noGutters={true}>
                    <Col xs={3}>
                        <p>Status</p>
                        <PlanId id={id}></PlanId>
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
                                    <DashboardElementPublished wochentag={item.Wochentag} index={index} col="Wochentag" currentItem={item} ItemLength={shiftplan.length} {...props}></DashboardElementPublished>
                                    :
                                    <DashboardElementApplication wochentag={item.Wochentag} index={index} col="Wochentag" currentItem={item} ItemLength={shiftplan.length} {...props}></DashboardElementApplication>
                                    }
                                </td>
                                <td style={{"padding": "0"}}>
                                    {idVeröffentlicht
                                    ?
                                    <DashboardElementPublished wochentag={item.Montag} index={index} col="Montag" currentItem={item} ItemLength={shiftplan.length} {...props}></DashboardElementPublished>
                                    :
                                        <DashboardElementApplication wochentag={item.Montag} index={index} col="Montag" currentItem={item} ItemLength={shiftplan.length} {...props}></DashboardElementApplication>
                                    }
                                </td>
                                <td style={{"padding": "0"}}>
                                    {idVeröffentlicht
                                    ?
                                    <DashboardElementPublished wochentag={item.Dienstag} index={index} col="Dienstag" currentItem={item} ItemLength={shiftplan.length} {...props}></DashboardElementPublished>
                                    :
                                        <DashboardElementApplication wochentag={item.Dienstag} index={index} col="Dienstag" currentItem={item} ItemLength={shiftplan.length} {...props}></DashboardElementApplication>
                                    }
                                </td>
                                <td style={{"padding": "0"}}>
                                    {idVeröffentlicht
                                    ?
                                    <DashboardElementPublished wochentag={item.Mittwoch} index={index} col="Mittwoch" currentItem={item} ItemLength={shiftplan.length} {...props}></DashboardElementPublished>
                                    :
                                        <DashboardElementApplication wochentag={item.Mittwoch} index={index} col="Mittwoch" currentItem={item} ItemLength={shiftplan.length} {...props}></DashboardElementApplication>
                                    }
                                </td>
                                <td style={{"padding": "0"}}>
                                    {idVeröffentlicht
                                    ?
                                    <DashboardElementPublished wochentag={item.Donnerstag} index={index} col="Donnerstag" currentItem={item} ItemLength={shiftplan.length} {...props}></DashboardElementPublished>
                                    :
                                        <DashboardElementApplication wochentag={item.Donnerstag} index={index} col="Donnerstag" currentItem={item} ItemLength={shiftplan.length} {...props}></DashboardElementApplication>
                                    }
                                </td>
                                <td style={{"padding": "0"}}>
                                    {idVeröffentlicht
                                    ?
                                    <DashboardElementPublished wochentag={item.Freitag} index={index} col="Freitag" currentItem={item} ItemLength={shiftplan.length} {...props}></DashboardElementPublished>
                                    :
                                        <DashboardElementApplication wochentag={item.Freitag} index={index} col="Freitag" currentItem={item} ItemLength={shiftplan.length} {...props}></DashboardElementApplication>
                                    }
                                </td>
                                <td style={{"padding": "0"}}>
                                    {idVeröffentlicht
                                    ?
                                    <DashboardElementPublished wochentag={item.Samstag} index={index} col="Samstag" currentItem={item} ItemLength={shiftplan.length} {...props}></DashboardElementPublished>
                                    :
                                        <DashboardElementApplication wochentag={item.Samstag} index={index} col="Samstag" currentItem={item} ItemLength={shiftplan.length} {...props}></DashboardElementApplication>
                                    }
                                </td>
                                    <td style={{"padding": "0"}}>
                                    {idVeröffentlicht
                                    ?
                                    <DashboardElementPublished wochentag={item.Sonntag} index={index} col="Sonntag" currentItem={item} ItemLength={shiftplan.length} {...props}></DashboardElementPublished>
                                    :
                                    <DashboardElementApplication wochentag={item.Sonntag} index={index} col="Sonntag" currentItem={item} ItemLength={shiftplan.length} {...props}></DashboardElementApplication>
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
    } else {
        return null;
    }
}
export default DashboardSchichtenTabelle;