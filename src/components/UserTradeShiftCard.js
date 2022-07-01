import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
    Card,
    CardBody,
    Row,
    CardTitle,
    Col
 } from "reactstrap";
const UserTradeShiftCard = () => {
    const EmployeeTrades = useSelector(state => (state.Shiftplan.tauschanfrage.filter(trade => trade.traderId === state.DB.employee.SK)).length || 0);
    return (
        <Link to="/user/schichtplan" tag={Link}>
            <Card className="card-stats mb-4 mb-xl-0 card_tauschanfragen">
            <CardBody>
                <Row>
                <div className="col">
                    <CardTitle
                    tag="h5"
                    className="text-uppercase text-muted mb-4"
                    >
                    Deine Tauschanfragen
                    <br/>
                    <small>aktuelle Woche</small>
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">
                    {EmployeeTrades}
                    </span>
                </div>
                <Col className="col-auto">
                    <div className="icon icon-shape bg-blue text-white rounded-circle shadow">
                    <i className="fas fa-comments" />
                    </div>
                </Col>
                </Row>
            </CardBody>
            </Card>
        </Link>
    )
}
export default UserTradeShiftCard;