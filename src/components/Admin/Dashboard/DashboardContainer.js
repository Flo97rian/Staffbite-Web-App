import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import 'moment/locale/de';

import {
    Card,
    Col,
    CardTitle,
    Row,
    Container,
    CardBody,
  } from "reactstrap";
import { FetchFromDB } from "../../../store/middleware/FetchPlansFromDB";
import { FetchEmployees } from "../../../store/middleware/FetchEmployees";
import Spinner from 'react-bootstrap/Spinner'
import store from "../../../store";


const DashboardContainer = (props) => {

  //REDUX-Filter für UI-Data
  const selectCurrentShiftPlan = state => state.currentShiftPlan.currentShiftPlan;
  const selectPlans = state => state.DB.plans;
  const selectModal = state => state.modal;
  const selectEmployees = state => state.DB.employees;

  //REDUX-Listener für UI-Data
  const currentShiftPlan = useSelector(selectCurrentShiftPlan);
  const Plans = useSelector(selectPlans);
  const Modal = useSelector(selectModal);
  const Employees = useSelector(selectEmployees);

  // Initiales laden der aktuellen Users
  useEffect(() => {
    store.dispatch(FetchFromDB)
    store.dispatch(FetchEmployees)
  }, []);



    const bla = () => {
      var compareDate = moment(moment().format("L"), "DD.M.YYYY");  
      var startDate   = moment(Plans[currentShiftPlan].zeitraum.split(" - ")[0], "DD.MM.YYYY");
      var endDate     = moment(Plans[currentShiftPlan].zeitraum.split(" - ")[1], "DD.MM.YYYY");
      console.log(compareDate.isBetween(startDate, endDate)) //false in this case
    }
        return (
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            aktive Mitarbeiter:innen
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                              {Employees ? Employees.length : <Spinner animation="grow" variant="light"/>}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">diesen Monat</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            offene Schichten
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">2,356</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="ni ni-calendar-grid-58" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-danger mr-2">
                          <i className="fas fa-arrow-down" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">diese Woche</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            offene Tauschanfragen
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">924</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-warning mr-2">
                          <i className="fas fa-arrow-down" /> 1.10%
                        </span>{" "}
                        <span className="text-nowrap">Since yesterday</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Performance
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">49,65%</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-percent" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-arrow-up" /> 12%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
);
}

export default DashboardContainer;
