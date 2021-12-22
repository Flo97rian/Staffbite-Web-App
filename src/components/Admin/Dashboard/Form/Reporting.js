import React from "react";
import {
    Row,
    Col,
    Card,
    Badge,
    CardBody,
    Button
  } from "reactstrap";
  import ReportingElement from "./ReportElement";
  import store from "../../../../store";
import ReportingHeader from "./ReportingHeader";

const Reporting = (props) => {
    var hasFilter = props.filter !== null;
    var hasZeitraum = hasFilter && "start" in props.filter && "ende" in props.filter;
    var zeitraum = hasZeitraum ?  props.filter.start + " - " + props.filter.ende : !1;
    var hasFilterBewerbungen = hasFilter && "bewerbungen" in props.filter ? !0 : !1;
    var hasFilterSchichten = hasFilter && "schichten" in props.filter ? !0 : !1;
        return (
            <>
            {!props.Report ? 
            <Row className="text-center">
                <Col xs={4} className="mt-4">
                    <Button color="primary" className="fas fa-filter" onClick={() =>  store.dispatch({type: "OPEN", payload: "showReportFilter"})}> Filter</Button>
                </Col>
                <Col xs={4} className="mt-2 p-3">
                    <p className="mt-3 font-weight-bold">Zeitraum</p>
                </Col>
                <Col xs={4} className="mt-2 p-3">
                    <p className="mt-3 font-weight-bold">Auswahl</p>
                </Col>
                </Row>
            :
            <>
            <Row className="text-center">
                <Col xs={4} className="mt-4">
                <Button color="primary" className="fas fa-filter" onClick={() =>  store.dispatch({type: "OPEN", payload: "showReportFilter"})}> Filter</Button>
                </Col>
                <Col xs={4} className="mt-2 p-3">
                    <p className="font-weight-bold">Zeitraum</p>
                    <p>{zeitraum}</p>
                </Col>
                <Col xs={4} className="mt-2 p-3">
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
                <ReportingHeader
                filter={props.filter}
                hasFilterBewerbungen={hasFilterBewerbungen}
                hasFilterSchichten={hasFilterSchichten}
                />
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