import React from "react";
import {
    Row,
    Col,
    Card,
    CardBody
  } from "reactstrap";

  function ReportingHeader(props) {
    function showElement() {
        var hasBewerbungen = props.hasFilterBewerbungen
        var hasSchichten = props.hasFilterSchichten
        var showAll = !0;
        if (showAll && hasBewerbungen && hasSchichten) {
            return (
                        <Row className="text-center mt-2">
                            <Col xs={4}>
                                <p className="font-weight-bold">Name</p>
                            </Col>
                            <Col xs={4}>
                                <p className="font-weight-bold">Anzahl Bewerbungen</p>
                            </Col>
                            <Col xs={4}>
                                <p className="font-weight-bold">Anzahl Schichten</p>
                            </Col>
                        </Row>
            );
        } else if (showAll && hasBewerbungen) {
            return (
                        <Row className="text-center mt-3">
                            <Col xs={6}>
                                <p className="font-weight-bold">Name</p>
                            </Col>
                            <Col xs={6}>
                                <p className="font-weight-bold">Anzahl Bewerbungen</p>
                            </Col>
                        </Row>
            );
        } else if (showAll && hasSchichten) {
            return (
                        <Row className="text-center mt-3">
                            <Col xs={6}>
                                <p className="font-weight-bold">Name</p>
                            </Col>
                            <Col xs={6}>
                                <p className="font-weight-bold">Anzahl Schichten</p>
                            </Col>
                        </Row>
            );
        }
    }
    return (
        <>
            {showElement()}
        </>
    );
}
export default ReportingHeader;