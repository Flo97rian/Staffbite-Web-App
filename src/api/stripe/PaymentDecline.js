import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
// reactstrap components

const PaymentDecline = () => {
    return (
        <Container className="pt-5" fluid>
            <Row>
                <Col>
                    <ReactBSAlert
                    warning
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Achtung"
                    onConfirm={() => window.location = "/auth"}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="warning"
                    confirmBtnText="Zurück zur Übersicht"
                    btnSize=""
                    >
                    Es scheint einen Fehler gegeben zu haben. Versuche es erneut oder schreib uns eine Nachricht.
                    </ReactBSAlert>
                </Col>
            </Row>
        </Container>
    )
}

export default PaymentDecline;