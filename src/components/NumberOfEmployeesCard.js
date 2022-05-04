import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Row, CardTitle, Col } from "reactstrap";


function NumberOfEmployeesCard ({NumberOfEmployees}) {
    NumberOfEmployeesCard.propTypes = {
        NumberOfEmployees: PropTypes.number.isRequired,
    }

    NumberOfEmployeesCard.defaultProps = {
        NumberOfEmployees: 0
    }
    return (
        <Card className="card-stats mb-4 mb-xl-0 shadow card_mitarbeiter" to="admin/mitarbeiter">
                      <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h4"
                            className="text-uppercase text-muted mb-4"
                          >
                            Mitarbeiter
                            <br/>
                            <br/>
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {NumberOfEmployees}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
    )
}

export default NumberOfEmployeesCard;