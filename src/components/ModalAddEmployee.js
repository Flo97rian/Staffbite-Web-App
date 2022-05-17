import React from "react";
import {
    Col,
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import FormMitarbeiterErstellen from "./FormMitarbeiterErstellen";
import store  from "../store"
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";

const ModalAddEmployee = (props) => {
    const dispatch = useDispatch();
    const showErstellen = useSelector(state => state.modal.showErstellen);
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal modal-secondary"
                    scrollable
                    show={showErstellen} onHide={() => dispatch(resettingModal())}
            >
                <Modal.Header className="pb-0"closeButton>
                    <Label className="h2 m-3 align-items-center">Mitarbeiter einladen</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <FormMitarbeiterErstellen {...props}></FormMitarbeiterErstellen>
                </Modal.Body>
                <Modal.Footer>
                    <Col xs={2}>
                        <Button color="link"onClick={() => dispatch(resettingModal())}> Schließen </Button>
                    </Col>
                    <Col xs={2}>
                        <Button color="success" onClick={() => props.handleRegister()}> Einladen</Button>
                  </Col>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalAddEmployee;