import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import 'moment/locale/de';
import { Link } from "react-router-dom";
import Joyride from 'react-joyride';
import {
    Card,
    Col,
    CardTitle,
    Row,
    CardBody
  } from "reactstrap";
import { FetchEmployeePlansFromDB } from "../../../store/middleware/FetchPlansForEmployees";
import { getUser } from "../../../store/middleware/FetchUser";
import store from "../../../store";
import { thunkUpdateEmployee } from "../../../store/middleware/UpdateEmployee";
import { ONBOARDING_EMPLOYEE_OVERVIEW_APPLICATIONS, ONBOARDING_EMPLOYEE_OVERVIEW_TRADE_SHIFT, ONBOARDING_EMPLOYEE_OVERVIEW_SHIFTPLAN } from "../../../constants/OnBoardingTexts"
import { FetchOrg } from "../../../store/middleware/FetchOrg";
import Timeline from "../../Admin/Dashboard/Timeline";


const DashboardContainer = (props) => {
  const [ActivePlan, setActivePlan] = useState(!1);
  const [userShiftCount, setUserShiftCount] = useState(0);
  const [state, setState] = useState({
    run: !1,
    steps: [
      {
        target: '.card_bewerbungen',
        locale: { 
          skip: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>, 
          next: <strong aria-label="skip">Nächster Schritt</strong>
         },
        content: ONBOARDING_EMPLOYEE_OVERVIEW_APPLICATIONS,
        title: "Einleitung"
      },
      {
        target: '.card_tauschanfragen',
        content: ONBOARDING_EMPLOYEE_OVERVIEW_TRADE_SHIFT,
        locale: { 
            skip: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>, 
            next: <strong aria-label="skip">Nächster Schritt</strong>,
            back: <strong aria-label="skip">Zurück</strong>
          },
        title: "Einleitung"
      },
      {
        target: '.card_aktuellerSchichtplan',
        content: ONBOARDING_EMPLOYEE_OVERVIEW_SHIFTPLAN,
        locale: { 
          next: <strong aria-label="skip">Nächster Schritt</strong>,
          back: <strong aria-label="skip">Zurück</strong>,
          last: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>
         },
        title: "Einleitung"
      }
    ]
  })
  const { run, steps } = state;

  //REDUX-Filter für UI-Data
  const selectMeta = state => state.Meta;
  const selectPlans = state => state.DB.plans;
  const selectUser = state => state.user;
  const selectShiftplan = state => state.Shiftplan;


  //REDUX-Listener für UI-Data
  const Meta = useSelector(selectMeta);
  const Plans = useSelector(selectPlans);
  const User = useSelector(selectUser);
  const Shiftplan = useSelector(selectShiftplan);


  // Initiales laden der aktuellen Users
  useEffect(() => {
    store.dispatch(FetchEmployeePlansFromDB);
    store.dispatch(getUser);
    store.dispatch(FetchOrg)
  }, []);


  useEffect(() => {
    if (Plans) {
      getThisWeeksShiftPlan(Plans);
    }
  }, [Plans]);

  useEffect(() => {
    if (User) {
      let showOverview = User.onboarding.overview
      setState({...state, run: showOverview})
    }
  }, [User]);

  useEffect(() => {
  }, [User]);

  useEffect(() => {
    function getCountUsersCurrentShifts (count = 0) {
      let bewerbungen = User.bewerbungen
  
      let ShiftCount = 0;
      if ( Shiftplan && User) {
        let Zeitraum = Shiftplan.zeitraum;
        if(Zeitraum in bewerbungen)
        ShiftCount = bewerbungen[Shiftplan.zeitraum].length
      }
      if(ShiftCount > 0 ) {count = ShiftCount}
      setUserShiftCount(count);
    }
    if (Plans !== undefined && User !== undefined) {
      getCountUsersCurrentShifts()
    }
  }, [Plans, Shiftplan, User])

  const handleOnboarding = () => {
    let user = store.getState().user;
    if(User) {
      user.onboarding.overview = !1;
      store.dispatch(thunkUpdateEmployee(user));
    }
  }
    function getThisWeeksShiftPlan () {
      var compareDate = moment(moment().format("l"), "DD.M.YYYY");
      Plans.forEach((plan, index) => {
        var startDate   = moment(plan.zeitraum.split(" - ")[0], "DD.MM.YYYY");
        var endDate     = moment(plan.zeitraum.split(" - ")[1], "DD.MM.YYYY");
        if ((compareDate.isBetween(startDate, endDate) || compareDate.isSame(startDate) || compareDate.isSame(endDate)) && plan.id.split("#").includes("Veröffentlicht")) {
          setActivePlan(!0);
          store.dispatch({type: "setShiftplan", payload: Plans[index]});
        } else if ((compareDate.isBetween(startDate, endDate) || compareDate.isSame(startDate) || compareDate.isSame(endDate)) && plan.id.split("#").includes("Freigeben")) {
          setActivePlan(!0);
          store.dispatch({type: "setShiftplan", payload: Plans[index]});
        }
      
    })}

        return (
          <div className="pt-8">
          {User !== !1 ? 
          <Joyride
          continuous={true}
          run={run}
          scrollToFirstStep={true}
          showProgress={true}
          showSkipButton={true}
          steps={steps}
          styles={{
            options: {
              zIndex: 10000,
            },
          }}
        />
        : 
        <></>
        }
              <Row>
                <Col md="12"  lg="6" xl="6">
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
            <Row className="card_aktuellerSchichtplan">
              <Col xs={3} className="mt-4">
                <h3 className="float-left pt-4 font-weight-bold text-lg">Neuste Aktivitäten</h3>
              </Col>
              <Col xs={9} className="mt-2">
              </Col>
            </Row>
            <Row className="text-center">
              <Col>
                <Card className="shadow card_aktuellerSchichtplan">
                  <CardBody>
                    <Timeline
                    meta={Meta}
                    >
                    </Timeline>
                  </CardBody>
                </Card>
              </Col>
              <Col>
              </Col>
            </Row>
        </div>
);
}

export default DashboardContainer;
