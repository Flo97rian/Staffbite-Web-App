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
import { Badge } from "reactstrap";

export default class SchichtenTabelle extends React.Component {
    render() {
        return (
            <>
                <Row className="text-center" noGutters={true}>
                    <Col xs={4}>
                    </Col>
                    <Col xs={4}>
                        <Row>
                        <Col xs={4}>
                            <Badge color="light">offen für Bewerbung</Badge>
                        </Col>
                        <Col xs={4}>
                            <Badge color="success">beworben</Badge>
                        </Col>
                        <Col xs={4}>
                            <Badge color="dark">nicht freigeschalten</Badge>
                        </Col>
                    </Row>
                    </Col>
                <Col xs={4}>
                    </Col>
                </Row>
                <br/>
                <Row className="text-center" noGutters={true}>
                <Table responsive={true} borderless={true} style={{"padding": "0"}}>
                    <thead>
                    </thead>
                    <tbody>
                {this.props.bearbeiten ? this.props.plaene[this.props.plan].plan.map((item, index) => (
                    <>
                    <tr>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElement wochentag={item.Wochentag} index={index} col="Wochentag" {...this.props}></SchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElement wochentag={item.Montag} index={index} col="Montag" {...this.props}></SchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElement wochentag={item.Dienstag} index={index} col="Dienstag" {...this.props}></SchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElement wochentag={item.Mittwoch} index={index} col="Mittwoch" {...this.props}></SchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElement wochentag={item.Donnerstag} index={index} col="Donnerstag" {...this.props}></SchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElement wochentag={item.Freitag} index={index} col="Freitag" {...this.props}></SchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElement wochentag={item.Samstag} index={index} col="Samstag" {...this.props}></SchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <SchichtplanElement wochentag={item.Sonntag} index={index} col="Sonntag" {...this.props}></SchichtplanElement>
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
}