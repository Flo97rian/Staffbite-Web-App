const visibilityReducer = (state = !1, action) => {
    switch (action.type) {
      case "setImportEdit": 
        return {
          ...state,
          "isEdditingImport": !0,
        }
        case "stopImportEdit": 
        return {
          ...state,
          "isEdditingImport": !1
        }
        case "setfetchUserFromDB": 
        return {
          ...state,
          "isFetchingUserFromDB": !0
        }
        case "stopfetchUserFromDB": 
        return {
          ...state,
          "isFetchingUserFromDB": !1
        }
        case "setShiftPlanIsImported": 
        return {
          ...state,
          "ShiftPlanIsImported": !0
        }
        case "stopShiftPlanIsImported": 
        return {
          ...state,
          "ShiftPlanIsImported": !1
        }
        case "setShiftPlanIsActive": 
        return {
          ...state,
          "ShiftPlanIsActive": !0
        }
        case "stopShiftPlanIsActive": 
        return {
          ...state,
          "ShiftPlanIsActive": !1
        }
      default:
        return state
    }
  };
  
  export default visibilityReducer;