import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment, { isMoment } from "moment";
import { Cache, DataStore } from "aws-amplify";
import Joyride from 'react-joyride';
import * as _ from 'lodash';
import {
    Card,
    Col,
    CardTitle,
    Row,
    CardHeader,
    CardBody,
    Button,
    Container,
    Alert
  } from "reactstrap";

import { thunkUpdateProfile } from "../store/middleware/UpdateProfile";
import NotificationAlert from "react-notification-alert";
import { FetchFromDB } from "../store/middleware/FetchPlansFromDB";
import { FetchEmployees } from "../store/middleware/FetchEmployees";
import store from "../store";
import OpenModal from "./OpenModal";
import { thunkStartReport } from "../store/middleware/StartReport";
import { WARNING_INVALID_REPORT_INPUT } from "../constants/Alerts"; 
import InfoSidebar from "./Sidebar/InfoSidebar.js";
import { ONBOARDING_OVERVIEW_SHIFTPLAN, ONBOARDING_OVERVIEW_SHIFTRADE, ONBOARDING_OVERVIEW_TEAM } from "../constants/OnBoardingTexts.js";
import { Auth, Storage } from "aws-amplify";
import { isBoolean, isEmpty, isNumber, isObject, isString, isUndefined } from "lodash";
import getNumberOfEmployees from "../libs/getNumberOfEmployees.js";
import NumberOfEmployeesCard from "./NumberOfEmployeesCard";
import NumberOfTradesCard from "./NumberOfTradesCard";
import getNumberOfShifttrades from "../libs/getNumberOfShifttrades.js";
import ShiftplanActivitys from "./Newsfeed/NewsfeedContainer/NewsfeedContainer.js";
import EmployeesReport from "./EmployeesReport.js";
import getCompanyAccess from "../libs/getCompanyAccess";
import { resettingShiftplan, settingShiftplan } from "../reducers/Shiftplan";
import { resettingCurrentShiftplanIndex, settingCurrentShiftplanIndex } from "../reducers/currentShiftPlan";
import { resettingModal, settingModal } from "../reducers/modal";
import { resettingDisplayShiftplan } from "../reducers/display";
import { resettingShiftSlot } from "../reducers/ShiftSlot";


const AdminDashboardContainer = (props) => {
  const dispatch = useDispatch();
  const [currentShiftPlan, setCurrentShiftPlan] = useState(null);
  const [filter, setFilter] = useState({}); 
  const [filterIsActive, setFilterIsActive] = useState(!1);
  const [errMsg, setErrMsg] = useState({ InvalidReportInput: !1});
  const [employeesLength, setEmployeesLength] = useState(0);
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

  //REDUX-Filter für UI-Data
  const selectMeta = state => state.Meta;
  const selectPlans = state => state.DB.plans;
  const selectEmployees = state => state.DB.employees;
  const selectShiftplan = state => state.Shiftplan;
  const selectModal = state => state.modal;
  const selectDate = state => state.date;
  const selectReport = state => state.DB.report;
  const selectInfoSidebar = state => state.InfoSidebar;

  //REDUX-Listener für UI-Data
  const Meta = useSelector(selectMeta);
  const Plans = useSelector(selectPlans);
  const Employees = useSelector(selectEmployees);
  const Shiftplan = useSelector(selectShiftplan);
  const Modal = useSelector(selectModal);
  const Date = useSelector(selectDate);
  const startDate = useSelector(state => state?.date?.start?.startDate);
  const endDate = useSelector(state => state?.date?.ende?.endDate);
  const Report = useSelector(selectReport);
  const SidebarInfo = useSelector(selectInfoSidebar);
  const FreeTrial = useSelector(state => state?.Meta?.tenantCategorie?.trial)
  const PaymentDetails = useSelector(state => state?.Meta?.tenantCategorie?.paymentDetails)
  const NumberOfEmployees = getNumberOfEmployees(Employees);
  const NumberOfTrades = getNumberOfShifttrades(Shiftplan?.tauschanfrage)
  const newsFeed = useSelector(state => state?.Meta?.newsfeed)
  const showOverview = useSelector(state => state?.Meta?.onboarding?.overview)
  

  // Initiales laden der aktuellen Users
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    store.dispatch(FetchFromDB);
    store.dispatch(FetchEmployees);
    dispatch(resettingCurrentShiftplanIndex())
    dispatch(resettingShiftplan())
    dispatch(resettingShiftSlot())
    dispatch(resettingDisplayShiftplan())
  }, []);

  useEffect(() => {},[showOverview])

  useEffect(() => {
    if (Plans) {
      getThisWeeksShiftPlan(Plans);
    }
  }, [Plans]);

  useEffect((Date) => {
  }, [Date]);

  useEffect(() => {
      setEmployeesLength(getNumberOfEmployees(Employees))
  }, [Employees]);

  useEffect(() => {
    getCompanyAccessAsAdmin(Meta);
    const showOnboarding = _.isBoolean(showOverview) ? showOverview : false;
    setState({...state, run: showOnboarding})
    if(!isUndefined(FreeTrial) && !isUndefined(PaymentDetails)) {
        if(FreeTrial === false && PaymentDetails === false) {
          if(_.isBoolean(PaymentDetails)) {
            dispatch(settingModal("requiredPaymentDetails"))
          }
        }
    }
  }, [Meta]);

  useEffect(() => {
  }, [filter]);

  const getCompanyAccessAsAdmin = async () => {
    const access = await getCompanyAccess(Meta);
    console.log(access);
  }
  const getEmployeesReport = (modal) => {
    if( isUndefined(startDate) || isUndefined(endDate) || isEmpty(filter)) return setErrMsg({...errMsg, InvalidReportInput: !0})
    let reportConfig = {
      ...filter,
      start:  moment(startDate).format("l"), 
      ende: moment(endDate).format("l")
    }
    store.dispatch({type: "isFetchingReport"});
    store.dispatch(thunkStartReport(reportConfig));
    dispatch(resettingModal())
  };

  function handleOnboarding() {
    const state = store.getState();
    const overview = state?.Meta?.onboarding?.overview
    if (!isBoolean(overview)) return null;
    let meta = state?.Meta;
    meta.onboarding.overview = !overview;
    store.dispatch(thunkUpdateProfile(meta));
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
            {title}
          </span>
        </div>
      ),
      type: type,
      icon: "ni ni-bell-55",
      autoDismiss: 7
    };
    notificationAlert.current.notificationAlert(options);
    setErrMsg({...errMsg, [err]: !1})

  };
  // Untersucht, ob der Wert eines Modals auf auf true steht und gibt den zugehörigen Key zurück
  const getModalKey = (allmodals) => {
    return _.keys(allmodals)[0]
  };

  const setCurrentPlan = (currentShiftPlan) => {
    if (!isNumber(currentShiftPlan)) return null
    dispatch(settingCurrentShiftplanIndex(currentShiftPlan));
  }

  // Untersucht, ob der Wert eines Modals auf true steht und gibt den Wert true zurück
  const getModalTrue = (allmodals) => {
    let modals = Object.entries(allmodals).map(([key, value]) => {return value;});
    let truemodal = modals.includes(true);
    return truemodal;
  };
  
    const getThisWeeksShiftPlan = (Plans) => {
      var compareDate = moment(moment().format("l"), "DD.M.YYYY");
      Plans.forEach((plan, index) => {
        var startDate   = moment(plan.zeitraum.split(" - ")[0], "DD.MM.YYYY");
        var endDate     = moment(plan.zeitraum.split(" - ")[1], "DD.MM.YYYY");
        if ((compareDate.isBetween(startDate, endDate) || compareDate.isSame(startDate) || compareDate.isSame(endDate)) && plan.id.split("#").includes("Veröffentlicht")) {
          setCurrentShiftPlan(index);
          dispatch(settingShiftplan(Plans[index]))
        }
        if ((compareDate.isBetween(startDate, endDate) || compareDate.isSame(startDate) || compareDate.isSame(endDate)) && plan.id.split("#").includes("Freigeben")) {
          setCurrentShiftPlan(index);
          dispatch(settingShiftplan(Plans[index]))
        }
    });

    };

    const onFilter = (name) => {
      if(filter !== null && name in filter) {
        setFilter({
          ...filter,
          [name]: !filter[name]
        });
      } else {
        setFilter({
          ...filter,
          [name]: !0
        });
      }
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
            { errMsg.InvalidReportInput ? Notify("warning", WARNING_INVALID_REPORT_INPUT, "InvalidReportInput") : null}
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
                <Link to="/admin/schichtplan" tag={Link} onClick={() => setCurrentPlan(currentShiftPlan)}>
                  <NumberOfTradesCard NumberOfTrades={NumberOfTrades}/>
                  </Link>
                </Col>
              </Row>
              <Row>
                <ShiftplanActivitys newsfeed={newsFeed}/>
                  <EmployeesReport 
                  Employees={Employees}
                  Report={Report}
                  filter={filter}
                  filterIsActive={filterIsActive}
                  />
              </Row>
        </>
        <OpenModal
          show={Modal}
          plaene={Plans}
          EmployeesLength={employeesLength}
          plan={currentShiftPlan}
          checkTrue={getModalTrue}
          checkModalKey={getModalKey}
          filter={filter}
          onClickFilter={onFilter}
          getEmployeesReport={getEmployeesReport}
          ></OpenModal>
        <InfoSidebar
          sidebarInfo={SidebarInfo}/>
      </div>
);
}

export default AdminDashboardContainer;
