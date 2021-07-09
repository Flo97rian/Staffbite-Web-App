import React from "react";
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

import _ from "lodash";
import { API, Auth } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import { Mitarbeiter } from "../../models";
import MitarbeiterTabelle from "./MitarbeiterTabelle.js";
import ButtonMitarbeiterErstellen from "./Modal/ButtonMitarbeiterErstellen.js";
import OpenModal from "./Modal/OpenModal.js";

export default class TableContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            modal: {},
            mitarbeiter: {},
            neuerMitarbeiter: {},
            mitarbeiterBearbeiten: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.checkModalKey = this.checkModalKey.bind(this);
        this.checkTrue = this.checkTrue.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.checkErstellen = this.checkErstellen.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.mitarbeiterUpdate = this.mitarbeiterUpdate.bind(this);
        this.handleBearbeiten = this.handleBearbeiten.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.stateSwitch = this.stateSwitch.bind(this);
        this.registerMitarbeiter = this.registerMitarbeiter.bind(this)
        this.handleRegister = this.handleRegister.bind(this);
    }


    componentDidMount() {
        this.loadMitarbeiter();
          }

    
    componentDidUpdate(prevProps, prevState) {
      console.log(this.state)
    if (prevState.loading !== this.state.loading) {
      this.loadMitarbeiter();
    }
    }

    // Öffnet ein Modal im Bereich Mitarbeiter verwalten auf Basis des ModalKeys. (Mitarbeiter erstellen, Mitarbeiter bearbeiten)
    showModal = (e) => {
        const key = this.handleBearbeiten(e);
        const val = true;
        this.setState({modal : {
          ...this.state.modal,
          [key]: val
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

    // Filtert auf Basis der Id, die zugehörigen Mitarbeiterdaten
    handleFilter(idToSearch) {
      let key = this.state.mitarbeiter;
      let data = key.filter(item => {
          return item.id === idToSearch
      });
      return data[0]
  }
    // Handling von Userinputs für die Erstellung eines neuen Mitarbeiters
    handleChange = (event, target) => {
        const keytarget = target 
        const key = event.target.name;
        const val = this.stateSwitch(event.target.value, event);
  
        this.setState({[keytarget]: {
            ...this.state[keytarget],
            [key]: val
        }})
    }

    stateSwitch(value, event) {
      if (value === "on") {
        const state = this.handleSwitch(event);
        return state
      } else {
        return value
      }
    }

    handleSwitch(e) {
      if (e.target.checked === false) {
        return false
      } else {
        return true
      }
    }

    // Initinalisieren der Daten für handleChange einzelner Mitarbeiter
    handleBearbeiten(e) {
        if (e !== "showErstellen") {
          const mitarbeiterdaten = this.handleFilter(e);
          this.setState(state => { 
            return {
            mitarbeiterBearbeiten : state = mitarbeiterdaten
            }
          })
          return e
        } else {
          return e
        }
    }

    // Untersucht, ob ein anderes Modal als Mitarbeiter erstellen auf true steht
    checkErstellen(e) {
      const ids = Object.entries(e).map(([key, value]) => {if (value === true) {return key} else {return null}});
      const showtrue = ids.includes("showErstellen");
      return showtrue
    }

    // Untersucht, ob der Wert eines Modals auf auf true steht und gibt den zugehörigen Key zurück
    checkModalKey(e) {
      const ids = Object.entries(e).map(([key, value]) => {if (value === true) {return key} else {return null}});
      const idfilter = ids.filter((id) => typeof id === "string");
      const id = idfilter[0];
      return id;
    }

    // Untersucht, ob der Wert eines Modals auf true steht und gibt den Wert true zurück
    checkTrue (e) {
      const modals = Object.entries(e).map(([key, value]) => {return value})
      const truemodal = modals.includes(true)
      return truemodal
    }

    // Handling des Löschens von Mitarbeitern
    handleDelete(e) {
      this.loeschenMitarbeiter(e);
      this.setState(state => {
        return {
            loading : state = true
        }
    })
    }
    // Löscht einen Mitarbeiter aus der Datenbank
    async loeschenMitarbeiter(e) {
      const apiName = 'api00f496d2'; // replace this with your api name.
      const path = '/employee/delete'; //replace this with the path you have configured on your API
      const myInit = { // OPTIONAL
          headers: {
          Authorizer:`Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
        },
        queryStringParameters: {
          id: e,
        } // OPTIONAL
      };
      return await API.post(apiName, path, myInit)
       .then(response => {
          // Add your code here
       });
        };

    handleUpdate(e) {
      this.mitarbeiterUpdate(e);
      this.hideModal(e["id"]);
      this.setState(state => {
        return {
            loading : state = true
        }
    })
    }
    // Aktualisiert einen Mitarbeiter in der Datenbank
    async mitarbeiterUpdate() {

      const apiName = 'api00f496d2'; // replace this with your api name.
      const path = '/employee/update'; //replace this with the path you have configured on your API
      const myInit = { // OPTIONAL
          headers: {
          Authorizer:`Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
        },
        queryStringParameters: {
          email: this.state.mitarbeiterBearbeiten["email"],
          aktiv: this.state.mitarbeiterBearbeiten["aktiv"],
          name: this.state.mitarbeiterBearbeiten["name"],
          frei: this.state.mitarbeiterBearbeiten["frei"],
          stundenlohn: this.state.mitarbeiterBearbeiten["stundenlohn"],
          zielmtleuro: this.state.mitarbeiterBearbeiten["zielmtleuro"],
          zielmtlh: this.state.mitarbeiterBearbeiten["zielmtlh"],
          ueberstunden: this.state.mitarbeiterBearbeiten["ueberstunden"],
          erfahrung: this.state.mitarbeiterBearbeiten["erfahrung"],
          schichtenwoche: this.state.mitarbeiterBearbeiten["schichtenwoche"],
          id: this.state.mitarbeiterBearbeiten["id"],
        } // OPTIONAL
      };
      return await API.post(apiName, path, myInit)
       .then(response => {
          // Add your code here
       });
    };

    // Läd alle Mitarbeiter aus der Datenbank
    async loadMitarbeiter() {
      const apiName = 'api00f496d2'; // replace this with your api name.
      const path = '/employee/getall'; //replace this with the path you have configured on your API
      const myInit = { // OPTIONAL
          headers: {
          Authorizer:`Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
        }}; 

  return await API.get(apiName, path, myInit)
   .then(response => {
    let mitarbeiter = _.map(response.Items, item => {
      return {
          frei: item.frei["BOOL"],
          name: item.name["S"],
          aktiv: item.aktiv["BOOL"],
          email: item.email["S"],
          stundenlohn: item.stundenlohn["N"],
          zielmtleuro: item.zielmtleuro["N"],
          zielmtlh: item.zielmtlh["N"],
          ueberstunden: item.ueberstunden["BOOL"],
          id: item.SK["S"],
          erfahrung: item.erfahrung["S"],
          schichtenwoche: item.schichtenwoche["N"]
      };
      });
        this.setState(state => {
          return {
            mitarbeiter : state = mitarbeiter,
          }
      });
      this.setState(state => {
        return {
          loading : state = false
          }
      });
      // Add your code here
   });
    };


    handleRegister(e) {
      this.registerMitarbeiter(e)
      console.log(e);
      this.hideModal(e);
      this.setState(state => {
        return {
            loading : state = true
        }
    })
    }

    async registerMitarbeiter(e) {
      const modalkey = e;
      const apiName = 'api00f496d2'; // replace this with your api name.
      const path = '/register'; //replace this with the path you have configured on your API
      const myInit = { // OPTIONAL
          headers: {
          Authorizer:`Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
        },
        queryStringParameters: {
          email: this.state.neuerMitarbeiter["email"],
          name: this.state.neuerMitarbeiter["name"],
          stundenlohn: this.state.neuerMitarbeiter["stundenlohn"],
          zielmtleuro: this.state.neuerMitarbeiter["zielmtleuro"],
          zielmtlh: this.state.neuerMitarbeiter["zielmtlh"],
          ueberstunden: this.state.neuerMitarbeiter["ueberstunden"],
          erfahrung: this.state.neuerMitarbeiter["erfahrung"],
          schichtenwoche: this.state.neuerMitarbeiter["schichtenwoche"],
        } // OPTIONAL
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
                <h3 className="mb-0">Mitarbeiter:innen verwalten</h3>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs={4}>
                  </Col>
                  <Col xs={4}>
                    <ButtonMitarbeiterErstellen onClick={this.showModal}></ButtonMitarbeiterErstellen>{' '}
                  </Col>
                  <Col xs={4}>
                  </Col>
                </Row>
                <br />
                <Row>
                    <MitarbeiterTabelle 
                    mitarbeiter={this.state.mitarbeiter} 
                    loading={this.state.loading}
                    onClick={this.showModal}
                    >
                    </MitarbeiterTabelle>
                </Row>
              </CardBody>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
            <OpenModal
            onChange={this.handleChange}
            onSave={this.handleSave}
            handleUpdate={this.handleUpdate}
            show={this.state.modal}
            onHide={this.hideModal}
            onClick={this.showModal}
            handleRegister={this.handleRegister}
            checkModalKey={this.checkModalKey}
            checkTrue={this.checkTrue}
            handleFilter={this.handleFilter}
            handleSave={this.handleSave}
            checkErstellen={this.checkErstellen}
            handleBearbeiten={this.handleBearbeiten}
            handleDelete={this.handleDelete}
            ></OpenModal>
            </>
        );
    }
}

