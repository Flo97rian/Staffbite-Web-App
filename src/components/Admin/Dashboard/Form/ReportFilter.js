import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import InputBadges from "../../../Application/functionalComponents/InputBadges";
import Datepicker from "../../../Application/functionalComponents/DateRangePickerExample";
import InfoLabel from "../../../Application/functionalComponents/InfoLabel";

export default class ReportFilter extends React.PureComponent {
    render() {
        return(
            <>                
            <Row>
            <Col xs={1} ></Col>
            <Col xs={10} >
                <InfoLabel title={"Filterzeitraum"} description={"Tragen Sie hier ein, für welches Zeitraum die Ergebnisse gefiltert werden sollen"}></InfoLabel>
                <Datepicker size="lg" start="WochenStart" ende="WochenEnde" placeholderAnfang="Anfang" placeholderEnde="Ende" />  
                <br/>
                <InfoLabel title="Filter" description="Markieren Sie die auszuwählenden Filter"></InfoLabel>
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