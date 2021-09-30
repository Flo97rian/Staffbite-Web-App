import {React, useEffect, useState, useRef } from "react";
import 'moment/locale/de';
import {
    Card,
    Col,
    CardHeader,
    Row,
    CardBody,
  } from "reactstrap";


import { useSelector } from "react-redux";
import OpenModal from './Modal/OpenModal';
import Spinner from 'react-bootstrap/Spinner'
import SchichtplanAuswahl from "./SchichtplanListe/SchichtplanAuswahl";
import { ButtonZurueck } from "../SchichtplanVerwalten/FormElements/ButtonZurueck"
import FormSchichtplanImportieren from "./FormElements/FormSchichtplanImportieren";
import ModalOpenButton from "./FormElements/ModalOpenButton";
import store from "../../../store";

import { createNewShiftPlan } from "./processing/createNewShiftPlan";
import { editShiftDetailsImportedShiftPlan, editShiftDetailsNewShiftPlan } from "./processing/handleEditShiftDetails"
import { addNewShiftToImportedShiftPlan, addShiftToNewShiftPlan } from "./processing/handleAddShift";
import { deleteShiftFromImportedShiftPlan, deleteShiftFromNewShiftPlan } from "./processing/handleDeleteShift";
import { setPrioShift, setNewPrioShift } from "./processing/handlePrio";

import { FetchFromDB } from "../../../store/middleware/FetchPlansFromDB";
import { thunkUpdateShiftPlan } from "../../../store/middleware/UpdateShiftPlan"
import { user } from "../../../store/middleware/user"
import ButtonSaveUpdate from "./FormElements/ButtonSaveUpdate";
import { thunkUploadShiftPlanToDB } from "../../../store/middleware/UploadShiftPlanToDB";
import { thunkDeleteShiftPlan } from "../../../store/middleware/DeleteShiftPlan";
import { handleSwitchShiftOrder } from "./processing/handleSwitchShiftOrder";

const TableContainer = (props) => {
  const [daysIsActive, setDaysIsActive] = useState(null);
  const [ActivePlanIndex, setActivePlanIndex] = useState({left: !1, right: !1});
  const [ShiftSwitch, setShiftSwitch] = useState(!1)
  const [ErrMsng, setErrMsng] = useState(!1)

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

  useEffect(() => {
    if(Plans) {
    let NoLeftNextShiftPlan = currentShiftPlan - 1 < 0 ? !0 : !1 
    let NoRightNextShiftPlan = currentShiftPlan + 1 >= Plans.length ? !0 : !1 
    setActivePlanIndex({...ActivePlanIndex, left: NoLeftNextShiftPlan, right: NoRightNextShiftPlan})
    }
  }, [currentShiftPlan]);

  useEffect(() => {
    console.log("changed")
  }, [Plans]);
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

  const shiftChange = (plan) => {
    setShiftSwitch(plan);
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
    const hasName = daysIsActive !== null && Object.keys(daysIsActive).includes("name")
    if (hasName) {
    createNewShiftPlan(daysIsActive);
    store.dispatch({type: "CLOSE", payload: modal})
  }}
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
      let plans = Plans
      if (ShiftSwitch !== null) {
        let shiftswitch = handleSwitchShiftOrder(ShiftSwitch);
        plans[currentShiftPlan].plan = shiftswitch
      }
      store.dispatch(thunkUpdateShiftPlan(plans, currentShiftPlan))
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
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Schichtplan erstellen</h3>
              </CardHeader>
              <CardBody>
                <Row className="text-center" noGutters={true}>
                  <Col xs={1}>
                  {ShiftPlanIsActive ? (ActivePlanIndex.left ? <span className="ni ni-bold-left text-light"></span> : <span className="ni ni-bold-left" onClick={() => {store.dispatch({ type: "SwitchLeftcurrentShiftPlan"})}}></span>) : <></>}
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
                  title="neuen Schichtplan erstellen"
                  trigger={!ShiftPlanIsActive}
                  modal="showSchichtplanErstellen"/>
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
                  {ShiftPlanIsActive ? (ActivePlanIndex.right ? <span className="ni ni-bold-right text-light"></span> : <span className="ni ni-bold-right" onClick={() => {store.dispatch({ type: "SwitchRightcurrentShiftPlan", payload: Plans.length})}}></span>) : <></>}
                  </Col>
                </Row>
                <br />
                {ShiftPlanIsActive ? 
                 <SchichtplanAuswahl
                  bearbeiten={ShiftPlanIsActive}
                  plaene={Plans}
                  onSwitch={shiftChange}
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
            import={ShiftPlanIsImported}
            Schichtplan={NewShiftPlan}
            onDelete={handleDeleteShiftPlan}
            handleLoeschen={handleDeleteShift}
            onSaveHinzufuegen={handleAddShift}
            handleSchichtBearbeiten={handleEditShiftDetails}
            ></OpenModal>
    </>
            );
        }
export default TableContainer;