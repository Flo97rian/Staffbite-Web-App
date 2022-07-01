import {
    Row,
    Col,
    Badge,
    Button
  } from "reactstrap";
  import ReportingElement from "../ReportingElement/ReportElement";
import ReportingHeader from "../ReportingHeader/ReportingHeader";
import { useSelector, useDispatch } from "react-redux";
import { settingModal } from "../../../reducers/modal";

const Reporting = (props) => {
    const dispatch = useDispatch();
    const FetchedReport = useSelector(state => state.DB.reportStatus === "fulfilled") 
    const Report = useSelector(state => state.DB.report);
    const ReportFilter = useSelector(state => state.userInput.reportFilter);
    const Employees = useSelector(state => state.DB.employees);
    const startDate = useSelector(state => state.date.start);
    const endDate = useSelector(state => state.date.end);
    var hasFilterBewerbungen = Object.keys(ReportFilter).includes("bewerbungen");
    var hasFilterSchichten = Object.keys(ReportFilter).includes("schichten");
    if(!FetchedReport)
        return (
        <Row className="text-center">
            <Col xs={4} className="mt-4">
                <Button color="primary" className="fas fa-filter" onClick={() =>  dispatch(settingModal("showReportFilter"))}> Filter</Button>
            </Col>
            <Col xs={4} className="mt-2 p-3">
                <p className="mt-3 font-weight-bold">Zeitraum</p>
            </Col>
            <Col xs={4} className="mt-2 p-3">
                <p className="mt-3 font-weight-bold">Auswahl</p>
            </Col>
        </Row>
        )
    return (
        <>
            <Row className="text-center">
                <Col xs={4} className="mt-4">
                <Button color="primary" className="fas fa-filter" onClick={() =>  dispatch(settingModal("showReportFilter"))}> Filter</Button>
                </Col>
                <Col xs={4} className="mt-2 p-3">
                    <p className="font-weight-bold">Zeitraum</p>
                    <p>{startDate + " - " + endDate}</p>
                </Col>
                <Col xs={4} className="mt-2 p-3">
                    <p className="font-weight-bold">Auswahl</p>
                    {hasFilterBewerbungen ? 
                        <Badge color="primary" pill>Bewerbungen</Badge>
                    :
                      <></>
                    }
                    {hasFilterSchichten ? 
                        <Badge color="primary" pill>Schichten</Badge>
                    :
                      <></>
                    }
                    
                </Col>
                </Row>
                <ReportingHeader
                hasFilterBewerbungen={hasFilterBewerbungen}
                hasFilterSchichten={hasFilterSchichten}
                />
                        {Object.keys(Employees).map((employee, index) => 
                            <ReportingElement
                            key={index}
                            Employees={Employees}
                            employee={employee}
                            Report={Report}
                            ></ReportingElement>
                        )}
                </>
        );
    }
export default Reporting;