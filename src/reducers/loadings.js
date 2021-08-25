const loadingsReducer = (state = !1, action) => {
    switch (action.type) {
      case "setfetchPlansFromDB": 
        return {
          ...state,
          "isFetchingPlansFromDB": !0
        }
        case "stopfetchPlansFromDB": 
        return {
          ...state,
          "isFetchingPlansFromDB": !1
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
      default:
        return state
    }
  };
  
  export default loadingsReducer;