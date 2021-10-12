import React from "react";
import moment from "moment";
import {
    Row,
    Col,
  } from "reactstrap";

  const ReportingElement = (props) => {
        const showElement = () => {
        let employee = props.employee
        let Report = props.Report
        console.log(Report)
        console.log(employee)
        let hasBewerbungen = Object.keys(Report[employee]).includes("bewerbungscount") && Report[employee]["bewerbungscount"] !== undefined
        let hasSchichten = Object.keys(Report[employee]).includes("schichtencount")
        let showAll = !0
        if (showAll && hasBewerbungen)  {
                        return (
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
                        )
        } else if  (showAll && hasSchichten) {
            return (
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