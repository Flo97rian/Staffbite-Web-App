import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import InputBadges from "../../../Application/functionalComponents/InputBadges";
import InfoOverlay from "../../../Application/functionalComponents/InfoOverlay";
import Datepicker from "../../../Application/functionalComponents/DateRangePickerExample";

export default class ReportFilter extends React.PureComponent {
    render() {
        return(
            <>                
            <Row>
            <Col xs={1} ></Col>
            <Col xs={10} >
                <InfoOverlay infotitle="Filterzeitraum" description="Tragen Sie hier ein, für welches Zeitraum die Ergebnisse gefiltert werden sollen"/>
                <Datepicker size="lg" start="WochenStart" ende="WochenEnde" placeholderAnfang="Anfang" placeholderEnde="Ende" />  
                <br/>
                <InfoOverlay infotitle="Filter" description="Markieren Sie die auszuwählenden Filter"/>
                <InputBadges title="bewerbungen" {...this.props}></InputBadges>
                <InputBadges title="schichten"  {...this.props}></InputBadges>
                <br/>
                </Col>
                <Col xs={1} ></Col>
            </Row>
            </>
        )
    }
}