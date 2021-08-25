import React from "react";
import 'moment/locale/de';
import {
    Card,
    Col,
    CardHeader,
    Row,
    CardBody,
  } from "reactstrap";

import _ from "lodash";
import Button from 'react-bootstrap/Button';
import { API, Auth } from "aws-amplify";

export default class ProfilContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fetchEmployee: !0,
        };
        this.setSingleState = this.setSingleState.bind(this);
        this.setMultiObjectState = this.setMultiObjectState.bind(this);
        this.setObjectState = this.setObjectState.bind(this);
        this.getUser = this.getUser.bind(this);
    }
          // Initiales Laden der Schichtpläne aus der Datenbank
          componentDidMount() {
            this.getUser(this.setSingleState)
            }
    
        // Läd die Schichtpläne neu aus der Datenbank, wenn der Wert loading auf true geändert wurde.
        // Passiert, wenn zuvor ein Schichtplan geändert oder erstellt wurde
        // somit werden die Pläne local und in der Cloud syncron gehalten
        componentDidUpdate(prevProps, prevState) {
        console.log(this.state);
        if (prevState.fetchEmployee !== this.state.fetchEmployee) {
            this.getUser(this.setSingleState)
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
        async getUser(setSingleState) {
            const apiName = 'api00f496d2'; // replace this with your api name.
            const path = '/employee/get'; //replace this with the path you have configured on your API
            const myInit = { // OPTIONAL
                headers: {
                Authorizer:`Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
              } // OPTIONAL
            };
            return await API.get(apiName, path, myInit)
             .then(response => {
                // Add your code here
                setSingleState("employee", response);
                setSingleState("fetchEmployee", !1)
                console.log(response);
                });
            };
  
    render() {
      return (
      <>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={
                            require("../../../assets/img/theme/team-4-800x800.jpg")
                              .default
                          }
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Einstellungen
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Chat
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <br/>
                <hr className="my-4" />
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                          <span className="heading">
                          {this.state.fetchEmployee ? <></>: <>{this.state.employee.Item.akutellerverdienst["N"]}</>}
                          </span>
                          <span className="description">Verdienst</span>
                        </div>
                        <div>
                          <span className="heading">
                          {this.state.fetchEmployee ? <></>: <>{this.state.employee.Item.akutellerverdienst["N"] / this.state.employee.Item.stundenlohn["N"]}</>}
                          </span>
                          <span className="description">gearbeitete Stunden</span>
                        </div>
                        <div>
                          <span className="heading">
                          {this.state.fetchEmployee ? <></>: <>{this.state.employee.Item.schichtenwoche["N"] * 4}</>}
                          </span>
                          <span className="description">voraussichtliche Schichten im Juli</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                    {this.state.fetchEmployee ? <></>: <>{this.state.employee.Item.name["S"]}</>}
                      <span className="font-weight-light"></span>
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Mitarbeiter:inn
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
      </>
    );
  };
  }
  