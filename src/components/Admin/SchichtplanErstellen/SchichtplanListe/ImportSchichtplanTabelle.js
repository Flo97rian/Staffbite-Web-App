import React from "react";

// reactstrap components
import {
  Row,
  Col,
  Table,
}
from "reactstrap";
// core components
import { SchichtplanElement } from "./SchichtplanElement";
import PlanId from "../../SchichtplanVerwalten/FormElements/PlanId";
import TableDnD from "../../../Application/functionalComponents/TableDragAndDrop";

const  ImportSchichtplanTabelle = (props) => {
        return (
            <>
            <Row className="text-center" noGutters={true}>
                <Col xs={6}>
                    <p>Status</p>
                    <PlanId id={props.plaene[props.plan].id}></PlanId>
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
    }
export default ImportSchichtplanTabelle;