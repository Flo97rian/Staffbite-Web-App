import React, { useEffect, useState, useRef } from "react";
import {
    Col,
    Row,
  } from "reactstrap";
import Spinner from 'react-bootstrap/Spinner';
import Joyride from 'react-joyride';
import NotificationAlert from "react-notification-alert";
import MitarbeiterTabelle from "../EmployeesTable/EmployeesTable.js";
import ButtonMitarbeiterErstellen from "../Admin/MitarbeiterVerwalten/Modal/ButtonMitarbeiterErstellen.js";
import OpenModal from "../Admin/MitarbeiterVerwalten/Modal/OpenModal.js";
import { thunkRegisterEmployee } from "../../store/middleware/RegisterEmployee";
import { FetchEmployees } from "../../store/middleware/FetchEmployees.js";
import { FetchOrg } from "../../store/middleware/FetchOrg";
import store from "../../store.js";
import { useSelector } from "react-redux";
import { thunkDeleteEmployee } from "../../store/middleware/DeleteEmployee.js";
import { thunkUpdateEmployee } from "../../store/middleware/UpdateEmployee.js";
import { thunkUpdateProfile } from "../../store/middleware/UpdateProfile.js";
import employeeStates from "../Application/defaults/EmployeeDefault.js";
import { Employee } from "../Admin/MitarbeiterVerwalten/processing/Employee.js";
import { WARNING_MISSING_EMPLOYEE_DETAILS } from "../../constants/Alerts.js";
import InfoSidebar from "../Sidebar/InfoSidebar.js";
import { useLocation } from "react-router-dom";
import { ONBOARDING_TEAM_INVITE, ONBOARDING_TEAM_OVERVIEW } from "../../constants/OnBoardingTexts.js";
import { validMeta } from "../Application/functionalComponents/ValidFunctions.js";
import UserDashboard from "../../views/MainViews/User/Dashboard.js";
import ButtonEmployeesRoles from "../ButtonEmployeesRoles.js";
import * as _ from "lodash";

