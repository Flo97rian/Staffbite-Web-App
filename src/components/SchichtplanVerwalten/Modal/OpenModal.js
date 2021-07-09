import React from "react";
import ModalSchichtplanFreigeben from "./ModalSchichtplanFreigeben";
import ModalSchichtplanAuswaehlen from "./ModalSchichtplanAuswaehlen";
import ModalBefuellungStarten from "./ModalBefuellungStarten";


export default class OpenModal extends React.PureComponent {
    dataModal(e) {
        const modalkey = this.props.checkModalKey(e);
        const keytrue = this.props.checkTrue(this.props.show);
        if (modalkey === "showSchichtplanAuswaehlen") {
            return ( <ModalSchichtplanAuswaehlen modalkey={modalkey} keytrue={keytrue} {...this.props}></ModalSchichtplanAuswaehlen>
        )} else if (modalkey === "showSchichtplanFreigeben"){
            return ( <ModalSchichtplanFreigeben modalkey={modalkey} keytrue={keytrue} {...this.props}></ModalSchichtplanFreigeben>
        )} else if (modalkey === "showBefuellungStarten") {
            return (<ModalBefuellungStarten modalkey={modalkey} keytrue={keytrue} {...this.props}></ModalBefuellungStarten>
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