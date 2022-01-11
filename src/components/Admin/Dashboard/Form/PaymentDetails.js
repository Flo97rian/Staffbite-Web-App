import React from "react";
import {
    Row,
    Container,
    Col,
    Input
  } from "reactstrap";

  function PaymentDetails(props) {

    return (
        <Container className="mb-3">
            <Row>
                <Col>
                <Row>
                        <p className="lead">
                            1. Zahlungsmethode wälen
                        </p>
                </Row>
                <Row>
                        <Input size="lg"  type="select" name="position" className="form-control-alternative edit-event--description input-autosize form-control">
                            <option>PayPal</option>
                            <option>SEPA-Mandat</option>
                            <option>Rechnung</option>
                        </Input>
                </Row>
                <Row>
                        <p className="lead">
                            2. Preis
                        </p>
                </Row>
                <Row>
                       <Col>
                            <p className="lead">
                                Aktuelle Teamgröße:
                            </p>
                       </Col>
                       <Col>
                            <p className="lead">
                                {Object.keys(props.Employees).length}
                            </p>
                       </Col>
                </Row>
                <Row>
                       <Col>
                            <p className="lead">
                                monatlicher Preis:
                            </p>
                       </Col>
                       <Col>
                            <p className="lead">
                            50€
                            </p>
                       </Col>
                </Row>
                <Row>
                       <Col>
                            <p className="lead">
                                jährliche Zahlung ?
                            </p>
                       </Col>
                       <Col>
                            <Input size="lg" classname="mt-4" type="checkbox"></Input>
                        </Col>
                </Row>
                </Col>
            </Row>
        </Container>
    );
}
export default PaymentDetails;