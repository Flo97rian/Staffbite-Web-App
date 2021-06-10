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
import { Auth } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import { Mitarbeiter } from "../../models";
import MitarbeiterTabelle from "./MitarbeiterTabelle.js";
import ButtonMitarbeiterErstellen from "./Modal/ButtonMitarbeiterErstellen.js";
import OpenModal from "./Modal/OpenModal.js";
import { UsernameAttributes } from "aws-amplify-react";

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
        this.handleSave = this.handleSave.bind(this);
        this.checkModalKey = this.checkModalKey.bind(this);
        this.checkTrue = this.checkTrue.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.checkErstellen = this.checkErstellen.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.mitarbeiterSpeichern = this.mitarbeiterSpeichern.bind(this);
        this.mitarbeiterUpdate = this.mitarbeiterUpdate.bind(this);
        this.handleBearbeiten = this.handleBearbeiten.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.stateSwitch = this.stateSwitch.bind(this);
        this.currentUser = this.currentUser.bind(this);
    }

    currentUser() {
    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  }).then(user => console.log(user.attributes.sub))
  .catch(err => console.log(err));
}

    componentDidMount() {
        this.loadMitarbeiter();
          }

    
    componentDidUpdate(prevState) {

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
      }})
    }
    // Filtert auf Basis der Id, die zugehörigen Mitarbeiterdaten
    handleFilter(idToSearch) {
      let key = this.state.mitarbeiter;
      let data = key.filter(item => {
          return item.id === idToSearch
      })
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
      console.log(value);
      if (value === "on") {
        const state = this.handleSwitch(event);
        console.log(state);
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
        const todelete = await DataStore.query(Mitarbeiter, e);
        try{
            await DataStore.delete(todelete);
        } catch (error) {
            return console.log("Error saving post", error);
          }
        };

    handleUpdate(e) {
      console.log(this.state)
      this.mitarbeiterUpdate(e);
      this.hideModal(e["id"]);
      console.log(this.state);
      this.setState(state => {
        return {
            loading : state = true
        }
    })
    }
    // Aktualisiert einen Mitarbeiter in der Datenbank
    async mitarbeiterUpdate(e) {
        const original = await DataStore.query(Mitarbeiter, e["id"]);

        try {
            await DataStore.save(
            Mitarbeiter.copyOf(original, updated => {
            updated.id = e["id"];
            updated.aktiv =  this.state.mitarbeiterBearbeiten.aktiv;
            updated.name = this.state.mitarbeiterBearbeiten.name;
            updated.email = this.state.mitarbeiterBearbeiten.email;
            updated.stundenlohn = Number( this.state.mitarbeiterBearbeiten.stundenlohn);
            updated.zielmtleuro = Number(this.state.mitarbeiterBearbeiten.zielmtleuro);
            updated.zielmtlh = Number( this.state.mitarbeiterBearbeiten.zielmtlh);
            updated.ueberstunden =  this.state.mitarbeiterBearbeiten.ueberstunden;
            updated.frei =  this.state.mitarbeiterBearbeiten.frei;
            updated.erfahrung =  this.state.mitarbeiterBearbeiten.erfahrung;
            updated.schichtenwoche = Number( this.state.mitarbeiterBearbeiten.schichtenwoche);
            })
        );
        return console.log("Transfer commited");
    
        } catch (error) {
        return console.log("Error saving post", error);
        }
    };

    // Läd alle Mitarbeiter aus der Datenbank
    async loadMitarbeiter() {
        let self = this

        let datastoreMitarbeiter = await DataStore.query(Mitarbeiter);
        let mitarbeiter = _.map(datastoreMitarbeiter, item => {
        return {
            id: item.id,
            email: item.email,
            aktiv: item.aktiv,
            name: item.name,
            stundenlohn: item.stundenlohn,
            zielmtleuro: item.zielmtleuro,
            zielmtlh: item.zielmtlh,
            ueberstunden: item.ueberstunden,
            frei: item.frei,
            erfahrung: item.erfahrung,
            schichtenwoche: item.schichtenwoche
        };
        });
        self.setState(state => {
            return {
                mitarbeiter : state = mitarbeiter,
            }
        })

        self.setState(state => {
            return {
                loading : state = false
            }
        })
    };

    handleSave() {
      this.mitarbeiterSpeichern();
      this.hideModal("showErstellen");
      this.setState(state => {
        return {
            loading : state = true
        }
    })
    }
    //Speichert einen neuen Mitarbeiter in der Datenbank
    async mitarbeiterSpeichern() {
        try {
          await DataStore.save(
            new Mitarbeiter({
              aktiv: true,
              name: this.state.neuerMitarbeiter.name,
              email: this.state.neuerMitarbeiter.email,
              stundenlohn: Number(this.state.neuerMitarbeiter.stundenlohn),
              zielmtleuro: Number(this.state.neuerMitarbeiter.zielmtleuro),
              zielmtlh: Number(this.state.neuerMitarbeiter.zielmtlh),
              ueberstunden: false,
              frei: false,
              erfahrung: this.state.neuerMitarbeiter.erfahrung,
              schichtenwoche: Number(this.state.neuerMitarbeiter.schichtenwoche)
          })
      );
        return console.log("Transfer commited");
    
      } catch (error) {
        return console.log("Error saving post", error);
      }
    };

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
                    handleDelete={this.handleDelete}
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
            checkModalKey={this.checkModalKey}
            checkTrue={this.checkTrue}
            handleFilter={this.handleFilter}
            handleSave={this.handleSave}
            checkErstellen={this.checkErstellen}
            handleBearbeiten={this.handleBearbeiten}
            ></OpenModal>
            </>
        );
    }
}

