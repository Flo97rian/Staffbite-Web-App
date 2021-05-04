import React from "react";
import ModalMitarbeiterErstellen from "../Modal/ModalMitarbeiterErstellen";
import ModalMitarbeiterBearbeiten from "../Modal/ModalMitarbeiterBearbeiten";


export default class OpenModal extends React.PureComponent {
    dataModal(e) {
        const modalkey = this.props.checkModalKey(e);
        const keytrue = this.props.checkTrue(this.props.show);
        if (modalkey === "showErstellen") {
            return ( <ModalMitarbeiterErstellen modalkey={modalkey} keytrue={keytrue} {...this.props}></ModalMitarbeiterErstellen>
            )} else {
                const mitarbeiterdaten = this.props.handleFilter(modalkey);
            return ( <ModalMitarbeiterBearbeiten modalkey={modalkey} keytrue={keytrue} mitarbeiterdaten={mitarbeiterdaten} {...this.props}></ModalMitarbeiterBearbeiten>
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