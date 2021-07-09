import React from "react";
import InputButton from "./InputButton";

export default class FormSchichtplanImportieren extends React.PureComponent {
    render() {
        return(
            <>
                <form>
                {this.props.plaene ? this.props.plaene.map((item, index) => (
                    <InputButton key={index} id={index} label={item.name} name={item.name}  {...this.props} placeholder=""></InputButton>
                 )) : <></>}
                </form>
            </>
        )
    }
}