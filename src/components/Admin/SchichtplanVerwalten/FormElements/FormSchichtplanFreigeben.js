import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import DateRangePickerExample from "../../SchichtplanErstellen/FormElements/DateRangePickerExample";
import InfoOverlay from "../../SchichtplanErstellen/FormElements/InfoOverlay";

export default class FormSchichtplanFreigeben extends React.PureComponent {

    render() {
        return(
            <>  
                <Row>
                    <Col xs={1} ></Col>
                    <Col xs={10} >
                        <p>Details</p>
                        <br/>
                        <InfoOverlay infotitle={"Kalenderwoche"} description={"Wenn Sie den Schichtplan für eine andere Woche freigeben möchten, tragen Sie die jeweilige Woche hier ein. Tragen Sie nichts ein, wird der Plan für die bisher eingetragene Woche freigegeben"}/>
                        <DateRangePickerExample {...this.props}/>  
                        <br/>
                    </Col>
                    <Col xs={1} ></Col>
                </Row>
            </>
        )
    }
}