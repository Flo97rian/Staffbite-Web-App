import React from "react";

// reactstrap components
import {
  Row,
  Col,
  Table,
}
from "reactstrap";
// core components
import { SchichtplanElement } from "./SchichtplanElement";
import PlanId from "../../SchichtplanVerwalten/FormElements/PlanId";

const  ImportSchichtplanTabelle = (props) => {
        return (
            <>
            <Row className="text-center" noGutters={true}>
                <Col xs={6}>
                    <p>Status</p>
                    <PlanId id={props.plaene[props.plan].id}></PlanId>
                </Col>
            </Row>
            <br/>
                <Row className="text-center" noGutters={true}>
                <Table responsive={true} borderless={true} >
                    <thead>
                    </thead>
                    <tbody>
                {props.plaene[props.plan].plan.map((item, index) => (
                    <>
                    <tr>
                        <td color="primary" style={{"padding": "0"}}>
                            <SchichtplanElement wochentag={item.Wochentag} index={index} col="Wochentag" {...props}></SchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElement wochentag={item.Montag} index={index} col="Montag" {...props}></SchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElement wochentag={item.Dienstag} index={index} col="Dienstag" {...props}></SchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElement wochentag={item.Mittwoch} index={index} col="Mittwoch" {...props}></SchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElement wochentag={item.Donnerstag} index={index} col="Donnerstag" {...props}></SchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElement wochentag={item.Freitag} index={index} col="Freitag" {...props}></SchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElement wochentag={item.Samstag} index={index} col="Samstag" {...props}></SchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElement wochentag={item.Sonntag} index={index} col="Sonntag" {...props}></SchichtplanElement>
                        </td>
                    </tr>
                    </>
                    ))}
                    </tbody>
                </Table> 
                </Row>
            </>
        );
    }
export default ImportSchichtplanTabelle;