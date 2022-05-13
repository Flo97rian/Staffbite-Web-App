import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import InfoOverlay from "./InfoOverlay";

export default class FormStartFilling extends React.PureComponent {

    render() {
        return(
            <>
            <form>
                <Row className="text-center">
                    <Col xs={6}>
                        <p>{this.props.shiftplan.zeitraum}</p>
                    </Col>
                    <Col xs={6}> 
                    <p>Standard</p>
                    </Col>
                </Row>
                </form>
            </>
        )
    }
}