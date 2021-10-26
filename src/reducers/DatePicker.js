const datePickerReducer = (state = !1, action) => {
    switch (action.type) {
      case "DatePicker": 
        return {
          ...state,
          "start": action.payload.startDate,
          "ende": action.payload.endDate
        }
      default:
        return state
    }
  };
  
  export default datePickerReducer;