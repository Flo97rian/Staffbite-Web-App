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
                    show={props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}
            >
                <Modal.Header>
                            <Label className="h3 mb-2 align-items-center">Report filtern</Label>
                </Modal.Header>
                <Modal.Body>
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