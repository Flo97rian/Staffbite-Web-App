import { useEffect, useState, useRef } from "react";
import {
    Col,
    Row,
    Button
  } from "reactstrap";
import Joyride from 'react-joyride';
import NotificationAlert from "react-notification-alert";
import MitarbeiterTabelle from "./EmployeesTable/EmployeesTable.js";
import OpenModal from "./OpenModal.js";
import store from "../store.js";
import { useSelector, useDispatch } from "react-redux";
import { thunkUpdateProfile } from "../store/middleware/UpdateProfile.js";
import { WARNING_INVALID_EMPLOYEE_EMAIL, WARNING_INVALID_EMPLOYEE_NAME, WARNING_MISSING_EMPLOYEE_POSITION } from "../constants/Alerts.js";
import InfoSidebar from "./Sidebar/InfoSidebar.js";
import { useLocation } from "react-router-dom";
import { ONBOARDING_TEAM_INVITE, ONBOARDING_TEAM_OVERVIEW } from "../constants/OnBoardingTexts.js";
import { resettingShiftplan } from "../reducers/Shiftplan.js";
import { resettingCurrentShiftplanIndex } from "../reducers/currentShiftPlan.js";
import { settingModal } from "../reducers/modal.js";
import { resettingDisplayShiftplan } from "../reducers/display.js";
import { resettingShiftSlot } from "../reducers/ShiftSlot.js";
import { resettingErrorMessages } from "../reducers/ErrorMessages.js";

const AdminEmployeesContainer = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    run: !1,
    steps: [
      {
        target: '.button_mitartbeitereinladen',
        showProgress: true,
        locale: { 
          skip: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>, 
          next: <strong aria-label="skip">Nächster Schritt</strong>
         },
        content: ONBOARDING_TEAM_INVITE,
        title: "Dein Team"
      },
      {
        target: '.card_mitarbeiterliste',
        content: ONBOARDING_TEAM_OVERVIEW,
        showProgress: true,
        locale: { 
            last: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>,
            back: <strong aria-label="skip">Zurück</strong>
          },
        title: "Dein Team"
      }
    ]
  })
  let notificationAlert = useRef(null);
  const location = useLocation();
  const mainContent = useRef()
  const { run, steps } = state;
    
  const ErrorMessages = {
    missingNewEmployeeName: WARNING_INVALID_EMPLOYEE_NAME,
    missingNewEmployeeEmail: WARNING_INVALID_EMPLOYEE_EMAIL,
    missingNewEmployeePosition: WARNING_MISSING_EMPLOYEE_POSITION,
  }

  const selectEmployees = state => state.DB.employees;
  const selectMeta = state => state.Meta;
  const selectInfoSidebar = state => state.InfoSidebar;

  const Employees = useSelector(selectEmployees);
  const Meta = useSelector(selectMeta);
  const SidebarInfo = useSelector(selectInfoSidebar);
  const ErrorMessage = useSelector(state => Object.keys(state.ErrorMessages).find(key => state.ErrorMessages[key] === true));

  // Initiales laden der aktuellen Users
  useEffect(() => {
    dispatch(resettingCurrentShiftplanIndex())
    dispatch(resettingShiftplan());
    dispatch(resettingShiftSlot())
    dispatch(resettingDisplayShiftplan())
  }, []);


    useEffect(() => {
      if (Meta) {
        let showTeam = Meta.onboarding.team
        setState({...state, run: showTeam})
      }
    }, [Meta]);

    useEffect(() => {
      console.log(ErrorMessage);
      if(ErrorMessage) {
        Notify("warning")
      }
    }, [ErrorMessage])
    useEffect(() => {
    }, [Employees]);
    
  const handleOnboarding = () => {
    let team = Meta.onboarding.team;
    let meta = Meta;
    meta.onboarding.team = !team;
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

  useEffect(() => {
    if(Meta && !Meta.onboarding.team) {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainContent.current.scrollTop = 0;
    }
  }, [location]);

        return(
          <div className="main-content px-4 mt-9" ref={mainContent}>
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
        <div className="rna-wrapper">
          <NotificationAlert ref={notificationAlert} />
        </div>
        <Row>
        <Col xs={3}>
        <h3 className="float-left pt-5 font-weight-bold text-lg">Team verwalten</h3>
        </Col>
        <Col xs={9}>
          <Button 
            name="showErstellen"
            className="float-right mt-4 ml-2 mr-0 button_mitartbeitereinladen"
            color="primary"
            onClick={() => dispatch(settingModal("showErstellen"))}
            >
              <p className="m-0 text-white">
                Mitarbeiter einladen
              </p>
            </Button>
            <Button 
              name="showErstellen"
              className="float-right mt-4 ml-2 mr-0 button_mitartbeitereinladen"
              color="primary"
              onClick={() => dispatch(settingModal("showEmployeesRoles"))}
              >
                <p className="m-0 text-white">
                  Rollen festlegen
                </p>
              </Button>
        </Col>
        </Row>
            <MitarbeiterTabelle/>
            <OpenModal/>
      <InfoSidebar
        sidebarInfo={SidebarInfo}/>
        </div>
        );
    }
export default AdminEmployeesContainer;
