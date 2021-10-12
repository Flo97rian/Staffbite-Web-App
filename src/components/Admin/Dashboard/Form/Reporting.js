import React from "react";
import moment from "moment";
import {
    Row,
    Col,
    Button,
    Card,
    Badge,
    CardBody
  } from "reactstrap";
  import ReportingElement from "./ReportElement";
  import store from "../../../../store";

const Reporting = (props) => {
    let hasFilter = props.filter !== null
    let hasZeitraum = hasFilter && Object.keys(props.filter).includes("start") && Object.keys(props.filter).includes("ende")
    let zeitraum = hasZeitraum ?  props.filter.start + " - " + props.filter.ende : !1
    let hasFilterBewerbungen = hasFilter && Object.keys(props.filter).includes("bewerbungen") ? !0 : !1
    let hasFilterSchichten = hasFilter && Object.keys(props.filter).includes("schichten") ? !0 : !1
        return (
            <>
            {!props.Report ? 
            <Card className="mb-1 mt-0">
            <CardBody className="p-1">
            <Row className="text-center">
                <Col xs={2} className="mt-3">
                <Card className="bg-secondary mb-1 mt-2 mb-2 p-3 pl-3 mr-2 ml-4"onClick={() =>  store.dispatch({type: "OPEN", payload: "showReportFilter"})}>
                    <i className="fas fa-filter"> Filter</i>
                </Card>
                </Col>
                <Col xs={5} className="mt-2 p-3">
                    <p className="mt-3 font-weight-bold">Zeitraum</p>
                </Col>
                <Col xs={5} className="mt-2 p-3">
                    <p className="mt-3 font-weight-bold">Auswahl</p>
                </Col>
                </Row>
            </CardBody>
            </Card>
            :
            <>
            <Card className="mb-1 mt-0">
            <CardBody className="p-1">
            <Row className="text-center">
                <Col xs={2} className="mt-4">
                <Card className=" bg-secondary mb-1 mt-2 mb-2 p-3 pl-3 mr-2 ml-4" onClick={() =>  store.dispatch({type: "OPEN", payload: "showReportFilter"})}>
                    <i className="fas fa-filter">Filter</i>
                </Card>
                </Col>
                <Col xs={5} className="mt-2 p-3">
                    <p className="font-weight-bold">Zeitraum</p>
                    <p>{zeitraum}</p>
                </Col>
                <Col xs={5} className="mt-2 p-3">
                    <p className="font-weight-bold">Auswahl</p>
                    {hasFilterBewerbungen ? 
                        <Badge color="primary" pill>Bewerbungen</Badge>
                    :
                      <></>
                    }
                    {hasFilterSchichten ? 
                        <Badge color="primary" pill>Schichten</Badge>
                    :
                      <></>
                    }
                    
                </Col>
                </Row>
            </CardBody>
            </Card>
                        {Object.keys(props.Employees).map((employee, index) => 
                            <ReportingElement
                            filter={props.filter}
                            Employees={props.Employees}
                            employee={employee}
                            {...props}
                            ></ReportingElement>
                        )}
            </>
            }
         </>
        );
    }
export default Reporting;