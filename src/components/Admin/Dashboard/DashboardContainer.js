import React from "react";
import 'moment/locale/de';
import {
    Card,
    Col,
    CardTitle,
    Row,
    Container,
    CardBody,
  } from "reactstrap";
import _ from "lodash";
import { API, Auth } from "aws-amplify";
import Spinner from 'react-bootstrap/Spinner'


export default class DashboardContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fetchPlans: !0,
            modal: {},
        };
        this.setSingleState = this.setSingleState.bind(this);
        this.setMultiObjectState = this.setMultiObjectState.bind(this);
        this.setObjectState = this.setObjectState.bind(this);
        this.handleFetch = this.handleFetch.bind(this);
    }

    // Initiales Laden der Schichtpläne aus der Datenbank
    componentDidMount() {
    this.handleFetch(this.setSingleState)
    this.setSingleState("ShiftPlanIsActive", !1)
    }

    // Läd die Schichtpläne neu aus der Datenbank, wenn der Wert loading auf true geändert wurde.
    // Passiert, wenn zuvor ein Schichtplan geändert oder erstellt wurde
    // somit werden die Pläne local und in der Cloud syncron gehalten
    componentDidUpdate(prevProps, prevState) {
    if (prevState.fetchPlans !== this.state.fetchPlans) {
        this.handleFetch(this.setSingleState)
    }
    }

    // Funktion zum setzen eines einzelnen States. Setzt den State key auf den Wert val
    setSingleState(key, value) {
        this.setState(state => {
            return {
                [key] : state = value
            }
        })
    }

    // Funktion zum setzen eines State innerhalb eines Objectes. Setzt für das Object a den State b auf c
    setObjectState(target, key, value) {
        this.setState({[target]: {
        ...this.state[target],
        [key]: value
    }})
    }

    // Funktion zum setzen eines State innerhalb eines Objectes. Setzt für das Object a den State b auf c
    setMultiObjectState(target, key, value, key2, value2) {
        this.setState({[target]: {
        ...this.state[target],
        [key]: value,
        [key2]: value2
    }})
    } 

    handleFetch(setSingleState) {
        this.getPlansFromDB(this.setSingleState);
        this.getEmployeesFromDB(this.setSingleState);
        setSingleState("fetchPlans", !1);
    }
    async getPlansFromDB(setSingleState) {
        const apiName = 'api00f496d2'; // replace this with your api name.
        const path = '/schichtplan/employee-get'; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            headers: {
            Authorizer:`Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
          }
        };
        return await API.get(apiName, path, myInit)
         .then(response => {
            let plans = _.map(response.Items, item => {
                return {
                    id: item.SK["S"],
                    name: item.name["S"],
                    plan: JSON.parse(item.data["S"]),
                    schichtentag: item.schichtentag["N"]
                };
            });
            setSingleState("plans", plans);
            // Add your code here
            });
        }

    // Läd alle Mitarbeiter aus der Datenbank
    async getEmployeesFromDB(setSingleState) {
        const apiName = 'api00f496d2'; // replace this with your api name.
        const path = '/employee/getall'; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            headers: {
            Authorizer:`Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
          }}; 
  
    return await API.get(apiName, path, myInit)
     .then(response => {
      let employees = _.map(response.Items, item => {
        return {
            frei: item.frei["BOOL"],
            name: item.name["S"],
            aktiv: item.aktiv["BOOL"],
            email: item.email["S"],
            stundenlohn: item.stundenlohn["N"],
            zielmtleuro: item.zielmtleuro["N"],
            zielmtlh: item.zielmtlh["N"],
            ueberstunden: item.ueberstunden["BOOL"],
            id: item.SK["S"],
            erfahrung: item.erfahrung["S"],
            schichtenwoche: item.schichtenwoche["N"],
            position: item.position["S"]
        };
        });
        setSingleState("employees", employees)
        // Add your code here
     });
      };
    render() {
        return(
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
                    {this.state.employees ? this.state.employees.length : <Spinner animation="grow" variant="light"/>}
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
    }