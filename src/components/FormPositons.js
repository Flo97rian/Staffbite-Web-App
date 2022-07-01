
import {
    Card, Col, Row
} from "reactstrap"
import FilterUnsettedPositions from "./FilterUnsettedPositions";
import FilterSettedPositions from "./FilterSettedPositions";
import InfoLabel from "./InfoLabel";
import { INFO_EMPLOYEE_POSITIONS } from "../constants/InfoTexts";


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