import React from "react";
import PropTypes from "prop-types";
import Form from 'react-bootstrap/Form';
import InfoOverlay from "../../SchichtplanErstellen/FormElements/InfoOverlay";
import {
    Col,
    Row,
    Input
} from "reactstrap"
import classNames from "classnames";

export default class InputNumber extends React.PureComponent {
    render() {
        return(
            <>
                            {this.props.info ?
                            <>
                                <InfoOverlay infotitle={this.props.label} description={this.props.description}/>
                                <Input type="text" label={this.props.label} name={this.props.name} value={this.props.value} placeholder={this.props.placeholder} onChange={this.props.onChange}></Input>
                            </>
                            : 
                            <>
                                <p className="mb-0">{this.props.label}</p>
                                <Input type="text" label={this.props.label} name={this.props.name} value={this.props.value} placeholder={this.props.placeholder} onChange={this.props.onChange}></Input>
                            </>
                            }            
                    </>
        )
    }
}

InputNumber.propTypes = {
    value: PropTypes.number
}