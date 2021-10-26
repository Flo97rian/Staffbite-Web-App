

const newShiftPlanReducer = (state = !1, action) => {
    switch (action.type) {
      case "setNewShiftplan": 
        return action.payload
      case "resetNewShiftplan": 
        return !1
      default:
        return state
    }
  };
  
  export default newShiftPlanReducer;