// Button der 3 Mal belegt werden kann
// Button um einen erstellten Schichtplan zu auszuwählen
import React from "react";
import Button from 'react-bootstrap/Button';
import SchichtplanButton from "./SchichtplanButton";

export default class SchichtplanButtonSave extends React.PureComponent {
    render() {
        return (
            <>
                {this.props.new
                ? 
                <SchichtplanButton {...this.props}></SchichtplanButton>
                :
                <Button onClick={() => this.props.b3onClick(this.props.b3onClickVal)}>{this.props.b3titel}</Button> 
                }
            </>
        );
    }
}