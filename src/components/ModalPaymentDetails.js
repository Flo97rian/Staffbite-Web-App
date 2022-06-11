import React from "react";
import {
    Button,
    Label,
    ModalBody,
    ModalFooter
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import Payment from "../api/stripe/Payment";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import differenceInDays from 'date-fns/differenceInDays';
import parseISO from "date-fns/parseISO";
import { resettingModal } from "../reducers/modal";

const ModalPaymentDetails = ({keytrue, modalkey, EmployeesLength}) => {
        const dispatch = useDispatch();
        const requiredPaymentDetails = useSelector(state => state.modal.requiredPaymentDetails);
        const Meta = useSelector(state => state.Meta);
        const inTrail = Meta?.tenantCategorie?.registeredAt ? Meta.tenantCategorie.registeredAt : false;
        const trialNearEnd = (30 - differenceInDays(new Date(), parseISO(inTrail))) < 7;
        const trialEnd = (30 - differenceInDays(new Date(), parseISO(inTrail))) < 0;
        const trialLeft = () => {
            if(trialEnd) {
                return null;
            }
            if(trialNearEnd) {
                return (
                    <ModalFooter>
                        <Button color="primary" onClick={() => dispatch(resettingModal())}>Später</Button>
                    </ModalFooter>
                )
            }
            return null;
        }
        return (
            <>
            <Modal 
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
                className="modal-secondary"
                show={requiredPaymentDetails}
            >
                    <Modal.Body>
                        <Payment trialEnd={trialEnd} EmployeesLength={EmployeesLength}/>
                    </Modal.Body>
                    {trialLeft()}
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