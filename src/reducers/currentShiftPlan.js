const currentShiftPlanReducer = (state = !1, action) => {
    switch (action.type) {
      case "setCurrentShiftPlan": 
        state = action.payload
        return (
          state
        )
        case "ResetCurrentShiftPlan": 
        return (
          state
        )
        case "SwitchLeftcurrentShiftPlan": 
        return {
          ...state,
          "currentShiftPlan": state.currentShiftPlan > 0 ? state.currentShiftPlan - 1 : state.currentShiftPlan
        }
        case "SwitchRightcurrentShiftPlan": 
        return {
          ...state,
          "currentShiftPlan": state.currentShiftPlan < action.payload - 1 ? state.currentShiftPlan + 1 : state.currentShiftPlan
        }
      default:
        return state
    }
  };
  
  export default currentShiftPlanReducer;