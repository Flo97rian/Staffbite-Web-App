import {React, useEffect, useState } from "react";
import 'moment/locale/de';
import {
    Card,
    Col,
    CardHeader,
    Row,
    CardBody,
    Container
  } from "reactstrap";


import { useSelector } from "react-redux";
import OpenModal from '../SchichtplanErstellen/Modal/OpenModal';
import Spinner from 'react-bootstrap/Spinner'
import SchichtplanAuswahl from "../SchichtplanErstellen/SchichtplanListe/SchichtplanAuswahl";
import { ButtonZurueck } from "../SchichtplanVerwalten/FormElements/ButtonZurueck"
import FormSchichtplanImportieren from "../SchichtplanErstellen/FormElements/FormSchichtplanImportieren";
import ModalOpenButton from "../SchichtplanErstellen/FormElements/ModalOpenButton";
import store from "../../../store";
import Control from "./ControlStatus";

import { createNewShiftPlan } from "../SchichtplanErstellen/processing/createNewShiftPlan";
import { editShiftDetailsImportedShiftPlan, editShiftDetailsNewShiftPlan } from "../SchichtplanErstellen/processing/handleEditShiftDetails"
import { addNewShiftToImportedShiftPlan, addShiftToNewShiftPlan } from "../SchichtplanErstellen/processing/handleAddShift";
import { deleteShiftFromImportedShiftPlan, deleteShiftFromNewShiftPlan } from "../SchichtplanErstellen/processing/handleDeleteShift";
import { setPrioShift, setNewPrioShift } from "../SchichtplanErstellen/processing/handlePrio";

import { FetchFromDB } from "../../../store/middleware/FetchPlansFromDB";
import { thunkUpdateShiftPlan } from "../../../store/middleware/UpdateShiftPlan"
import { user } from "../../../store/middleware/user"
import ButtonSaveUpdate from "../SchichtplanErstellen/FormElements/ButtonSaveUpdate";
import { thunkUploadShiftPlanToDB } from "../../../store/middleware/UploadShiftPlanToDB";
import { thunkDeleteShiftPlan } from "../../../store/middleware/DeleteShiftPlan";

