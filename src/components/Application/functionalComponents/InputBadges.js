import React from "react";
import InfoOverlay from "./InfoOverlay";
import {
    Badge
} from "reactstrap"

export default class InputBadges extends React.PureComponent {
    render() {
        return(
                        <>
                        { this.props.filter !== null && this.props.filter[this.props.title] ? 
                            <Badge color="primary" pill onClick={() => this.props.onClickFilter(this.props.title)}>{this.props.title}</Badge>
                        :
                            <Badge color="light" pill onClick={() => this.props.onClickFilter(this.props.title)}>{this.props.title}</Badge>
                        }
                        </>
        )
    }
}