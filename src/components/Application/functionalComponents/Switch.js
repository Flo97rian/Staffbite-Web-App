import React from "react";
import Form from 'react-bootstrap/Form';
import InfoOverlay from "./InfoOverlay";

export default class Switch extends React.PureComponent {
    render() {
        return(
            <>
                    {this.props.info ?
                    <>
                        <InfoOverlay infotitle={this.props.label} description={this.props.description}/>
                        <Form>
                        <Form.Check custom type="switch" size="lg" defaultChecked={this.props.value} name={this.props.name} id={this.props.name} onChange={this.props.onChange}></Form.Check>
                        </Form>
                    </>
                    : 
                    <>
                        <Form>
                            <Form.Check custom type="switch" size="lg" defaultChecked={this.props.value} name={this.props.name} id={this.props.name} onChange={this.props.onChange}></Form.Check>
                        </Form>
                    </>
                    }              
            </>
        )
    }
}