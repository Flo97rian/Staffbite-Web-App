// Button der 3 Mal belegt werden kann
// Button um einen erstellten Schichtplan zu auszuwählen
import React from "react";
import Form from "react-bootstrap/Form";
import { Row, Col, Card, CardBody, Button, Badge } from "reactstrap";
import InputForm from "./InputForm"
import Switch from "../../../Application/functionalComponents/Switch";
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
                <Switch info={true} type="switch" label="Stundenerfassung" description={"Mit dieser Einstellung können Sie die Stundenerfassung von Staffbite nutzen. Hinweis: Diese Funktion ist kostenpflichtig."} name="stundenerfassung" value={this.props.org?.stundenerfassung ? this.props.org?.stundenerfassung["BOOL"] : false} onChange={(e) => this.props.onChange(e, "meta")}></Switch>
                </CardBody>
                <br/>
                <Row className="m-2 mb-4">
                    <Col xs={12}>
                    <InfoOverlay infotitle={"Schichten löschen"} description={"Löschen Sie mit einem Click"}></InfoOverlay>
                    {this.props.org.schichten ? 
                    this.props.org.schichten.map((item, index) => {
                        return (
                            <Badge key={index} className="ml-2 mt-2" color="warning" onClick={() => this.props.handleRemovePositions(item)}>{item}</Badge>
                        )
                    })
                    :
                    <></>}
                    </Col>
                    </Row>
            </Card>
            </>
        );
    }
}