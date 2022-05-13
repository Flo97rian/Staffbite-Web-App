import React, { useRef } from "react";
import {
    Button,
    Label,
    UncontrolledCarousel,
    UncontrolledCollapse
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import store from "../store"
import FromEditCalendarShift from "./FormEditCalendarShift";

const ModalEditCalendarShift = (props) => {
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal-secondary"
                    show={props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}
            >
                <Label className="h2 m-4 text-center">Schicht bearbeiten</Label>
                <Modal.Body className="pt-1">
                    <FromEditCalendarShift {...props}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" onClick={() => store.dispatch({type: "CLOSE"})}> Schließen </Button>
                    <Button color="success" onClick={() => props.handleCalendarShiftChanges()}> Übernehmen</Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalEditCalendarShift 