import React from "react";

// reactstrap components
import {
  Table,
  Row,
  Col,
}
from "reactstrap";
// core components
import _ from "lodash";
import { DataStore } from "@aws-amplify/datastore";
import { MA } from "../../models";
import MitarbeiterListe from "./MitarbeiterListe.js";
import ListGroup from 'react-bootstrap/ListGroup';

export default class SchichtenTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Datum: [],
            Wochentag: [],
            Schichtanzahl: [],
            Summe: [],
        }
    }

    render() {
        return (
            <>
                <Row className="text-center" noGutters={true}>
                    <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                        <Row className="text-center" noGutters={true}>
                        <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                            <ListGroup>
                                <ListGroup.Item action variant="primary"> Datum</ListGroup.Item>
                                <ListGroup.Item action variant="primary"> Wochentag</ListGroup.Item>
                                <ListGroup.Item action variant="primary"> 9:00 - 15:00</ListGroup.Item>
                                <ListGroup.Item action variant="primary"> 15:00 - 21:00</ListGroup.Item>
                                <ListGroup.Item action variant="primary"> Summe</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <br />
                        <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                            <ListGroup>
                                <ListGroup.Item action variant="success"> 29.03.21</ListGroup.Item>
                                <ListGroup.Item action variant="primary"> Montag</ListGroup.Item>
                                <ListGroup.Item> 1. Schicht</ListGroup.Item>
                                <ListGroup.Item> 2. Schicht</ListGroup.Item>
                                <ListGroup.Item action variant="primary"> 0</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <br />
                        <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                            <ListGroup>
                                <ListGroup.Item action variant="success"> 30.03.21</ListGroup.Item>
                                <ListGroup.Item action variant="primary"> Dienstag</ListGroup.Item>
                                <ListGroup.Item> 1. Schicht</ListGroup.Item>
                                <ListGroup.Item> 2. Schicht</ListGroup.Item>
                                <ListGroup.Item action variant="primary"> 0</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <br />                    
                        <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                            <ListGroup>
                                <ListGroup.Item action variant="success"> 31.03.21</ListGroup.Item>
                                <ListGroup.Item action variant="primary"> Mittwoch</ListGroup.Item>
                                <ListGroup.Item> 1. Schicht</ListGroup.Item>
                                <ListGroup.Item> 2. Schicht</ListGroup.Item>
                                <ListGroup.Item action variant="primary"> 0</ListGroup.Item>
                            </ListGroup>
                        </Col>                    
                        </Row>
                    </Col>
                    <br />
                    <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                        <Row className="text-center" noGutters={true}>
                        <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                            <ListGroup>
                                <ListGroup.Item action variant="success"> 01.04.21</ListGroup.Item>
                                <ListGroup.Item action variant="primary"> Donnerstag</ListGroup.Item>
                                <ListGroup.Item> 1. Schicht</ListGroup.Item>
                                <ListGroup.Item> 2. Schicht</ListGroup.Item>
                                <ListGroup.Item action variant="primary"> 0</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <br />                    
                        <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                            <ListGroup>
                                <ListGroup.Item action variant="success"> 02.04.21</ListGroup.Item>
                                <ListGroup.Item action variant="primary"> Freitag</ListGroup.Item>
                                <ListGroup.Item> 1. Schicht</ListGroup.Item>
                                <ListGroup.Item> 2. Schicht</ListGroup.Item>
                                <ListGroup.Item action variant="primary"> 0</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <br />
                        <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                            <ListGroup>
                                <ListGroup.Item action variant="success"> 03.04.21</ListGroup.Item>
                                <ListGroup.Item action variant="primary"> Samstag</ListGroup.Item>
                                <ListGroup.Item> 1. Schicht</ListGroup.Item>
                                <ListGroup.Item> 2. Schicht</ListGroup.Item>
                                <ListGroup.Item action variant="primary"> 0</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                            <ListGroup>
                                <ListGroup.Item action variant="success"> 04.04.21</ListGroup.Item>
                                <ListGroup.Item action variant="primary"> Sonntag</ListGroup.Item>
                                <ListGroup.Item> 1. Schicht</ListGroup.Item>
                                <ListGroup.Item> 2. Schicht</ListGroup.Item>
                                <ListGroup.Item action variant="primary"> 0</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        </Row>
                    </Col>
                </Row>
            </>
        );
    }
}