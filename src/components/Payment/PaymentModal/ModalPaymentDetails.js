import React from "react";
import {
    Button,
    Label,
    ModalBody
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import ReportFilter from "../../Reporting/ReportingFilter/ReportFilter";
import store from "../../../store";
import PaymentDetails from "../../Admin/Dashboard/Form/PaymentDetails";
import Payment from "../../../api/stripe/Payment";
import PropTypes from 'prop-types';
import { ModalDialog } from "react-bootstrap";


const ModalPaymentDetails = ({keytrue, modalkey, EmployeesLength}) => {
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
                        <Payment EmployeesLength={EmployeesLength}/>
                    </Modal.Body>
            </Modal>
            </>
        );
    }

ModalPaymentDetails.defaultProps = {
    keytrue: false,
    modalkey: "",
    EmployeesLength: 0,

}
ModalPaymentDetails.propTypes = {
    keytrue: PropTypes.bool.isRequired,
    modalkey: PropTypes.string.isRequired,
    EmployeesLength: PropTypes.number.isRequired
    }

export default ModalPaymentDetails