import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import CalendarView from "./CalenderView";
import OpenModal from "./OpenModal";

const AdminCalendarContainer = () => {

    return (
        <>
            <Row className="mx-4">
                <Col>
                    <CalendarView/>
                </Col>
            </Row>
            <OpenModal/>
        </>
    )
}

export default AdminCalendarContainer;
