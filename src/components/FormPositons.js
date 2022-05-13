import React from "react";

import {
    Badge, Card, Col, FormGroup, Row
} from "reactstrap"
import InputString from "./InputString";
import InfoOverlay from "./InfoOverlay";
import FilterUnsettedPositions from "./FilterUnsettedPositions";
import FilterSettedPositions from "./FilterSettedPositions";
import InfoLabel from "./InfoLabel";
import { INFO_EMPLOYEE_POSITIONS, INFO_ORGANISATION_POSITIONS } from "../constants/InfoTexts";


const FormPositions = (props) => {
        return(
            <Row>
                <Col>
                
                    <InfoLabel description={INFO_EMPLOYEE_POSITIONS} title="Position"></InfoLabel>
                    <Card>
                        {props.meta ?
                        <>
                        <FilterSettedPositions {...props}></FilterSettedPositions>
                        <FilterUnsettedPositions {...props}></FilterUnsettedPositions>
                        </>
                        :
                        <></>
                        }
                    </Card>
                </Col>
            </Row>
            
        )
}

export default FormPositions;