import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Spinner } from "reactstrap";
import { Line, Bar } from "react-chartjs-2";
import {
    Card,
    CardHeader,
    Col,
    CardTitle,
    Row,
    Container,
    CardBody,
  } from "reactstrap";

  // core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "./Form/charts.js";

import { FetchFromDB } from "../../../store/middleware/FetchPlansFromDB";
import { FetchEmployees } from "../../../store/middleware/FetchEmployees";
import Reporting from "./Form/Reporting";
import store from "../../../store";
import OpenModal from "./Modal/OpenModal";
import ImportSchichtplanTabelle from "../Schichtplan/Schichtplan/ImportSchichtplanTabelle"
import { thunkStartReport } from "../../../store/middleware/StartReport";


const DashboardContainer = (props) => {
  const [currentShiftPlan, setCurrentShiftPlan] = useState(null);
  const [filter, setFilter] = useState(null);
  const [filterIsActive, setFilterIsActive] = useState(!1)
  const [ShiftSwitch, setShiftSwitch] = useState(!1)
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  //REDUX-Filter für UI-Data
  const selectPlans = state => state.DB.plans;
  const selectEmployees = state => state.DB.employees;
  const selectModal = state => state.modal
  const selectDate = state => state.date
  const selectReport = state => state.DB.report
  const selectLoadingReport = state => state.loadings.isFetchingReport

  //REDUX-Listener für UI-Data
  const Plans = useSelector(selectPlans);
  const Employees = useSelector(selectEmployees);
  const Modal = useSelector(selectModal);
  const Date = useSelector(selectDate)
  const Report = useSelector(selectReport)
  const LoadingReport = useSelector(selectLoadingReport)

  // Initiales laden der aktuellen Users
  useEffect(() => {
    store.dispatch(FetchFromDB)
    store.dispatch(FetchEmployees)
  }, []);

  const handleFilterIsActive = (modal) => {
    store.dispatch({type: "isFetchingReport"})
    store.dispatch(thunkStartReport(filter));
    store.dispatch({type: "CLOSE", payload: modal})
  }

  useEffect(() => {
    if (Plans) {
      getThisWeeksShiftPlan(Plans)
    }
  }, [Plans])

  useEffect(() => {
      if(Date.start !== undefined && Date.ende !== undefined) {
        setFilter({
          ...filter,
          ["start"]: moment(Date.start.startDate).format("l"),
          ["ende"]: moment(Date.ende.endDate).format("l")
        })
      }
  }, [Date])

  useEffect(() => {
  }, [filter])

  const shiftChange = (plan) => {
    setShiftSwitch(plan);
  }
  const getShiftTradeCount = (Plans) => {
    let shiftTradeCount = 0
    Plans.forEach(plan => {
      let planTradeCount = plan.tauschanfrage.length
      shiftTradeCount += planTradeCount
    })
    return shiftTradeCount
  }
  // Untersucht, ob der Wert eines Modals auf auf true steht und gibt den zugehörigen Key zurück
  const getModalKey = (allmodals) => {
    const modals = Object.entries(allmodals).map(([key, value]) =>  value ? key : null);
    const modalfilter = modals.filter((modal) => typeof modal === "string");
    const modal = modalfilter[0];
    return modal;
  }
  // Untersucht, ob der Wert eines Modals auf true steht und gibt den Wert true zurück
  const getModalTrue = (allmodals) => {
    let modals = Object.entries(allmodals).map(([key, value]) => {return value})
    let truemodal = modals.includes(true)
    return truemodal
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

    const onFilter = (name) => {
      if(filter !== null && Object.keys(filter).includes(name)) {
        console.log(!filter[name])
        setFilter({
          ...filter,
          [name]: !filter[name]
        })
      } else {
        setFilter({
          ...filter,
          [name]: !0
        })
      }
    }
        return (
          <>
          { !Employees && !Plans ? 
            <Row className="text-center mt-2">
              <Col className="mt-2" xs={12}>
                <Spinner animation="grow" variant="light"/>
              </Col>
            </Row>
            : 
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
              { currentShiftPlan ?
                <>
                  <Row>
                    <Col xs={3}>
                    <h3 className="float-left pt-5 font-weight-bold text-lg">aktueller Schichtplan</h3>
                    </Col>
                    <Col xs={9}>
                    </Col>
                    </Row>
                  <Card className="shadow">
                    <CardBody>
                      <Row className="text-center" noGutters={true}>
                      <ImportSchichtplanTabelle
                        plaene={Plans}
                        plan={currentShiftPlan}
                        bearbeiten={!0}
                        employees={Employees}
                        onSwitch={shiftChange}
                        import={!0}
                      >
                      </ImportSchichtplanTabelle>
                      </Row>
                      </CardBody>
                  </Card>
                </>
              :
                <></>
              }
            <Row>
              <Col xs={3}>
              <h3 className="float-left pt-5 pr-2 font-weight-bold mr-2 text-lg">
                aktuelles Reporting
                { LoadingReport ? <Spinner color="success" /> : <></>}
              </h3>
              </Col>
              <Col xs={9}>
              </Col>
              </Row>
              <Reporting
              loadingReport={LoadingReport}
              Report={Report}
              filterIsActive={filterIsActive}
              filter={filter}
              Employees={Employees}/>
        </>
        
      }
        <CardBody>
          {/* Chart */}
          <div className="chart">
            <Line
              data={chartExample1[chartExample1Data]}
              options={chartExample1.options}
              getDatasetAtEvent={(e) => console.log(e)}
            />
          </div>
        </CardBody>
        <OpenModal
          show={Modal}
          plaene={Plans}
          plan={currentShiftPlan}
          checkTrue={getModalTrue}
          checkModalKey={getModalKey}
          filter={filter}
          onClickFilter={onFilter}
          handleFilterIsActive={handleFilterIsActive}
          ></OpenModal>
      </>
);
}

export default DashboardContainer;
