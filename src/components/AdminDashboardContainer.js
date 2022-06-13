import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Joyride from 'react-joyride';
import * as _ from 'lodash';
import {
    Col,
    Row,
  } from "reactstrap";

import { thunkUpdateProfile } from "../store/middleware/UpdateProfile";
import NotificationAlert from "react-notification-alert";
import store from "../store";
import OpenModal from "./OpenModal";
import { WARNING_INVALID_REPORT_INPUT, WARNING_MISSING_REPORT_DATE, WARNING_MISSING_REPORT_FILTER } from "../constants/Alerts"; 
import InfoSidebar from "./Sidebar/InfoSidebar.js";
import { ONBOARDING_OVERVIEW_SHIFTPLAN, ONBOARDING_OVERVIEW_SHIFTRADE, ONBOARDING_OVERVIEW_TEAM } from "../constants/OnBoardingTexts.js";
import { isUndefined } from "lodash";
import NumberOfEmployeesCard from "./NumberOfEmployeesCard";
import NumberOfTradesCard from "./NumberOfTradesCard";
import ShiftplanActivitys from "./Newsfeed/NewsfeedContainer/NewsfeedContainer.js";
import EmployeesReport from "./EmployeesReport.js";
import { resettingShiftplan, settingShiftplan } from "../reducers/Shiftplan";
import { resettingCurrentShiftplanIndex, settingCurrentShiftplanIndex } from "../reducers/currentShiftPlan";
import { settingModal } from "../reducers/modal";
import { resettingDisplayShiftplan } from "../reducers/display";
import { resettingShiftSlot } from "../reducers/ShiftSlot";
import { isThisWeek } from "date-fns";
import { resettingErrorMessages } from "../reducers/ErrorMessages";
import differenceInDays from 'date-fns/differenceInDays';
import toDate from "date-fns/toDate";
import parseISO from "date-fns/parseISO";


