import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import 'moment/locale/de';
import {
    Card,
    CardHeader,
    Row,
    Col,
    CardBody,
  } from "reactstrap";

import Nav from "./Nav/Nav"
import { Spinner } from "reactstrap";
import OpenModal from "./Modal/OpenModal"
import { FetchOrg } from "../../../store/middleware/FetchOrg";
import { thunkUpdateProfile } from "../../../store/middleware/UpdateProfile";
import { createNewShiftPlan } from "./processing/createNewShiftPlan";
import { editShiftDetailsImportedShiftPlan, editShiftDetailsNewShiftPlan } from "./processing/handleEditShiftDetails"
import { addNewShiftToImportedShiftPlan, addShiftToNewShiftPlan } from "./processing/handleAddShift";
import { deleteShiftFromImportedShiftPlan, deleteShiftFromNewShiftPlan } from "./processing/handleDeleteShift";
import { setPrioShift, setNewPrioShift } from "./processing/handlePrio";
import { FetchFromDB } from "../../../store/middleware/FetchPlansFromDB";
import { thunkUpdateShiftPlan } from "../../../store/middleware/UpdateShiftPlan"
import { user } from "../../../store/middleware/user"
import { thunkUploadShiftPlanToDB } from "../../../store/middleware/UploadShiftPlanToDB";
import { thunkDeleteShiftPlan } from "../../../store/middleware/DeleteShiftPlan";
import { handleSwitchShiftOrder } from "./processing/handleSwitchShiftOrder";
import { refractorEmployees } from "./processing/GetShiftCount";
import { thunkStartAlg } from "../../../store/middleware/StartAlg";
import { thunkReleaseForApplication } from "../../../store/middleware/ReleaseForApplication";
import { setApplicantsInShiftPlan } from "./processing/handleUpdateSetApplicants"
import { handleCancelShfitTrade, handleSetShfitTrade } from "./processing/handleSetShiftTrade"
import { handleApplication } from "./processing/handleReleaseForApplication"
import SchichtplanAuswahl from "./Schichtplan/SchichtplanAuswahl"
import ModalOpenButton from "./FormElements/ModalOpenButton"
import ButtonSaveUpdate from "./FormElements/ButtonSaveUpdate"
import ButtonZurueck from "./FormElements/ButtonZurueck"
import NeuerSchichtplanButton from "./FormElements/NeuerSchichtplanButton"
import ButtonUpdateShiftPlan from "./FormElements/ButtonUpdateShiftPlan"
import SetTradeShift from "../../Application/functionalComponents/setTradeShift"
import SchichtplanImport from "./Form/SchichtplanImport"
import store from "../../../store";
import { thunkPublishShiftPlan } from "../../../store/middleware/PublishShiftPlan";
import { FetchEmployees } from "../../../store/middleware/FetchEmployees";

