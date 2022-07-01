import { Button, Col, Input, Row } from "reactstrap"
import { useDispatch, useSelector } from "react-redux";
import { settingAuthenticationAnswere, settingSelectedAuthenticationIndex } from "../../../../reducers/userInput";
import { settingAuthenticateAdmin, settingAuthenticationForAdmin } from "../../../../reducers/demo";
import { thunkUpdateDemo } from "../../../../store/middleware/UpdateDemo";
import { resettingModal } from "../../../../reducers/modal";

export const RegistrationFormAdmin = () => {
    const dispatch = useDispatch();
    const userInput = useSelector(state => state.userInput);
    const authenticationAnswere = useSelector(state => state.userInput.authenticationAnswere);

    const handleSetAdminAccount = () => {
        dispatch(
            settingAuthenticationForAdmin(
                {
                    authenticationAnswere: userInput.authenticationAnswere,
                    selectedAuthenticationIndex: userInput.selectedAuthenticationIndex
                }
            )
        )
        dispatch(settingAuthenticateAdmin(
            {
                authenticationAnswere: userInput.authenticationAnswere,
                selectedAuthenticationIndex: userInput.selectedAuthenticationIndex
            }
        ))
        dispatch(thunkUpdateDemo());
        dispatch(resettingModal());
    }
    return (
        <Row>
            <Col className="mx-4">
            <Row>
                <Col>
                    <h4>Wähle eine Sicherheitsfrage aus</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                <Input type="select" onChange={(event) => dispatch(settingSelectedAuthenticationIndex(event.target.selectedIndex))}>
                    <option key={1} value={"Wie hieß Ihr erstes Haustier?"}>Wie hieß Ihr erstes Haustier?</option>
                    <option key={2} value={"Wie hieß Ihr Geburtsort?"}>Wie hieß Ihr Geburtsort?</option>
                    <option key={3} value={"Wie lautete als Kind Ihr Spitzname?"}>Wie lautete als Kind Ihr Spitzname?</option>
                    <option key={4} value={"Wie lautet der Vorname Ihrer Mutter?"}>Wie lautet der Vorname Ihrer Mutter?</option>
                    <option key={5} value={"In welcher Stadt haben sich Ihre Eltern kennengelernt?"}>In welcher Stadt haben sich Ihre Eltern kennengelernt?</option>
                    <option key={6} value={"Wie hieß Ihre erste Schule?"}>Wie hieß Ihre erste Schule?</option>
                </Input>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <h4>Wähle eine Antwort für deine Sicherheitsfrage aus</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input type="text" value={authenticationAnswere} placeholer="" name="authenticationAnswere" onChange={(event) => dispatch(settingAuthenticationAnswere(event.target.value))}></Input>
                </Col>
            </Row>
            <Row className="text-center mt-3">
                <Col>
                    <Button color="success" onClick={() => handleSetAdminAccount()}>Antwort speichern</Button>
                </Col>
            </Row>
            </Col>
        </Row>
    )
}