import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Row, CardTitle, Col } from "reactstrap";
import NewsFeedTimeline from "../NewsFeedTimeline/NewsFeedTimeline";
function NewsfeedContainer () {
    return (
        <Col>
            <Row>
                <Col>
                    <h3 className="float-left pt-5 font-weight-bold text-lg">Neuste Aktivitäten</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                <Card className="shadow card_aktuellerSchichtplan">
                    <CardBody>
                        <NewsFeedTimeline/>
                    </CardBody>
                </Card>
                </Col>
            </Row>
      </Col>
    )
}

export default NewsfeedContainer;