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
import { endOfWeek, startOfWeek } from 'date-fns';

const Datepicker = (props) => {
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState();
  const [formattedStart, setFormattedStart] = useState();
  const [endDate, setEndDate] = useState();
  const [formattedEnd, setFormattedEnd] = useState();

  function handleSetDates(e) {
    const monday = startOfWeek(e, { weekStartsOn: 1 });
    const sunday = endOfWeek(e, { weekStartsOn: 1 });
    setFormattedStart(monday);
    setFormattedEnd(sunday)
    setStartDate(moment(monday));
    setEndDate(moment(sunday));
  }
  useEffect(() => {
    if(startDate && endDate) {
      console.log(formattedStart, formattedEnd);
      const start = formattedStart.getDate() + "." + (formattedStart.getMonth() + 1) + "." + formattedStart.getFullYear()
      const end = formattedEnd.getDate() + "." + (formattedEnd.getMonth() + 1) + "." + formattedEnd.getFullYear()
      console.log(start, end);
      dispatch(settingStart(start))
      dispatch(settingEnd(end))
  }
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
                  onChange={e => handleSetDates(e.toDate())}
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
      </>
    );
}

export default Datepicker;