import React from "react";
import {
    Row,
    Col,
    Button,
    Card,
    CardBody
  } from "reactstrap";
  import ReportingElement from "./ReportElement";

const Reporting = (props) => {
        return (
            <>
            <Card className="mb-1 mt-0">
            <CardBody className="p-1">
            <Row className="text-center">
                <Col xs={4}>
                    <p className="mt-3 font-weight-bold">Filter</p>
                </Col>
                <Col xs={4}>
                    <p className="mt-3 font-weight-bold">Zeitraum</p>
                </Col>
                <Col xs={4}>
                    <p className="mt-3 font-weight-bold">Auswahl</p>
                </Col>
                </Row>
            </CardBody>
            </Card>
             <Card className="mb-1 mt-0">
             <CardBody className="p-1">
                {Object.keys(props.Employees).map((employee, index) => 
                    <ReportingElement
                    Employees={props.Employees}
                    employee={employee}
                    ></ReportingElement>
                )}
             </CardBody>
         </Card>
         </>
        );
    }
export default Reporting;