import React, {useEffect, useState} from "react";
import {
    Button,
    Col,
    Label,
    Row
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from "react-redux";
import { resettingModal, settingModal } from "../../../reducers/modal";
import { thunkCreateDemo } from "../../../store/middleware/CreateDemo";
import { AuthenticationFormAdmin } from "./Form/AuthenticationFormAdmin";
import { settingAuthenticationForAdmin } from "../../../reducers/demo";
import { RegistrationForm, RegistrationFormAdmin } from "./Form/RegistrationFormAdmin";
import { AuthenticationFormEmployee } from "./Form/AuthenticationFormEmployee";
import { RegistrationFormEmployee } from "./Form/RegistrationFormEmployee";

export const ModalDemoEntry = (props) => {
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
    const demoEntry = useSelector(state => state.modal.demoEntry);
    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        if("id" in params) { 
            setHasDemoId(true);
        }
        setShowButtons(true);
        setShowAdminAuthentication(false);
        setShowEmployeeAuthentication(false);
    }, [])

    useEffect(()=> {
        if(demoEntry) {
            setShowButtons(true);
            setShowAdminAuthentication(false);
            setShowEmployeeAuthentication(false);
        }
    }, [demoEntry])

    const handleShowFormAdmin = () => {
        const adminIsSignedUp = demo.demoAdmin.securityQuestionAnswere !== false;
        if(adminIsSignedUp) {
            setShowRegistrationAdmin(false);
            setShowAdminAuthentication(true);
            setShowButtons(false);
        }
        if(!adminIsSignedUp) {
            setShowRegistrationAdmin(true);
            setShowAdminAuthentication(false);
            setShowButtons(false);
        }
    }

    const handleShowFormEmployee = () => {
        const employeeSignedUp = demo.demoAdmin.securityQuestionAnswere !== false;
        if(employeeSignedUp) {
            setShowRegistrationEmployee(false);
            setShowEmployeeAuthentication(true);
            setShowButtons(false);
        }
        if(!employeeSignedUp) {
            setShowRegistrationEmployee(true);
            setShowEmployeeAuthentication(false);
            setShowButtons(false);
        }
    }

    const handleShowInvitation = () => {
        dispatch(resettingModal());
        dispatch(settingModal("demoInvitation"))
    }
      //Diese Funktion sorgt für das Kennzeichnen einer Prioschicht im jeweiligen Schichtplan
        return (
            <>
            <Modal 
                    size="lg"
                    centered
                    show={demoEntry} onHide={() => dispatch(resettingModal())}
                    className="modal modal-secondary"
            >
                <Modal.Body className="pt-1">
                <Row className="text-center mt-3" hidden={!showButtons}>
                    <Col>
                        <h2>Willkommen bei Staffbite</h2>
                        <p>
                            Du hast bereits einen Account erstellt?
                            <br/>
                            Du bist ... ?
                        </p>
                    </Col>
                </Row>
                <div hidden={!showButtons}>
                <Row className="text-center mt-2">
                    <Col></Col>
                    <Col>
                        <Button size="sm" block color="primary" onClick={() => handleShowFormAdmin()}>Planer</Button>
                    </Col>
                    <Col></Col>
                </Row>
                <Row className="text-center mt-3">
                    <Col></Col>
                    <Col>
                        <Button size="sm" color="primary" block onClick={() => handleShowFormEmployee()}>Mitarbeiter</Button>
                    </Col>
                    <Col></Col>
                </Row>
                <Row className="text-center mt-5">
                    <Col>
                        <small>Ich habe noch keinen Account erstellt!</small>
                    </Col>
                </Row>
                <Row className="text-center mt-0">
                    <Col></Col>
                    <Col>
                        <Button size="sm" block color="link" onClick={() => handleShowInvitation()}>Erste Anmeldung</Button>
                    </Col>
                    <Col></Col>
                </Row>
                </div>
                <div hidden={!showAdminAuthentication}>
                    <AuthenticationFormAdmin />

                </div>
                <div hidden={!showEmployeeAuthentication}>
                    <AuthenticationFormEmployee />

                </div>
                <div hidden={!showRegistrationAdmin}>
                    <RegistrationFormAdmin />
                </div>
                <div hidden={!showRegistrationEmployee}>
                    <RegistrationFormEmployee />
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" onClick={() => dispatch(resettingModal())}>Abbrechen</Button>
                </Modal.Footer>
            </Modal>
            </>
        );
    }

