import React from "react";
import NeuerSchichtplanTabelle from "./NeuerSchichtplanTabelle";
import ImportSchichtplanTabelle from "./ImportSchichtplanTabelle";

export default class SchichtplanAuswahl extends React.Component {
    filter(a, b) {
        if (a == !0 && b == !0) {
            return( <ImportSchichtplanTabelle {...this.props}></ImportSchichtplanTabelle>)
        } else if (a == !0 && b == !1) {
            return ( <NeuerSchichtplanTabelle {...this.props}></NeuerSchichtplanTabelle> 
        )} else if (a == !1 && b == !1) {
            return ( <></> 
        )}
    }
    render() {
        return (
            <>
                {this.filter(this.props.bearbeiten, this.props.import)}
            </>
        );
    }
}