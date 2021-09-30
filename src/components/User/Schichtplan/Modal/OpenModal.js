import React from "react";
import ModalSchichtBewerben from "./ModalSchichtBewerben";
import ModalSchichtTauschen from "./ModalTradeShift";


export default class OpenModal extends React.PureComponent {
    dataModal(e) {
        const modalkey = this.props.checkModalKey(e);
        const keytrue = this.props.checkTrue(this.props.show);
        if (modalkey === "applyIsActive") {
            return ( <ModalSchichtBewerben modalkey={modalkey} keytrue={keytrue} {...this.props}></ModalSchichtBewerben>
        )} else if (modalkey === "tradeShift"){
            return ( <ModalSchichtTauschen modalkey={modalkey} keytrue={keytrue} {...this.props}></ModalSchichtTauschen>
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