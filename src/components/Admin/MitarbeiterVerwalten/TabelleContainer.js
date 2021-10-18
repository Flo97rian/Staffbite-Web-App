import React, { useEffect, useState } from "react";
import {
    Col,
    Row,
  } from "reactstrap";
  import Spinner from 'react-bootstrap/Spinner';

import MitarbeiterTabelle from "./MitarbeiterTabelle.js";
import ButtonMitarbeiterErstellen from "./Modal/ButtonMitarbeiterErstellen.js";
import OpenModal from "./Modal/OpenModal.js";
import { thunkRegisterEmployee } from "../../../store/middleware/RegisterEmployee";
import { FetchEmployees } from "../../../store/middleware/FetchEmployees.js";
import { FetchOrg } from "../../../store/middleware/FetchOrg";
import store from "../../../store.js";
import { useSelector } from "react-redux";
import { thunkDeleteEmployee } from "../../../store/middleware/DeleteEmployee.js";
import { thunkUpdateEmployee } from "../../../store/middleware/UpdateEmployee.js";
import { thunkUpdateProfile } from "../../../store/middleware/UpdateProfile.js";

const TableContainer = (props) => {
  const [employeeIsActive, setemployeeIsActive] = useState(null);
  const [showPositionHinzufuegen, setShowPositionHinzufuegen] = useState(!1);
  const [position, setPosition] = useState();
    
  const selectEmployees = state => state.DB.employees;
  const selectModal = state => state.modal;
  const selectMeta = state => state.DB.meta;

  const Employees = useSelector(selectEmployees);
  const Modal = useSelector(selectModal);
  const Meta = useSelector(selectMeta);

  // Initiales laden der aktuellen Users
  useEffect(() => {
    store.dispatch(FetchEmployees);
    store.dispatch(FetchOrg);
  }, []);

    // Initiales laden der aktuellen Users
    useEffect(() => {
    }, [employeeIsActive]);

    useEffect(() => {
    }, [Employees]);
    // Filtert auf Basis der Id, die zugehörigen Mitarbeiterdaten
    const handleFilter = (idToSearch) => {
      const data = Employees[idToSearch];
      return data;
  };

 // Handling von Userinputs
 const handleInputChange = (event) => {
    const key = event.target.name;
    const val = stateSwitch(event.target.value, event);
    setemployeeIsActive({...employeeIsActive, [key]: val }) ;
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
    let copyEmployeeIsActive = {...employeeIsActive};
    if ("position" in copyEmployeeIsActive) {
      copyEmployeeIsActive.position = [...copyEmployeeIsActive.position, item];
    } else if (!("position" in copyEmployeeIsActive)) {
      copyEmployeeIsActive["position"] = [item];
    }
    else {
      copyEmployeeIsActive.position.push(item);
    }
    setemployeeIsActive(copyEmployeeIsActive);
  };
  const handleRemovePositions = (item) => {
    let copyEmployeeIsActive = {...employeeIsActive};
    copyEmployeeIsActive.position = copyEmployeeIsActive.position.filter(element => element !== item);
    setemployeeIsActive(copyEmployeeIsActive);
  };
  // Handling des Löschens von Mitarbeitern
  const handleDelete = (employeeId) => {
    store.dispatch(thunkDeleteEmployee(employeeId));
    store.dispatch({type: "CLOSE", payload: employeeId});
  };

  const handleEmployeeUpdate = (employee) => {
    const updatedEmployee = mergeEmployeeDetails(employee, employeeIsActive);
    store.dispatch(thunkUpdateEmployee(updatedEmployee));
    let copyMeta = Meta;
    if (employeeIsActive.position !== Meta.schichten) {
      employeeIsActive.position.forEach( pos => {
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
  let copyEmployeeIsActive = {...employeeIsActive};
  if ("position" in copyEmployeeIsActive) {
    if(!copyEmployeeIsActive.position.includes(position)) {
      copyEmployeeIsActive.position = [...copyEmployeeIsActive.position, position];
    }
  } else if (!("position" in copyEmployeeIsActive)) {
    copyEmployeeIsActive["position"] = [position];
  }
  else {
    copyEmployeeIsActive.position.push(position);
  }
  setemployeeIsActive(copyEmployeeIsActive);
  setPosition(null);
  setShowPositionHinzufuegen(!showPositionHinzufuegen);
};

const setSelectEmployee = (ma) => {
  setemployeeIsActive(Employees[ma]);
  store.dispatch({type: "OPEN", payload: ma});
};

  const handleRegister = (modal) => {
    store.dispatch(thunkRegisterEmployee({employeeIsActive}));
    let copyMeta = Meta;
    if (employeeIsActive.position !== Meta.schichten) {
      employeeIsActive.position.forEach( pos => {
        if (!Meta.schichten.includes(pos)) {
          copyMeta.schichten.push(pos);
        }
      });
      store.dispatch(thunkUpdateProfile(copyMeta));
    }
    setemployeeIsActive(null);
    store.dispatch({type: "CLOSE", payload: modal});
  };

        return(
        <>
        { !Meta && !Employees ?
        <Row className="text-center">
          <br/>
          <Col xs={12}>
            <Spinner animation="grow" variant="light"/>
          </Col>
        </Row>
        :
        <>
        <Row>
        <Col xs={3}>
        <h3 className="float-left pt-5 font-weight-bold text-lg">Mitarbeiter verwalten</h3>
        </Col>
        <Col xs={9}>
          <ButtonMitarbeiterErstellen></ButtonMitarbeiterErstellen>{' '}
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
            employeeIsActive={employeeIsActive}
            handleRegister={handleRegister}
            handlePositionChange={handlePositionChange}
            handleSetPositions={handleSetPositions}
            handleRemovePositions={handleRemovePositions}
            showPositionHinzufuegen={showPositionHinzufuegen}
            handlePositionErstellen={handlePositionErstellen}
            handlePositionHinzufuegen={handlePositionHinzufuegen}
            handlePositionHinzufuegenClose={handlePositionHinzufuegenClose}
            checkModalKey={getModalKey}
            checkTrue={getModalTrue}
            handleFilter={handleFilter}
            handleDelete={handleDelete}
            ></OpenModal>
            </>
          }
        </>
        );
    }
export default TableContainer;
