import React from "react";
import InputString from "./InputString";
import InputNumber from "./InputNumber";
import Control from "./Control";
import Switch from "./Switch";

export default class FormMitarbeiterBearbeiten extends React.PureComponent {
    render() {
        return(
            <>
                <form>
                    <Switch type="switch" label="Aktiv" name="aktiv" value={this.props.mitarbeiterdaten["name"]} onChange={(e) => this.props.onChange(e, "mitarbeiterBearbeiten")}></Switch>
                    <br/>
                    <InputString label="Name" name="name" placeholder={this.props.mitarbeiterdaten["name"]} onChange={(e) => this.props.onChange(e, "mitarbeiterBearbeiten")}></InputString>
                    <br/>
                    <InputString label="E-Mail" name="email"  placeholder={this.props.mitarbeiterdaten["email"]} onChange={(e) => this.props.onChange(e, "mitarbeiterBearbeiten")}></InputString>
                    <br/>
                    <InputNumber label="Stundenlohn (€)" name="stundenlohn"  placeholder={this.props.mitarbeiterdaten["stundenlohn"]} onChange={(e) => this.props.onChange(e, "mitarbeiterBearbeiten")}></InputNumber>
                    <br/>
                    <InputNumber label="Ziel mtl. (€)" name="zielmtleuro"  placeholder={this.props.mitarbeiterdaten["zielmtleuro"]} onChange={(e) => this.props.onChange(e, "mitarbeiterBearbeiten")}></InputNumber>
                    <br/>
                    <InputNumber label="Ziel mtl. (h)" name="zielmtlh"  placeholder={this.props.mitarbeiterdaten["zielmtlh"]} onChange={(e) => this.props.onChange(e, "mitarbeiterBearbeiten")}></InputNumber>
                    <br/>
                    <Control label="Erfahrung" name="erfahrung"  {...this.props} defaultVal={this.props.mitarbeiterdaten["erfahrung"]}></Control>
                    <br/>
                    <Switch type="switch" label="Frei" name="frei" value={this.props.mitarbeiterdaten["frei"]} onChange={(e) => this.props.onChange(e, "mitarbeiterBearbeiten")}></Switch>
                    <br/>
                    <Switch type="switch" label="Überstunden" name="ueberstunden" value={this.props.mitarbeiterdaten["ueberstunden"]} onChange={(e) => this.props.onChange(e, "mitarbeiterBearbeiten")}></Switch>
                    <br/>
                    <InputNumber label="Schichten/Woche" name="schichtenwoche"  placeholder={this.props.mitarbeiterdaten["schichtenwoche"]} onChange={(e) => this.props.onChange(e, "mitarbeiterBearbeiten")}></InputNumber>
                    <br/>
                </form>
            </>
        )
    }
}