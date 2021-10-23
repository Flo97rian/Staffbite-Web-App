import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import 'moment/locale/de';
import {
    Row,
    Col,
    Alert,
  } from "reactstrap";

import Navs from "./FormElements/NavPills";
import Spinner from 'react-bootstrap/Spinner'
import { FetchOrg } from "../../../store/middleware/FetchOrg";
import { thunkUpdateProfile } from "../../../store/middleware/UpdateProfile";
import store from "../../../store";

const EinstellungenContainer = () => {
  const [metaData, setMetaData] = useState(null)
  const [position, setPosition] = useState(null);
  const [showPositionHinzufuegen, setShowPositionHinzufuegen] = useState(!1);
  const selectMeta = state => state.Meta;
  const selectLoadingMeta = state => state.loadings.isFetchingMeta;
  const selectDate = state => state.date;

  //REDUX-Listener für UI-Data
  const Meta = useSelector(selectMeta);
  const LoadingMeta = useSelector(selectLoadingMeta);
  const Date = useSelector(selectDate);

  useEffect(() => {
      store.dispatch(FetchOrg)
    }, []); 

    useEffect(() => {
      const timeout = setTimeout(() => {
        store.dispatch({type: "stopFetchingMeta"})
       }, 5000);
   
      return () => clearTimeout(timeout);
     },[Meta]);

     useEffect(() => {
       if(Meta !== undefined) {
        setMetaData({...metaData, schichten: Meta.schichten})
       }
    }, [Meta, metaData]);

    useEffect(() => {
   }, [metaData]);

  useEffect(() => {
    if(Date.start !== undefined) {
    let abrechnungStart = moment(Date.start.startDate).format("l")
    let abrechnungEnde = moment(Date.ende.endDate).format("l")
    setMetaData({...metaData, AbrechnungStart: abrechnungStart, AbrechnungEnde: abrechnungEnde })
    }
  }, [Date, metaData]);

  // Handling von Userinputs
  const handleInputChange = (event) => {
    let key = event.target.name;
    let val = stateSwitch(event.target.value, event);
    setMetaData({...metaData, [key]: val })
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
    const handleUpdateProfile = () => {
      store.dispatch({type: "isFetchingMeta"})
      store.dispatch(thunkUpdateProfile(metaData))
    }
    const handlePositionHinzufuegen = () => {
      setShowPositionHinzufuegen(!showPositionHinzufuegen);
    };
    
    const handlePositionHinzufuegenClose = () => {
      setShowPositionHinzufuegen(!showPositionHinzufuegen);
    };

    const handlePositionErstellen = () => {
      let copymeta = {...metaData};

      if (copymeta.schichten === undefined) {
        copymeta.schichten = [];
        copymeta.schichten.push(position);
      } else if (!(position in metaData.schichten)) {
        copymeta.schichten.push(position);
      }
      setMetaData(copymeta);
      setPosition(null);
      setShowPositionHinzufuegen(!showPositionHinzufuegen);
    };
   // Handling von Userinputs
   const handlePositionChange = (event) => {
    const val = event.target.value;
    setPosition(val);
  };
    const handleRemovePositions = (item) => {
      let copymeta = {...metaData};
      copymeta.schichten = copymeta.schichten.filter(element => element !== item);
      setMetaData(copymeta);
    };
        return(
      <>
      { !Meta ? 
      <Row className="text-center mt-2">
        <Col className="mt-2" xs={12}>
          <Spinner animation="grow" variant="light"/>
        </Col>
      </Row>
      : 
      <>
        { LoadingMeta ? <Alert color="success">Ihre Änderungen wurden gespeichert! Aktualisieren Sie die Seite, um alle Veränderungen zu sehen.</Alert> : <></> }
        <Navs
        showPositionHinzufuegen={showPositionHinzufuegen}
        handleRemovePositions={handleRemovePositions}
        handlePositionErstellen={handlePositionErstellen}
        handlePositionChange={handlePositionChange}
        handlePositionHinzufuegen={handlePositionHinzufuegen}
        handlePositionHinzufuegenClose={handlePositionHinzufuegenClose}
        onChange={handleInputChange}
        onClick={handleUpdateProfile}
        org={Meta}
        metaData={metaData}
        ></Navs>
      </>
      }
    </>
            );
        }
export default EinstellungenContainer;
