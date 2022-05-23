import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import 'moment/locale/de';
import { Link } from "react-router-dom";
import Joyride from 'react-joyride';
import {
    Card,
    Col,
    CardTitle,
    Row,
    CardBody,
    Container
  } from "reactstrap";
import { FetchEmployeePlansFromDB } from "../store/middleware/FetchPlansForEmployees";
import { getUser } from "../store/middleware/FetchUser";
import store from "../store";
import { thunkUpdateEmployee } from "../store/middleware/UpdateEmployee";
import { ONBOARDING_EMPLOYEE_OVERVIEW_APPLICATIONS, ONBOARDING_EMPLOYEE_OVERVIEW_TRADE_SHIFT, ONBOARDING_EMPLOYEE_OVERVIEW_SHIFTPLAN } from "../constants/OnBoardingTexts"
import { thunkFetchOrg } from "../store/middleware/FetchOrg";
import ShiftplanActivitys from "./Newsfeed/NewsfeedContainer/NewsfeedContainer";
import { settingShiftplan } from "../reducers/Shiftplan";
import UserApplicationsCard from "./UserApplicationsCard";
import UserTradeShiftCard from "./UserTradeShiftCard";
import { isThisWeek } from "date-fns";
import { settingCurrentShiftplanIndex } from "../reducers/currentShiftPlan";


const UserDashboardContainer = (props) => {
  const dispatch = useDispatch();
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


  //REDUX-Listener für UI-Data
  const Meta = useSelector(selectMeta);
  const Plans = useSelector(selectPlans);
  const Employee = useSelector(state => state.DB.employee);
  const OnboardingOverview = useSelector(state => state.DB.employee?.onboarding?.overview || false);


  useEffect(() => {
    if (Plans) {
      getThisWeeksShiftPlan(Plans);
    }
  }, [Plans]);

  useEffect(() => {
    if (Employee) {
      setState({...state, run: OnboardingOverview})
    }
  }, [Employee]);

  const handleOnboarding = () => {
      dispatch(thunkUpdateEmployee({...Employee, onboarding: !OnboardingOverview}));
    }
    function getThisWeeksShiftPlan () {
      Plans.forEach((plan, index) => {
        const startDateNumbers = plan.zeitraum.split(" - ")[0].split(".");
        const startDate = new Date(startDateNumbers[2], startDateNumbers[1], startDateNumbers[0])
        if (isThisWeek(startDate) && plan.id.split("#").includes("Veröffentlicht")) {
          dispatch(settingCurrentShiftplanIndex(index))
          dispatch(settingShiftplan(Plans[index]))
        }
    });
  }

        return (
          <Container className="px-4">
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
              <Row className="mt-6">
                <Col md="12"  lg="6" xl="6">
                  <UserApplicationsCard/>
                </Col>
                <Col md="12" lg="6" xl="6">
                <UserTradeShiftCard/>
                </Col>
              </Row>
            <Row className="card_aktuellerSchichtplan">
              <Col>
                <ShiftplanActivitys/>
              </Col>
              <Col>
              </Col>
            </Row>
        </Container>
);
}

export default UserDashboardContainer;
