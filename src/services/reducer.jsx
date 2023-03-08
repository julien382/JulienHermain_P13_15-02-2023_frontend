const initialState = {
    userData: {},
    isLoggedIn: false,
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case "SET_USER_DATA":
        return {
          ...state,
          userData: action.payload,
          isLoggedIn: true,
        };
      case "LOGOUT":
        return {
          ...state,
          userData: {},
          isLoggedIn: false,
        };
      default:
        return state;
    }
  }
  
  export default rootReducer;