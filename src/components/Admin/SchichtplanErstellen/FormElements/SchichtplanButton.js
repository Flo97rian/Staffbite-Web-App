import React from "react";
import Button from 'react-bootstrap/Button';
export default class SchichtplanButton extends React.Component {
    filter(a, b, c) {
        if (a == !0 && b == !0 && c == !1) {
            return( <Button variant="primary" onClick={() => this.props.b1onClick(this.props.b1onClickVal)}>{this.props.b1titel}</Button>)
        } else if (a == !1 && b == !1 && c == !1) {
            return ( <Button variant="primary" onClick={() => this.props.b2onClick(this.props.b2onClickVal)}>{this.props.b2titel}</Button> 
        )} else if (a == !0 && b == !0 && c == !0) {
            return ( <Button variant="primary" onClick={() => this.props.b2onClick(this.props.b2onClickVal)}>{this.props.b2titel}</Button> 
        )} else if (a == !0 && b == !1 && c == !1) {
            return ( <Button variant="primary" onClick={() => this.props.b1onClick(this.props.b1onClickVal)}>{this.props.b1titel}</Button> 
        )}else if (c == !0) {
            return ( <></> 
        )}
    }
    render() {
        return (
            <>
                {this.filter(this.props.bearbeiten, this.props.import, this.props.start)}
            </>
        );
    }
}
