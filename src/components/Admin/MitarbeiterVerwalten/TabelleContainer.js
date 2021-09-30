import React, { useEffect, useState } from "react";
import {
    Card,
    Col,
    CardHeader,
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    CardBody,
  } from "reactstrap";
  import Spinner from 'react-bootstrap/Spinner'

import MitarbeiterTabelle from "./MitarbeiterTabelle.js";
import ButtonMitarbeiterErstellen from "./Modal/ButtonMitarbeiterErstellen.js";
import OpenModal from "./Modal/OpenModal.js";
import { thunkRegisterEmployee } from "../../../store/middleware/RegisterEmployee"
import { FetchEmployees } from "../../../store/middleware/FetchEmployees.js";
import { FetchOrg } from "../../../store/middleware/FetchOrg"
import store from "../../../store.js";
import { useSelector } from "react-redux";
import { thunkDeleteEmployee } from "../../../store/middleware/DeleteEmployee.js";
import { thunkUpdateEmployee } from "../../../store/middleware/UpdateEmployee.js";

const TableContainer = (props) => {
  const [employeeIsActive, setemployeeIsActive] = useState(null);
    
  const selectEmployees = state => state.DB.employees;
  const selectModal = state => state.modal;
  const selectMeta = state => state.DB.meta

  const Employees = useSelector(selectEmployees);
  const Modal = useSelector(selectModal);
  const Meta = useSelector(selectMeta)

  // Initiales laden der aktuellen Users
  useEffect(() => {
    store.dispatch(FetchEmployees)
    store.dispatch(FetchOrg)
  }, []);

    // Filtert auf Basis der Id, die zugehörigen Mitarbeiterdaten
    const handleFilter = (idToSearch) => {
      const data = Employees[idToSearch]
      return data
  }

 // Handling von Userinputs
 const handleInputChange = (event) => {
    const key = event.target.name;
    const val = stateSwitch(event.target.value, event);
    setemployeeIsActive({...employeeIsActive, [key]: val }) 
  }

 // Überprüfung von Userinputs, ob der Input vom Typ Switch ist
 const stateSwitch = (value, event) => {
  if (value !== "on") return value
    const state = handleInputSwitch(event);
    return state
  }

  // Diese Funktion ändert den Wert eines Switches, je nach userinput
  const handleInputSwitch = (event) => {
    if (event.target.checked !== !0) return !1
      return !0
  }

  // Untersucht, ob der Wert eines Modals auf auf true steht und gibt den zugehörigen Key zurück
  const getModalKey = (allmodals) => {
    const modals = Object.entries(allmodals).map(([key, value]) =>  value ? key : null);
    const modalfilter = modals.filter((modal) => typeof modal === "string");
    const modal = modalfilter[0];
    return modal;
  }

  // Untersucht, ob der Wert eines Modals auf true steht und gibt den Wert true zurück
  const getModalTrue = (e) => {
    const modals = Object.entries(e).map(([key, value]) => {return value})
    const truemodal = modals.includes(true)
    return truemodal
  }

  // Handling des Löschens von Mitarbeitern
  const handleDelete = (employeeId) => {
    store.dispatch(thunkDeleteEmployee(employeeId))
    store.dispatch({type: "CLOSE", payload: employeeId})
  }

  const handleEmployeeUpdate = (employee) => {
    const updatedEmployee = mergeEmployeeDetails(employee, employeeIsActive)
    store.dispatch(thunkUpdateEmployee(updatedEmployee));
    store.dispatch({type: "CLOSE", payload: employee["id"]})
  }

  const mergeEmployeeDetails = (employee, newDetails) => {
    const NewEmployeeDetails = employee
    const keys = Object.keys(newDetails);
    keys.forEach(element => { NewEmployeeDetails[element] = newDetails[element]});
    return NewEmployeeDetails
  }


  const handleRegister = (modal) => {
    store.dispatch(thunkRegisterEmployee({employeeIsActive}))
    store.dispatch({type: "CLOSE", payload: modal});
  }

        return(
        <> 
        <Row>
        <Col xs={3}>
        <h3 className="float-left pt-5 font-weight-bold text-lg">Mitarbeiter:innen verwalten</h3>
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
                  {!Employees && !Meta ?
                  <>
                  <br/>   
                  <Row className="text-center">
                    <br/>
                    <Col xs={12}>
                      <Spinner animation="grow" variant="light"/>
                    </Col>
                  </Row>
                  </> :
                    <MitarbeiterTabelle 
                    mitarbeiter={Employees}
                    meta={Meta}
                    >
                    </MitarbeiterTabelle>
    }
            <OpenModal
            onChange={handleInputChange}
            handleUpdate={handleEmployeeUpdate}
            show={Modal}
            meta={Meta}
            handleRegister={handleRegister}
            checkModalKey={getModalKey}
            checkTrue={getModalTrue}
            handleFilter={handleFilter}
            handleDelete={handleDelete}
            ></OpenModal>
            </>
        );
    }
export default TableContainer;