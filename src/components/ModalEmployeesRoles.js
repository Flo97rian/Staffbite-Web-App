import React from "react";
import {
    Button,
    Label,
    ModalBody,
    Col
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { ModalDialog } from "react-bootstrap";
import store from "../store";
import FormEmployeesRoles from "./FormEmployeesRoles";

const accesses = [{
    id: "accessAdminView",
    name: "Schichten einsehen",
    description: "Darf ein Mitarbeiter mit dieser Position einsehen, welche Mitarbeiter in einer Schicht arbeiten?"
},
{
    id: "accessTradeWithoutAdmin",
    name: "Eigenständig tauschen",
    description: "Darf dieser Mitarbeiter eigenständig eine Schicht von einem Kollegen übernehmen?"
}]

const ModalEmployeesRoles = (props) => {
    const {keytrue, modalkey, meta, addNewPosition, deletePosition, updatePositionAccess} = props;
        return (
            <>
            <Modal 
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
                className="modal-secondary"
                show={keytrue}
            >
                    <Modal.Body>
                        <FormEmployeesRoles 
                        positions={meta?.schichten}
                        accesses={accesses}
                        accessPosition={meta?.accessPosition}
                        addNewPosition={addNewPosition}
                        deletePosition={deletePosition}
                        updatePositionAccess={updatePositionAccess}
                        />
                    </Modal.Body>
            </Modal>
            </>
        );
    }

    ModalEmployeesRoles.defaultProps = {
    keytrue: false,
    modalkey: "",
    EmployeesLength: 0,

}
ModalEmployeesRoles.propTypes = {
    keytrue: PropTypes.bool.isRequired,
    modalkey: PropTypes.string.isRequired,
    EmployeesLength: PropTypes.number.isRequired
    }

export default ModalEmployeesRoles