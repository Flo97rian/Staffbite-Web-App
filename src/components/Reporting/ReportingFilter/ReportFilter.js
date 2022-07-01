import React from "react";
import {
    Col,
    Row,
    Badge
} from "reactstrap"
import Datepicker from "../../DatePicker";
import InfoLabel from "../../InfoLabel";
import { useSelector, useDispatch } from "react-redux";
import { resettingReportFilter, settingReportFilter } from "../../../reducers/userInput";

function ReportFilter () {
    const dispatch = useDispatch();
    const defaultFilter = ["bewerbungen", "schichten"];
    const userInputFilter = useSelector(state => state.userInput.reportFilter);
        return(
            <>                
            <Row>
            <Col xs={1} ></Col>
            <Col xs={10} >
                <InfoLabel title={"Filterzeitraum"} description={"Tragen Sie hier ein, für welches Zeitraum die Ergebnisse gefiltert werden sollen"}></InfoLabel>
                <Datepicker size="lg" start="WochenStart" ende="WochenEnde" placeholderAnfang="Anfang" placeholderEnde="Ende" />  
                <br/>
                <InfoLabel title="Filter" description="Markieren Sie die auszuwählenden Filter"></InfoLabel>
                {defaultFilter.map(filter => {
                    if(Object.keys(userInputFilter).includes(filter)) {
                        return <Badge color="primary" pill onClick={() => dispatch(resettingReportFilter(filter))}>{filter}</Badge>
                    }
                    return <Badge color="light" pill onClick={() => dispatch(settingReportFilter(filter))}>{filter}</Badge>    
                })}
                <br/>
                </Col>
                <Col xs={1} ></Col>
            </Row>
            </>
        )
}
export default ReportFilter;