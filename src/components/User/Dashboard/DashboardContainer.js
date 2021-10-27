import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import 'moment/locale/de';
import { Link } from "react-router-dom";

import {
    Card,
    Col,
    CardTitle,
    Row,
    CardBody,
  } from "reactstrap";
import { FetchEmployeePlansFromDB } from "../../../store/middleware/FetchPlansForEmployees";
import { getUser } from "../../../store/middleware/FetchUser";
import store from "../../../store";
import DashboardSchichtenTabelle from "./DashboardTable";


const DashboardContainer = (props) => {
  const [ActivePlan, setActivePlan] = useState(!1);
  const [currentShiftPlan, setCurrentShiftPlan] = useState(null);
  const [userShiftCount, setUserShiftCount] = useState(0);

  //REDUX-Filter für UI-Data
  const selectPlans = state => state.DB.plans;
  const selectUser = state => state.user;
  const selectShiftplan = state => state.Shiftplan;


  //REDUX-Listener für UI-Data
  const Plans = useSelector(selectPlans);
  const User = useSelector(selectUser);
  const Shiftplan = useSelector(selectShiftplan);


  // Initiales laden der aktuellen Users
  useEffect(() => {
    store.dispatch(FetchEmployeePlansFromDB);
    store.dispatch(getUser);
  }, []);


  useEffect(() => {
    if (Plans) {
      getThisWeeksShiftPlan(Plans);
    }
  }, [Plans]);

  useEffect(() => {
    function getCountUsersCurrentShifts (count = 0) {
      let bewerbungen = User.bewerbungen
      let ShiftCount = 0;
      if ( Shiftplan.zeitraum in bewerbungen) {
        ShiftCount = bewerbungen[Shiftplan.zeitraum].length
      }
      if(ShiftCount > 0 ) {count = ShiftCount}
      setUserShiftCount(count);
    }
    if (Plans !== undefined && User !== undefined) {
      getCountUsersCurrentShifts()
    }
  }, [Plans, Shiftplan.zeitraum, User])

    function getThisWeeksShiftPlan () {
      var compareDate = moment(moment().format("l"), "DD.M.YYYY");
      Plans.forEach((plan, index) => {
        var startDate   = moment(plan.zeitraum.split(" - ")[0], "DD.MM.YYYY");
        var endDate     = moment(plan.zeitraum.split(" - ")[1], "DD.MM.YYYY");
        if ((compareDate.isBetween(startDate, endDate) || compareDate.isSame(startDate) || compareDate.isSame(endDate)) && plan.id.split("#").includes("Veröffentlicht")) {
          setActivePlan(!0);
          setCurrentShiftPlan(index);
          store.dispatch({type: "setShiftplan", payload: Plans[index]});
        }
        if ((compareDate.isBetween(startDate, endDate) || compareDate.isSame(startDate) || compareDate.isSame(endDate)) && plan.id.split("#").includes("Freigeben")) {
          setActivePlan(!0);
          setCurrentShiftPlan(index);
          store.dispatch({type: "setShiftplan", payload: Plans[index]});
        }
    })}

        return (
          <>
              <Row>
                <Col md="12"  lg="6" xl="6">
                <Link to="/user/bewerben" tag={Link}>
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-4"
                          >
                            Deine Bewerbungen
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {userShiftCount ? <>{userShiftCount}</> : <>0</>}
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
                </Col>
                <Col md="12" lg="6" xl="6">
                <Link to="/user/schichtplan" tag={Link}>
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
                          {User ? <>0</> : <>0</>}
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
                </Col>
              </Row>
            <Row >
              <Col xs={3} className="mt-4">
                <h3 className="float-left pt-4 font-weight-bold text-lg">aktueller Schichtplan</h3>
              </Col>
              <Col xs={9} className="mt-2">
              </Col>
            </Row>
                <Row className="text-center" noGutters={true}></Row>
                { ActivePlan && Shiftplan && User !== !1 ?
                <DashboardSchichtenTabelle
                  shiftplan={Shiftplan}
                  bearbeiten={ActivePlan}
                  currentUser={User}
                >
                </DashboardSchichtenTabelle>
                :
                <></>
                }
        </>
);
}

export default DashboardContainer;
