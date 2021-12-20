import React from "react";
import {
    Row,
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import store from "../../../../store"

const ModalSaveChanges = (props) => {

    function ResetShiftplan (modalkey) {
        store.dispatch({ type: "ResetCurrentShiftPlan"})
        store.dispatch({ type: "resetShiftplan"})
        store.dispatch({ type: "stopShiftPlanIsActive"})
        store.dispatch({ type: "stopShiftPlanIsImported"})
        store.dispatch({ type: "resetShiftplanChanged"})
        store.dispatch({type: "CLOSE", payload: modalkey})
    }
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    scrollable={true}
                    className="modal-secondary"
                    show={props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}
            >
               <Modal.Header className="pb-0" closeButton>
                    <Label className="h2 m-3 align-items-center">Änderungen speichern</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                <Row className="text-center m-2">
                            <p>Du hast einen Schichtplan geändert, aber nicht gespeichert. Ohne Speicherung gehen deine Anpassungen leider verloren!</p>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button  color="warning" onClick={() => ResetShiftplan(props.modalkey)}> Änderungen ablehnen </Button>
                    <Button color="success" onClick={() => props.handleUpdate()}>Änderungen speichern</Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalSaveChanges;