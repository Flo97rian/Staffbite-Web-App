
import React from "react";
import { Button, Container, Row, Col } from "reactstrap";

const NoAdminPermission = (props) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h3>Diese Seite ist nur für Admins</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button>Zur Mitarbeiter Ansicht</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button>Zur Anmeldung</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default NoAdminPermission;