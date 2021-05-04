import React from "react";

// reactstrap components
import {
  Row,
  Col,
}
from "reactstrap";
// core components
import ListGroup from 'react-bootstrap/ListGroup';

export default class SchichtenVerwaltet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Schichtplan1:this.props.Schichtplan.slice(0,4),
            Schichtplan2: this.props.Schichtplan.slice(4,8)
        }
    }

    render() {
        return (
            <>
                <Row className="text-center" noGutters={true}>
                    <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                        <Row className="text-center" noGutters={true}>
                        {this.state.Schichtplan1.map(item => (
                            <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                                <ListGroup>
                                    <ListGroup.Item action variant="primary"> {item.Datum}</ListGroup.Item>
                                    <ListGroup.Item action variant="primary"> {item.Wochentag}</ListGroup.Item>
                                    <ListGroup.Item action variant={item.Schicht1Color}> {item.Schicht1}</ListGroup.Item>
                                    <ListGroup.Item action variant={item.Schicht2Color}> {item.Schicht2}</ListGroup.Item>
                                    <ListGroup.Item action variant={item.Schicht3Color}> {item.Schicht3}</ListGroup.Item>
                                    <ListGroup.Item action variant={item.Schicht4Color}> {item.Schicht4}</ListGroup.Item>
                                    <ListGroup.Item action variant="primary"> {item.Summe}</ListGroup.Item>
                                </ListGroup>
                            </Col>
                            ))} 
                        </Row>
                    </Col>
                    <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                        <Row className="text-center" noGutters={true}>
                        {this.state.Schichtplan2.map(item => (
                            <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                                <ListGroup>
                                    <ListGroup.Item action variant="primary"> {item.Datum}</ListGroup.Item>
                                    <ListGroup.Item action variant="primary"> {item.Wochentag}</ListGroup.Item>
                                    <ListGroup.Item action variant={item.Schicht1Color}> {item.Schicht1}</ListGroup.Item>
                                    <ListGroup.Item action variant={item.Schicht2Color}> {item.Schicht2}</ListGroup.Item>
                                    <ListGroup.Item action variant={item.Schicht3Color}> {item.Schicht3}</ListGroup.Item>
                                    <ListGroup.Item action variant={item.Schicht4Color}> {item.Schicht4}</ListGroup.Item>
                                    <ListGroup.Item action variant="primary"> {item.Summe}</ListGroup.Item>
                                </ListGroup>
                            </Col>
                            ))} 
                        </Row>                   
                    </Col>
                </Row>
            </>
        );
    }
}