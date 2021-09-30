const DBReducer = (state = !1, action) => {
    switch (action.type) {
      case "All/GetPlansFromDB": 
        return {
          ...state,
          plans: action.payload
        }
      case "All/deleteShiftPlanFromDB": 
        return {
          ...state,
          plans: action.payload
        }
      case "All/GetPlansForEmployee": 
        return {
          ...state,
          plans: action.payload
      }
      case "All/updateShiftPlanInDB": 
        return {
          ...state,
          plans: action.payload
        }
        case "All/uploadShiftPlanToDB": 
        return {
          ...state,
          plans: action.payload
        }
        case "All/setPlans": 
        return {
          ...state,
          plans: action.payload
        }
        case "All/GetUser": 
        return {
          ...state,
          user: action.payload
        }
        case "All/Employees": 
        return {
          ...state,
          employees: action.payload
        }
        case "All/GetOrgDetails": 
        return {
          ...state,
          meta: action.payload
        }
      default:
        return state
    }
  };
  
  export default DBReducer;