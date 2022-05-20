import React from "react";
import Modal from 'react-bootstrap/Modal';
import {
    Col,
    Button,
    Label
} from "reactstrap"

import FormMitarbeiterBearbeiten from "./FormMitarbeiterBearbeiten";
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";
import { resettingUserInput } from "../reducers/userInput";
import { settingEmployeeFormDetails } from "../reducers/DB";
import { thunkUpdateEmployee } from "../store/middleware/UpdateEmployee";

const ModalEditEmployee = (props) => {
    const dispatch = useDispatch();
    const employeeID = useSelector(state => state.temporary.employeeID);
    const Employee = useSelector(state => state.DB.employees[employeeID]);
    const userInput = useSelector(state => state.userInput);

    const updateEmployee = () => {   
        dispatch(settingEmployeeFormDetails({employeeID: employeeID, userInput: userInput}))
        dispatch(thunkUpdateEmployee());
        dispatch(resettingUserInput())
        dispatch(resettingModal());
    }
        return (
            <Modal 
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable
            className="modal-secondary"
            show={true} 
            onHide={() => {
                dispatch(resettingModal());
                dispatch(resettingUserInput())
            }}
            >
               <Modal.Header className="pb-0" closeButton>
                    <Label className="h2 m-3 align-items-center">Mitarbeiter bearbeiten</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <FormMitarbeiterBearbeiten/>
                </Modal.Body>
                <hr className="my-4" />
                <Modal.Footer>
                            <Button color="link" 
                                onClick={() => {
                                    dispatch(resettingModal());
                                    dispatch(resettingUserInput())
                                }}
                            >Schließen</Button>
                            <Button color="primary" type="Button" onClick={() => updateEmployee()}> Aktualisieren</Button>{' '}
                </Modal.Footer>
            </Modal>
        )
    }
export default ModalEditEmployee