import React from "react";
import ModalMitarbeiterErstellen from "../Modal/ModalMitarbeiterErstellen";
import ModalMitarbeiterBearbeiten from "../Modal/ModalMitarbeiterBearbeiten";
import { useSelector } from "react-redux"

const OpenModal = (props) => {
    const modal = useSelector((state) => state.modal);
    const modalkey = props.checkModalKey(modal);
    const keytrue = props.checkTrue(modal);

    const dataModal = (props) => {
        if (modalkey === "showErstellen") {
            return ( <ModalMitarbeiterErstellen modalkey={modalkey} keytrue={keytrue} {...props}></ModalMitarbeiterErstellen>
            )} else {
            return ( <ModalMitarbeiterBearbeiten modalkey={modalkey} keytrue={keytrue} {...props}></ModalMitarbeiterBearbeiten>
            )}

    }
        return (
        <>
            {keytrue ? dataModal(props) : <></>}
        </>
        );
    }

    export default OpenModal; 