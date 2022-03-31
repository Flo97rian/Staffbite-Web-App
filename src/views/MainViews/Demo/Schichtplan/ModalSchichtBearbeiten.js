import React from "react";
import {
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import store from "../../../../store"

const ModalSchichtBearbeiten = (props) => {
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
                    <Label className="h2 m-3 align-items-center">Schicht bearbeiten</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    {/*<SchichtBearbeiten {...props} modalkey={props.modalkey}></SchichtBearbeiten>*/}
                </Modal.Body>
                <Modal.Footer>
                    <Button color="success"> Übernehmen</Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalSchichtBearbeiten 