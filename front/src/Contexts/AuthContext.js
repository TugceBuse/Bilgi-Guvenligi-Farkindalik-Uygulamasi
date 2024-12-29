import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';
import { useContext } from 'react';

// Başlangıç durumu
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
};

// Context oluştur
export const AuthContext = createContext(initialState);

// AuthProvider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Login fonksiyonu
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: data.user, token: data.token } });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error.message });
    }
  };

  // Logout fonksiyonu
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
}
