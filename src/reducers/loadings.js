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
        case "isFetchingReport": 
        return {
          ...state,
          "isFetchingReport": !0
        }
        case "stopFetchingReport": 
        return {
          ...state,
          "isFetchingReport": !1
        }
        case "startFetchingAlg": 
        return {
          ...state,
          "isFetchingAlg": !0
        }
        case "stopFetchingAlg": 
        return {
          ...state,
          "isFetchingAlg": !1
        }
      default:
        return state
    }
  };
  
  export default loadingsReducer;