const SchichtplanContainer = () => {
  const [meta, setMeta] = useState(null)
  const [daysIsActive, setDaysIsActive] = useState(null);
  const [navIndex, setNavIndex] = useState(1)
  const [ShiftEmployees, setShiftEmployees] = useState(null);
  const [shiftDetails, setShiftDetails] = useState(false)
  const [ShiftSwitch, setShiftSwitch] = useState(!1)
  const [ErrMsng, setErrMsng] = useState(!1)

  const selectMeta = state => state.DB.meta
  const selectEmployees = state => state.DB.employees;
  const selectDate = state => state.date
  const selectNewDate = state => state.date.start
  const selectCurrentShiftPlan = state => state.currentShiftPlan.currentShiftPlan
  const selectShiftPlanIsActive = state => state.visibility.ShiftPlanIsActive
  const selectShiftPlanIsImported = state => state.visibility.ShiftPlanIsImported
  const selectPlans = state => state.DB.plans
  const selectShiftSlot = state => state.shiftSlot
  const selectNewShiftPlan = state => state.newShiftPlan.shiftplan
  const selectModal = state => state.modal
  const selectLoadingAlg = state => state.loadings.isFetchingAlg

  //REDUX-Listener für UI-Data
  const Meta = useSelector(selectMeta)
  const Employees = useSelector(selectEmployees);
  const Date = useSelector(selectDate)
  const NewDate = useSelector(selectNewDate);
  const ShiftPlanIsActive = useSelector(selectShiftPlanIsActive)
  const currentShiftPlan = useSelector(selectCurrentShiftPlan)
  const ShiftPlanIsImported = useSelector(selectShiftPlanIsImported)
  const Plans = useSelector(selectPlans)
  const ShiftSlot = useSelector(selectShiftSlot);
  const NewShiftPlan = useSelector(selectNewShiftPlan);
  const Modal = useSelector(selectModal);
  const LoadingAlg = useSelector(selectLoadingAlg)

  useEffect(() => {
      store.dispatch(FetchFromDB)
      store.dispatch(FetchOrg)
      store.dispatch(user)
      store.dispatch(FetchEmployees)
    }, []);

  useEffect(() => {
    if(Date.start !== undefined) {
    let abrechnungStart = moment(Date.start.startDate).format("l")
    let abrechnungEnde = moment(Date.ende.endDate).format("l")
    setMeta({...meta, AbrechnungStart: abrechnungStart, AbrechnungEnde: abrechnungEnde })
    }
  }, [Date]);

  useEffect(() => {
    if(currentShiftPlan && Employees && Plans) {
      const employees = refractorEmployees(Employees, Plans[currentShiftPlan].plan)
      setShiftEmployees(employees)
    }
  }, [currentShiftPlan]);

  useEffect(() => {
  }, [Plans]);

  useEffect(() => {
  }, [navIndex]);

  const handleNavChange = (index) => {
    setNavIndex(index)
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
  // Untersucht, ob der Wert eines Modals auf true steht und gibt den Wert true zurück
  const getModalTrue = (allmodals) => {
    let modals = Object.entries(allmodals).map(([key, value]) => {return value})
    let truemodal = modals.includes(true)
    return truemodal
  }
  const handleUpdateProfile = () => {
    store.dispatch(thunkUpdateProfile(meta))
  }
  // Diese Funktion sorgt für die Speicherung eines neuen Schichtplans und schließt im Anschluss das zugehörige Modal
  const handleNewShiftPlanSave = (modal) => {
    const hasName = daysIsActive !== null && Object.keys(daysIsActive).includes("name")
    if (hasName) {
    createNewShiftPlan(daysIsActive);
    store.dispatch({type: "CLOSE", payload: modal})
  }}

  const handleSetApplicant = (modal, updateApplicant) => {
    setApplicantsInShiftPlan({Plans, currentShiftPlan, ShiftSlot, updateApplicant, modal})
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

  //Diese Funktion sorgt für das Syncronisieren eines bearbeiteten Schichtplans mit der Datenbank
  const handleShiftTradeToDB = (index) => {
    let plans = Plans
    plans[currentShiftPlan] = handleSetShfitTrade(Plans, currentShiftPlan, index, daysIsActive, Employees)
    store.dispatch(thunkUpdateShiftPlan(plans, currentShiftPlan))
  }
  //Diese Funktion sorgt für das Syncronisieren eines bearbeiteten Schichtplans mit der Datenbank
  const handleCancelShiftTradeToDB = (index) => {
    let plans = Plans
    plans[currentShiftPlan] = handleCancelShfitTrade(Plans, currentShiftPlan, index, daysIsActive, Employees)
    store.dispatch(thunkUpdateShiftPlan(plans, currentShiftPlan))
  }
  //Diese Funktion löscht eine ausgewählte Schicht innerhalb eines ausgewählten Schichtplans
  const handleDeleteShift = (index) => {
      ShiftPlanIsImported ? deleteShiftFromImportedShiftPlan({index, Plans, currentShiftPlan}) : deleteShiftFromNewShiftPlan({index, NewShiftPlan})
      store.dispatch({type: "CLOSE", payload: index})
  }
  //Diese Funktion löscht einen ausgewählten Schichtplan in der Datenbank
  const handlePublishShiftPlan = () => {
    store.dispatch(thunkPublishShiftPlan(Plans[currentShiftPlan]))
  }
  const handleReleaseForApplication = (modal) => {
    const response = handleApplication(Plans, currentShiftPlan, NewDate)
    if (!response) {setShiftDetails(!0)}
    store.dispatch({type: "CLOSE", payload: modal});
  }

  const handleStartAlg = (modal) => {
    store.dispatch({type: "startFetchingAlg"})
    const id = Plans[currentShiftPlan].id
    store.dispatch(thunkStartAlg(id))
    store.dispatch({type: "CLOSE", payload: modal})
  }

        return(
        <>
        { !Meta && !Employees && !Plans?
        <Row className="text-center">
          <br/>
          <Col xs={12}>
            <Spinner animation="grow" variant="light"/>
          </Col>
        </Row>
        :
      <>
      { !ShiftPlanIsActive ?
        <Nav
          onNavChange={handleNavChange}
          navIndex={navIndex}
          ></Nav>
        :
        <></>
      }
      <Row className="mt-6">
      <Col xs={2} className="mt-4">
      <h3 className="float-left pt-4 font-weight-bold text-lg">Schichtplan</h3>
      { LoadingAlg ? <Spinner color="success" /> : <></>}
      </Col>
      <Col xs={10} className="mt-2">
      <ButtonSaveUpdate
          handleUpdate={handleUpdatedShiftPlanToDB}
          handleUpload={handleUploadShiftPlanToDB}
          trigger={ShiftPlanIsActive}
          import={ShiftPlanIsImported}/>
      {ShiftPlanIsActive ?
        <>
          <ModalOpenButton
            title="Schichtplan freigeben"
            trigger={Plans[currentShiftPlan].id.split("#").includes("Entwurf")}
            modal="showSchichtplanFreigeben"/>
          <ModalOpenButton
            title="Schicht hinzufügen"
            trigger={Plans[currentShiftPlan].id.split("#").includes("Entwurf")}
            modal="showSchichthinzufuegen"/>
          <ModalOpenButton
            title="Befüllung starten"
            trigger={Plans[currentShiftPlan].id.split("#").includes("Freigeben")}
            modal="showBefuellungStarten"/>
          <ButtonUpdateShiftPlan
            title="Schichtplan veröffentlichen"
            trigger={Plans[currentShiftPlan].id.split("#").includes("Review")}
            onClick={handlePublishShiftPlan}
            />
        </>
        :
        <></>
        }
      <NeuerSchichtplanButton
          title="neuen Schichtplan erstellen"
          modal="showSchichtplanErstellen"
          trigger={!ShiftPlanIsActive}>
          </NeuerSchichtplanButton>
      <ButtonZurueck
        titel="Zurück zur Auswahl"
        onClickVal=""
        true={ShiftPlanIsActive}
        ></ButtonZurueck>
      </Col>
      </Row>
      <Row>
          <div className="col">
              {Plans && Meta && !ShiftPlanIsActive ? <SchichtplanImport 
                status={navIndex}
                bearbeiten={ShiftPlanIsActive}
                plaene={Plans}
                onSwitch={shiftChange}
                plan={currentShiftPlan}
                import={ShiftPlanIsImported}
                Schichtplan={NewShiftPlan}
                onDelete={handleDeleteShiftPlan}
                onChange={handleInputChange}
                onClick={handleUpdateProfile}
                org={Meta}></SchichtplanImport>
                :
                <></>
                }
                  {ShiftPlanIsActive && Employees && Plans? 
                 <SchichtplanAuswahl
                  bearbeiten={ShiftPlanIsActive}
                  plaene={Plans}
                  employees={Employees}
                  onSwitch={shiftChange}
                  plan={currentShiftPlan}
                  import={ShiftPlanIsImported}
                  Schichtplan={NewShiftPlan}
                 />
                 :
                 <></>
                }
          </div>
        </Row>
        {currentShiftPlan && Plans[currentShiftPlan].tauschanfrage.length > 0 && Employees?
        <Row className="mt-4">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Tauschanfragen</h3>
              </CardHeader>
              <CardBody>
                <SetTradeShift
                onTradeSubmit={handleShiftTradeToDB}
                onCancelSumbit={handleCancelShiftTradeToDB}
                onChange={handleInputChange}
                employees={Employees}
                plan={Plans}
                current={currentShiftPlan}/>
              </CardBody>
            </Card>
          </div>
        </Row>
        :
        <></>
        }
        <OpenModal
            show={Modal}
            plaene={Plans}
            bewerber={ShiftSlot}
            shiftSlot={ShiftSlot}
            plan={currentShiftPlan}
            Schichtplan={NewShiftPlan}
            employees={ShiftEmployees}
            import={ShiftPlanIsImported}
            checkTrue={getModalTrue}
            checkModalKey={getModalKey}
            startAlg = {handleStartAlg}
            onChange={handleInputChange}
            onSave={handleNewShiftPlanSave}
            handlePrio={handlePrioShiftToDB}
            onDelete={handleDeleteShiftPlan}
            handleLoeschen={handleDeleteShift}
            onSaveHinzufuegen={handleAddShift}
            selectBewerber={handleSetApplicant}
            onUpdate={handleReleaseForApplication}
            onSaveBearbeiten={handleEditShiftDetails}
            handleSchichtBearbeiten={handleEditShiftDetails}
            ></OpenModal>
    </>
    }
    </>
            );
        }
export default SchichtplanContainer;
