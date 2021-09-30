import React from "react";

// reactstrap components
import {
  Row,
  Col,
  Table
}
from "reactstrap";
// core components
import SchichtplanElement from "./FormElements/SchichtplanElement";
import SchichtplanElementPublished from "./FormElements/SchichtplanElementPublished";
import { Badge } from "reactstrap";
import UserPlanId from "./FormElements/UserPlanId";

const SchichtenTabelle = (props) => {
    const id = props.plaene[props.plan].id
    const idVeröffentlicht = id.split("#").includes("Veröffentlicht")
    const shiftplan = props.plaene[props.plan].plan
    const ShiftPlanIsActive = props.bearbeiten
    const Montag = props.plaene[props.plan].zeitraum.split(" - ")[0]
    const Sonntag = props.plaene[props.plan].zeitraum.split(" - ")[1]

    return (
        <>
        <Row className="text-center" noGutters={true}>
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
                            <SchichtplanElementPublished wochentag={item.Wochentag} index={index} col="Wochentag" {...props}></SchichtplanElementPublished>
                            :
                            <SchichtplanElement wochentag={item.Wochentag} index={index} col="Wochentag" {...props}></SchichtplanElement>
                            }
                        </td>
                        <td style={{"padding": "0"}}>
                            {idVeröffentlicht
                            ?
                            <SchichtplanElementPublished wochentag={item.Montag} index={index} col="Montag" {...props}></SchichtplanElementPublished>
                            :
                                <SchichtplanElement wochentag={item.Montag} index={index} col="Montag" {...props}></SchichtplanElement>
                            }
                        </td>
                        <td style={{"padding": "0"}}>
                            {idVeröffentlicht
                            ?
                            <SchichtplanElementPublished wochentag={item.Dienstag} index={index} col="Dienstag" {...props}></SchichtplanElementPublished>
                            :
                                <SchichtplanElement wochentag={item.Dienstag} index={index} col="Dienstag" {...props}></SchichtplanElement>
                            }
                        </td>
                        <td style={{"padding": "0"}}>
                            {idVeröffentlicht
                            ?
                            <SchichtplanElementPublished wochentag={item.Mittwoch} index={index} col="Mittwoch" {...props}></SchichtplanElementPublished>
                            :
                                <SchichtplanElement wochentag={item.Mittwoch} index={index} col="Mittwoch" {...props}></SchichtplanElement>
                            }
                        </td>
                        <td style={{"padding": "0"}}>
                            {idVeröffentlicht
                            ?
                            <SchichtplanElementPublished wochentag={item.Donnerstag} index={index} col="Donnerstag" {...props}></SchichtplanElementPublished>
                            :
                                <SchichtplanElement wochentag={item.Donnerstag} index={index} col="Donnerstag" {...props}></SchichtplanElement>
                            }
                        </td>
                        <td style={{"padding": "0"}}>
                            {idVeröffentlicht
                            ?
                            <SchichtplanElementPublished wochentag={item.Freitag} index={index} col="Freitag" {...props}></SchichtplanElementPublished>
                            :
                                <SchichtplanElement wochentag={item.Freitag} index={index} col="Freitag" {...props}></SchichtplanElement>
                            }
                        </td>
                        <td style={{"padding": "0"}}>
                            {idVeröffentlicht
                            ?
                            <SchichtplanElementPublished wochentag={item.Samstag} index={index} col="Samstag" {...props}></SchichtplanElementPublished>
                            :
                                <SchichtplanElement wochentag={item.Samstag} index={index} col="Samstag" {...props}></SchichtplanElement>
                            }
                        </td>
                            <td style={{"padding": "0"}}>
                            {idVeröffentlicht
                            ?
                            <SchichtplanElementPublished wochentag={item.Sonntag} index={index} col="Sonntag" {...props}></SchichtplanElementPublished>
                            :
                            <SchichtplanElement wochentag={item.Sonntag} index={index} col="Sonntag" {...props}></SchichtplanElement>
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
export default SchichtenTabelle;