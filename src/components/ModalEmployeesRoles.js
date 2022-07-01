import React from "react";
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import FormEmployeesRoles from "./FormEmployeesRoles";
import { useSelector } from "react-redux";

const ModalEmployeesRoles = (props) => {
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