import React from "react";
import Form from 'react-bootstrap/Form';

export default class Control extends React.PureComponent {
    render() {
        return(
            <>
                      <Form.Control className="float-left" style={{ width:"50%", marginLeft: "25%" }} as="select" type="text" defaultValue={this.props.defaultVal} name={this.props.name} onChange={(e) => this.props.onChange(e, "mitarbeiterBearbeiten")}>
                        <option>Entwurf</option>
                        <option>Bewerben</option>
                        <option>Review</option>
                        <option>Veröffentlicht</option>
                      </Form.Control>
            </>
        )
    }
}