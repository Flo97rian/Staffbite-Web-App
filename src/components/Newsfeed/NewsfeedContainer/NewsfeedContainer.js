import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Row, CardTitle, Col } from "reactstrap";
import NewsFeedTimeline from "../NewsFeedTimeline/NewsFeedTimeline";
function NewsfeedContainer ({newsfeed}) {
    NewsfeedContainer.propTypes = {
        newsfeed: PropTypes.array.isRequired
    }

    NewsfeedContainer.defaultProps = {
        newsfeed: []
    }

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
                        <NewsFeedTimeline newsfeed={newsfeed}></NewsFeedTimeline>
                    </CardBody>
                </Card>
                </Col>
            </Row>
      </Col>
    )
}

export default NewsfeedContainer;