

const newShiftPlanReducer = (state = !1, action) => {
    switch (action.type) {
      case "SetNewShiftPlan": 
        return {
          ...state,
          "shiftplan": action.payload
        }
      default:
        return state
    }
  };
  
  export default newShiftPlanReducer;