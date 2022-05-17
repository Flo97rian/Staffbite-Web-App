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
import store from '../store';
// Now react-datetime will be in french

import 'react-nice-dates/build/style.css'
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
import moment from 'moment';
import { useSelector, useDispatch } from "react-redux";
import { settingEnd, settingStart } from '../reducers/DatePicker';

const Datepicker = (props) => {
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  function handleSetDates(e) {
    let current = moment(e)
    let monday = moment(e)
    let sunday = moment(e)
    let sub = String(current._d);
    sub = sub.substring(0, 3)
    if(sub === "Sun") {
        monday.subtract(1,'w')
        sunday.subtract(1,'w')
    }
    monday.day(1)
    sunday.day(7)
    setStartDate(monday)
    setEndDate(sunday)
  }
  useEffect(() => {
    dispatch(settingStart(startDate))
    dispatch(settingEnd(endDate))
}, [endDate, startDate])

    return (
      <>
        <Row>
          <Col>
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
                    placeholder: "Woche auswählen",
                    value: startDate && endDate ? startDate.format("l") + " bis " + endDate.format("l") : "Woche auswählen"
                  }}
                  renderDay={(props, currentDate, selectedDate) => {
                    let classes = props.className;
                    if(startDate && moment(startDate).isSame(currentDate)) {
                      classes += " start-date";
                      return (
                        <td {...props} className={classes}>
                          {currentDate.date()}
                        </td>
                      );
                    } else if( startDate && endDate && moment(startDate).isBefore(currentDate) && moment(endDate).isAfter(currentDate)) {
                      classes += " middle-date";
                      return (
                        <td {...props} className={classes}>
                          {currentDate.date()}
                        </td>
                      );
                    } else if(endDate && moment(endDate).isSame(currentDate)) {
                      classes += " end-date";
                    return (
                      <td {...props} className={classes}>
                        {currentDate.date()}
                      </td>
                    );
                  } else {
                    return (
                      <td {...props} className={classes}>
                        {currentDate.date()}
                      </td>
                    );
                  }
                  }}
                  onChange={e => handleSetDates(e)}
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
      </>
    );
}

export default Datepicker;