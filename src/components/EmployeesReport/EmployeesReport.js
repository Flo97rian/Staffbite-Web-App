import React from "react";
import PropTypes from "prop-types";
import * as _ from "lodash";
import { Row, Col, Card, CardBody } from "reactstrap";
import Reporting from "../Reporting/ReportingBody/Reporting";


function EmployeesReport (props) {
    const {LoadingReport, Employees, Report, filter, filterIsActive} = props;
    EmployeesReport.propTypes = {
        LoadingReport: PropTypes.bool.isRequired,
        Employees: PropTypes.object.isRequired,
        Report: PropTypes.object.isRequired,
        filter: PropTypes.object.isRequired,
        filterIsActive: PropTypes.bool.isRequired
    }

    EmployeesReport.defaultProps = {
        LoadingReport: false,
        Employees: {},
        Report: {},
        filter: {},
        filterIsActive: false
    }
    return (
        <Col>
            <Row>
                <Col>
                <h3 className="float-left pt-5 font-weight-bold text-lg">Reporting</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="shadow card_aktuellerSchichtplan">
                        <CardBody>
                            <Reporting
                            loadingReport={LoadingReport}
                            Report={Report}
                            filterIsActive={filterIsActive}
                            filter={filter}
                            Employees={Employees}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
      </Col>
    )
}
export default EmployeesReport;