import React from "react";
import {
    Row,
    Container,
    Col
  } from "reactstrap";
  import PropTypes from "prop-types";

  function NewsBlock({title, message, type, since}) {

NewsBlock.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    since: PropTypes.string.isRequired
}

NewsBlock.defaultProps = {
    title: "Name",
    message: "Message",
    type: "",
    since: ""
}
    function renderIcon() {
        if(type === "Schichtplan") {
            return (
                <div className="icon icon-shape bg-blue text-white rounded-circle shadow mt-3 ml-3">
                    <i className="fas fa-calendar" />
                </div>
            )
        } else if (type === "Eintragen") {
            return (
                <div className="icon icon-shape bg-success text-white rounded-circle shadow mt-3 ml-3">
                    <i className="far fa-edit" />
                </div>
            )
        }
    }
    return (
        <Container className="mb-3">
            <Row>
                <Col xs="2">
                    {renderIcon()}
                </Col>
                <Col>
                <Row>
                    <p className="h5 text-muted">
                        Vor {since}
                    </p>
                </Row>
                <Row>
                        <p className="h4">
                            {title}
                        </p>
                </Row>
                <Row>
                        <p>
                            {message}
                        </p>
                </Row>
                </Col>
            </Row>
        </Container>
    );
}
export default NewsBlock;