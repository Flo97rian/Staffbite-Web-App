import React, {useEffect, useState} from "react";
import {
    Button,
    Col,
    Label,
    Row
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../../../reducers/modal";
import ReactGA from "react-ga";
import { thunkCreateDemo } from "../../../store/middleware/CreateDemo";
import { AuthenticationFormAdmin } from "./Form/AuthenticationFormAdmin";
import { settingAuthenticationForAdmin } from "../../../reducers/demo";
import { RegistrationForm, RegistrationFormAdmin } from "./Form/RegistrationFormAdmin";
import { AuthenticationFormEmployee } from "./Form/AuthenticationFormEmployee";
import { RegistrationFormEmployee } from "./Form/RegistrationFormEmployee";

export const ModalIntro = (props) => {
    const dispatch = useDispatch();
    const demo = useSelector(state => state.demo);
    const [showAdminAuthentication, setShowAdminAuthentication] = useState(false);
    const [showEmployeeAuthentication, setShowEmployeeAuthentication] = useState(false);
    const [showRegistrationAdmin, setShowRegistrationAdmin] = useState(false);
    const [showRegistrationEmployee, setShowRegistrationEmployee] = useState(false);
    const [showButtons, setShowButtons] = useState(true);
    const [hasDemoId, setHasDemoId] = useState(false);
    const userInput = useSelector(state => state.userInput);
    const isAdmin = useSelector(state => state.demo.demoAdmin.isAdmin);
    const demoIntro = useSelector(state => state.modal.demoIntro);

    const handleCreateDemo = () => {
        ReactGA.event({
            category: 'Demo',
            action: "Create Shiftplan"
        });
        dispatch(thunkCreateDemo());
    }
      //Diese Funktion sorgt für das Kennzeichnen einer Prioschicht im jeweiligen Schichtplan
        return (
            <>
            <Modal 
                    size="lg"
                    centered
                    show={demoIntro} onHide={() => dispatch(resettingModal())}
                    className="modal modal-secondary"
            >
                <Modal.Body className="pt-1">
                <Row className="text-center mt-2">
                    <Col>
                        <h2>Willkommen bei Staffbite</h2>
                        <p className="mb-0">
                            Leg gleich los und erstelle deinen ersten Schichtplan. 
                        </p>
                        <small>
                            Hinweis: Speichere dir den Link zu deinem Schichtplan ab.
                            <br/>
                            Ohne den Link geht dein Schichtplan verloren.
                        </small>
                    </Col>
                </Row>
                <Row className="text-center mt-4">
                    <Col>
                        <Button color="primary" onClick={() => handleCreateDemo()}>Schichtplan erstellen</Button>
                    </Col>
                </Row>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            </>
        );
    }

