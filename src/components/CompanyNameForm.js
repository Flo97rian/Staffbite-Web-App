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

  const CompanyNameForm  = ({name, placeholder, onChange}) => {

    CompanyNameForm.propTypes = {
      name: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      onChange: PropTypes.func.isRequired
    }

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
                placeholder={placeholder}
                type="text"
                name={name}
                size="lg" 
                className="form-control-alternative edit-event--description input-autosize form-control input_betrieb"
                onChange={(e) => onChange(e, "updateProfile")}
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