const ShiftplanReducer = (state = !1, action) => {
    switch (action.type) {
      case "setShiftplan": 
        return action.payload
      case "resetShiftplan": 
        return !1
      default:
        return state
    }
  };
  
  export default ShiftplanReducer;