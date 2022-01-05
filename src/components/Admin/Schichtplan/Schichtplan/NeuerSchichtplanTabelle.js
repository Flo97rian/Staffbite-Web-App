import React from "react";

// reactstrap components
import {
  Row,
  Col,
  Badge,
  Card,
  CardBody
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
                <Card>
                    <CardBody>
                        <Row className="text-center mt-4">
                            <Col xs={6}>
                                <p>Status</p>
                                <p style={{"color": "#5e72e4"}}>Entwurf</p>
                            </Col>
                            <Col className="justify-content-md-center" xs={6}>
                            <p>Legende</p>
                            <Badge className="m-1" color="warning"> Schichtdetails eintragen</Badge>
                            <Badge className="m-1" color="light">Betrieb geöffnet</Badge>
                            <Badge className="m-1" color="default">Betrieb geschlossen</Badge>
                        </Col>
                        </Row>
                        <br/>
                            <Row className="text-center" noGutters={true}>
                                <TableDnD
                                {...props}
                                ></TableDnD>
                            </Row>
                            </CardBody>
                            </Card>
                    </>
            );
        } else {
            return null;
        }
    }
export default NeuerSchichtplanTabelle;