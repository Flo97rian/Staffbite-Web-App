import React from "react";

// reactstrap components
import {
  Row,
  Col,
}
from "reactstrap";
// core components
import ListGroup from 'react-bootstrap/ListGroup';
import SchichtplanElement from "./SchichtplanElement";

export default class SchichtenTable extends React.Component {
    render() {
        return (
            <>
                <Row className="text-center" noGutters={true}>
                {this.props.Schichtplan ? this.props.Schichtplan.map((item, index) => (
                    <>
                    <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                        <Row className="text-center" noGutters={true}>
                        <Col xl={3} lg={3} md={3} sm={3} xs={6}>
                            <SchichtplanElement wochentag={item.Wochentag} index={index} {...this.props}></SchichtplanElement>
                        </Col>
                        <Col xl={3} lg={3} md={3} sm={3} xs={6}>
                                <ListGroup>
                                    <ListGroup.Item action variant={item.MontagColor}> {item.Montag === "<br />" ? <br /> : item.Montag}</ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col xl={3} lg={3} md={3} sm={3} xs={6}>
                            <ListGroup>
                                <ListGroup.Item action variant={item.DienstagColor}> {item.Dienstag === "<br />" ? <br /> : item.Dienstag}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col xl={3} lg={3} md={3} sm={3} xs={6}>
                                <ListGroup>
                                    <ListGroup.Item action variant={item.MittwochColor}> {item.Mittwoch === "<br />" ? <br /> : item.Mittwoch}</ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                    <Row className="text-center" noGutters={true}>
                        <Col xl={3} lg={3} md={3} sm={3} xs={6}>
                            <ListGroup>
                                <ListGroup.Item action variant={item.DonnerstagColor}> {item.Donnerstag === "<br />" ? <br /> : item.Donnerstag}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col xl={3} lg={3} md={3} sm={3} xs={6}>
                                <ListGroup>
                                    <ListGroup.Item action variant={item.FreitagColor}> {item.Freitag === "<br />" ? <br /> : item.Freitag}</ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col xl={3} lg={3} md={3} sm={3} xs={6}>
                            <ListGroup>
                                <ListGroup.Item action variant={item.SamstagColor}> {item.Samstag === "<br />" ? <br /> : item.Samstag}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col xl={3} lg={3} md={3} sm={3} xs={6}>
                                <ListGroup>
                                    <ListGroup.Item action variant={item.SonntagColor}> {item.Sonntag === "<br />" ? <br /> : item.Sonntag}</ListGroup.Item>
                                </ListGroup>
                            </Col>
                    </Row>                   
                    </Col>
                    </>
                    )): <></>} 
                </Row>
            </>
        );
    }
}