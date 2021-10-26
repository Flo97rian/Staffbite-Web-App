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
                <Button color="primary" className="float-right mt-2 ml-2 mr-0" size="lg" onClick={() => this.props.onClick()}><p className="m-0 text-white">{this.props.title}</p></Button> 
                :
                <></>
                }
            </>
        );
    }
}