import { useEffect, useState } from "react"
import { Button, Col, Input, Row } from "reactstrap"
import { useDispatch, useSelector } from "react-redux";
import { resettingUserInput, settingAuthenticationAnswere, settingEmployeeName, settingSelectedAuthenticationIndex } from "../../../../reducers/userInput";
import { settingAuthenticateAdmin, settingAuthenticateEmployee, settingDemoIsEmployee } from "../../../../reducers/demo";
import { resettingModal } from "../../../../reducers/modal";

export const AuthenticationFormEmployee = () => {
    const dispatch = useDispatch();
    const userInput = useSelector(state => state.userInput);
    const authenticationAnswere = useSelector(state => state.userInput.authenticationAnswere);
    const employees = useSelector(state => state.demo.demoEmployees);
    const employee = useSelector(state => state.demo.demoEmployee.isEmployee);


    const handleAuthenticationAccount = () => {
        dispatch(
            settingAuthenticateEmployee(
                {
                    employeeName: userInput?.employeeName !== "" ? userInput.employeeName : employees[0].name,
                    authenticationAnswere: userInput.authenticationAnswere,
                    selectedAuthenticationIndex: userInput.selectedAuthenticationIndex
                }
            )
        )
    }

    useEffect(() => {
        if(employee) {
            dispatch(resettingUserInput());
            dispatch(resettingModal());
        }
    }, [employee])
    return (
        <>
        <Row className="text-center mt-3">
            <Col>
                <h2>Zugriff für Mitarbeiter</h2>
                <p className="mt-2">
                    Als Mitarbeiter kannst du immer den aktuellen Schichtplan einsehen.
                </p>
            </Col>
        </Row>
        <Row>
            <Col className="mx-4">
            <Row>
                <Col>
                    <h4>Wähle deinen Namen aus</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                <Input type="select" onChange={(event) => dispatch(settingEmployeeName(event.target.value))}>
                    {employees.length > 0 ? employees.map(employee => {
                        return <option key={employee.id} value={employee.name}>{employee.name}</option>
                    })
                    :
                    <></>
                    }
                </Input>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <h4>Wähle deine gewählte Sicherheitsfrage aus</h4>
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
                    <h4>Trage deine Antwort für deine Sicherheitsfrage ein</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input type="text" value={authenticationAnswere} placeholer="" name="authenticationAnswere" onChange={(event) => dispatch(settingAuthenticationAnswere(event.target.value))}></Input>
                </Col>
            </Row>
            <Row className="text-center mt-3">
                <Col>
                    <Button color="success" onClick={() => handleAuthenticationAccount()}>Anmelden</Button>
                </Col>
            </Row>
            </Col>
        </Row>
        </>
    )
}