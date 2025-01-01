import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";
import { useContext } from "react";

// Başlangıç durumu
const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") || false,
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
      localStorage.setItem("isAuthenticated", state.isAuthenticated);
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", state.token);
    } else {
      localStorage.removeItem("isAuthenticated");
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
        throw new Error(errorData.error || "Giriş başarısız."); // Hata fırlat
      }

      const data = await response.json();
      dispatch({ type: "LOGIN_SUCCESS", payload: { user: data.user, token: data.token } });
    } catch (error) {
      dispatch({ type: "AUTH_ERROR", payload: error.message });
      throw error;
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
        throw new Error(errorData.error) || "Kayıt başarısız."; // Hata fırlat
      }

      const data = await response.json();
      // İsterseniz kayıt işleminden sonra oturum açabilirsiniz
      dispatch({ type: "LOGIN_SUCCESS", payload: { user: data.user, token: data.token } });
    } catch (error) {
      dispatch({ type: "AUTH_ERROR", payload: error.message });
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`, // Tokeni header'a ekle
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Profil bilgileri alınamadı.");
      }
  
      const data = await response.json();
      dispatch({ type: "FETCH_PROFILE_SUCCESS", payload: data.user });
    } catch (error) {
      console.error("Profil bilgileri çekilirken hata:", error.message);
      dispatch({ type: "AUTH_ERROR", payload: error.message });
      throw error;
    }
  };
  

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register, fetchUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
