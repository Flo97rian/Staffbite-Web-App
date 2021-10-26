import React from "react";
import PropTypes from "prop-types";
import InfoOverlay from "./InfoOverlay";
import {
    Input,
} from "reactstrap"

export default class InputString extends React.PureComponent {
    render() {
        return(
            <>
                            {this.props.info ?
                            <>
                                <InfoOverlay infotitle={this.props.label} description={this.props.description}/>
                                <Input type="text" size="lg" className='bg-secondary' label={this.props.label} name={this.props.name} value={this.props.value} defaultValue={this.props.placeholder} placeholder={this.props.placeholder} onChange={this.props.onChange}></Input>
                            </>
                            : 
                            <>
                                <p className="mb-0">{this.props.label}</p>
                                <Input type="text" size="lg" className='bg-secondary' label={this.props.label} name={this.props.name} value={this.props.value} defaultValue={this.props.placeholder} placeholder={this.props.placeholder} onChange={this.props.onChange}></Input>
                            </>
                            }            
                    </>
        )
    }
}

InputString.propTypes = {
    value: PropTypes.string
}