import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Row, CardTitle, Col } from "reactstrap";


function NumberOfTradesCard ({NumberOfTrades}) {
    NumberOfTradesCard.propTypes = {
        NumberOfTrades: PropTypes.number.isRequired,
    }

    NumberOfTradesCard.defaultProps = {
        NumberOfTrades: 0
    }
    return (
        <Card className="card-stats mb-4 mb-xl-0 shadow card_tauschanfragen">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h4"
                            className="text-uppercase text-muted mb-4"
                          >
                            Tauschanfragen
                            <br/>
                            <small>aktuelle Woche</small>
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {NumberOfTrades}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-blue text-white rounded-circle shadow">
                            <i className="fas fa-comments" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
    )
}

export default NumberOfTradesCard;