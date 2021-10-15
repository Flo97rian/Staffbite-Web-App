import React from "react";
import {
    Row,
    Col,
    Card,
    CardBody
  } from "reactstrap";

  function ReportingElement(props) {
    function showElement(employee, Report) {
        console.log(Report);
        console.log(employee);
        var hasBewerbungen = "bewerbungscount" in Report[employee] && Report[employee].bewerbungscount !== undefined;
        var hasSchichten = "schichtencount" in Report[employee] && Report[employee].schichtencount !== undefined;
        var showAll = !0;
        if (showAll && hasBewerbungen && hasSchichten) {
            return (
                <Card className="mb-1 mt1-1">
                    <CardBody className="p-1">
                        <Row className="text-center mt-3">
                            <Col xs={3}>
                                <p className="font-weight-bold"> Name </p>
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
            );
        } else if (showAll && hasBewerbungen) {
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
            );
        } else if (showAll && hasSchichten) {
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