const TableContainerTest = (props) => {
  const [daysIsActive, setDaysIsActive] = useState(null);

  //REDUX-Filter für UI-Data
  const selectCurrentShiftPlan = state => state.currentShiftPlan.currentShiftPlan
  const selectShiftPlanIsActive = state => state.visibility.ShiftPlanIsActive
  const selectShiftPlanIsImported = state => state.visibility.ShiftPlanIsImported
  const selectPlans = state => state.DB.plans
  const selectShiftSlot = state => state.shiftSlot
  const selectNewShiftPlan = state => state.newShiftPlan.shiftplan
  const selectModal = state => state.modal

  //REDUX-Listener für UI-Data
  const ShiftPlanIsActive = useSelector(selectShiftPlanIsActive)
  const currentShiftPlan = useSelector(selectCurrentShiftPlan)
  const ShiftPlanIsImported = useSelector(selectShiftPlanIsImported)
  const Plans = useSelector(selectPlans)
  const ShiftSlot = useSelector(selectShiftSlot);
  const NewShiftPlan = useSelector(selectNewShiftPlan);
  const Modal = useSelector(selectModal);

  // Initiales laden der aktuellen Users
  useEffect(() => {
    store.dispatch(user)
    store.dispatch(FetchFromDB)
  }, []);

  //REDUX-Store Listener
    store.subscribe(() =>
    console.log('State after dispatch: ', store.getState())
  )

  // Untersucht, ob der Wert eines Modals auf true steht und gibt den Wert true zurück
  const getModalTrue = (allmodals) => {
    let modals = Object.entries(allmodals).map(([key, value]) => {return value})
    let truemodal = modals.includes(true)
    return truemodal
  }

  // Handling von Userinputs
  const handleInputChange = (event) => {
    let key = event.target.name;
    let val = stateSwitch(event.target.value, event);
    setDaysIsActive({...daysIsActive, [key]: val })
  }

  // Überprüfung von Userinputs, ob der Input vom Typ Switch ist
  const stateSwitch = (value, event) => {
    if (value !== "on") return value
      let state = handleInputSwitch(event);
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

  // Diese Funktion sorgt für die Speicherung eines neuen Schichtplans und schließt im Anschluss das zugehörige Modal
  const handleNewShiftPlanSave = (modal) => {
    createNewShiftPlan(daysIsActive);
    store.dispatch({type: "CLOSE", payload: modal})
  }
  // Diese Funktion sorgt für die Bearbeitung von einzelnen Schichten innerhalb eines Schichtplanes (Name, Start, Ende, benötigte Mitarbeiter:innen)
  const handleEditShiftDetails = (index) => {
    ShiftPlanIsImported ? editShiftDetailsImportedShiftPlan({index, Plans, currentShiftPlan, daysIsActive}) : editShiftDetailsNewShiftPlan({index, NewShiftPlan, daysIsActive});
    store.dispatch({type: "CLOSE", payload: index})
  }

  //Dise Funktion sorgt für das Hinzufügen einer neuen Schicht zum jeweiligen Schichtplan
  const handleAddShift = (index) => {
    ShiftPlanIsImported ? addNewShiftToImportedShiftPlan({index, Plans, currentShiftPlan, daysIsActive}) : addShiftToNewShiftPlan({index, NewShiftPlan, daysIsActive});
    store.dispatch({type: "CLOSE", payload: index})
  }

  //Diese Funktion sorgt für das Kennzeichnen einer Prioschicht im jeweiligen Schichtplan
  const handlePrioShiftToDB = (modal) => {
    NewShiftPlan ? setNewPrioShift({NewShiftPlan, ShiftSlot, daysIsActive}) : setPrioShift({Plans, ShiftSlot, currentShiftPlan, daysIsActive});
    store.dispatch(thunkUpdateShiftPlan);
    store.dispatch({type: "CLOSE", payload: modal})
  }

  //Diese Funktion sorgt für das Syncronisieren eines bearbeiteten Schichtplans mit der Datenbank
  const handleUpdatedShiftPlanToDB = () => {
      store.dispatch(thunkUpdateShiftPlan(Plans, currentShiftPlan))
  }

  //Diese Funktion fürgt einen neu erstelten Schichtplan der Datenbank hinzu
  const handleUploadShiftPlanToDB = () => {
    store.dispatch(thunkUploadShiftPlanToDB({daysIsActive, NewShiftPlan}))
  }

  //Diese Funktion löscht einen ausgewählten Schichtplan in der Datenbank
  const handleDeleteShiftPlan = (index) => {
    store.dispatch(thunkDeleteShiftPlan({index, Plans}))
  }

  //Diese Funktion löscht eine ausgewählte Schicht innerhalb eines ausgewählten Schichtplans
  const handleDeleteShift = (index) => {
      ShiftPlanIsImported ? deleteShiftFromImportedShiftPlan({index, Plans, currentShiftPlan}) : deleteShiftFromNewShiftPlan({index, NewShiftPlan})
      store.dispatch({type: "CLOSE", payload: index})
  }
        return(
          <>
      <Container className="mt-8" fluid>
        <Row>
            <div className="col-1"></div>
          <div className="col-10">
            <Row className="mb-0">
                <Col className="mb-2" xs={4}>
                    <h2>Schichtplan erstellen</h2>
                </Col>
                <Col xs={4}></Col>
                <Col xs={4} className="mb-2">
                <ModalOpenButton
                    class="float-right"
                    title="neuen Schichtplan erstellen"
                    trigger={!ShiftPlanIsActive}
                    modal="showSchichtplanErstellen"/>
                </Col>
            </Row>
                <Row>
                  <Col xs={4}>
                    <div>
                    <Card className="shadow mb-4">
                      <CardHeader>
                      <Control></Control>
                      </CardHeader>
                    </Card>
                    </div>
                    </Col>
                  <Col xs={4}>
                    <Control></Control>
                  </Col>
                  <Col xs={4}></Col>
                </Row>
            <Card className="shadow">
              <CardBody>
                <Row className="text-center" noGutters={true}>
                  <Col xs={1}>
                    {ShiftPlanIsActive ? <span className="ni ni-bold-left" onClick={() => {store.dispatch({ type: "SwitchLeftcurrentShiftPlan"})}}></span> : <></>}
                  </Col>
                  <Col xs={3} className="text-right">
                  <ButtonZurueck
                  titel="Zuück zur Auswahl"
                  onClickVal=""
                  true={ShiftPlanIsActive}
                  ></ButtonZurueck>
                  </Col>
                  <Col xs={4} className="text-center">
                  <ModalOpenButton
                  title="Schicht hinzufügen"
                  trigger={ShiftPlanIsActive}
                  modal="showSchichthinzufuegen"/>
                  </Col>
                  <Col xs={3} className="text-left">
                    <ButtonSaveUpdate
                    handleUpdate={handleUpdatedShiftPlanToDB}
                    handleUpload={handleUploadShiftPlanToDB}
                    trigger={ShiftPlanIsActive}
                    import={ShiftPlanIsImported}/>
                  </Col>
                  <Col xs={1}>
                    {ShiftPlanIsActive ? <span className="ni ni-bold-right" onClick={() => {store.dispatch({ type: "SwitchRightcurrentShiftPlan", payload: Plans.length})}}></span> : <></>}
                  </Col>
                </Row>
                <br />
                {ShiftPlanIsActive ? 
                 <SchichtplanAuswahl
                  bearbeiten={ShiftPlanIsActive}
                  plaene={Plans}
                  plan={currentShiftPlan}
                  import={ShiftPlanIsImported}
                  Schichtplan={NewShiftPlan}
                 />
                 :
                  (!Plans ? 
                  <>
                  <br/>   
                  <Row className="text-center">
                    <br/>
                    <Col xs={12}>
                      <Spinner animation="grow" variant="light"/>
                    </Col>
                  </Row>
                  </>
                  :
                  <FormSchichtplanImportieren
                  plaene={Plans}
                  onDelete={handleDeleteShiftPlan}
                  />)
                }
                </CardBody>
            </Card>
      <OpenModal
            show={Modal}
            onSave={handleNewShiftPlanSave}
            onChange={handleInputChange}
            handlePrio={handlePrioShiftToDB}
            checkTrue={getModalTrue}
            checkModalKey={getModalKey}
            plaene={Plans}
            shift={currentShiftPlan}
            shiftSlot={ShiftSlot}
            Schichtplan={NewShiftPlan}
            onDelete={handleDeleteShiftPlan}
            handleLoeschen={handleDeleteShift}
            onSaveHinzufuegen={handleAddShift}
            handleSchichtBearbeiten={handleEditShiftDetails}
            ></OpenModal>
                      </div>
                      <div className="col-1"></div>
        </Row>
      </Container>
    </>
            );
        }
export default TableContainerTest;