import React from "react";
import { useSelector } from "react-redux";
import ModalSchichtplanFreigeben from "./ModalSchichtplanFreigeben";
import ModalSchichtplanAuswaehlen from "./ModalSchichtplanAuswaehlen";
import ModalBefuellungStarten from "./ModalBefuellungStarten";
import ModalSchichtAuswaehlen from "./ModalSchichtAuswaehlen";


const OpenModal = (props) => {
    const modal = useSelector((state) => state.modal);
    const modalkey = props.checkModalKey(modal);
    const keytrue = props.checkTrue(modal);
    const dataModal = () => {
        if (modalkey === "showSchichtplanAuswaehlen") {
            return ( <ModalSchichtplanAuswaehlen modalkey={modalkey} keytrue={keytrue} {...props}></ModalSchichtplanAuswaehlen>
        )} else if (modalkey === "showSchichtplanFreigeben"){
            return ( <ModalSchichtplanFreigeben modalkey={modalkey} keytrue={keytrue} {...props}></ModalSchichtplanFreigeben>
        )} else if (modalkey === "showBefuellungStarten") {
            return (<ModalBefuellungStarten modalkey={modalkey} keytrue={keytrue} {...props}></ModalBefuellungStarten>
        )} else if (modalkey === "applyIsActive"){
            return (<ModalSchichtAuswaehlen modalkey={modalkey} keytrue={keytrue} {...props}></ModalSchichtAuswaehlen>
        )}
    }
        return (
        <>
            {keytrue ? dataModal() : <></>}
        </>
        );
    }
export default OpenModal