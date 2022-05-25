import React from "react";

import { Col, Container, Row, Spinner } from "reactstrap";


const Loading = () => {
    return (
        <Container>
            <Row className="mt-8">
                <Col></Col>
                <Col>
                    <Spinner color="success">

                    </Spinner>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}

export default Loading;