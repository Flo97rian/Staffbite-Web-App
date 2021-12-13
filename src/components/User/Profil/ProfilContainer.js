import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import store from "../../../store";
import { getUser } from "../../../store/middleware/FetchUser";
import 'moment/locale/de';
import {
    Card,
    Col,
    CardHeader,
    Row,
    CardBody,
  } from "reactstrap";
import Button from 'react-bootstrap/Button';

const ProfilContainer = (props) => {
  const selectUser = state => state.user

  const User = useSelector(selectUser);
    // Initiales laden der aktuellen Users
  useEffect(() => {
    store.dispatch(getUser)
  }, []);

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
                          height="200px"
                          width="300px"
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    {/* <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Einstellungen
                    </Button> */}
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
                          {User ? <>{User.schichtenwoche}</>: <></>}
                          </span>
                          <span className="description">voraussichtliche Schichten diese Woche</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                    {User ? <>{User.name}</>: <></>}
                      <span className="font-weight-light"></span>
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Mitarbeiter
                    </div>
                  </div>
                </CardBody>
              </Card>

            </Col>
      </>
    );
  };

  export default ProfilContainer;
  