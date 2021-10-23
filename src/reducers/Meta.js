const MetaReducer = (state = !1, action) => {
    switch (action.type) {
      case "setMeta": 
        return action.payload
      case "resetMeta": 
        return !1
      default:
        return state
    }
  };
  
  export default MetaReducer;