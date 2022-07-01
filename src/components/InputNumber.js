import React from "react";
import PropTypes from "prop-types";
import {
    Input
} from "reactstrap"
import InfoLabel from "./InfoLabel";

export default class InputNumber extends React.PureComponent {
    render() {
        return(
            <>
                <InfoLabel title={this.props.label} description={this.props.description}></InfoLabel>
                <Input type="number" min={0} className="form-control-alternative edit-event--description input-autosize form-control" name={this.props.name} value={this.props.value} placeholder={this.props.placeholder} defaultValue={this.props.placeholder} onChange={this.props.onChange}></Input>
            </>
        )
    }
}

InputNumber.propTypes = {
    value: PropTypes.number
}