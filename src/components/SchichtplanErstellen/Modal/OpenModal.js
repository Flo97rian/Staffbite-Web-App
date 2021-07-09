// Dieses Component ist der zentrale Handler zum öffnen von Modals

import React from "react";
import ModalSchichtplanErstellen from "./ModalSchichtplanErstellen"
import ModalSchichtplanImportieren from "./ModalSchichtplanImportieren";
import ModalSchichtplanImportBearbeiten from "./ModalSchichtplanImportBearbeiten";
import ModalSchichtHinzufuegen from "./ModalSchichtHinzufuegen";


export default class OpenModal extends React.PureComponent {
    dataModal(e) {
        const modalkey = this.props.checkModalKey(e);
        console.log(modalkey);
        const keytrue = this.props.checkTrue(this.props.show);
        if (modalkey === "showSchichtplanErstellen") {
            return ( <ModalSchichtplanErstellen modalkey={modalkey} keytrue={keytrue} {...this.props}></ModalSchichtplanErstellen>
        )} else if (modalkey === "showSchichtplanImportieren"){
            return ( <ModalSchichtplanImportieren modalkey={modalkey} keytrue={keytrue} {...this.props}></ModalSchichtplanImportieren>
        )} else {
            return (<ModalSchichtplanImportBearbeiten modalkey={modalkey} keytrue={keytrue} {...this.props}></ModalSchichtplanImportBearbeiten>
        )}

    }
    render() {
        return (
        <>
            {this.props.checkTrue(this.props.show) ? this.dataModal(this.props.show) : <></>}
        </>
        );
    }
}