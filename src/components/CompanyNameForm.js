import React from "react";
// reactstrap components
import {
    FormGroup,
    Col,
    Row,
    Form,
    Input,
  } from "reactstrap";
  import PropTypes from "prop-types";
  import { useSelector, useDispatch } from "react-redux";
import { settingCompanyName } from "../reducers/userInput";

  const CompanyNameForm  = () => {
    const dispatch = useDispatch()
    const CompanyName = useSelector(state => state.Meta.name);
    CompanyNameForm.defaultProps = {
      placeholder: "Name",
    }
      return (
        <>
          <Row>
            <Col xs="12" md="6" lg="4">
            <Form>
            <FormGroup>
                <Input
                id="exampleFormControlInput1"
                placeholder={CompanyName}
                type="text"
                size="lg" 
                className="form-control-alternative edit-event--description input-autosize form-control input_betrieb"
                onChange={(event) => dispatch(settingCompanyName(event.target.value))}
                />
            </FormGroup>
          </Form>
            </Col>
            <Col>
            </Col>
            <Col>
            </Col>
          </Row>
        </>
      );
  }
  
  export default CompanyNameForm;