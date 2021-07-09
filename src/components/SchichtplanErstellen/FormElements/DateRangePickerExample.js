import React, { useState , useEffect} from 'react'
import {
  Row,
} from "reactstrap";
import { de } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

const DateRangePickerExample = (props) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  useEffect(() => {
    props.getDates(startDate, "WochenStart", endDate, "WochenEnde");
})
  return (
  <>
  <form>
  <Row className="text-center">
    <DateRangePicker
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={setStartDate}
      onEndDateChange={setEndDate}
      minimumDate={new Date()}
      minimumLength={1}
      format='dd.MMM.yyyy'
      locale={de}
    >
                    {({ startDateInputProps, endDateInputProps, focus }) => (
        <div className='date-range'>
          <input
            className={'input' + (focus === START_DATE ? ' -focused' : '')}
            {...startDateInputProps}
            placeholder='Beginn der KW'
          />
          <span className='date-range_arrow' />
          <input
            className={'input' + (focus === END_DATE ? ' -focused' : '')}
            {...endDateInputProps}
            placeholder='Ende der KW'
          />
        </div>
      )}
    </DateRangePicker>
    </Row>
    </form>  
    </>
  )
}
export default DateRangePickerExample;