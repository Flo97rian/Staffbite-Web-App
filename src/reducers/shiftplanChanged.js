const shiftplanChangedReducer = (state = !1, action) => {
    switch (action.type) {
      case "setShiftplanChanged": 
        return !0
      case "resetShiftplanChanged": 
        return !1
      default:
        return state
    }
  };
  
  export default shiftplanChangedReducer;