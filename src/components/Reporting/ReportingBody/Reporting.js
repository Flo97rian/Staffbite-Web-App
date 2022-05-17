import React from "react";
import {
    Row,
    Col,
    Card,
    Badge,
    CardBody,
    Button
  } from "reactstrap";
  import ReportingElement from "../ReportingElement/ReportElement";
  import store from "../../../store";
import ReportingHeader from "../ReportingHeader/ReportingHeader";
import PropTypes from "prop-types";
import * as _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { settingModal } from "../../../reducers/modal";

const Reporting = (props) => {
    const dispatch = useDispatch();
    const FetchedReport = useSelector(state => state.DB.reportStatus === "fulfilled") 
    const {LoadingReport, Employees, Report, filter, filterIsActive} = props;
    Reporting.propTypes = {
        LoadingReport: PropTypes.bool.isRequired,
        Employees: PropTypes.object.isRequired,
        Report: PropTypes.object.isRequired,
        filter: PropTypes.object.isRequired,
        filterIsActive: PropTypes.bool.isRequired
    }

    Reporting.defaultProps = {
        LoadingReport: false,
        Employees: {},
        Report: {},
        filter: {},
        filterIsActive: false
    }
    var zeitraum = _.get(filter, "start", "Anfang") + " - " + _.get(filter, "ende", "Ende");
    var hasFilterBewerbungen = _.hasIn(filter, "bewerbungen", !1)
    var hasFilterSchichten = _.hasIn(filter, "bewerbungen", !1)
    if(!FetchedReport)
        return (
        <Row className="text-center">
            <Col xs={4} className="mt-4">
                <Button color="primary" className="fas fa-filter" onClick={() =>  dispatch(settingModal("showReportFilter"))}> Filter</Button>
            </Col>
            <Col xs={4} className="mt-2 p-3">
                <p className="mt-3 font-weight-bold">Zeitraum</p>
            </Col>
            <Col xs={4} className="mt-2 p-3">
                <p className="mt-3 font-weight-bold">Auswahl</p>
            </Col>
        </Row>
        )
    return (
        <>
            <Row className="text-center">
                <Col xs={4} className="mt-4">
                <Button color="primary" className="fas fa-filter" onClick={() =>  dispatch(settingModal("showReportFilter"))}> Filter</Button>
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
                filter={filter}
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
        );
    }
export default Reporting;