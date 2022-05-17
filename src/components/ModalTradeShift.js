import React from "react";
import {
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import store from "../store";
import ShiftDetails from "./ShiftDetails";
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";


const ModalTradeShift = (props) => {
    const dispatch = useDispatch();
    const tradeShift = useSelector(state => state.modal.tradeShift);
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal-secondary"
                    show={tradeShift} onHide={() => dispatch(resettingModal())}
            >
                <Modal.Header className="pb-0" closeButton>
                    <Label className="h2 m-3 align-items-center">Schichtdetails</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <ShiftDetails {...props} />
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" onClick={() => dispatch(resettingModal())}> Schließen </Button>
                    <Button color="success" onClick={() => props.onTrade(props.modalkey)}> Tauschanfrage senden </Button>  
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalTradeShift;