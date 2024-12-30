import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";
import { useContext } from "react";

// Başlangıç durumu
const initialState = {
  isAuthenticated: false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  error: null,
};

// Context oluştur
export const AuthContext = createContext(initialState);

// AuthProvider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    if (state.user && state.token) {
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", state.token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [state.user, state.token]);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      dispatch({ type: "LOGIN_SUCCESS", payload: { user: data.user, token: data.token } });
    } catch (error) {
      dispatch({ type: "AUTH_ERROR", payload: error.message });
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      // İsterseniz kayıt işleminden sonra oturum açabilirsiniz
      dispatch({ type: "LOGIN_SUCCESS", payload: { user: data.user, token: data.token } });
    } catch (error) {
      dispatch({ type: "AUTH_ERROR", payload: error.message });
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
