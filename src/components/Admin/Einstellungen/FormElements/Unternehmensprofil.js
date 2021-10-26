// Button der 3 Mal belegt werden kann
// Button um einen erstellten Schichtplan zu auszuwählen
import React from "react";
import Form from "react-bootstrap/Form";
import { Row, Col, Card, CardBody, Button, Badge, Input } from "reactstrap";
import InputForm from "./InputForm"
import InfoOverlay from "../../../Application/functionalComponents/InfoOverlay";

export default class Unternehmensprofil extends React.PureComponent {
    render() {
        return (
            <>
            <Row className="mt-6">
            <Col xs={2}className="mt-4">
                <h3 className="float-left pt-4 font-weight-bold text-lg">Einstellungen</h3>
            </Col>
            <Col xs={10}>
                <Button className="float-right mt-4" color="primary" onClick={() => this.props.onClick()}><p className="m-0 text-white">Änderungen speichern</p></Button>
            </Col>
            </Row>
            <Card className="shadow">
                <CardBody>
                <InfoOverlay infotitle={"Name"} description={"Tragen Sie hier den Namen ihres Betriebs ein."}/>
                <InputForm {...this.props}/>
                <br/>
                <InfoOverlay infotitle={"Stundenerfassung"} description={"Mit dieser Einstellung können Sie die Stundenerfassung von Staffbite nutzen. Hinweis: Diese Funktion ist aktuell noch in der Entwicklung. Schreiben Sie uns jedoch gerne, wenn Sie dieses Feature in Zukunft benutzen möchten!"}/>
                <Form.Check custom type="switch" size="lg" disabled name="stundenerfassung"></Form.Check>
                </CardBody>
                <br/>
                <Row className="m-2 mb-4">
                    <Col xs={12}>
                    <InfoOverlay infotitle={"Schichten bearbeiten"} description={"Löschen Sie mit einem Click"}></InfoOverlay>
                    {this.props.showPositionHinzufuegen ?
                    <Input type="text" size="lg" className='bg-secondary' label="Position" name="position"  placeholder="" onChange={(e) => this.props.handlePositionChange(e)}></Input>
                        :
                        <></>
                    }
                    {this.props.metaData.schichten ? 
                    this.props.metaData.schichten.map((item, index) => {
                        return (
                            <Badge key={index} className="ml-2 mt-2" color="warning" onClick={() => this.props.handleRemovePositions(item)}>{item}
                                {" "}
                                <i className="fas fa-times"></i>
                            </Badge>
                        )
                    })
                    :
                    <></>}
                    {this.props.showPositionHinzufuegen ?
                        <>
                        <Badge className="mt-2 ml-2 mb-4 mr-2" color="success" onClick={() => this.props.handlePositionErstellen()}>Position erstellen</Badge>
                        <Badge className="mt-2 mb-4" color="warning" onClick={() => this.props.handlePositionHinzufuegenClose()}>x</Badge>
                        </>
                        :
                        <Badge className="mt-2 mb-4 ml-2" color="light" onClick={() => this.props.handlePositionHinzufuegen()}>Position erstellen</Badge>
                        }
                    </Col>
                    </Row>
            </Card>
            </>
        );
    }
}