import React from "react";
import Form from 'react-bootstrap/Form';
import InfoOverlay from "./InfoOverlay";
import {
    Col,
    Row,
    Input
} from "reactstrap"

export default class InputTime extends React.PureComponent {
    render() {
        return(
            <>
                {this.props.info ?
                <>
                    <InfoOverlay infotitle={this.props.label} description={this.props.description}/>
                    <Input type="time" name={this.props.name} value={this.props.value} placeholder={this.props.placeholder} onChange={this.props.onChange}></Input>
                </>
                : 
                <>
                    <p className="mb-0">{this.props.label}</p>
                    <Input type="time" name={this.props.name} value={this.props.value} placeholder={this.props.placeholder} onChange={this.props.onChange}></Input>
                </>
                }             
        </>
        )
    }
}