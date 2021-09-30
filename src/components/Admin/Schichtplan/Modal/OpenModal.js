// Dieses Component ist der zentrale Handler zum öffnen von Modals

import React from "react";
import ModalSchichtplanErstellen from "./ModalSchichtplanErstellen"
import ModalSchichtImportBearbeiten from "./ModalSchichtImportBearbeiten";
import ModalSchichtHinzufuegen from "./ModalSchichtHinzufuegen";
import ModalSchichtAuswaehlen from "./ModalSchichtAuswaehlen"
import ModalSchichtplanFreigeben from "./ModalSchichtplanFreigeben"
import ModalBefuellungStarten from "./ModalBefuellungStarten"
import { ModalPrioSchicht } from "./ModalPrioSchicht";
import { useSelector } from "react-redux";


const OpenModal = (props) => {
    const modal = useSelector((state) => state.modal);
    const modalkey = props.checkModalKey(modal);
    const keytrue = props.checkTrue(modal);
    const dataModal = () => {
        if (modalkey === "showSchichtplanErstellen") {
            return ( <ModalSchichtplanErstellen modalkey={modalkey} keytrue={keytrue} {...props}></ModalSchichtplanErstellen>
        )} else if (modalkey === "showSchichtplanFreigeben"){
            return ( <ModalSchichtplanFreigeben modalkey={modalkey} keytrue={keytrue} {...props}></ModalSchichtplanFreigeben>
        )} else if (modalkey === "showSchichthinzufuegen"){
            return ( <ModalSchichtHinzufuegen modalkey={modalkey} keytrue={keytrue} {...props}></ModalSchichtHinzufuegen>
        )} else if (modalkey === "showBefuellungStarten") {
            return (<ModalBefuellungStarten modalkey={modalkey} keytrue={keytrue} {...props}></ModalBefuellungStarten>
        )} else if (modalkey === "prioIsActive"){
            return ( <ModalPrioSchicht modalkey={modalkey} keytrue={keytrue} {...props}></ModalPrioSchicht>
        )} else if (modalkey === "applyIsActive"){
            return ( <ModalSchichtAuswaehlen modalkey={modalkey} keytrue={keytrue} {...props}></ModalSchichtAuswaehlen>
        )} else {
            return (<ModalSchichtImportBearbeiten modalkey={modalkey} keytrue={keytrue} {...props}></ModalSchichtImportBearbeiten>
        )}
    }
        return (
        <>
            {keytrue ? dataModal() : <></>}
        </>
        );
    }
export default OpenModal