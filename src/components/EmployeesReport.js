import React from "react";
import PropTypes from "prop-types";
import * as _ from "lodash";
import { Row, Col, Card, CardBody } from "reactstrap";
import Reporting from "./Reporting/ReportingBody/Reporting";


function EmployeesReport (props) {
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
                            <Reporting/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
      </Col>
    )
}
export default EmployeesReport;