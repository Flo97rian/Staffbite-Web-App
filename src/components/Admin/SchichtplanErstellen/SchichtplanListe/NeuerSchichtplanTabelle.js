import React from "react";

// reactstrap components
import {
  Row,
  Table
}
from "reactstrap";
// core components
import { NeuerSchichtplanElement } from "./NeuerSchichtplanElement";

export default class NeuerSchichtplanTabelle extends React.Component {
    render() {
        return (
            <>
                <Row className="text-center" noGutters={true}>
                <Table responsive={true} borderless={true} >
                    <thead>
                    </thead>
                    <tbody>
                {this.props.Schichtplan.map((item, index) => (
                    <>
                    <tr>
                        <td color="primary" style={{"padding": "0"}}>
                            <NeuerSchichtplanElement wochentag={item.Wochentag} index={index} col="Wochentag" {...this.props}></NeuerSchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <NeuerSchichtplanElement wochentag={item.Montag} index={index} col="Montag" {...this.props}></NeuerSchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <NeuerSchichtplanElement wochentag={item.Dienstag} index={index} col="Dienstag" {...this.props}></NeuerSchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <NeuerSchichtplanElement wochentag={item.Mittwoch} index={index} col="Mittwoch" {...this.props}></NeuerSchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <NeuerSchichtplanElement wochentag={item.Donnerstag} index={index} col="Donnerstag" {...this.props}></NeuerSchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <NeuerSchichtplanElement wochentag={item.Freitag} index={index} col="Freitag" {...this.props}></NeuerSchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <NeuerSchichtplanElement wochentag={item.Samstag} index={index} col="Samstag" {...this.props}></NeuerSchichtplanElement>
                        </td>
                        <td style={{"padding": "0"}}>
                            <NeuerSchichtplanElement wochentag={item.Sonntag} index={index} col="Sonntag" {...this.props}></NeuerSchichtplanElement>
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
}