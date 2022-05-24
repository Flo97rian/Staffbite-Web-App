import React from "react";
import {
    Row,
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import store from "../store"
import { useSelector, useDispatch } from "react-redux";
import { resettingShiftplan } from "../reducers/Shiftplan";
import { resettingCurrentShiftplanIndex } from "../reducers/currentShiftPlan";
import { resettingModal } from "../reducers/modal";
import { resettingDisplayShiftplan } from "../reducers/display";
import { resettingShiftplanChanged } from "../reducers/shiftplanChanged";
import { thunkUpdateShiftPlan } from "../store/middleware/UpdateShiftPlan";
import { resettingEmployeesDummyshifts } from "../reducers/DB";

const ModalSaveChanges = (props) => {
    const dispatch = useDispatch();
    const saveChanges = useSelector(state => state.modal.saveChanges);
    const Shiftplan = useSelector(state => state.Shiftplan);

    function ResetShiftplan () {
        dispatch(resettingCurrentShiftplanIndex())
        dispatch(resettingShiftplan())
        dispatch(resettingDisplayShiftplan());
        dispatch(resettingShiftplanChanged())
        dispatch(resettingEmployeesDummyshifts())
        dispatch(resettingModal())
    }

    const updateShiftplan = () => {
        dispatch(thunkUpdateShiftPlan(Shiftplan));
        dispatch(resettingShiftplanChanged());
        dispatch(resettingShiftplan())
        dispatch(resettingDisplayShiftplan());
        dispatch(resettingEmployeesDummyshifts())
        dispatch(resettingModal());
    }
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    scrollable={true}
                    className="modal-secondary"
                    show={saveChanges} onHide={() => dispatch(resettingModal())}
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
                    <Button  color="warning" onClick={() => ResetShiftplan()}> Änderungen ablehnen </Button>
                    <Button color="success" onClick={() => updateShiftplan()}>Änderungen speichern</Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalSaveChanges;