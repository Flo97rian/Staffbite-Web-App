import React from "react";
import {
    Row,
    Col,
    Button,
    Card,
    CardBody
  } from "reactstrap";

const ReportingElement = (props) => {
        const showElement = () => {
        let Employees = props.Employees
        let employee = props.employee
        let filterZeitraum = !0;
        let zeitraum = "4.10.2021 - 10.10.2021"
        let showAll = !0
        let EmployeesLenght = Object.keys(Employees).length
        let filterBewerbungen = !1
        let filterSchichten = !1
        let filterWoche = !1
        let filterMonat = !1
        let filterJahr = !1
        if (showAll && filterZeitraum)  {
            console.log(Employees)
                    if (Object.keys(Employees[employee].bewerbungen).lenght !== 0 && Object.keys(Employees[employee].bewerbungen).includes(zeitraum)) {
                        console.log(Employees[employee].bewerbungen[zeitraum].length)
                        return (
                            <>
                            <p>Name: {Employees[employee].name}</p>
                            <p>Bewerbungen diesen Zeitraum: {Employees[employee].bewerbungen[zeitraum].length}</p>
                            </>
                        )
                    }
                    return (<></>)
        }
    }
        return (
            <>
              {showElement()}
         </>
        );
    }
export default ReportingElement;