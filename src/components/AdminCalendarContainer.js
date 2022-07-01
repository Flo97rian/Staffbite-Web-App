import { Row, Col } from "reactstrap";
import CalendarView from "./CalenderView";
import OpenModal from "./OpenModal";

const AdminCalendarContainer = () => {

    return (
        <>
            <Row className="mx-0">
                <Col className="m-0 p-0">
                    <CalendarView/>
                </Col>
            </Row>
            <OpenModal/>
        </>
    )
}

export default AdminCalendarContainer;
