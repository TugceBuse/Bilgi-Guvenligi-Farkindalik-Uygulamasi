const AuthReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
          token: action.payload.token,
          error: null,
        };
  
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          token: null,
        };
  
      case 'AUTH_ERROR':
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          token: null,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default AuthReducer;
  