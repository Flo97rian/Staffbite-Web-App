import React, {useEffect, useState} from "react";
import {
    Button,
    Col,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../../../reducers/modal";
import { thunkCreateDemo } from "../../../store/middleware/CreateDemo";
import { AuthenticationFormAdmin } from "./Form/AuthenticationFormAdmin";
import { settingAuthenticationForAdmin } from "../../../reducers/demo";
import { RegistrationForm, RegistrationFormAdmin } from "./Form/RegistrationFormAdmin";
import { AuthenticationFormEmployee } from "./Form/AuthenticationFormEmployee";
import { RegistrationFormEmployee } from "./Form/RegistrationFormEmployee";

export const ModalInvitation = (props) => {
    const dispatch = useDispatch();
    const demo = useSelector(state => state.demo);
    const [showEmployeeAuthentication, setShowEmployeeAuthentication] = useState(false);
    const [showRegistrationEmployee, setShowRegistrationEmployee] = useState(false);
    const [showButtons, setShowButtons] = useState(true);
    const [hasDemoId, setHasDemoId] = useState(false);
    const [clip, setClip] = useState(false);
    const [invitationLink, setInvitationLink] = useState("");
    const demoInvitation = useSelector(state => state.modal.demoInvitation);

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        if("id" in params) { 
            var url = window.location.href;
            setInvitationLink(url + "&invitation=true");
        }
        
    }, [])

    const handleShowFormEmployee = () => {
            setShowRegistrationEmployee(true);
            setShowEmployeeAuthentication(false);
            setShowButtons(false);
    }

      //Diese Funktion sorgt für das Kennzeichnen einer Prioschicht im jeweiligen Schichtplan
        return (
            <>
            <Modal 
                    size="lg"
                    centered
                    show={demoInvitation} onHide={() => dispatch(resettingModal())}
                    className="modal modal-secondary"
            >
                <Modal.Body className="pt-1">
                <Row className="text-center mt-2">
                    <Col>
                        <h2>Willkommen bei Staffbite</h2>
                        <p>Lege eine eine Sicherheitsfrage fest. Diese ist wichtig, um dich später wieder anzumelden.</p>
                    </Col>
                </Row>
                <div hidden={!invitationLink || !showButtons}>
                <Row className="text-center mt-3 mx-9">
                    <Col>
                    <Button color={clip ? "success" : "primary"} className="" onClick={() => {
                        navigator.clipboard.writeText(invitationLink)
                        setClip(true);
                        }
                    }>
                                {clip ? "Einladungslink kopiert " : "Einladungslink kopieren "}
                                {clip ? <i className="fas fa-check" /> : <i className="fas fa-copy"></i>}
                        </Button>
                    </Col>
                </Row>
                </div>
                <div hidden={!showButtons}>
                <Row className="text-center mt-4">
                    <Col>
                        <Button color="success" onClick={() => handleShowFormEmployee()}>Ich bin Mitarbeiter</Button>
                    </Col>
                </Row>
                </div>
                <div hidden={!showRegistrationEmployee}>
                    <RegistrationFormEmployee />
                </div>
                <div>
                    <Row className="text-center mt-3">
                        <Col>
                            <Button color="link" onClick={() => dispatch(resettingModal())}>Abbrechen</Button>
                        </Col>
                    </Row>
                    
                </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            </>
        );
    }

