import React from "react";
import {
    Col,
    Button,
    Row,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import store from "../../../../store";
import ShiftDetails from "../Form/ShiftDetails";


const ModalSchichtTauschen = (props) => {
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal-secondary"
                    show={props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}
            >
                <Modal.Header className="pb-0" closeButton>
                    <Label className="h2 m-3 align-items-center">In Schicht eintragen</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <ShiftDetails {...props} />
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" onClick={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}> Schließen </Button>
                    <Button color="success" onClick={() => props.onTrade(props.modalkey)}> Tauschanfrage senden </Button>  
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalSchichtTauschen;