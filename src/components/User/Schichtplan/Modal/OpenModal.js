import React from "react";
import ModalSchichtBewerben from "./ModalSchichtBewerben";


export default class OpenModal extends React.PureComponent {
    dataModal(e) {
        const modalkey = this.props.checkModalKey(e);
        const keytrue = this.props.checkTrue(this.props.show);
        if (modalkey === "applyIsActive") {
            return ( <ModalSchichtBewerben modalkey={modalkey} keytrue={keytrue} {...this.props}></ModalSchichtBewerben>
        )} else if (modalkey === "showSchichtplanFreigeben"){
            return ( <ModalSchichtBewerben modalkey={modalkey} keytrue={keytrue} {...this.props}></ModalSchichtBewerben>
        )} else if (modalkey === "showBefuellungStarten") {
            return (<ModalSchichtBewerben modalkey={modalkey} keytrue={keytrue} {...this.props}></ModalSchichtBewerben>
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