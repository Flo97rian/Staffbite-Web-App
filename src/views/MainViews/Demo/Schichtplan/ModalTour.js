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
        console.log(event.target.value)
      setBranche(event.target.value)
    }
  
    function changeTeamSize(event) {
      console.log(event.target.value)
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
                    <Row className="text-center">
                        <Col>
                            <a
                            className="avatar avatar-md background-staffbite-success rounded-circle mt-2"
                            >
                            <i className="fas fa-user"></i>
                            </a>
                        </Col>
                    </Row>
                <Modal.Body className="pt-1">
                    <Row className="text-center mt-2">
                        <Col>
                            <h2>
                                Willkommen in der interaktiven Demo!
                            </h2>
                        </Col>
                    </Row>
                    <Row className="text-center mt-2">
                        <Col>
                            <p>
                                In der Tour zeigen wir dir, wie du mit Staffbite deine Personal- & Schichtplanung einfach und digital abbilden kannst.
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>Wie groß ist dein Team?</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input type="number" onChange={(e) => changeTeamSize(e)}></Input>
                        </Col>
                        <Col xs="8">
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>In welcher Branche bist du tätig?</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input type="select" onChange={(e) => changeBranche(e)}>
                                <option value="Gastronomie" hidden>Gastronomie</option>
                                <option value="weitere" hidden>weitere</option>
                            </Input>
                        </Col>
                        <Col xs="8">
                        </Col>
                    </Row>
                    {/*<SchichtBearbeiten {...props} modalkey={props.modalkey}></SchichtBearbeiten>*/}
                </Modal.Body>
                <Modal.Footer>
                    <Button color="success" onClick={() => props.handleStartTour(teamSize, branche)}> Tour starten</Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalTour; 