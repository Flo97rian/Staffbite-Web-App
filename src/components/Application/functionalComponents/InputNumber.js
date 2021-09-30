import React from "react";
import PropTypes from "prop-types";
import InfoOverlay from "./InfoOverlay";
import {
    Input
} from "reactstrap"

export default class InputNumber extends React.PureComponent {
    render() {
        return(
                        <>
                        {this.props.info ?
                        <>
                            <InfoOverlay infotitle={this.props.label} description={this.props.description}/>
                            <Input type="number" size="lg" className='bg-secondary' name={this.props.name} value={this.props.value} placeholder={this.props.placeholder} defaultValue={this.props.placeholder} onChange={this.props.onChange}></Input>
                        </>
                        : 
                        <>
                            <p className="mb-0">{this.props.label}</p>
                            <Input type="number" size="lg" className='bg-secondary' name={this.props.name} value={this.props.value} placeholder={this.props.placeholder} defaultValue={this.props.placeholder} onChange={this.props.onChange}></Input>
                        </>
                        }            
                </>
        )
    }
}

InputNumber.propTypes = {
    value: PropTypes.number
}