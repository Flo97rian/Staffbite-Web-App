// Dieses Component ist der zentrale Handler zum öffnen von Modals

import React from "react";
import ModalSchichtBearbeiten from "./ModalSchichtBearbeiten";
import ModalTour from "./ModalTour";
import ModalZusammenfassung from "./ModalZusammenfassung";


const OpenModal = (props) => {
    const modal = props.modal;
    const modalkey= props.modalkey
    function dataModal() {
        if (modalkey === "showSchichtBearbeiten") {
            return (
                <ModalSchichtBearbeiten {...props}></ModalSchichtBearbeiten>
            )
        }
        else if(modalkey === "zusammenfassung") {
            return (
                <ModalZusammenfassung {...props}></ModalZusammenfassung>
            ) 
        } else if(modalkey === "tour") {
            return (
                <ModalTour {...props}></ModalTour>
            ) 
        } 
        return null
    }

        return (
            <>
             {dataModal()}
            </>
        );
    }
export default OpenModal