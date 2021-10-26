import React, { useState , useEffect} from 'react'
// reactstrap components
import {
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Row
} from "reactstrap";
import store from '../../../store';
// Now react-datetime will be in french

import 'react-nice-dates/build/style.css'
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";

const Datepicker = (props) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    store.dispatch({type: "DatePicker", payload: {startDate: startDate, endDate: endDate}})
}, [endDate, startDate])

    return (
      <>
        <Row>
          <Col xs={6}>
            <FormGroup className='bg-secondary'>
              <InputGroup className="input-group-alternative bg-secondary">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-calendar" />
                  </InputGroupText>
                </InputGroupAddon>
                <ReactDatetime
                  timeFormat={false}
                  inputProps={{
                    placeholder: props.placeholderAnfang,
                  }}
                  renderDay={(props, currentDate, selectedDate) => {
                    let classes = props.className;
                    if (
                      startDate &&
                      endDate &&
                      startDate._d + "" === currentDate._d + ""
                    ) {
                      classes += " start-date";
                    } else if (
                      startDate &&
                      endDate &&
                      new Date(startDate._d + "") <
                        new Date(currentDate._d + "") &&
                      new Date(endDate._d + "") >
                        new Date(currentDate._d + "")
                    ) {
                      classes += " middle-date";
                    } else if (
                      endDate &&
                      endDate._d + "" === currentDate._d + ""
                    ) {
                      classes += " end-date";
                    }
                    return (
                      <td {...props} className={classes}>
                        {currentDate.date()}
                      </td>
                    );
                  }}
                  onChange={e => setStartDate({startDate: e})}
                />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col xs={6}>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-calendar" />
                  </InputGroupText>
                </InputGroupAddon>
                <ReactDatetime
                  inputProps={{
                    placeholder: props.placeholderEnde
                  }}
                  timeFormat={false}
                  renderDay={(props, currentDate, selectedDate) => {
                    let classes = props.className;
                    if (
                      startDate &&
                      endDate &&
                      startDate._d + "" === currentDate._d + ""
                    ) {
                      classes += " start-date";
                    } else if (
                      startDate &&
                      endDate &&
                      new Date(startDate._d + "") <
                        new Date(currentDate._d + "") &&
                      new Date(endDate._d + "") >
                        new Date(currentDate._d + "")
                    ) {
                      classes += " middle-date";
                    } else if (
                      endDate &&
                      endDate._d + "" === currentDate._d + ""
                    ) {
                      classes += " end-date";
                    }
                    return (
                      <td {...props} className={classes}>
                        {currentDate.date()}
                      </td>
                    );
                  }}
                  onChange={e => setEndDate({ endDate: e })}
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
      </>
    );
}

export default Datepicker;