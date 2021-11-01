import React from "react";

// reactstrap components
import {
  Row,
  Col,
}
from "reactstrap";
// core components
import TableDnD from "./SchichtplanDnDNeu";

const NeuerSchichtplanTabelle = (props) => {
        let isActivePlan = props.bearbeiten;
        let isImportedPlan = props.import;
        if (isActivePlan && !isImportedPlan) {
            return (
                <>
                <Row className="text-center mt-4" noGutters={true}>
                    <Col xs={6}>
                        <p>Status</p>
                        <p>Entwurf</p>
                    </Col>
                </Row>
                <br/>
                    <Row className="text-center" noGutters={true}>
                        <TableDnD
                        {...props}
                        ></TableDnD>
                    </Row>
                    </>
            );
        } else {
            return null;
        }
    }
export default NeuerSchichtplanTabelle;