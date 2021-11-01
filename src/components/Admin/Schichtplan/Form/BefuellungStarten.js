import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import InfoOverlay from "../../../Application/functionalComponents/InfoOverlay";

export default class BefuellungStarten extends React.PureComponent {

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