import React from "react";
import {
    Button
} from "reactstrap"

export default class ButtonUpdateShiftPlan extends React.PureComponent {
    render() {
        return (
            <>
                {this.props.trigger
                ? 
                <Button color="primary" onClick={() => this.props.onClick()}>{this.props.title}</Button> 
                :
                <></>
                }
            </>
        );
    }
}