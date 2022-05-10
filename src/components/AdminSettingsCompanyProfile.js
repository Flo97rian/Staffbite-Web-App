// Button der 3 Mal belegt werden kann
// Button um einen erstellten Schichtplan zu auszuwählen
import React from "react";
import Form from "react-bootstrap/Form";
import { Row, Col, Card, CardBody, Button, Badge, Input } from "reactstrap";
import InputForm from "./CompanyNameForm"
import { INFO_ORGANISATION_FIRSTNAME_AND_LASTNAME, INFO_ORGANISATION_NAME, INFO_ORGANISATION_POSITIONS, INFO_ORGANISATION_STUNDENERFASSUNG } from "../constants/InfoTexts";
import InfoLabel from "./InfoLabel";
import CompanyNameForm from "./CompanyNameForm";
import PropTypes from "prop-types";
import CustomerPortal from "../api/CustomerPortal/CustomerPortal";

const AdminSettingsCompanyProfile = (props) => {
    const {
        org,
        onChange,
        onClick, 
    } = props;

        return (
            <>
            <Row className="mt-6">
            <Col xs={2}className="mt-4">
                <h3 className="float-left pt-4 font-weight-bold text-lg">Einstellungen</h3>
            </Col>
            <Col xs={10}>
                <Button className="float-right mt-4 button_speichern" color="primary" onClick={() => onClick()}><p className="m-0 text-white">Änderungen speichern</p></Button>
            </Col>
            </Row>
            <Card className="shadow">
                <CardBody>
                <InfoLabel title="Name des Betriebs" description={INFO_ORGANISATION_NAME}></InfoLabel>
                <CompanyNameForm name={"name"} placeholder={org?.name} onChange={onChange}/>
                <InfoLabel title="Dein Vor- & Nachname" description={INFO_ORGANISATION_NAME}></InfoLabel>
                <InputForm name="vorname" placeholder={org.vorname}/>
                </CardBody>
                <CustomerPortal CustomerID={org?.tenantCategorie?.paymentDetails?.customerID}/>
            </Card>
            </>
        );
}
export default AdminSettingsCompanyProfile;