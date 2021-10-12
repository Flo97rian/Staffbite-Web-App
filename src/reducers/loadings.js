const loadingsReducer = (state = !1, action) => {
    switch (action.type) {
      case "isFetchPlansFromDB": 
        return {
          ...state,
          "isFetchingPlansFromDB": !0
        }
        case "stopFetchPlansFromDB": 
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
        case "startFetchingPublish": 
        return {
          ...state,
          "isFetchingPublish": !0
        }
        case "stopFetchingPublish": 
        return {
          ...state,
          "isFetchingPublish": !1
        }
      default:
        return state
    }
  };
  
  export default loadingsReducer;