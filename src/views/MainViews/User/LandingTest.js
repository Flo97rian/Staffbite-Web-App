import React from "react";
import { Button, Col, Container, Row } from "reactstrap";

const LandingTest = (props) => {
    return (
        <Container className="mt-9" fluid>
            <Row className="text-center">
                <Col>
                    <h1 className="h2">Die einfachste Möglichkeit deinen Schichtplan zu erstellen</h1>
                </Col>
            </Row>
            <Row className="text-center">
                <Col>
                    <p className="">Erstelle und teile deinen individuellen Schichtplan in wenigen Sekunden</p>
                </Col>
            </Row>
            <Row className="mt-6">
                <Col className="text-center">
                    <Row>
                        <Col>
                            <Button to="/shiftplan" color="primary">Schichtplan erstellen</Button>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <p>Ohne Anmeldung</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="mt-6">
                <Col className="text-center">
                    <img></img>
                </Col>
            </Row>
            <Row className="text-center">
                <Col>
                    <h2 className="h4"> Staffbite funktioniert wie ein Bautkasten. Es macht Schichtplanung einfach <br/> und kann nach Bedarf kostenlos erweitert werden.</h2>
                    <ul>
                        <li>Mitarbeiter App</li>
                        <li>Automatisierte Befüllung</li>
                        <li>Stundenkonten</li>
                        <li>Urlaubsplaner</li>
                        <li>Rollen & Berechtigungen</li>

                    </ul>
                </Col>
            </Row>
        </Container>
    )
};

export default LandingTest;