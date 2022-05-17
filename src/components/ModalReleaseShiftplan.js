import React from "react";
import {
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import SchichtplanFreigeben from "./FormReleaseShiftplan";
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";

const ModalReleaseShiftplan = (props) => {
    const dispatch = useDispatch();
    const showSchichtplanFreigeben = useSelector(state => state.modal.showSchichtplanFreigeben);
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal-secondary"
                    show={showSchichtplanFreigeben} onHide={() => dispatch(resettingModal())}
            >
                <Modal.Header className="pb-0"closeButton>
                    <Label className="h2 m-3 align-items-center">Schichtplan zum Eintragen freigeben</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <SchichtplanFreigeben {...props}/>
                </Modal.Body>
                <Modal.Footer>
                  <Button color="link" onClick={() => dispatch(resettingModal())}> Schließen </Button>
                  <Button color="success" onClick={() => props.onUpdate(props.modalkey)}> Freigeben</Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalReleaseShiftplan;