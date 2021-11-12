const infoSidebarReducer = (state = !1, action) => {
    switch (action.type) {
      case "OPEN_INFO": 
        return (
            action.payload
        )
      case "CLOSE_INFO":
        return (!1)
      default:
        return state
    }
  };
  
  export default infoSidebarReducer;