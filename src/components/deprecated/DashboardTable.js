import React from "react";
import { Link } from "react-router-dom";
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
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

const DashboardSchichtenTabelle = (props) => {
    const DisplayShiftplan = useSelector(state => state.display.displayShiftplan)
    if (DisplayShiftplan && _.isObject(props.currentUser) && _.isObject(props.shiftplan)) {
        let id = props.shiftplan.id
        let idVeröffentlicht = id.split("#").includes("Veröffentlicht")
        let linkTo = idVeröffentlicht ? "/user/schichtplan" : "/user/bewerben"
        let shiftplan = props.shiftplan.plan
        let Montag = props.shiftplan.zeitraum.split(" - ")[0]
        let Sonntag = props.shiftplan.zeitraum.split(" - ")[1]
        return (
            <>
            <Card>
                <CardBody>
                <Row className="text-center mt-4" >
                    <Col xs={3}>
                        <p>Status</p>
                        <PlanId id={id}></PlanId>
                    </Col>
                    <Col xs={6}>
                    <p>Zeitraum</p>
                    <p>{Montag} - {Sonntag}</p>
                    </Col>
                    <Col xs={3}>
                        <p>Legende</p>
                        {idVeröffentlicht ? <Badge color="success">Schicht erhalten</Badge> : <Badge color="success">beworben</Badge> }
                        {idVeröffentlicht ? <Badge color="">Schicht unbelegt / Schicht nicht erhalten</Badge> : <Badge color="light">kein Bewerber / Bewerber vorhanden</Badge> }
                        <Badge color="default">Nicht verfügbar</Badge>
                    </Col>
                </Row>
                        <br/>
                        <Link to={linkTo} tag={Link}>
                        <Row className="text-center" noGutters={true}>
                        <Table responsive={true} borderless={true} style={{"padding": "0"}}>
                            <thead>
                            </thead>
                            <tbody>
                            {DisplayShiftplan ? shiftplan.map((item, index) => (
                            <>
                            <tr>
                                <td style={{"padding": "0"}}>
                                    {idVeröffentlicht
                                    ?
                                    <DashboardElementPublished wochentag={item.Wochentag} index={index} col="Wochentag" currentItem={item} anzahl={item.Montag} ItemLength={shiftplan.length} {...props}></DashboardElementPublished>
                                    :
                                    <DashboardElementApplication wochentag={item.Wochentag} index={index} col="Wochentag" currentItem={item} anzahl={item.Montag} ItemLength={shiftplan.length} {...props}></DashboardElementApplication>
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
                        </Link>
                    </CardBody>
                </Card>
                </>
            );
    } else {
        return null;
    }
}
export default DashboardSchichtenTabelle;