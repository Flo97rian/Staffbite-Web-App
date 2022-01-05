import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "../../../store";
import { getUser } from "../../../store/middleware/FetchUser";
import 'moment/locale/de';
import Joyride from 'react-joyride';
import {
    Card,
    Col,
    CardHeader,
    Row,
    CardBody,
  } from "reactstrap";
import Button from 'react-bootstrap/Button';
import { thunkUpdateEmployee } from "../../../store/middleware/UpdateEmployee";
import { ONBOARDING_EMPLOYEE_NAME, ONBOARDING_EMPLOYEE_PICTURE, ONBOARDING_EMPLOYEE_SCHICHTPLAN, ONBOARDING_EMPLOYEE_SHIFTS_PER_WEEK } from "../../../constants/OnBoardingTexts";

const ProfilContainer = (props) => {
  const [state, setState] = useState({
    run: !1,
    steps: [
      {
        target: '.card_profile_picture',
        locale: { 
          last: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>, 
         },
        content: ONBOARDING_EMPLOYEE_NAME,
        title: "Dein Profil"
      }
    ]
  })
  const { run, steps } = state;
  const selectUser = state => state.user

  const User = useSelector(selectUser);
    // Initiales laden der aktuellen Users
  useEffect(() => {
    store.dispatch(getUser)
  }, []);
  useEffect(() => {
    if(User) {
      let showProfile = User.onboarding.profile
      setState({...state, run: showProfile})
    }
  }, [User]);

  const handleOnboarding = () => {
    let user = store.getState().user;
    if (User) {
      user.onboarding.profile = !1;
      store.dispatch(thunkUpdateEmployee(user));
    }
  }
  return (
      <div className="pt-9">
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
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
              <Card className="card-profile shadow card_profile_picture">
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
                    <div className="col div_shifts_per_week">
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
                  <div className="text-center div_name">
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
      </div>
    );
  };

  export default ProfilContainer;
  