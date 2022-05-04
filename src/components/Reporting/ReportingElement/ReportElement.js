import React from "react";
import {
    Row,
    Col,
    Card,
    CardBody
  } from "reactstrap";

  function ReportingElement(props) {
    function showElement(employee, Report) {
        var hasBewerbungen = "bewerbungscount" in Report[employee] && Report[employee].bewerbungscount !== undefined;
        var hasSchichten = "schichtencount" in Report[employee] && Report[employee].schichtencount !== undefined;
        var showAll = !0;
        if (showAll && hasBewerbungen && hasSchichten) {
            return (
                        <Row className="text-center mt-2">
                            <Col xs={4}>
                                <p>{props.Report[employee].name}</p>
                            </Col>
                            <Col xs={4}>
                                <p>{props.Report[employee].bewerbungscount}</p>
                            </Col>
                            <Col xs={4}>
                                <p>{props.Report[employee].schichtencount}</p>
                            </Col>
                        </Row>
            );
        } else if (showAll && hasBewerbungen) {
            return (
                        <Row className="text-center mt-3">
                            <Col xs={6}>
                                <p>{props.Report[employee].name}</p>
                            </Col>
                            <Col xs={6}>
                                <p>{props.Report[employee].bewerbungscount}</p>
                            </Col>
                        </Row>
            );
        } else if (showAll && hasSchichten) {
            return (
                        <Row className="text-center mt-3">
                            <Col xs={6}>
                                <p>{props.Report[employee].name}</p>
                            </Col>
                            <Col xs={6}>
                                <p>{props.Report[employee].schichtencount}</p>
                            </Col>
                        </Row>
            );
        }
    }
    return (
        <>
            {showElement(props.employee, props.Report)}
        </>
    );
}
export default ReportingElement;