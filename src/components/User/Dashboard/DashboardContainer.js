import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import 'moment/locale/de';

import {
    Card,
    CardHeader,
    Col,
    CardTitle,
    Row,
    Container,
    CardBody,
  } from "reactstrap";
import { FetchEmployeePlansFromDB } from "../../../store/middleware/FetchPlansForEmployees";
import { getUser } from "../../../store/middleware/FetchUser";
import store from "../../../store";
import SchichtenTabelle from "../Schichtplan/SchichtenTabelle";


const DashboardContainer = (props) => {
  const [ActivePlan, setActivePlan] = useState(!1);
  const [currentShiftPlan, setCurrentShiftPlan] = useState(null);

  //REDUX-Filter für UI-Data
  const selectPlans = state => state.DB.plans;
  const selectUser = state => state.DB.user


  //REDUX-Listener für UI-Data
  const Plans = useSelector(selectPlans);
  const User = useSelector(selectUser);


  // Initiales laden der aktuellen Users
  useEffect(() => {
    store.dispatch(FetchEmployeePlansFromDB)
    store.dispatch(getUser)
  }, []);

  useEffect(() => {
    if (Plans !== undefined && User !== undefined) {
      getThisWeeksShiftPlan()
    }
  }, [Plans])



    const getThisWeeksShiftPlan = () => {
      var compareDate = moment(moment().format("L"), "DD.M.YYYY");
      Plans.forEach((plan, index) => {
        var startDate   = moment(plan.zeitraum.split(" - ")[0], "DD.MM.YYYY");
        var endDate     = moment(plan.zeitraum.split(" - ")[1], "DD.MM.YYYY");
        if (compareDate.isBetween(startDate, endDate) && plan.id.split("#").includes("Review")) {
          setActivePlan(!0);
          setCurrentShiftPlan(index);
        }
        if (compareDate.isBetween(startDate, endDate) && plan.id.split("#").includes("Freigeben")) {
          setActivePlan(!0);
          setCurrentShiftPlan(index);
        }
    })}
        return (
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-4"
                          >
                            Dein Verdienst
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {User ? User.akutellerverdienst["N"] : <></>}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-4"
                          >
                            Deine Arbeitstunden
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {User ? User.akutellerverdienst["N"] : <></>}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="ni ni-calendar-grid-58" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-4"
                          >
                            Deine Tauschanfragen
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {User ? Number(User.akutellerverdienst["N"]) / Number(User.stundenlohn["N"]) : <></>}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-blue text-white rounded-circle shadow">
                            <i className="ni ni-chat-round" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
            <br/>
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">aktueller Schichtplan</h3>
              </CardHeader>
              <CardBody>
                <Row className="text-center" noGutters={true}></Row>
                { ActivePlan ?
                <SchichtenTabelle
                  plaene={Plans}
                  plan={currentShiftPlan}
                  bearbeiten={ActivePlan}
                  currentUser={User}
                >
                </SchichtenTabelle>
                :
                <></>
                }
                </CardBody>
            </Card>
          </Container>
);
}

export default DashboardContainer;
