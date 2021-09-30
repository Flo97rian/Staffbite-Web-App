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
import { FetchFromDB } from "../../../store/middleware/FetchPlansFromDB";
import { FetchEmployees } from "../../../store/middleware/FetchEmployees";
import Spinner from 'react-bootstrap/Spinner'
import store from "../../../store";
import SchichtenTabelle from "../SchichtplanVerwalten/SchichtplanListe/SchichtplanTabelle";


const DashboardContainer = (props) => {
  const [currentShiftPlan, setCurrentShiftPlan] = useState(null);

  //REDUX-Filter für UI-Data
  const selectPlans = state => state.DB.plans;
  const selectEmployees = state => state.DB.employees;

  //REDUX-Listener für UI-Data
  const Plans = useSelector(selectPlans);
  const Employees = useSelector(selectEmployees);

  // Initiales laden der aktuellen Users
  useEffect(() => {
    store.dispatch(FetchFromDB)
    store.dispatch(FetchEmployees)
  }, []);

  useEffect(() => {
    if (Plans) {
      getThisWeeksShiftPlan(Plans)
    }
  }, [Plans])

  const getShiftTradeCount = (Plans) => {
    let shiftTradeCount = 0
    Plans.forEach(plan => {
      let planTradeCount = plan.tauschanfrage.length
      shiftTradeCount += planTradeCount
    })
    return shiftTradeCount
  }

    const getThisWeeksShiftPlan = (Plans) => {
      var compareDate = moment(moment().format("L"), "DD.M.YYYY");
      Plans.forEach((plan, index) => {
        var startDate   = moment(plan.zeitraum.split(" - ")[0], "DD.MM.YYYY");
        var endDate     = moment(plan.zeitraum.split(" - ")[1], "DD.MM.YYYY");
        if (compareDate.isBetween(startDate, endDate) && plan.id.split("#").includes("Review")) {
          setCurrentShiftPlan(index);
        }
        if (compareDate.isBetween(startDate, endDate) && plan.id.split("#").includes("Freigeben")) {
          setCurrentShiftPlan(index);
        }
    })}
        return (
          <>
              <Row>
                <Col lg="6" xl="6">
                  <Card className="card-stats mb-4 mb-xl-0 shadow">
                      <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h4"
                            className="text-uppercase text-muted mb-4"
                          >
                            Mitarbeiter
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {Employees ? Object.keys(Employees).length : <Spinner animation="grow" variant="light"/>}
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
                <Col lg="6" xl="6">
                  <Card className="card-stats mb-4 mb-xl-0 shadow">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h4"
                            className="text-uppercase text-muted mb-4"
                          >
                            Tauschanfragen
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {Plans ? getShiftTradeCount(Plans) : <Spinner animation="grow" variant="light"/>}
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
            <Row>
              <Col xs={3}>
              <h3 className="float-left pt-5 font-weight-bold text-lg">aktueller Schichtplan</h3>
              </Col>
              <Col xs={9}>
              </Col>
              </Row>
            <Card className="shadow">
              <CardBody>
                <Row className="text-center" noGutters={true}></Row>
                { currentShiftPlan ?
                <SchichtenTabelle
                  plaene={Plans}
                  plan={currentShiftPlan}
                  bearbeiten={!0}
                >
                </SchichtenTabelle>
                :
                <></>
                }
                </CardBody>
            </Card>
        </>
);
}

export default DashboardContainer;
