import React from "react";
import moment from "moment";
import {
    Row,
    Col,
    Card,
    CardBody
  } from "reactstrap";

  const ReportingElement = (props) => {
        const showElement = () => {
        let employee = props.employee
        let Report = props.Report
        console.log(Report)
        console.log(employee)
        let hasBewerbungen = Object.keys(Report[employee]).includes("bewerbungscount") && Report[employee]["bewerbungscount"] !== undefined
        let hasSchichten = Object.keys(Report[employee]).includes("schichtencount") && Report[employee]["schichtencount"] !== undefined
        let showAll = !0
        if (showAll && hasBewerbungen && hasSchichten)  {
            return (
                <Card className="mb-1 mt1-1">
                    <CardBody className="p-1">
                        <Row className="text-center mt-3">
                            <Col xs={3}>
                                <p className="font-weight-bold">Name</p>
                            </Col>
                            <Col xs={3}>
                                <p>{props.Report[employee].name}</p>
                            </Col>
                            <Col xs={3}>
                                <p>{props.Report[employee].bewerbungscount}</p>
                            </Col>
                            <Col xs={3}>
                                <p>{props.Report[employee].schichtencount}</p>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            )    
        } else if (showAll && hasBewerbungen)  {
            return (
                <Card className="mb-1 mt1-1">
                    <CardBody className="p-1">
                        <Row className="text-center mt-3">
                            <Col xs={2}>
                                <p className="font-weight-bold">Name</p>
                            </Col>
                            <Col xs={5}>
                                <p>{props.Report[employee].name}</p>
                            </Col>
                            <Col xs={5}>
                                <p>{props.Report[employee].bewerbungscount}</p>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            )
        } else if  (showAll && hasSchichten) {
            return (
                <Card className="mb-1 mt1-1">
                    <CardBody className="p-1">
                        <Row className="text-center mt-3">
                            <Col xs={2}>
                                <p className="font-weight-bold">Name</p>
                            </Col>
                            <Col xs={5}>
                                <p>{props.Report[employee].name}</p>
                            </Col>
                            <Col xs={5}>
                                <p>{props.Report[employee].schichtencount}</p>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            )
        }
    }
        return (
            <>
              {showElement()}
         </>
        );
    }
export default ReportingElement;