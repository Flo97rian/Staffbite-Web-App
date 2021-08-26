import React from "react";
import moment from "moment";
import 'moment/locale/de';
import {
    Card,
    CardHeader,
    Row,
    CardBody,
  } from "reactstrap";

import { API, Auth } from "aws-amplify";
import Navs from "./FormElements/NavPills";

export default class EinstellungenContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fetchOrg: !0,
            modal: {},
        };
        this.getDates = this.getDates.bind(this);
        this.setSingleState = this.setSingleState.bind(this);
        this.setMultiObjectState = this.setMultiObjectState.bind(this);
        this.setObjectState = this.setObjectState.bind(this);
        this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
      }
      // Initiales Laden der Schichtpläne aus der Datenbank
      componentDidMount() {
        this.getOrg(this.setSingleState)
          }

    // Läd die Schichtpläne neu aus der Datenbank, wenn der Wert loading auf true geändert wurde.
    // Passiert, wenn zuvor ein Schichtplan geändert oder erstellt wurde
    // somit werden die Pläne local und in der Cloud syncron gehalten
    componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
    if (prevState.fetchOrg !== this.state.fetchOrg) {
        this.getOrg(this.setSingleState)
    }
    }

   // Funktion zum setzen eines einzelnen States. Setzt den State key auf den Wert val
   setSingleState(key, value) {
    this.setState(state => {
        return {
            [key] : state = value
        }
    })
  }
  // Funktion zum setzen eines State innerhalb eines Objectes. Setzt für das Object a den State b auf c
  setObjectState(target, key, value) {
    this.setState({[target]: {
      ...this.state[target],
      [key]: value
  }})
  }

  // Funktion zum setzen eines State innerhalb des Modal-Objectes.
    setModalState(key, value) {
    this.setState({ modal : {
      [key]: value
  }})
  }

  // Funktion zum setzen eines State innerhalb eines Objectes. Setzt für das Object a den State b auf c
  setMultiObjectState(target, key, value, key2, value2) {
    this.setState({[target]: {
      ...this.state[target],
      [key]: value,
      [key2]: value2
  }})
  } 

          // Handling von Userinputs für die Erstellung eines neuen Schichtplans
    handleInputChange = (event, target) => {
        this.setObjectState(target, event.target.name, event.target.value);
    }
    

    getDates = (value1, key1, value2, key2) => {
        let val1 = moment(value1, "DD.MM.YYYY").locale("de").format("l");
        let val2 = moment(value2, "DD.MM.YYYY").locale("de").format("l");
      this.setMultiObjectState("updateProfile", key1, val1, key2, val2)
    }

    handleUpdateProfile() {
      this.updateProfile(this.setSingleState);
    }

    async updateProfile(setSingleState) {
        console.log("moin")
        console.log(this.state.updateProfile)
        const apiName = 'api00f496d2'; // replace this with your api name.
        const path = '/organisation/profile'; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            headers: {
            Authorizer:`Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
          },
          body: this.state.updateProfile
        };
        await API.post(apiName, path, myInit)
         .then(
          setSingleState("fetchOrg", !0)
            // Add your code here
            );
        };
        async getOrg(setSingleState) {
            const apiName = 'api00f496d2'; // replace this with your api name.
            const path = '/organisation/get-profile'; //replace this with the path you have configured on your API
            const myInit = { // OPTIONAL
                headers: {
                Authorizer:`Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
              } // OPTIONAL
            };
            return await API.get(apiName, path, myInit)
             .then(response => {
                // Add your code here
                setSingleState("org", response.Item);
                setSingleState("fetchOrg", !1)
                });
            };
    render() {
        return(
      <>
      <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Einstellungen</h3>
              </CardHeader>
                <CardBody>
                    <Navs
                    getDates={this.getDates}
                    onChange={this.handleInputChange}
                    onClick={this.handleUpdateProfile}
                    org={this.state.org}
                    ></Navs>
                </CardBody>
            </Card>
          </div>
        </Row>
    </>
            );
        }
    }