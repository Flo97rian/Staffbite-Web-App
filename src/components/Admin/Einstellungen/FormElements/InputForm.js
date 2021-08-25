import React from "react";
// reactstrap components
import {
    FormGroup,
    Form,
    Input,
  } from "reactstrap";

  class Forms extends React.Component {
    render() {
      return (
        <>
          <Form>
            <FormGroup>
                <Input
                id="exampleFormControlInput1"
                placeholder={this.props.org.name ? this.props.org.name["S"]: "Name eintragen" }
                type="text"
                name="name"
                onChange={(e) => this.props.onChange(e, "updateProfile")}
                />
            </FormGroup>
          </Form>
        </>
      );
    }
  }
  
  export default Forms;