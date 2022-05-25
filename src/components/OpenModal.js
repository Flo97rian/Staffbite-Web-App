// Dieses Component ist der zentrale Handler zum öffnen von Modals

import React from "react";
import ModalFilterReport from "./Reporting/ReportingModal/ModalFilterReport";
import ModalPaymentDetails from "./ModalPaymentDetails";
import { useSelector } from "react-redux";
import ModalAddEmployee from "./ModalAddEmployee";
import ModalEmployeesRoles from "./ModalEmployeesRoles";
import ModalEditEmployee from "./ModalEditEmployee";
import { ModalEditSingleShift } from "./ModalEditSingleShift";
import ModalSaveChanges from "./ModalSaveChanges";
import ModalStartFilling from "./ModalStartFilling";
import ModalEditEmployeesInShift from "./ModalEditEmployeesInShift";
import ModalAddShift from "./ModalAddShift";
import ModalEditShiftDescription from "./ModalEditShiftDescription";
import ModalCreateShiftplan from "./ModalCreateShiftplan";
import ModalReleaseShiftplan from "./ModalReleaseShiftplan";
import ModalUserApply from "./ModalUserApply";
import ModalTradeShift from "./ModalTradeShift";
import ModalEditCalendarShift from "./ModalEditCalendarShift";
import ModalAddCalendarShift from "./ModalAddCalendarShift";
import ModalApplyAfterPublish from "./ModalApplyAfterPublish";


const OpenModal = (props) => {
    const modal = useSelector((state) => state.modal);
    const showReportFilter = useSelector(state => state.modal.showReportFilter);
    const showErstellen = useSelector(state => state.modal.showErstellen);
    const requiredPaymentDetails = useSelector(state => state.modal.requiredPaymentDetails);
    const showEmployeesRoles = useSelector(state => state.modal.showEmployeesRoles);
    const showSchichtplanErstellen = useSelector(state => state.modal.showSchichtplanErstellen);
    const showSchichtplanFreigeben = useSelector(state => state.modal.showSchichtplanFreigeben);
    const showSchichthinzufuegen = useSelector(state => state.modal.showSchichthinzufuegen);
    const showBefuellungStarten = useSelector(state => state.modal.showBefuellungStarten);
    const prioIsActive = useSelector(state => state.modal.prioIsActive);
    const applyIsActive = useSelector(state => state.modal.applyIsActive);
    const saveChanges = useSelector(state => state.modal.saveChanges);
    const editShiftDescription = useSelector(state => state.modal.editShiftDescription);
    const userApply = useSelector(state => state.modal.userApply);
    const tradeShift = useSelector(state => state.modal.tradeShift);
    const editCalendarShift = useSelector(state => state.modal.editCalendarShift);
    const addCalendarShift = useSelector(state => state.modal.addCalendarShift);
    const applyAfterPublish = useSelector(state => state.modal.applyAfterPublish);
    const dataModal = () => {
        if(showErstellen) {
            return <ModalAddEmployee {...props}/>
        } else if (showReportFilter) {
            return <ModalFilterReport  {...props}/>
        } else if (requiredPaymentDetails) {
            return <ModalPaymentDetails  {...props}/>
        } else if (showEmployeesRoles) {
            return <ModalEmployeesRoles  {...props}/>
        } else if (showSchichtplanErstellen) {
            return <ModalCreateShiftplan  {...props}/>
        } else if (showSchichtplanFreigeben) {
            return <ModalReleaseShiftplan  {...props}/>
        } else if (showSchichthinzufuegen) {
            return <ModalAddShift  {...props}/>
        } else if (showBefuellungStarten) {
            return <ModalStartFilling  {...props}/>
        } else if (prioIsActive) {
            return <ModalEditSingleShift  {...props}/>
        } else if (applyIsActive) {
            return <ModalEditEmployeesInShift  {...props}/>
        } else if (saveChanges) {
            return <ModalSaveChanges  {...props}/>
        } else if (editShiftDescription) {
            return <ModalEditShiftDescription  {...props}/>
        } else if (userApply) {
            return <ModalUserApply  {...props}/>
        } else if (showReportFilter) {
            return <ModalFilterReport  {...props}/>
        } else if (tradeShift) {
            return <ModalTradeShift  {...props}/>
        } else if (editCalendarShift) {
            return <ModalEditCalendarShift  {...props}/>
        } else if (addCalendarShift) {
            return <ModalAddCalendarShift  {...props}/>
        } else if (applyAfterPublish) {
            return <ModalApplyAfterPublish {...props}/>
        } else {
            return <ModalEditEmployee  {...props}/>
        }
    }
        return (
        <>
            {Object.values(modal).includes(true) ? dataModal() : <></>}
        </>
        );
    }
export default OpenModal