import React, {useState} from "react";
import {
    Button,
    Label,
    Row,
    Col
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import store from "../../../../store";
import { set } from "lodash";

const ModalZusammenfassung = (props) => {
        const [mouseOn, setMouseOn] = useState("")

        function handleCss(title, id) {
            if(mouseOn === "") {
                setMouseOn(title);
            } else {
                setMouseOn("");
            }

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
                <Modal.Body className="pt-1">
                    <Row className="mt-4 text-center">
                        <Col>
                            <Label className="h2 m-3">
                                Unsere interaktive Demo
                            </Label>
                        </Col>
                    </Row>
                    <Row className="mt-2 text-center">
                        <Col>
                            <p>
                                Wir hoffen dir hat es gefallen! Falls du noch Fragen hast, 
                                <br/>
                                freuen wir uns über eine Nachricht von dir!
                            </p>
                        </Col>
                    </Row>
                    <Row className="text-center mt-4">
                        <Col>
                            <p className="font-weight-bold mb-0 pb-0 lead">
                                {props.teamSize}
                            </p>
                        </Col>
                        <Col>
                            <p className="font-weight-bold lead mb-0 ">
                                {props.branche}
                            </p>
                            
                        </Col>
                    </Row>
                    <Row className="text-center mt-0">
                        <Col>
                            <p className="mt-0 pt-0">
                                Deine Teamgröße
                            </p>
                        </Col>
                        <Col>
                            <p>
                               Deine Branche
                            </p>
                        </Col>
                    </Row>
                    <Row className="text-center mt-4">
                        <Col>
                            <p className="">
                                Probiere den kostenlosen Probemonat aus!
                                <br/>
                                Bis gleich!
                            </p>
                        </Col>
                    </Row>
                    {/*<Row className="text-center">
                        <Col>
                            <p>
                            <a
                            className="avatar avatar-xs background-staffbite-success rounded-circle mr-3"
                            >
                            <i className="fas fa-check"></i>
                            </a>
                            Digitaler Schichtplan
                            </p>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <Col>
                        <p>
                            <a
                            className="avatar avatar-xs background-staffbite-success rounded-circle mr-3"
                            >
                            <i className="fas fa-check"></i>
                            </a>
                            Automatisierte Befüllung
                            </p>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <Col>
                        <p>
                                <a
                                id="app-success"
                                className={"avatar avatar-xs background-staffbite-success rounded-circle mr-3"}
                                >
                                    <i className="fas fa-check"></i>
                                </a>
                                Mitarbeiter App
                        </p>
                        </Col>
                        </Row>*/}
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" size="lg" onClick={() => props.handleCloseModal()}> Gespräch vereinbaren </Button>{' '}
                    <Button color="success font-weight-light border-lg rounded-pill" onClick={() => props.handleCloseModal()}>30 Tage kostenlos ausprobieren</Button>{' '}
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalZusammenfassung