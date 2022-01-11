// Dieses Component ist der zentrale Handler zum öffnen von Modals

import React from "react";
import ModalFilterReport from "./ModalFilterReport";
import ModalPaymentDetails from "./ModalPaymentDetails";
import { useSelector } from "react-redux";


const OpenModal = (props) => {
    const modal = useSelector((state) => state.modal);
    const modalkey = props.checkModalKey(modal);
    const keytrue = props.checkTrue(modal);
    const dataModal = () => {
        if (modalkey === "showReportFilter") {
            return ( <ModalFilterReport modalkey={modalkey} keytrue={keytrue} {...props}></ModalFilterReport>
        )}
        else if(modalkey === "requiredPaymentDetails") {
            return ( <ModalPaymentDetails modalkey={modalkey} keytrue={keytrue} {...props}></ModalPaymentDetails>
        )} 
    }
        return (
        <>
            {keytrue ? dataModal() : <></>}
        </>
        );
    }
export default OpenModal