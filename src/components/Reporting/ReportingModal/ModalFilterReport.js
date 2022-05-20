import React from "react";
import {
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import ReportFilter from "../ReportingFilter/ReportFilter";
import moment from "moment";
import { resettingModal } from "../../../reducers/modal";
import { useSelector, useDispatch } from "react-redux";
import { resettingUserInput } from "../../../reducers/userInput";
import { thunkStartReport } from "../../../store/middleware/StartReport";

const ModalFilterReport = ({filter, onClickFilter, keytrue, modalkey, getEmployeesReport}) => {
    const dispatch = useDispatch()
    const showReportFilter = useSelector(state => state.modal.showReportFilter);
    const reportStartDate = useSelector(state => state.date.start);
    const reportEndDate = useSelector(state => state.date.end);
    const useInputReportFilter = useSelector(state => state.userInput.reportFilter);
    const getReport = () => {
        if( reportStartDate === undefined || 
            reportEndDate === undefined || 
            Object.keys(useInputReportFilter).length === 0
        ) 
            return
            //setErrMsg({...errMsg, InvalidReportInput: !0})
        let reportConfig = {
        ...useInputReportFilter,
        start:  reportStartDate, 
        ende: reportEndDate
        }
        dispatch(thunkStartReport(reportConfig));
        dispatch(resettingModal())
    }
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal-secondary"
                    show={showReportFilter} 
                    onHide={() => {
                        dispatch(resettingModal())
                        dispatch(resettingUserInput())
                    }}
            >
                <Modal.Header className="pb-0" closeButton>
                    <Label className="h2 m-3 align-items-center">Report starten</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <ReportFilter/>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        color="link"
                        size="lg"
                        onClick={() => {
                            dispatch(resettingModal())
                            dispatch(resettingUserInput())
                        }}
                    > 
                        Schließen
                    </Button>{' '}
                  <Button color="success" size="lg" onClick={() => getReport()}> Auswahl übernehmen</Button>{' '}
                </Modal.Footer>
            </Modal>
        );
    }

export default ModalFilterReport