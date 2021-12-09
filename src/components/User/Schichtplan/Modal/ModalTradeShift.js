import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import Button from 'react-bootstrap/Button';
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
                    show={props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Schicht tauschen
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ShiftDetails {...props} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => props.onTrade(props.modalkey)}> Tauschanfrage senden </Button>  
                    <Button onClick={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}> Schließen </Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalSchichtTauschen;