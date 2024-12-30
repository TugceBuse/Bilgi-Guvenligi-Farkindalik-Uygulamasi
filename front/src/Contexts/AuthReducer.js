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
      case 'FETCH_PROFILE_SUCCESS':
        return {
          ...state,
          user: action.payload, // Backend'den gelen kullanıcı bilgilerini güncelle
        };
  
      default:
        return state;
    }
  };
  
  export default AuthReducer;
  