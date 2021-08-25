// Dieses Component ist der zentrale Handler zum öffnen von Modals

import React from "react";
import ModalSchichtplanErstellen from "./ModalSchichtplanErstellen"
import ModalSchichtplanImportieren from "./ModalSchichtplanImportieren";
import ModalSchichtplanImportBearbeiten from "./ModalSchichtplanImportBearbeiten";
import ModalSchichtHinzufuegen from "./ModalSchichtHinzufuegen";
import { ModalPrioSchicht } from "./ModalPrioSchicht";
import { useSelector } from "react-redux";


const OpenModal = (props) => {
    const modal = useSelector((state) => state.modal);
    const modalkey = props.checkModalKey(modal);
    const keytrue = props.checkTrue(modal);
    const dataModal = () => {
        if (modalkey === "showSchichtplanErstellen") {
            return ( <ModalSchichtplanErstellen modalkey={modalkey} keytrue={keytrue} {...props}></ModalSchichtplanErstellen>
        )} else if (modalkey === "showSchichtplanImportieren"){
            return ( <ModalSchichtplanImportieren modalkey={modalkey} keytrue={keytrue} {...props}></ModalSchichtplanImportieren>
        )} else if (modalkey === "showSchichthinzufuegen"){
            return ( <ModalSchichtHinzufuegen modalkey={modalkey} keytrue={keytrue} {...props}></ModalSchichtHinzufuegen>
        )} else if (modalkey === "prioIsActive"){
            return ( <ModalPrioSchicht modalkey={modalkey} keytrue={keytrue} {...props}></ModalPrioSchicht>
        )} else {
            return (<ModalSchichtplanImportBearbeiten modalkey={modalkey} keytrue={keytrue} {...props}></ModalSchichtplanImportBearbeiten>
        )}
    }
        return (
        <>
            {keytrue ? dataModal() : <></>}
        </>
        );
    }
export default OpenModal