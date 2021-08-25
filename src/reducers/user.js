

const userReducer = (state = !1, action) => {
    switch (action.type) {
      case "jwt": 
        return {
          ...state,
          "jwt": action.payload
        }
        case "username": 
        return {
          ...state,
          "username": action.payload
        }
        case "tenantid": 
        return {
          ...state,
          "tenantid": action.payload
        }
      default:
        return state
    }
  };
  
  export default userReducer;