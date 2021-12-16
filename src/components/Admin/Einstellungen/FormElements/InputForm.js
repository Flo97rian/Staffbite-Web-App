import React from "react";
// reactstrap components
import {
    FormGroup,
    Col,
    Row,
    Form,
    Input,
  } from "reactstrap";

  class Forms extends React.Component {
    render() {
      return (
        <>
          <Row>
            <Col xs="12" md="6" lg="4">
            <Form>
            <FormGroup>
                <Input
                id="exampleFormControlInput1"
                placeholder={this.props?.org?.name ? this.props.org.name: "Name eintragen" }
                type="text"
                name="name"
                className="bg-secondary input_betrieb"
                onChange={(e) => this.props.onChange(e, "updateProfile")}
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
  }
  
  export default Forms;