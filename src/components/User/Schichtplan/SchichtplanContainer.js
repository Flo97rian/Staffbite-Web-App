import React from "react";
import 'moment/locale/de';
import {
    Card,
    Col,
    CardHeader,
    Row,
    CardBody,
  } from "reactstrap";

import _ from "lodash";
import { API, Auth } from "aws-amplify";
import AuswahlShow from "./FormElements/AuswahlShow";
import OpenModal from "./Modal/OpenModal";

export default class TableContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fetchPlans: true,
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
        this.getApplicantDetailsFromDB = this.getApplicantDetailsFromDB.bind(this);
        this.setSingleState = this.setSingleState.bind(this);
        this.setMultiObjectState = this.setMultiObjectState.bind(this);
        this.setObjectState = this.setObjectState.bind(this);
        this.handleSwitchShiftPlan = this.handleSwitchShiftPlan.bind(this);
        this.setCurrentShiftPlan = this.setCurrentShiftPlan.bind(this);
        this.setModalApplicants = this.setModalApplicants.bind(this);
        this.checkModalKey = this.checkModalKey.bind(this);
        this.checkTrue = this.checkTrue.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleUploadApplication = this.handleUploadApplication.bind(this);
        this.handleDeleteApplication = this.handleDeleteApplication.bind(this);
        this.removeApplicant = this.removeApplicant.bind(this);
    }
          // Initiales Laden der Schichtpläne aus der Datenbank
          componentDidMount() {
            this.getPlansFromDB();
            this.getApplicantDetailsFromDB();
            this.setSingleState("ShiftPlanIsActive", !1)
            }
    
        // Läd die Schichtpläne neu aus der Datenbank, wenn der Wert loading auf true geändert wurde.
        // Passiert, wenn zuvor ein Schichtplan geändert oder erstellt wurde
        // somit werden die Pläne local und in der Cloud syncron gehalten
        componentDidUpdate(prevProps, prevState) {
        console.log(this.state);
        if (prevState.fetchPlans !== this.state.fetchPlans) {
            this.getPlansFromDB()
        }
        }

        setModalApplicants(row, column) {
        this.setObjectState("modal", "applyIsActive", !0)
        this.setState({ShiftPlanIsActive : {
            ...this.state.ShiftPlanIsActive,
            rowindex: row,
            row: this.state.plans[this.state.currentPlan].plan[row].Wochentag,
            col: column
        }})
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

        // Funktion zum setzen eines State innerhalb eines Objectes. Setzt für das Object a den State b auf c
        setMultiObjectState(target, key, value, key2, value2) {
          this.setState({[target]: {
            ...this.state[target],
            [key]: value,
            [key2]: value2
        }})
        } 

        handleSwitchShiftPlan(direction) {
          if(this.state.currentPlan + direction >= 0 && this.state.currentPlan + direction < this.state.plans.length ) {
            let changeplan = this.state.currentPlan + direction
            this.setSingleState("currentPlan", changeplan)
          } else {
            return null
          }
        }

        showModal = (modal) => {
          this.setObjectState("modal", modal, !0)
        }
        // Schließt ein Modal im Bereich Mitarbeiter verwalten auf Basis der "id". (Mitarbeiter erstellen, Mitarbeiter bearbeiten)
        hideModal = (modal) => {
            this.setObjectState("modal", modal, !1)
        }

        // Untersucht, ob der Wert eines Modals auf auf true steht und gibt den zugehörigen Key zurück
        checkModalKey(allmodals) {
            const modals = Object.entries(allmodals).map(([key, value]) => {if (value === true) {return key} else {return null}});
            const modalfilter = modals.filter((id) => typeof id === "string");
            const modal = modalfilter[0];
            return modal;
        }

        // Untersucht, ob der Wert eines Modals auf true steht und gibt den Wert true zurück
        checkTrue (modal) {
            const modals = Object.entries(modal).map(([key, value]) => {return value})
            const truemodal = modals.includes(true)
            return truemodal
        }

        // Identifikator des ausgewählten Schichtplans
        setCurrentShiftPlan(index) {
          this.setSingleState("ShiftPlanIsActive", !0);
          this.setSingleState("currentPlan", index);
          this.hideModal("showSchichtplanAuswaehlen");
        }

        // Diese Funktion ist der handler, wenn sich auf eine Schicht beworben wird. Sie schließt das Modal und leitet einen API Call ein.
        handleUploadApplication(modal) {
            this.uploadApplication();
            this.hideModal(modal)
        }


        async uploadApplication() {
            const apiName = 'api00f496d2'; // replace this with your api name.
            const path = '/schichtplan/post-bewerbung'; //replace this with the path you have configured on your API
            const myInit = { // OPTIONAL
                headers: {
                Authorizer:`Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
              },
              body: {
                  plan: this.state.plans[this.state.currentPlan].plan,
                  row: this.state.ShiftPlanIsActive.rowindex,
                  id: this.state.plans[this.state.currentPlan].id,
                  col: this.state.ShiftPlanIsActive.col
              }
            };
            return await API.post(apiName, path, myInit)
            .then(response => {
               // Add your code here
               this.setSingleState("fetchPlans", !0)
            });
        }
        async handleDeleteApplication(modal) {
          let plan = this.state.plans[this.state.currentPlan]
          let id ="EMP#"  + (await Auth.currentSession()).getIdToken().payload.sub
          let target = this.removeApplicant(plan.plan[this.state.ShiftPlanIsActive.rowindex][this.state.ShiftPlanIsActive.col]["applicants"], id)
          console.log(target);
          target ? plan.plan[this.state.ShiftPlanIsActive.rowindex][this.state.ShiftPlanIsActive.col]["applicants"] = target : delete plan.plan[this.state.ShiftPlanIsActive.rowindex][this.state.ShiftPlanIsActive.col]["applicants"]
          this.deleteApplication(plan)
          this.hideModal(modal)
        }

        removeApplicant(slot, id) {
          let target = slot
          delete target[id]
          let len =Object.keys(target).length
          if (len < 1) {return !1} else {return target};
        }

        async deleteApplication(plan) {
          const apiName = 'api00f496d2'; // replace this with your api name.
          const path = '/schichtplan/update'; //replace this with the path you have configured on your API
          const myInit = { // OPTIONAL
              headers: {
              Authorizer:`Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
            },
            body: plan
          };
          return await API.post(apiName, path, myInit)
          .then(
             // Add your code here
             this.setSingleState("fetchPlans", !0)
          );
      }

    async getPlansFromDB() {
        const apiName = 'api00f496d2'; // replace this with your api name.
        const path = '/schichtplan/employee-get'; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            headers: {
            Authorizer:`Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
          }
        };
        return await API.get(apiName, path, myInit)
         .then(response => {
            let plans = _.map(response.Items, item => {
                return {
                    id: item.SK["S"],
                    name: item.name["S"],
                    plan: JSON.parse(item.data["S"]),
                    schichtentag: item.schichtentag["N"]
                };
            });
            this.setSingleState("plans", plans);
            this.setSingleState("fetchPlans", !1);
            // Add your code here
            });
        }

      async getApplicantDetailsFromDB() {
        const apiName = 'api00f496d2'; // replace this with your api name.
        const path = '/employee/get'; //replace this with the path you have configured on your API
        const myInit = { // OPTIONAL
            headers: {
            Authorizer:`Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
          }
        };
        return await API.get(apiName, path, myInit)
          .then(response => {
            this.setSingleState("applicant", response.Item);
            this.setSingleState("fetchPlans", !1);
            // Add your code here
            });
        }

    render() {
        return(
      <>
      <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Für Schichten bewerben</h3>
              </CardHeader>
              <CardBody>
                <Row className="text-center" noGutters={true}>
                  <Col xs={1}>
                    {this.state.ShiftPlanIsActive ? <span className="ni ni-bold-left" onClick={() => this.handleSwitchShiftPlan(-1)}></span> : <></>}
                  </Col>
                  <Col xs={10} className="text-center">
                  </Col>
                  <Col xs={1}>
                    {this.state.ShiftPlanIsActive ? <span className="ni ni-bold-right" onClick={() => this.handleSwitchShiftPlan(+1)}></span> : <></>}
                  </Col>
                </Row>
                <br />
                <AuswahlShow 
                  bearbeiten={this.state.ShiftPlanIsActive}
                  onClick={this.setModalApplicants}
                  plaene={this.state.plans}
                  applicantrole={this.state.applicant}
                  plan={this.state.currentPlan}
                  onSelect={this.setCurrentShiftPlan}
                 />
              </CardBody>
            </Card>
          </div>
        </Row>
        <OpenModal
            show={this.state.modal}
            onSave={this.handleSave}
            plaene={this.state.plans}
            onHide={this.hideModal}
            onDelete={this.handleDeleteApplication}
            onBewerben={this.handleUploadApplication}
            onClick={this.setModalApplicants}
            plan={this.state.currentPlan}
            bearbeiten={this.state.ShiftPlanIsActive}
            checkTrue={this.checkTrue}
            checkModalKey={this.checkModalKey}
            ></OpenModal>
    </>
            );
        }
    }