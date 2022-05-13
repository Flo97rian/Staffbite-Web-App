import React from "react";
import {
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import ReportFilter from "../ReportingFilter/ReportFilter";
import store from "../../../store";
import PropTypes from "prop-types";

const ModalFilterReport = ({filter, onClickFilter, keytrue, modalkey, getEmployeesReport}) => {
    ModalFilterReport.propTypes = {
        filter: PropTypes.object.isRequired,
        keytrue: PropTypes.bool.isRequired,
        modalkey: PropTypes.string.isRequired,
        getEmployeesReport: PropTypes.func.isRequired,
        onClickFilter: PropTypes.func.isRequired,
    }

    ModalFilterReport.defaulfProps = {
        keytrue: false,
        modalkey: "",
    };

        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal-secondary"
                    show={keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: modalkey})}}
            >
                <Modal.Header className="pb-0" closeButton>
                    <Label className="h2 m-3 align-items-center">Report starten</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <ReportFilter filter={filter} onClickFilter={onClickFilter}></ReportFilter>
                </Modal.Body>
                <Modal.Footer>
                  <Button color="link" size="lg" onClick={() => {store.dispatch({type: "CLOSE", payload: modalkey})}}> Schließen </Button>{' '}
                  <Button color="success" size="lg" onClick={() => getEmployeesReport(modalkey)}> Auswahl übernehmen</Button>{' '}
                </Modal.Footer>
            </Modal>
        );
    }

export default ModalFilterReport