import React from "react";
import ModalMitarbeiterErstellen from "../ModalAddEmployee";
import ModalMitarbeiterBearbeiten from "../ModalEditEmployee";
import ModalEditEmployee from "../ModalEditEmployee";
import { useSelector } from "react-redux"
import ModalEmployeesRoles from "../ModalEmployeesRoles";

const OpenModal = (props) => {
    const modal = useSelector((state) => state.modal);
    const modalkey = props.checkModalKey(modal);
    const keytrue = props.checkTrue(modal);

    const dataModal = (props) => {
        if (modalkey === "showErstellen") {
            return ( <ModalMitarbeiterErstellen modalkey={modalkey} keytrue={keytrue} {...props}></ModalMitarbeiterErstellen>
            )}
        else if (modalkey ==="showEmployeesRoles") {
            return (<ModalEmployeesRoles modalkey={modalkey} keytrue={keytrue} {...props}></ModalEmployeesRoles>)
        } else {
            return ( <ModalEditEmployee modalkey={modalkey} keytrue={keytrue} {...props}/>
            )}

    }
        return (
        <>
            {keytrue ? dataModal(props) : <></>}
        </>
        );
    }

    export default OpenModal; 