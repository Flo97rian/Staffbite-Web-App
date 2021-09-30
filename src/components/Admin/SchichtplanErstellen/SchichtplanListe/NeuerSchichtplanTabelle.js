import React from "react";

// reactstrap components
import {
  Row,
  Col,
  Table
}
from "reactstrap";
// core components
import NewTableDnD from "../../../Application/functionalComponents/NewPlanTableDragAndDrop";

const NeuerSchichtplanTabelle = (props) => {
        return (
            <>
            <Row className="text-center" noGutters={true}>
                <Col xs={6}>
                    <p>Status</p>
                    <p>Entwurf</p>
                </Col>
            </Row>
            <br/>
                <Row className="text-center" noGutters={true}>
                    <NewTableDnD
                    {...props}
                    ></NewTableDnD>
                </Row>
                </>
        );
    }
export default NeuerSchichtplanTabelle;