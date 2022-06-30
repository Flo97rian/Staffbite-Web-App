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
import { resettingModal, settingModal } from "../../../reducers/modal";
import { thunkCreateDemo } from "../../../store/middleware/CreateDemo";
import { AuthenticationFormAdmin } from "./Form/AuthenticationFormAdmin";
import { settingAuthenticateAdmin, settingAuthenticationForAdmin } from "../../../reducers/demo";
import { RegistrationForm, RegistrationFormAdmin } from "./Form/RegistrationFormAdmin";
import { AuthenticationFormEmployee } from "./Form/AuthenticationFormEmployee";
import { RegistrationFormEmployee } from "./Form/RegistrationFormEmployee";
import { settingAuthenticationAnswere, settingSelectedAuthenticationIndex } from "../../../reducers/userInput";
import { thunkUpdateDemo } from "../../../store/middleware/UpdateDemo";

export const ModalInvitationAdmin = (props) => {
    const dispatch = useDispatch();
    const demo = useSelector(state => state.demo);
    const [showEmployeeAuthentication, setShowEmployeeAuthentication] = useState(false);
    const [showRegistrationEmployee, setShowRegistrationEmployee] = useState(false);
    const [showButtons, setShowButtons] = useState(true);
    const [hasDemoId, setHasDemoId] = useState(false);
    const [clip, setClip] = useState(false);
    const userInput = useSelector(state => state.userInput);
    const authenticationAnswere = useSelector(state => state.userInput.authenticationAnswere);
    const [invitationLink, setInvitationLink] = useState("");
    const demoInvitationAdmin = useSelector(state => state.modal.demoInvitationAdmin);
    const [showInvitationLink, setShowInvitationLink] = useState(false);

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        if("id" in params) { 
            var url = window.location.href;
            setInvitationLink(url + "&invitation=true");
        }
    }, [])

    const handleSetAdminAccount = () => {
        dispatch(
            settingAuthenticationForAdmin(
                {
                    authenticationAnswere: userInput.authenticationAnswere,
                    selectedAuthenticationIndex: userInput.selectedAuthenticationIndex
                }
            )
        )
        dispatch(settingAuthenticateAdmin(
            {
                authenticationAnswere: userInput.authenticationAnswere,
                selectedAuthenticationIndex: userInput.selectedAuthenticationIndex
            }
        ))
        dispatch(thunkUpdateDemo());
        setShowInvitationLink(true);
    }

    const handleInvitationLink = () => {
        navigator.clipboard.writeText(invitationLink)
        setClip(true);
    }

      //Diese Funktion sorgt für das Kennzeichnen einer Prioschicht im jeweiligen Schichtplan
        return (
            <>
            <Modal 
                    size="lg"
                    centered
                    show={demoInvitationAdmin} onHide={() => dispatch(resettingModal())}
                    className="modal modal-secondary"
            >
                <Modal.Body className="pt-1">
                <Row className="text-center mt-3">
                    <Col>
                        <h2>Willkommen bei Staffbite</h2>
                        <div>
                            <p>
                                Lege eine Sicherheitsfrage fest, damit nur du die Schichten ändern kannst.
                                <br/>
                            </p>
                        </div>
                    </Col>
                </Row>
                <div hidden={showInvitationLink}>
                <Row>
            <Col className="mx-4">
            <Row>
                <Col>
                    <h4>Wähle eine Sicherheitsfrage aus</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                <Input type="select" onChange={(event) => dispatch(settingSelectedAuthenticationIndex(event.target.selectedIndex))}>
                    <option key={1} value={"Wie hieß Ihr erstes Haustier?"}>Wie hieß Ihr erstes Haustier?</option>
                    <option key={2} value={"Wie hieß Ihr Geburtsort?"}>Wie hieß Ihr Geburtsort?</option>
                    <option key={3} value={"Wie lautete als Kind Ihr Spitzname?"}>Wie lautete als Kind Ihr Spitzname?</option>
                    <option key={4} value={"Wie lautet der Vorname Ihrer Mutter?"}>Wie lautet der Vorname Ihrer Mutter?</option>
                    <option key={5} value={"In welcher Stadt haben sich Ihre Eltern kennengelernt?"}>In welcher Stadt haben sich Ihre Eltern kennengelernt?</option>
                    <option key={6} value={"Wie hieß Ihre erste Schule?"}>Wie hieß Ihre erste Schule?</option>
                </Input>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <h4>Wähle eine Antwort für deine Sicherheitsfrage aus</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input type="text" value={authenticationAnswere} placeholer="" name="authenticationAnswere" onChange={(event) => dispatch(settingAuthenticationAnswere(event.target.value))}></Input>
                </Col>
            </Row>
            <Row className="text-center mt-3">
                <Col>
                    <Button color="success" onClick={() => handleSetAdminAccount()}>Antwort speichern</Button>
                </Col>
            </Row>
            </Col>
        </Row>
                </div>
                <div hidden={!showInvitationLink}>
                    <Row className="text-center mb-4">
                        <Col>
                            <Button size="sm" color="link" className="" onClick={() => handleInvitationLink()}>
                            {clip ? "Einladungslink kopiert " : "Einladungslink kopieren "}
                            {clip ? <i className="fas fa-check" /> : <i className="fas fa-copy"></i>}
                            </Button>
                        </Col>
                    </Row>
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

