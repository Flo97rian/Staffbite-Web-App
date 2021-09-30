import React, { useRef } from "react";
import {
    Col,
    Row,
    Button
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import store from "../../../../store"
import DragAndDrop from "../FormElements/DragAndDrop";

const ModalSchichtAuswaehlen = (props) => {
    const tag = props.bewerber.col;
    const row = props.bewerber.row;
    const shiftplan = props.plaene[props.plan].plan
    const applicants = shiftplan[row][tag].setApplicants
    const applyedApplicants = shiftplan[row][tag].applicants
    const validApplicants = shiftplan[row][tag].setValidApplicants
    const shiftname = shiftplan[row]["Wochentag"].ShiftName
    const shiftstart = shiftplan[row]["Wochentag"].ShiftStart
    const shiftend = shiftplan[row]["Wochentag"].ShiftEnd
    const shiftanzahl = shiftplan[row][tag].anzahl

    const DragAndDropRef = useRef()
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    scrollable={true}
                    show={props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Schicht zuteilen
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Row className="text-center">
                        <Col xs={6}>
                            <br/>
                            <Form.Label>Schicht</Form.Label>
                        </Col>
                        <Col xs={6}>
                            <p>{shiftname}<br/> {tag}  <br/> {shiftstart} - {shiftend}</p>
                        </Col>
                    </Row>
                    <br/>
                    <DragAndDrop
                    ref={DragAndDropRef}
                    applyed={applyedApplicants}
                    valid={validApplicants}
                    set={applicants}
                    position={shiftname}
                    anzahl={shiftanzahl}
                    currentPlan={props.plan}
                    {...props}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button  color="secondary" onClick={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}> Schließen </Button>
                    <Button color="success" onClick={() => props.selectBewerber(props.modalkey, DragAndDropRef)}>Änderungen speichern</Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalSchichtAuswaehlen;