import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { Spinner } from "reactstrap";
import Chart from "chart.js";
import Joyride from 'react-joyride';
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

  // core components
import {
  chartOptions,
  parseOptions,
} from "./Form/charts.js";
import { thunkUpdateProfile } from "../../../store/middleware/UpdateProfile";
import NotificationAlert from "react-notification-alert";
import { FetchFromDB } from "../../../store/middleware/FetchPlansFromDB";
import { FetchEmployees } from "../../../store/middleware/FetchEmployees";
import Reporting from "./Form/Reporting";
import store from "../../../store";
import OpenModal from "./Modal/OpenModal";
import DashboardSchichtenTabelle from "./DashboardSchichtenTabelle.js";
import { thunkStartReport } from "../../../store/middleware/StartReport";
import { WARNING_INVALID_REPORT_INPUT } from "../../../constants/Alerts"; 
import InfoSidebar from "../../Sidebar/InfoSidebar.js";
import { ONBOARDING_OVERVIEW_SHIFTPLAN, ONBOARDING_OVERVIEW_SHIFTRADE, ONBOARDING_OVERVIEW_TEAM } from "../../../constants/OnBoardingTexts.js";
import { validMeta } from "../../Application/functionalComponents/ValidFunctions.js";
import NewsFeed from "./Form/NewsFeed.js";
import Timeline from "./Timeline.js";
import { Auth } from "aws-amplify";


const DashboardContainer = (props) => {
  const [currentShiftPlan, setCurrentShiftPlan] = useState(null);
  const [filter, setFilter] = useState(null);
  const [filterIsActive, setFilterIsActive] = useState(!1);
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

  //REDUX-Filter für UI-Data
  const selectMeta = state => state.Meta;
  const selectPlans = state => state.DB.plans;
  const selectEmployees = state => state.DB.employees;
  const selectShiftplan = state => state.Shiftplan;
  const selectModal = state => state.modal;
  const selectDate = state => state.date;
  const selectReport = state => state.DB.report;
  const selectLoadingReport = state => state.loadings.isFetchingReport;
  const selectInfoSidebar = state => state.InfoSidebar;

  //REDUX-Listener für UI-Data
  const Meta = useSelector(selectMeta);
  const Plans = useSelector(selectPlans);
  const Employees = useSelector(selectEmployees);
  const Shiftplan = useSelector(selectShiftplan);
  const Modal = useSelector(selectModal);
  const Date = useSelector(selectDate);
  const Report = useSelector(selectReport);
  const LoadingReport = useSelector(selectLoadingReport);
  const SidebarInfo = useSelector(selectInfoSidebar);

  // Initiales laden der aktuellen Users
  useEffect(() => {
    store.dispatch(FetchFromDB);
    store.dispatch(FetchEmployees);
    store.dispatch({ type: "ResetCurrentShiftPlan"})
    store.dispatch({ type: "resetShiftplan"})
    store.dispatch({ type: "ResetShiftSlot"})
    store.dispatch({ type: "stopShiftPlanIsActive"})
    store.dispatch({ type: "stopShiftPlanIsImported"})
  }, []);

  const handleFilterIsActive = (modal) => {
    if (Date !== undefined && Date.start !== undefined && filter !== null) {
      let start = moment(Date.start.startDate).format("l");
      let ende = moment(Date.ende.endDate).format("l");
      store.dispatch({type: "isFetchingReport"});
      store.dispatch(thunkStartReport({...filter, start: start, ende: ende}));
    } else {
      setErrMsg({...errMsg, InvalidReportInput: !0})
    }
    store.dispatch({type: "CLOSE", payload: modal});
  };

  useEffect(() => {
    if (Plans) {
      getThisWeeksShiftPlan(Plans);
    }
  }, [Plans]);

  useEffect((Date) => {
  }, [Date]);

  useEffect(() => {
    if (Meta) {
      let showOverview = Meta.onboarding.overview
      setState({...state, run: showOverview})
    }
    if(Meta) {
      if( "tenantCategorie" in Meta) {
        if(!Meta.tenantCategorie.trial && !Meta.tenantCategorie.PaymentDetails) {
          store.dispatch({type: "OPEN", payload: "requiredPaymentDetails"})
          }
        }
      }
  }, [Meta]);

  useEffect(() => {
  }, [filter]);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const getShiftTradeCount = () => {
    let shiftTradeCount = Shiftplan.tauschanfrage.length;
    return shiftTradeCount;
  };

  const handleOnboarding = () => {
    let overview = Meta.onboarding.overview;
    let meta = Meta;
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
    const modals = Object.entries(allmodals).map(([key, value]) =>  value ? key : null);
    const modalfilter = modals.filter((modal) => typeof modal === "string");
    const modal = modalfilter[0];
    return modal;
  };

  const setCurrentPlan = (currentShiftPlan) => {
    if (currentShiftPlan !== null) {
      store.dispatch({type: "setCurrentShiftPlan", payload: currentShiftPlan});
    }
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
          store.dispatch({type: "setShiftplan", payload: Plans[index]});
        }
        if ((compareDate.isBetween(startDate, endDate) || compareDate.isSame(startDate) || compareDate.isSame(endDate)) && plan.id.split("#").includes("Freigeben")) {
          setCurrentShiftPlan(index);
          store.dispatch({type: "setShiftplan", payload: Plans[index]});
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

    React.useEffect(() => {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainContent.current.scrollTop = 0;
    }, [location]);

    const handleResetReport = () => {
      setFilter(null);
      setFilterIsActive(!1);
      store.dispatch({type: "All/Report", payload: !1});
    };
        return (
          <div className="main-content mt-8 px-4" ref={mainContent}>
           {validMeta(Meta) ?
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
            {errMsg !== null && errMsg.InvalidReportInput ? 
            Notify("warning", WARNING_INVALID_REPORT_INPUT, "InvalidReportInput")
            :
            null}
          { !Employees && !Plans ? 
            <Row className="text-center mt-2">
              <Col className="mt-2" xs={12}>
                <Spinner animation="grow" variant="light"/>
              </Col>
            </Row>
            : 
          <>
              <Row className="pt-6">
              <div className="rna-wrapper">
                <NotificationAlert ref={notificationAlert} />
              </div>  
                <Col lg="6" xl="6">
                  <Link to="/admin/mitarbeiter" tag={Link}>
                  <Card className="card-stats mb-4 mb-xl-0 shadow card_mitarbeiter" to="admin/mitarbeiter">
                      <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h4"
                            className="text-uppercase text-muted mb-4"
                          >
                            Mitarbeiter
                            <br/>
                            <br/>
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
                </Link>
                </Col>
                <Col lg="6" xl="6">
                <Link to="/admin/schichtplan" tag={Link} onClick={() => setCurrentPlan(currentShiftPlan)}>
                  <Card className="card-stats mb-4 mb-xl-0 shadow card_tauschanfragen">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h4"
                            className="text-uppercase text-muted mb-4"
                          >
                            Tauschanfragen
                            <br/>
                            <small>aktuelle Woche</small>
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {Shiftplan ? Shiftplan.tauschanfrage.length : <>0</>}
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
                <Row>

                    <Col xs={3}>
                    <h3 className="float-left pt-5 font-weight-bold text-lg">Neuste Aktivitäten</h3>
                    </Col>
                    <Col xs="3">
                    </Col>
                    <Col xs="3">
                      <h3 className="float-left pt-5 font-weight-bold text-lg">Reporting</h3>
                      { LoadingReport ? <Spinner color="success" /> : <></>}
                    </Col>
                    <Col xs="3">
                    </Col>
                </Row>
                    <Row>
                      <Col>
                        <Card className="shadow card_aktuellerSchichtplan">
                          <CardBody>
                          <Timeline meta={Meta}></Timeline>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col>
                        <Card className="shadow card_aktuellerSchichtplan">
                            <CardBody>
                            <Reporting
                              loadingReport={LoadingReport}
                              Report={Report}
                              filterIsActive={filterIsActive}
                              filter={filter}
                              Employees={Employees}/>
                            </CardBody>
                          </Card>
                      </Col>
                    </Row>
        </>
        
      }
            {/* <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Bewerbungen
                    </h6>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Monat</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Woche</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card> */}
        <OpenModal
          show={Modal}
          plaene={Plans}
          Employees={Employees}
          plan={currentShiftPlan}
          checkTrue={getModalTrue}
          checkModalKey={getModalKey}
          filter={filter}
          onClickFilter={onFilter}
          handleFilterIsActive={handleFilterIsActive}
          ></OpenModal>
        <InfoSidebar
          sidebarInfo={SidebarInfo}/>
      </div>
);
}

export default DashboardContainer;
