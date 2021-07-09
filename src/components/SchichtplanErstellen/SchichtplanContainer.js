import React from "react";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import 'moment/locale/de';
import {
    Card,
    Col,
    CardHeader,
    Row,
    CardBody
  } from "reactstrap";

import _ from "lodash";
import Button from 'react-bootstrap/Button';
import { API, Auth } from "aws-amplify";
import SchichtenTable from './SchichtplanListe/SchichtenTable';
import OpenModal from './Modal/OpenModal';
import SchichtplanButtonSave from "./FormElements/SchichtplanButtonSave";
import SchichtplanButton from "./FormElements/SchichtplanButton";

export default class TableContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            bearbeiten: false,
            modal: {},
            neuerSchichtplan: {
                Montag: true,
                Dienstag: true,
                Mittwoch: true,
                Donnerstag: true,
                Freitag: true,
                Samstag: true,
                Sonntag: true
            }
        };
        this.checkModalKey = this.checkModalKey.bind(this);
        this.checkTrue = this.checkTrue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.stateSwitch = this.stateSwitch.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.schichtplanErstellen = this.schichtplanErstellen.bind(this);
        this.getDates = this.getDates.bind(this);
        this.setSchichtplan = this.setSchichtplan.bind(this);
        this.schichtplanImportBearbeiten = this.schichtplanImportBearbeiten.bind(this);
        this.handleBearbeiten = this.handleBearbeiten.bind(this);
        this.deleteSchichtplan = this.deleteSchichtplan.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.setBearbeiten = this.setBearbeiten.bind(this);
        this.schichtHinzufuegen = this.schichtHinzufuegen.bind(this);
      }

      // Initiales Laden der Schichtpläne aus der Datenbank
      componentDidMount() {
        this.loadPlaene();
        console.log(this.state);
          }

    
    // Läd die Schichtpläne neu aus der Datenbank, wenn der Wert loading auf true geändert wurde.
    // Passiert, wenn zuvor ein Schichtplan geändert oder erstellt wurde
    // somit werden die Pläne local und in der Cloud syncron gehalten
    componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
    if (prevState.loading !== this.state.loading) {
        this.loadPlaene();
    }
    }

    // Funktion zur Festellung, ob ein Schichtplan bearbeitet wird
    setBearbeiten(e) {
        this.setState(state => {
            return {
                bearbeiten : state = e
            }
        })
    }
    // Untersucht, ob der Wert eines Modals auf true steht und gibt den Wert true zurück
    checkTrue (e) {
        const modals = Object.entries(e).map(([key, value]) => {return value})
        const truemodal = modals.includes(true)
        return truemodal
      }

          // Handling von Userinputs für die Erstellung eines neuen Schichtplans
    handleChange = (event, target) => {
        const keytarget = target 
        const key = event.target.name;
        const val = this.stateSwitch(event.target.value, event);
  
        this.setState({[keytarget]: {
            ...this.state[keytarget],
            [key]: val
        }})
    }

    // Überprüfung von Userinputs, ob der Input vom Typ Switch ist
    stateSwitch(value, event) {
        if (value === "on") {
          const state = this.handleSwitch(event);
          return state
        } else {
          return value
        }
      }

      // Diese Funktion setzt den zum importieren ausgewählten Schichtplan als zu bearbeiten Schichtplan ein.
      // Der ausgewählte Schichtplan wird in this.state.schichtplan gespeichert.
      // Die Informationen Name des Schichtplans, Anzahl der Schichten pro Tag und die ID des Schichtplans werden in this.state.details gespeichert
      setSchichtplan(e) {
        for (let i = 0; i < this.state.plaene.length; i++) {
            if (this.state.plaene[i]["name"] === e) {
                var schichtplan = this.state.plaene[i].plan.plan
                var details = {name : this.state.plaene[i]["name"], schichtentag : this.state.plaene[i]["schichtentag"], id: this.state.plaene[i]["id"]}
                this.setState({
                    ...this.state,
                    schichtplan,
                    details
                });
                this.setBearbeiten(true);
            }
        }
        this.hideModal("showSchichtplanImportieren");
      }
  
      // Diese Funktion ändert den Wert eines Switches, je nach userinput
      handleSwitch(e) {
        if (e.target.checked === false) {
          return false
        } else {
          return true
        }
      }

      // Diese Funktion setzt je nach input e den state für ein Modal auf true
      showModal = (e) => {
          console.log(this.state);
          const val = true;
          this.setState({modal : {
            ...this.state.modal,
            [e]: val
        }})
      }

          // Schließt ein Modal im Bereich Mitarbeiter verwalten auf Basis der "id". (Mitarbeiter erstellen, Mitarbeiter bearbeiten)
    hideModal = (e) => {
        const key = e
          const val = false;
          this.setState({modal : {
            ...this.state.modal,
            [key]: val
        }});
      }

      // Diese Funktion sorgt für die Speicherung eines neuen Schichtplans und schließt im Anschluss das zugehörige Modal
      handleSave() {
        this.schichtplanErstellen();
        this.hideModal("showSchichtplanErstellen");
      }

      handleBearbeiten(e) {
        this.schichtplanImportBearbeiten(e);
        this.hideModal(e);
      }
    
      // Untersucht, ob der Wert eines Modals auf auf true steht und gibt den zugehörigen Key zurück
    checkModalKey(e) {
        const ids = Object.entries(e).map(([key, value]) => {if (value === true) {return key} else {return null}});
        const idfilter = ids.filter((id) => typeof id === "string");
        const id = idfilter[0];
        return id;
      }


      schichtplanImportBearbeiten(e) {
        var wochentag = [this.state.changeSchichtplan.rolle, this.state.changeSchichtplan.beginn, this.state.changeSchichtplan.ende]
        let schichtplan = [...this.state.schichtplan];
        let item = {...schichtplan[e]};
        item.Wochentag = wochentag;
        schichtplan[e] = item;
        this.setState({schichtplan});
      };

      getDates = (val1, key1, val2, key2) => {
          this.setState({["neuerSchichtplan"]: {
            ...this.state["neuerSchichtplan"],
            [key1]: val1,
            [key2]: val2
        }})

      }

    schichtHinzufuegen(e) {
        let schichtplan = [...this.state.schichtplan];
        var element = schichtplan.length - 1
        var input = {Wochentag: [this.state.changeSchichtplan.rolle, this.state.changeSchichtplan.beginn, this.state.changeSchichtplan.ende ], Montag: 0, Dienstag: 0, Mittwoch: 0, Donnerstag: 0, Freitag: 0, Samstag: 0, Sonntag: 0}
        var keys = Object.keys(input);
        keys.shift()
        keys.forEach(key => {
        input[key] = "<br />"
        var info = key + "Color";
        if (this.state.neuerSchichtplan[key] == false) { 
          var color = "dark"; 
        } else { 
          var color = "" 
        }
        input[info] = color;
      });
        schichtplan.splice(element, 0, input);
        this.setState({schichtplan});
        this.hideModal(e);
      }

    schichtplanErstellen() {
        var Details = {}
        var schichtplan = [
            {Wochentag: "Datum"},
            {Wochentag: "Wochentag", Montag: "Montag", Dienstag: "Dienstag", Mittwoch: "Mittwoch", Donnerstag: "Donnerstag", Freitag: "Freitag", Samstag: "Samstag", Sonntag: "Sonntag"},
        ]
        Details['Name'] = this.state.neuerSchichtplan["name"];
        Details['SchichtenTag'] = this.state.neuerSchichtplan["schichtentag"];
        for (let i = 0; i < Details["SchichtenTag"]; i++) {
            schichtplan.push({})
        }
        var keys = Object.keys(schichtplan[1]);
        keys.shift()
        keys.forEach(key => schichtplan[0][key] = moment(this.state.neuerSchichtplan["WochenStart"], "DD.MM.YYYY").add(keys.indexOf(key), "d").locale("de").format("l"))
        var keys = Object.keys(schichtplan[1]);
        keys.forEach(key => {for (let i = 2; i < schichtplan.length ; i++) {
        schichtplan[i][key] = "<br />"
        var info = key + "Color";
        if (this.state.neuerSchichtplan[key] == false) {
            var color = "dark";
        } else {
            var color = "";
        };
        schichtplan[i][info] = color;
        }});
        var keys = Object.keys(schichtplan[1]);
        keys.forEach(key => {for (let i = 0; i < 2 ; i++) {
            var info = key + "Color";
            schichtplan[i][info] = "primary";
        }});
        schichtplan.push({Wochentag: "Summe", Montag: 0, Dienstag: 0, Mittwoch: 0, Donnerstag: 0, Freitag: 0, Samstag: 0, Sonntag: 0})
            this.setState({
                ...this.state,
                schichtplan,
                Details
            })
    }

    async loadPlaene() {
        const apiName = 'api00f496d2'; // replace this with your api name.
        const path = '/schichtplan/getall'; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            headers: {
            Authorizer:`Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
          } // OPTIONAL
        };
        return await API.get(apiName, path, myInit)
         .then(response => {
            let plaene = _.map(response.Items, item => {
                return {
                    id: item.SK["S"],
                    name: item.name["S"],
                    plan: JSON.parse(item.data["S"]),
                    schichtentag: item.schichtentag["N"]
                };
            });
            this.setState(state => {
              return {
                plaene : state = plaene,
                loading : state = false
              }
            });
            // Add your code here
            });
        };

    handleUpload() {
        this.uploadSchichtplanErstellen()
        this.setState(state => {
            return {
                loading : state = true
            }
        })
    }

    async uploadSchichtplanErstellen() {
    console.log(this.state);
    const apiName = 'api00f496d2'; // replace this with your api name.
    const path = '/schichtplan/speichern'; //replace this with the path you have configured on your API
    const myInit = { // OPTIONAL
        headers: {
        Authorizer:`Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
      },
      queryStringParameters: {
          id: uuidv4(),
          name: this.state.Details.Name,
          schichtentag: this.state.Details.SchichtenTag
      }, // OPTIONAL
      body: {
        plan: this.state.schichtplan
      }
    };
    return await API.post(apiName, path, myInit)
     .then(response => {
        // Add your code here
     });
    }

    handleUpdate() {
        this.updateSchichtplan();
        this.setState(state => {
            return {
                loading : state = true
            }
        })
    }

    async updateSchichtplan() {
    console.log(this.state)
    const apiName = 'api00f496d2'; // replace this with your api name.
    const path = '/schichtplan/update'; //replace this with the path you have configured on your API
    const myInit = { // OPTIONAL
        headers: {
        Authorizer:`Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
      },
      queryStringParameters: {
          id: this.state.details.id,
          name: this.state.details.name,
          schichtentag: this.state.details.schichtentag
      }, // OPTIONAL
      body: {
        plan: this.state.schichtplan
      }
    };
    return await API.post(apiName, path, myInit)
     .then(response => {
        // Add your code here
     });

    }

    async deleteSchichtplan(e) {
        console.log(e)
        console.log(this.state.plaene[e].id)
        const apiName = 'api00f496d2'; // replace this with your api name.
        const path = '/schichtplan/delete'; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            headers: {
            Authorizer:`Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
          },
          queryStringParameters: {
              id: this.state.plaene[e].id,
          }, // OPTIONAL
        };
        return await API.post(apiName, path, myInit)
         .then(response => {
            // Add your code here
         });
        }

    render() {
        return(

    <>
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Schichtplan erstellen</h3>
              </CardHeader>
              <CardBody>
                <Row className="text-center" noGutters={true}>
                  <Col xs={1}>
                    <span className="ni ni-bold-left"></span>
                  </Col>
                  <Col xs={3} className="text-right">
                  <SchichtplanButton
                  b1titel="Schichtplan wechseln"
                  b2titel="Schichtplan importieren"
                  b1onClick={this.showModal}
                  b1onClickVal="showSchichtplanImportieren"
                  b2onClick={this.showModal}
                  b2onClickVal="showSchichtplanImportieren"
                  true={this.state.bearbeiten}
                  ></SchichtplanButton>
                  </Col>
                  <Col xs={4} className="text-center">
                  <SchichtplanButton
                  b1titel="Schicht hinzufügen"
                  b2titel="Schichtplan erstellen"
                  b1onClick={this.showModal}
                  b1onClickVal="showSchichthinzufuegen"
                  b2onClick={this.showModal}
                  b2onClickVal="showSchichtplanErstellen"
                  true={this.state.schichtplan}
                  ></SchichtplanButton>
                  </Col>
                  <Col xs={3} className="text-left">
                  <SchichtplanButtonSave
                  b1titel="Schichtplan aktualisieren"
                  b2titel="Schichtplan speichern"
                  b1onClick={this.handleUpdate}
                  b1onClickVal=""
                  b2onClick={this.handleUpload}
                  b2onClickVal=""
                  true={this.state.bearbeiten}
                  new={this.state.schichtplan}
                  ></SchichtplanButtonSave>
                  </Col>
                  <Col xs={1}>
                    <span className="ni ni-bold-right"></span>
                  </Col>
                </Row>
                <br />
                 <SchichtenTable 
                  Schichtplan={this.state.schichtplan}
                  onClick={this.showModal}
                 />
                </CardBody>
            </Card>
      <OpenModal
            show={this.state.modal}
            onSave={this.handleSave}
            onHide={this.hideModal}
            onClick={this.showModal}
            onChange={this.handleChange}
            checkTrue={this.checkTrue}
            checkModalKey={this.checkModalKey}
            getDates={this.getDates}
            plaene={this.state.plaene}
            Schichtplan={this.state.schichtplan}
            onSelect={this.setSchichtplan}
            onSaveBearbeiten={this.handleBearbeiten}
            onDelete={this.deleteSchichtplan}
            onSaveHinzufuegen={this.schichtHinzufuegen}
            ></OpenModal>
    </>
            );
        }
    }