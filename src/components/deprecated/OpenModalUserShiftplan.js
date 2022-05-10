import React from "react";
import ModalSchichtTauschen from "../ModalTradeShift";
import ModalSaveChanges from "../ModalSaveChanges";
import ModalSchichtBewerben from "../ModalUserApply";


export default class OpenModal extends React.PureComponent {
    dataModal(e) {
        const modalkey = this.props.checkModalKey(e);
        const keytrue = this.props.checkTrue(this.props.show);
        if (modalkey === "tradeShift") {
            return ( <ModalSchichtTauschen modalkey={modalkey} keytrue={keytrue} {...this.props}></ModalSchichtTauschen>
        )} else if (modalkey === "applyIsActive") {
            return ( <ModalSchichtBewerben modalkey={modalkey} keytrue={keytrue} {...this.props}></ModalSchichtBewerben>
        )} else if (modalkey === "saveChanges") {
            return (<ModalSaveChanges modalkey={modalkey} keytrue={keytrue} {...this.props}></ModalSaveChanges>
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