const EmployeesContainerAdmin = (props) => {
  const [userInput, setUserInput] = useState(employeeStates);
  const [showPositionHinzufuegen, setShowPositionHinzufuegen] = useState(!1);
  const [position, setPosition] = useState();
  const [errMsg, setErrMsg] = useState({InvalidInputForCreation: !1})
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
    
  const selectEmployees = state => state.DB.employees;
  const selectModal = state => state.modal;
  const selectMeta = state => state.Meta;
  const selectInfoSidebar = state => state.InfoSidebar;

  const Employees = useSelector(selectEmployees);
  const Modal = useSelector(selectModal);
  const Meta = useSelector(selectMeta);
  const SidebarInfo = useSelector(selectInfoSidebar);
  const Positions = useSelector(state => state?.Meta?.schichten);

  // Initiales laden der aktuellen Users
  useEffect(() => {
    store.dispatch(FetchEmployees);
    store.dispatch(FetchOrg);
    store.dispatch({ type: "ResetCurrentShiftPlan"})
    store.dispatch({ type: "resetShiftplan"})
    store.dispatch({ type: "ResetShiftSlot"})
    store.dispatch({ type: "stopShiftPlanIsActive"})
    store.dispatch({ type: "stopShiftPlanIsImported"})
  }, []);

    // Initiales laden der aktuellen Users
    useEffect(() => {
    }, [userInput]);

    useEffect(() => {
      if (Meta) {
        let showTeam = Meta.onboarding.team
        setState({...state, run: showTeam})
      }
    }, [Meta]);
    useEffect(() => {
    }, [Employees]);
    // Filtert auf Basis der Id, die zugehörigen Mitarbeiterdaten
    const handleFilter = (idToSearch) => {
      const data = Employees[idToSearch];
      return data;
  };
  const handleOnboarding = () => {
    let team = Meta.onboarding.team;
    let meta = Meta;
    meta.onboarding.team = !team;
    store.dispatch(thunkUpdateProfile(meta));
  }
 // Handling von Userinputs
 const handleInputChange = (event) => {
    const key = event.target.name;
    const val = stateSwitch(event.target.value, event);
    setUserInput({...userInput, [key]: val }) ;
  };
   // Handling von Userinputs
 const handlePositionChange = (event) => {
  const val = event.target.value;
  setPosition(val);
};

 // Überprüfung von Userinputs, ob der Input vom Typ Switch ist
 const stateSwitch = (value, event) => {
  if (value !== "on") return value;
    const state = handleInputSwitch(event);
    return state;
  };
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
  // Diese Funktion ändert den Wert eines Switches, je nach userinput
  const handleInputSwitch = (event) => {
    if (event.target.checked === !1) return !1;
      return !0;
  };

  // Untersucht, ob der Wert eines Modals auf auf true steht und gibt den zugehörigen Key zurück
  const getModalKey = (allmodals) => {
    const modals = Object.entries(allmodals).map(([key, value]) =>  value ? key : null);
    const modalfilter = modals.filter((modal) => typeof modal === "string");
    const modal = modalfilter[0];
    return modal;
  };

  // Untersucht, ob der Wert eines Modals auf true steht und gibt den Wert true zurück
  const getModalTrue = (e) => {
    const modals = Object.entries(e).map(([key, value]) => {return value;});
    const truemodal = modals.includes(true);
    return truemodal;
  };

  const handleSetPositions = (item) => {
    let copyUserInput = {...userInput};
    if ("position" in copyUserInput) {
      copyUserInput.position = [...copyUserInput.position, item];
    } else if (!("position" in copyUserInput)) {
      copyUserInput["position"] = [item];
    }
    else {
      copyUserInput.position.push(item);
    }
    setUserInput(copyUserInput);
  };
  const handleRemovePositions = (item) => {
    let copyUserInput = {...userInput};
    copyUserInput.position = copyUserInput.position.filter(element => element !== item);
    setUserInput({...copyUserInput});
  };
  // Handling des Löschens von Mitarbeitern
  const handleDelete = (employeeId) => {
    store.dispatch(thunkDeleteEmployee(employeeId));
    store.dispatch({type: "CLOSE", payload: employeeId});
  };

  const handleEmployeeUpdate = (employee) => {
    let updatedEmployee = mergeEmployeeDetails(employee, userInput);
    updatedEmployee = {...updatedEmployee, onboarding: Meta.onboarding};
    store.dispatch(thunkUpdateEmployee(updatedEmployee));
    let copyMeta = Meta;
    if (userInput.position !== Meta.schichten) {
      userInput.position.forEach( pos => {
        if (!Meta.schichten.includes(pos)) {
          copyMeta.schichten.push(pos);
        }
      });
      store.dispatch(thunkUpdateProfile(copyMeta));
    }
    store.dispatch({type: "CLOSE", payload: employee["id"]});
  };

  const mergeEmployeeDetails = (employee, newDetails) => {
    const NewEmployeeDetails = employee;
    const keys = Object.keys(newDetails);
    keys.forEach(element => { NewEmployeeDetails[element] = newDetails[element];});
    return NewEmployeeDetails;
  };

const handlePositionHinzufuegen = () => {
  setShowPositionHinzufuegen(!showPositionHinzufuegen);
};

const handlePositionHinzufuegenClose = () => {
  setShowPositionHinzufuegen(!showPositionHinzufuegen);
};

const handlePositionErstellen = () => {
  let copyUserInput = {...userInput};
  if ("position" in copyUserInput) {
    if(!copyUserInput.position.includes(position)) {
      copyUserInput.position = [...copyUserInput.position, position];
    }
  } else if (!("position" in copyUserInput)) {
    copyUserInput["position"] = [position];
  }
  else {
    copyUserInput.position.push(position);
  }
  setUserInput({...copyUserInput});
  setPosition(null);
  setShowPositionHinzufuegen(!showPositionHinzufuegen);
};

function addNewPosition (position) {
  const isNewPosition = !_.includes(Positions, position, 0);
  if(!isNewPosition) return; 
  store.dispatch(thunkUpdateProfile({...Meta, schichten: [...Positions, position]}));
}

function deletePosition (position) {
  const hasPosition = _.includes(Positions, position, 0);
  if(!hasPosition) return; 
  store.dispatch(thunkUpdateProfile({...Meta, schichten: Positions.filter(pos => pos !== position)}));
}

function updatePositionAccess (position, accessValues) {
  let hasAccessValues = !_.isEmpty(accessValues);
  if(!hasAccessValues) return;
  let currentAccessValues = _.get(Meta, "accessPosition" + [position], []);
  store.dispatch(thunkUpdateProfile({...Meta, accessPosition: {...Meta.accessPosition, [position]: [...currentAccessValues, ...accessValues]}}))
}

const setSelectEmployee = (ma) => {
  setUserInput(Employees[ma]);
  store.dispatch({type: "OPEN", payload: ma});
};

  const handleRegister = (modal) => {
    let copyEmployee = new Employee(userInput);
    copyEmployee.createEmployee(userInput);
    let isValidEmployee = copyEmployee.getEmployeeDetails();
    if (isValidEmployee === "InvalidInputForCreation") {
      setErrMsg({...errMsg, InvalidInputForCreation: !0})
    } else {
      let isValidEmployee = copyEmployee.getEmployeeDetails();
      store.dispatch(thunkRegisterEmployee(isValidEmployee));
      let copyMeta = Meta;
      if (userInput.position !== Meta.schichten) {
        userInput.position.forEach( pos => {
          if (!Meta.schichten.includes(pos)) {
            copyMeta.schichten.push(pos);
          }
        });
        store.dispatch(thunkUpdateProfile(copyMeta));
      }
      setUserInput({...employeeStates});
      store.dispatch({type: "CLOSE", payload: modal});
    }
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
         {validMeta(Meta) ?
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
        :
        <></>
        }
        { !Meta && !Employees ?
        <Row className="text-center">
          <br/>
          <Col xs={12}>
            <Spinner animation="grow" variant="light"/>
          </Col>
        </Row>
        :
        <>
        { errMsg.InvalidInputForCreation ? Notify("warning", WARNING_MISSING_EMPLOYEE_DETAILS, "InvalidInputForCreation") : null}
        <div className="rna-wrapper">
          <NotificationAlert ref={notificationAlert} />
        </div>
        <Row>
        <Col xs={3}>
        <h3 className="float-left pt-5 font-weight-bold text-lg">Team verwalten</h3>
        </Col>
        <Col xs={9}>
          <ButtonMitarbeiterErstellen className="button_mitartbeitereinladen"></ButtonMitarbeiterErstellen>{' '}
          <ButtonEmployeesRoles/>
        </Col>
        </Row>
                <Row className="text-center mt-0">
                  <Col xs={4}>
                  </Col>
                  <Col xs={4}>
                  </Col>
                  <Col xs={4}>
                  </Col>
                </Row>
                  {Employees && Meta ?
                    <MitarbeiterTabelle 
                    setSelectEmployee={setSelectEmployee}
                    mitarbeiter={Employees}
                    meta={Meta}
                    >
                    </MitarbeiterTabelle>
                    :
                    <>
                    <br/>   
                    <Row className="text-center">
                      <br/>
                      <Col xs={12}>
                        <Spinner animation="grow" variant="light"/>
                      </Col>
                    </Row>
                    </>
                 }
            <OpenModal
            onChange={handleInputChange}
            handleUpdate={handleEmployeeUpdate}
            show={Modal}
            meta={Meta}
            userInput={userInput}
            handleRegister={handleRegister}
            handlePositionChange={handlePositionChange}
            handleSetPositions={handleSetPositions}
            handleRemovePositions={handleRemovePositions}
            showPositionHinzufuegen={showPositionHinzufuegen}
            handlePositionErstellen={handlePositionErstellen}
            handlePositionHinzufuegen={handlePositionHinzufuegen}
            handlePositionHinzufuegenClose={handlePositionHinzufuegenClose}
            checkModalKey={getModalKey}
            addNewPosition={addNewPosition}
            deletePosition={deletePosition}
            updatePositionAccess={updatePositionAccess}
            checkTrue={getModalTrue}
            handleFilter={handleFilter}
            handleDelete={handleDelete}
            ></OpenModal>
            </>
          }
      <InfoSidebar
        sidebarInfo={SidebarInfo}/>
        </div>
        );
    }
export default EmployeesContainerAdmin;
