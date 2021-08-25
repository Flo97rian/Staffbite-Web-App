import React from "react";
import SchichtplanButton from "./SchichtplanButton";

export default class SchichtplanButtonSave extends React.PureComponent {
    render() {
        return (
            <>
                {this.props.true
                ? 
                <SchichtplanButton {...this.props}></SchichtplanButton>
                :
                <></> 
                }
            </>
        );
    }
}