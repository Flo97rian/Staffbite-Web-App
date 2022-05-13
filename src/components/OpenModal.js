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


const OpenModal = (props) => {
    const modal = useSelector((state) => state.modal);
    const modalkey = props.checkModalKey(modal);
    const keytrue = props.checkTrue(modal);
    const dataModal = () => {
        switch(modalkey) {
            case "showReportFilter":
                return <ModalFilterReport modalkey={modalkey} keytrue={keytrue} {...props}/>
            case "requiredPaymentDetails":
                return <ModalPaymentDetails modalkey={modalkey} keytrue={keytrue} {...props}/>
            case "showErstellen":
                return <ModalAddEmployee modalkey={modalkey} keytrue={keytrue} {...props}/>
            case "showEmployeesRoles":
                return <ModalEmployeesRoles modalkey={modalkey} keytrue={keytrue} {...props}/>
            case "id":
                return <ModalEditEmployee modalkey={modalkey} keytrue={keytrue} {...props}/>
            case "showSchichtplanErstellen":
                return <ModalCreateShiftplan modalkey={modalkey} keytrue={keytrue} {...props}/>
            case "showSchichtplanFreigeben":
                return <ModalReleaseShiftplan modalkey={modalkey} keytrue={keytrue} {...props}/>
            case "showSchichthinzufuegen":
                return <ModalAddShift modalkey={modalkey} keytrue={keytrue} {...props}/>
            case "showBefuellungStarten":
                return <ModalStartFilling modalkey={modalkey} keytrue={keytrue} {...props}/>
            case "prioIsActive":
                return <ModalEditSingleShift modalkey={modalkey} keytrue={keytrue} {...props}/>
            case "applyIsActive":
                return <ModalEditEmployeesInShift modalkey={modalkey} keytrue={keytrue} {...props}/>
            case "saveChanges":
                return <ModalSaveChanges modalkey={modalkey} keytrue={keytrue} {...props}/>
            case "editShiftDescription": 
                return <ModalEditShiftDescription modalkey={modalkey} keytrue={keytrue} {...props}/>
            case "userApply": 
                return <ModalUserApply modalkey={modalkey} keytrue={keytrue} {...props}/>
            case "tradeShift":
                return <ModalTradeShift modalkey={modalkey} keytrue={keytrue} {...props}/>
            case "editCalendarShift":
                return <ModalEditCalendarShift modalkey={modalkey} keytrue={keytrue} {...props}/>
            case "addCalendarShift":
                return <ModalAddCalendarShift modalkey={modalkey} keytrue={keytrue} {...props}/>
            default:
                return <ModalEditEmployee modalkey={modalkey} keytrue={keytrue} {...props}/>
        }
    }
        return (
        <>
            {keytrue ? dataModal() : <></>}
        </>
        );
    }
export default OpenModal