const currentShiftPlanReducer = (state = !1, action) => {
    switch (action.type) {
      case "SetCurrentShiftPlan": 
        return {
          ...state,
          "currentShiftPlan": action.payload,
        }
        case "ResetCurrentShiftPlan": 
        return {
          ...state,
          "currentShiftPlan": !1,
        }
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