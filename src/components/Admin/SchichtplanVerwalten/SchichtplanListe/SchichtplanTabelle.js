import React from "react";

// reactstrap components
import {
  Row,
  Col,
  Table
}
from "reactstrap";
// core components
import SchichtplanElement from "../FormElements/SchichtplanElement";
import SchichtplanElementReview from "../FormElements/SchichtplanElementReview";
import PlanId from "../FormElements/PlanId";

const SchichtenTabelle = (props) => {
        const id = props.plaene[props.plan].id
        const idReview = id.split("#").includes("Review")
        const shiftplan = props.plaene[props.plan].plan
        const ShiftPlanIsActive = props.bearbeiten

        return (
            <>
            <Row className="text-center" noGutters={true}>
                <Col xs={6}>
                    <p>Status</p>
                    <PlanId id={id} ></PlanId>
                </Col>
            </Row>
                <Row className="text-center" noGutters={true}>
                <Table responsive={true} borderless={true} style={{"padding": "0"}}>
                    <thead>
                    </thead>
                    <tbody>
                {ShiftPlanIsActive ? shiftplan.map((item, index) => (
                    <>
                    <tr>
                        <td style={{"padding": "0"}}>
                            {idReview ? <SchichtplanElementReview wochentag={item.Wochentag} index={index} col="Wochentag" {...props}></SchichtplanElementReview> : <SchichtplanElement wochentag={item.Wochentag} index={index} col="Wochentag" {...props}></SchichtplanElement>}
                        </td>
                        <td style={{"padding": "0"}}>
                        {idReview ? <SchichtplanElementReview wochentag={item.Montag} index={index} col="Montag" {...props}></SchichtplanElementReview>:<SchichtplanElement wochentag={item.Montag} index={index} col="Montag" {...props}></SchichtplanElement>}
                        </td>
                        <td style={{"padding": "0"}}>
                        {idReview ? <SchichtplanElementReview wochentag={item.Dienstag} index={index} col="Dienstag" {...props}></SchichtplanElementReview>:<SchichtplanElement wochentag={item.Dienstag} index={index} col="Dienstag" {...props}></SchichtplanElement>}
                        </td>
                        <td style={{"padding": "0"}}>
                            {idReview ? <SchichtplanElementReview wochentag={item.Mittwoch} index={index} col="Mittwoch" {...props}></SchichtplanElementReview> : <SchichtplanElement wochentag={item.Mittwoch} index={index} col="Mittwoch" {...props}></SchichtplanElement> }
                        </td>
                        <td style={{"padding": "0"}}>
                            {idReview ? <SchichtplanElementReview wochentag={item.Donnerstag} index={index} col="Donnerstag" {...props}></SchichtplanElementReview> : <SchichtplanElement wochentag={item.Donnerstag} index={index} col="Donnerstag" {...props}></SchichtplanElement>}
                        </td>
                        <td style={{"padding": "0"}}>
                            {idReview ? <SchichtplanElementReview wochentag={item.Freitag} index={index} col="Freitag" {...props}></SchichtplanElementReview> : <SchichtplanElement wochentag={item.Freitag} index={index} col="Freitag" {...props}></SchichtplanElement>}
                        </td>
                        <td style={{"padding": "0"}}>
                            {idReview ? <SchichtplanElementReview wochentag={item.Samstag} index={index} col="Samstag" {...props}></SchichtplanElementReview> : <SchichtplanElement wochentag={item.Samstag} index={index} col="Samstag" {...props}></SchichtplanElement>}
                        </td>
                        <td style={{"padding": "0"}}>
                            {idReview ? <SchichtplanElementReview wochentag={item.Sonntag} index={index} col="Sonntag" {...props}></SchichtplanElementReview> : <SchichtplanElement wochentag={item.Sonntag} index={index} col="Sonntag" {...props}></SchichtplanElement>}
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