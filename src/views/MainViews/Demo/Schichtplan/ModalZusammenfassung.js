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
                <Modal.Header className="pb-0" closeButton>
                    <Label className="h2 m-3 align-items-center">
                        <i className="fas fa-arrow-down mr-4"></i>
                        Deine Zusammenfassung
                        </Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <Row className="text-center">
                        <Col>
                            <p className="font-weight-bold mb-0 pb-0">
                                25
                            </p>
                        </Col>
                        <Col>
                            <p className="font-weight-bold">
                                Gastronomie
                            </p>
                            
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <Col>
                            <p className="mt-0 pt-0">
                                Teamgröße
                            </p>
                        </Col>
                        <Col>
                            <p>
                                Branche
                            </p>
                        </Col>
                    </Row>
                    <Row className="">
                        <Col>
                            <p className="lead">
                                Deine Auswahl:
                            </p>
                        </Col>
                    </Row>
                    <Row className="">
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
                    <Row className="">
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
                    <Row className="">
                        <Col>
                        <p onMouseOver={() => handleCss("app", "app-success")} onMouseOut={() => handleCss("", "app-danger")}>
                            {mouseOn !== "app" ? 
                            <>
                                <a
                                id="app-success"
                                className={"avatar avatar-xs background-staffbite-success rounded-circle mr-3"}
                                >
                                    <i className="fas fa-check"></i>
                                </a>
                                Mitarbeiter App
                            </>
                            : 
                            <>
                                <a
                                className={"avatar avatar-xs background-staffbite-danger rounded-circle ml-3 mr-3"}
                                >
                                <i className="fas fa-trash"></i>
                                </a>
                                Mitarbeiter App
                            </>
                            }
                        </p>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" size="lg" onClick={() => props.handleCloseModal()}> Schließen </Button>{' '}
                    <Button color="success font-weight-light border-lg rounded-pill" onClick={() => props.handleCloseModal()}>Im Probemonat ausprobieren</Button>{' '}
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalZusammenfassung