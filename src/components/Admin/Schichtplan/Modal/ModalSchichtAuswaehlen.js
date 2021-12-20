import React, { useRef } from "react";
import {
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import store from "../../../../store"
import DragAndDrop from "../FormElements/DragAndDrop";
import FormSetApplicantsDetails from "../FormElements/FormSetApplicantsDetails";

const ModalSchichtAuswaehlen = (props) => {
    const day = props.bewerber.col;
    const row = props.bewerber.row;
    const shiftplan = props.shiftplan.plan
    let shift = shiftplan[row][day];
    const applicants = shift.setApplicants
    const applyedApplicants = shift.applicants
    const validApplicants = shift.setValidApplicants
    const position = shiftplan[row]["Wochentag"].ShiftPosition;
    const shiftanzahl = shift.anzahl

    const DragAndDropRef = useRef()
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
                    <Label className="h2 m-3 align-items-center">Schicht zuteilen</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <FormSetApplicantsDetails {...props}/>
                    <DragAndDrop
                    ref={DragAndDropRef}
                    applyed={applyedApplicants}
                    valid={validApplicants}
                    set={applicants}
                    position={position}
                    anzahl={shiftanzahl}
                    {...props}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button  color="link" onClick={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}> Schließen </Button>
                    <Button color="success" onClick={() => props.selectBewerber(props.modalkey, DragAndDropRef)}>Änderungen übernehmen</Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalSchichtAuswaehlen;