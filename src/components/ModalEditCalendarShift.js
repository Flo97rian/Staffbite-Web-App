import React, { useRef } from "react";
import {
    Button,
    Col,
    Label,
    Row,
    UncontrolledCarousel,
    UncontrolledCollapse
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import FromEditCalendarShift from "./FormEditCalendarShift";
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";
import { settingApplicants, settingCalenderShift, settingShiftNotice, settingShiftplan } from "../reducers/Shiftplan";
import { resettingCurrentShiftCustomDays, resettingShiftIsDayly, resettingUserInput, settingShiftIsDayly } from "../reducers/userInput";
import { settingShiftplanChanged } from "../reducers/shiftplanChanged";
import { deleteingEmployeeShiftFromSchichten, resettingEmployeeDummyShift, resettingEmployeesDummyshifts, settingEmployeeFetching, settingEmployeeShiftInSchichten, setttingEmployeeShiftInSchichten } from "../reducers/DB";
import { resettingChangeDayOrSelectedDays, settingChangeDayOrSelectedDays, settingTemporaryEmployeeID } from "../reducers/temporary";
import { thunkUpdateEmployee } from "../store/middleware/UpdateEmployee";
import { thunkFetchEmployees } from "../store/middleware/FetchEmployees";
import ReactBSAlert from "react-bootstrap-sweetalert";

const ModalEditCalendarShift = (props) => {
    const dispatch = useDispatch();
    const editCalendarShift = useSelector(state => state.modal.editCalendarShift);
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal-secondary"
                    show={editCalendarShift} onHide={() => dispatch(resettingModal())}
            >
                <Label className="h2 m-4 text-center">Schicht bearbeiten</Label>
                <Modal.Body className="pt-1">
                    <FromEditCalendarShift
                    />
                </Modal.Body>
            </Modal>
        );
    }
export default ModalEditCalendarShift 