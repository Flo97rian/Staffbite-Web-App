

const userReducer = (state = !1, action) => {
    switch (action.type) {
      case "setUser": 
        return action.payload
      case "resetUser": 
        return !1
      default:
        return state
    }
  };
  
  export default userReducer;