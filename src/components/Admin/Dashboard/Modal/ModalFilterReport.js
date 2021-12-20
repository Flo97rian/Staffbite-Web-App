import React from "react";
import {
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import ReportFilter from "../Form/ReportFilter";
import store from "../../../../store";

const ModalFilterReport = (props) => {
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal-secondary"
                    show={props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}
            >
                <Modal.Header className="pb-0" closeButton>
                    <Label className="h2 m-3 align-items-center">Report starten</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <ReportFilter {...props}></ReportFilter>
                </Modal.Body>
                <Modal.Footer>
                  <Button color="link" size="lg" onClick={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}> Schließen </Button>{' '}
                  <Button color="success" size="lg" onClick={() => props.handleFilterIsActive(props.modalkey)}> Auswahl übernehmen</Button>{' '}
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalFilterReport