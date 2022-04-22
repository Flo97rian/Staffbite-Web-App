import React, { useEffect, useState } from "react";
import {
    Button,
    Label,
    Row,
    Col,
    Input
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import store from "../../../../store"

const ModalTour = (props) => {
    const [teamSize, setTeamSize] = useState(15);
    const [branche, setBranche] = useState("Gastronomie");
    function changeBranche(event) {
      setBranche(event.target.value)
    }
  
    function changeTeamSize(event) {
        setTeamSize(event.target.value);
    }
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal-secondary"
                    show={props.modal} 
                    onHide={() => props.handleCloseModal()}
            >
                    <Row className="text-center mt-4">
                        <Col>
                            <a
                            className="avatar avatar-md background-staffbite-success rounded-circle mt-2"
                            >
                            <i className="fas fa-user"></i>
                            </a>
                        </Col>
                    </Row>
                <Modal.Body className="pt-1">
                    <Row className="text-center mt-4">
                        <Col>
                            <h2>
                                Willkommen zur interaktiven Demo!
                            </h2>
                        </Col>
                    </Row>
                    <Row className="text-center mt-4">
                        <Col>
                            <p>
                                Starte die Tour und lerne die Basics von Staffbite kennen.
                                <br/>
                                Anschließend kannst du gleich loslegen!
                            </p>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-5">
                        <Col xs="1"></Col>
                        <Col xs="5">
                            <h3>Wie groß ist dein Team?</h3>
                        </Col>
                        <Col xs="5">
                            <h3>In welcher Branche bist du tätig?</h3>
                        </Col>
                        <Col xs="1"></Col>
                    </Row>
                    <Row className="mb-4">
                        <Col xs="1"></Col>
                        <Col xs="5">
                            <Input type="number" onChange={(e) => changeTeamSize(e)}></Input>
                        </Col>
                        <Col xs="5">
                            <Input type="select" onChange={(e) => changeBranche(e)}>
                                <option value="Gastronomie" hidden>Gastronomie</option>
                                <option value="weitere" hidden>weitere</option>
                            </Input>
                        </Col>
                        <Col xs="1"></Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" onClick={() => props.handleCloseModal()}> Tour schließen</Button>
                    <Button color="success" onClick={() => props.handleStartTour(teamSize, branche)}> Tour starten</Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalTour; 