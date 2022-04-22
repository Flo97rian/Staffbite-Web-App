import React, {useRef} from "react";
import {
    Button,
    Label,
    Row,
    Col,
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import store from "../../../../store"
import Bearbeiten from './Form/Bearbeiten'
import DragAndDropMitarbeiter from "./FormElement.js/DragAndDropMitarbeiter";

const ModalMitarbeiterBearbeiten = (props) => {
    let index = Number(props.shiftSlot.row);
    let day = props.shiftSlot.col;
    let applicants = props.Schichtplan[index][day].applicants;
    let setApplicants = props.Schichtplan[index][day].setApplicants;
    let anzahl = props.Schichtplan[index][day].anzahl;
    let shiftName = props.Schichtplan[index].Wochentag.ShiftName;
    let shiftDate = props.Schichtplan[0][day]
    let notice = props.Schichtplan[index][day].notice;
    const DragAndDropRef = useRef()
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal-secondary"
                    show={props.modal} 
                    onHide={() => props.handleCloseModal()}
            >
                <Modal.Header className="pb-0"closeButton>
                    <Label className="h2 m-3 align-items-center">Schicht zuteilen</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <Row className="mx-7 my-2">
                        <Col>
                            <p className="lead p-0 m-0">Schicht:</p>
                        </Col>
                        <Col>
                            <p className="lead p-0 m-0">{shiftName}, {shiftDate}</p>
                        </Col>
                    </Row>
                    <Row className="mx-7">
                        <Col>
                            <p className="lead  p-0 m-0">Notiz:</p>
                        </Col>
                        <Col>
                            <p className="lead p-0 m-0">{notice}</p>
                        </Col>
                    </Row>
                    <DragAndDropMitarbeiter
                    ref={DragAndDropRef}
                    employees={props.employees}
                    applicants={applicants}
                    setApplicants={setApplicants}
                    anzahl={anzahl}
                    Schichtplan={props.Schichtplan}
                    index={index}
                    day={day}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" onClick={() => props.handleCloseModal()}> Schließen</Button>
                    <Button color="success" onClick={() => props.handleEditSetApplicants(DragAndDropRef)}> Änderungen übernehmen</Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalMitarbeiterBearbeiten 