import React from "react";
import ModalSchichtBewerben from "../ModalUserApply";
import ModalSaveChanges from "../ModalSaveChanges";


export default class OpenModal extends React.PureComponent {
    dataModal(e) {
        const modalkey = this.props.checkModalKey(e);
        const keytrue = this.props.checkTrue(this.props.show);
        if (modalkey === "applyIsActive") {
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