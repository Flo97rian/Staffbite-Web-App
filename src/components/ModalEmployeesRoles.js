import React from "react";
import {
    Button,
    Label,
    ModalBody,
    Col
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import FormEmployeesRoles from "./FormEmployeesRoles";
import { useSelector, useDispatch } from "react-redux";

const ModalEmployeesRoles = (props) => {
    const dispatch = useDispatch();
    const showEmployeesRoles = useSelector(state => state.modal.showEmployeesRoles);
        return (
            <>
            <Modal 
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
                className="modal-secondary"
                show={showEmployeesRoles}
            >
                    <Modal.Body>
                        <FormEmployeesRoles />
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