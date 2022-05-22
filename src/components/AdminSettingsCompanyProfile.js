// Button der 3 Mal belegt werden kann
// Button um einen erstellten Schichtplan zu auszuwählen
import React from "react";
import { Row, Col, Card, CardBody, Button, Input, FormGroup } from "reactstrap";
import { INFO_ORGANISATION_FIRSTNAME_AND_LASTNAME, INFO_ORGANISATION_NAME } from "../constants/InfoTexts";
import InfoLabel from "./InfoLabel";
import CustomerPortal from "../api/CustomerPortal/CustomerPortal";
import { useSelector, useDispatch } from "react-redux";
import { resettingUserInput, settingCompanyName, settingCompanySurname } from "../reducers/userInput";
import { thunkUpdateProfile } from "../store/middleware/UpdateProfile";


const AdminSettingsCompanyProfile = (props) => {
    const dispatch = useDispatch()
    const CustomerID = useSelector(state => state.Meta?.tenantCategorie?.paymentDetails?.CustomerID)
    const CompanyName = useSelector(state => state.Meta.name);
    const CompanySurname = useSelector(state => state.Meta.vorname);
    const Meta = useSelector(state => state.Meta);
    const userInput = useSelector(state => state.userInput);

    const updateProfile = () => {
        dispatch(
          thunkUpdateProfile({
            ...Meta,
            name: userInput.companyName || Meta.name,
            fair: userInput.shiftplanFillingFair || Meta.fair,
            reverse: userInput.shiftplanFillingReverse || Meta.reverse,
            vorname: userInput.companySurname || Meta.vorname
          })
        );
        dispatch(resettingUserInput());
      }

        return (
            <>
            <Row className="mt-6">
            <Col xs={2}className="mt-4">
                <h3 className="float-left pt-4 font-weight-bold text-lg">Einstellungen</h3>
            </Col>
            <Col xs={10}>
                <Button className="float-right mt-4 button_speichern" color="primary" onClick={() => updateProfile()}><p className="m-0 text-white">Änderungen speichern</p></Button>
            </Col>
            </Row>
            <Card className="shadow">
                <CardBody>
                    <Row>
                        <Col xs="12" md="6" lg="4">
                            <FormGroup>
                                <InfoLabel title="Name des Betriebs" description={INFO_ORGANISATION_NAME}></InfoLabel>
                                <Input
                                id="exampleFormControlInput1"
                                placeholder={CompanyName}
                                type="text"
                                className="form-control-alternative edit-event--description input-autosize form-control input_betrieb"
                                onChange={(event) => dispatch(settingCompanyName(event.target.value))}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" md="6" lg="4">
                            <FormGroup>
                                <InfoLabel title="Vor- & Nachname" description={INFO_ORGANISATION_FIRSTNAME_AND_LASTNAME}></InfoLabel>
                                <Input
                                id="exampleFormControlInput1"
                                placeholder={CompanySurname}
                                type="text"
                                className="form-control-alternative edit-event--description input-autosize form-control input_betrieb"
                                onChange={(event) => dispatch(settingCompanySurname(event.target.value))}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
                <CustomerPortal CustomerID={CustomerID}/>
            </Card>
            </>
        );
}
export default AdminSettingsCompanyProfile;