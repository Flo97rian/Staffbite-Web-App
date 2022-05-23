import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
    Card,
    CardBody,
    Row,
    CardTitle,
    Col
 } from "reactstrap";
const UserApplicationsCard = () => {
    const EmployeeApplications = useSelector(state => state.DB.employee?.bewerbungen[state?.Shiftplan?.zeitraum] || 0);
    console.log(EmployeeApplications)
    return (
        <Link to="/user/bewerben" tag={Link}>
        <Card className="card-stats mb-4 mb-xl-0 card_bewerbungen">
        <CardBody>
            <Row>
            <div className="col">
                <CardTitle
                tag="h5"
                className="text-uppercase text-muted mb-4"
                >
                Du hast dich in den Plan eingetragen:
                <br/>
                <small>diese Woche</small>
                </CardTitle>
                <span className="h2 font-weight-bold mb-0">
                {EmployeeApplications}
                </span>
            </div>
            <Col className="col-auto">
                <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                <i className="fas fa-calendar" />
                </div>
            </Col>
            </Row>
        </CardBody>
        </Card>
        </Link>
    )
}
export default UserApplicationsCard;