const AdminDashboardContainer = (props) => {
  
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState({ InvalidReportInput: !1});
  const [state, setState] = useState({
    run: !1,
    steps: [
      {
        target: '.card_mitarbeiter',
        locale: { 
          skip: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>, 
          next: <strong aria-label="skip">Nächster Schritt</strong>
         },
        content: ONBOARDING_OVERVIEW_TEAM,
        title: "Einleitung"
      },
      {
        target: '.card_tauschanfragen',
        content: ONBOARDING_OVERVIEW_SHIFTRADE,
        locale: { 
            skip: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>, 
            next: <strong aria-label="skip">Nächster Schritt</strong>,
            back: <strong aria-label="skip">Zurück</strong>
          },
        title: "Einleitung"
      },
      {
        target: '.card_aktuellerSchichtplan',
        content: ONBOARDING_OVERVIEW_SHIFTPLAN,
        locale: { 
          back: <strong aria-label="skip">Zurück</strong>,
          last: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>
         },
        title: "Einleitung"
      }
    ]
  })
  let notificationAlert = useRef(null)
  let mainContent = useRef("mainContent")
  let location = useLocation()
  const { run, steps } = state;

  const ErrorMessages = {
    missingReportFilter: WARNING_MISSING_REPORT_FILTER,
    missingReportDate: WARNING_MISSING_REPORT_DATE
  }
  //REDUX-Filter für UI-Data
  const selectMeta = state => state.Meta;
  const selectPlans = state => state.DB.plans;
  const selectInfoSidebar = state => state.InfoSidebar;

  //REDUX-Listener für UI-Data
  const Meta = useSelector(selectMeta);
  const Plans = useSelector(selectPlans);
  const SidebarInfo = useSelector(selectInfoSidebar);
  const PlansFetched = useSelector(state => state.DB.plansStatus === "fulfilled");
  const FreeTrial = useSelector(state => state?.Meta?.tenantCategorie?.trial || true);
  const PaymentDetails = useSelector(state => state?.Meta?.tenantCategorie?.paymentDetails || false)
  const NumberOfEmployees = useSelector(state => Object.keys(state.DB.employees).length);
  const NumberOfTrades = useSelector(state => state.Shiftplan.tauschanfrage.length);
  const newsFeed = useSelector(state => state?.Meta?.newsfeed)
  const showOverview = useSelector(state => state.Meta.onboarding.overview);
  const ErrorMessage = useSelector(state => Object.keys(state.ErrorMessages).find(key => state.ErrorMessages[key] === true));

  // Initiales laden der aktuellen Users
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    dispatch(resettingCurrentShiftplanIndex())
    dispatch(resettingShiftplan())
    dispatch(resettingShiftSlot())
    dispatch(resettingDisplayShiftplan())
  }, []);

  useEffect(() => {
    if (PlansFetched) {
      getThisWeeksShiftPlan(Plans);
    }
  }, [PlansFetched]);

  useEffect(() => {
    setState({...state, run: showOverview})
    if(!PaymentDetails) {
        const inTrail = Meta?.tenantCategorie?.registeredAt ? Meta.tenantCategorie.registeredAt : false;
        const trialNearEnd = (30 - differenceInDays(new Date(), parseISO(inTrail))) < 8;
        if(inTrail !== false && _.isBoolean(PaymentDetails) && trialNearEnd) {
            dispatch(settingModal("requiredPaymentDetails"))
          }
    }
  }, [Meta]);

  useEffect(() => {
    console.log(ErrorMessage);
    if(ErrorMessage) {
      Notify("warning")
    }
  }, [ErrorMessage])

  function handleOnboarding() {
    dispatch(thunkUpdateProfile({...Meta, onboarding: {...Meta.onboarding, overview: false}}));
  }

  function Notify (type, title, err) {
    let options = {
      place: "tc",
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            {" "}
          </span>
          <span data-notify="message">
            {ErrorMessages[ErrorMessage]}
          </span>
        </div>
      ),
      type: type,
      icon: "ni ni-bell-55",
      autoDismiss: 7
    };
    notificationAlert.current.notificationAlert(options);
    dispatch(resettingErrorMessages())

  };
  
    const getThisWeeksShiftPlan = (Plans) => {
      Plans.forEach((plan, index) => {
        const startDateNumbers = plan.zeitraum.split(" - ")[0].split(".");
        const startDate = new Date(startDateNumbers[2], startDateNumbers[1], startDateNumbers[0])
        if (isThisWeek(startDate) && plan.id.split("#").includes("Veröffentlicht")) {
          dispatch(settingCurrentShiftplanIndex(index))
          dispatch(settingShiftplan(Plans[index]))
        }
    });
    };

    useEffect(() => {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainContent.current.scrollTop = 0;
    }, [location]);

        return (
          <div className="main-content mt-8 px-4" ref={mainContent}>
          <Joyride
          continuous={true}
          run={run}
          scrollOffset={200}
          top
          showProgress={true}
          showSkipButton={true}
          steps={steps}
          styles={{
            options: {
              zIndex: 10000,
            },
          }}
        />
          <>
              <Row className="pt-6">
              <div className="rna-wrapper">
                <NotificationAlert ref={notificationAlert} />
              </div>  
                <Col lg="6" xl="6">
                  <Link to="/admin/mitarbeiter" tag={Link}>
                  <NumberOfEmployeesCard NumberOfEmployees={NumberOfEmployees}/>
                </Link>
                </Col>
                <Col lg="6" xl="6">
                <Link to="/admin/schichtplan" tag={Link}>
                  <NumberOfTradesCard NumberOfTrades={NumberOfTrades}/>
                  </Link>
                </Col>
              </Row>
              <Row>
                <ShiftplanActivitys newsfeed={newsFeed}/>
                  <EmployeesReport/>
              </Row>
        </>
        <OpenModal/>
        <InfoSidebar
          sidebarInfo={SidebarInfo}/>
      </div>
);
}

export default AdminDashboardContainer;
