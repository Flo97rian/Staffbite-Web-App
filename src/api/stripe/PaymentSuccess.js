import React from "react";
import { Container, Row, Col } from "reactstrap";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
// reactstrap components

const PaymentSuccess = () => {
    return (
        <Container className="pt-5" fluid>
            <Row>
                <Col>
                    <ReactBSAlert
                    success
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Erfolgreich"
                    onConfirm={() => window.location = "/auth"}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="success"
                    confirmBtnText="Zurück zur Übersicht"
                    btnSize=""
                    >
                    Deine Zahlungsdaten wurden erfolgreich hinterlegt.
                    </ReactBSAlert>
                </Col>
            </Row>
        </Container>
    )
}

export default PaymentSuccess;