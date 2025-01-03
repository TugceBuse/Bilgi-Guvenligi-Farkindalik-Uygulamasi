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
  }, [state.user, state.token,state.isAuthenticated]);

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
        throw new Error(errorData.error || "Kayıt başarısız.");
      }
  
    //vvvvvvvv Kayıttan sonra otomatik login sağlayan kısım vvvvvvvvvvv NOT: userController Register'a token eklenmeli

    // const data = await response.json();
    // dispatch({ type: "LOGIN_SUCCESS", payload: { user: data.user, token: data.token } });

    } catch (error) {
      dispatch({ type: "AUTH_ERROR", payload: error.message });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const updateUser = async (updatedData) => {
  const { password, ...filteredData } = updatedData; // Şifreyi filtrele

  try {
    const response = await fetch("http://localhost:5000/api/users/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.token}`, // Token ile kimlik doğrulama
      },
      body: JSON.stringify(filteredData),
    });
    if (!response.ok) {
      switch (response.status) {
        case 401:
          throw new Error("Bu kullanıcı adı veya e-posta zaten kullanılıyor.");
        case 400:
          throw new Error("Mevcut şifrenizi yanlış girdiniz.");
        case 403: 
          throw new Error("Geçerli bir e-posta adresi girin.");
        case 404:
          throw new Error("Kullanıcı bulunamadı.");
        default:
          break;
      }
    }
    const data = await response.json();
    dispatch({ type: "UPDATE_USER_SUCCESS", payload: data.user });
  } catch (error) {
    console.error("Hata:", error);
    throw error;
  }
};
  
const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await fetch("http://localhost:5000/api/users/update-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.token}`, // Token ile kimlik doğrulama
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    if (!response.ok) {
      switch (response.status) {
        case 401:
          throw new Error("Yeni şifre mevcut şifreyle aynı olamaz.");
        case 400:
          throw new Error("Mevcut şifre yanlış.");
        case 403: 
          throw new Error("Şifre en az 8 karakter uzunluğunda, bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir.");
        case 404:
          throw new Error("Kullanıcı bulunamadı.");
        default:
          break;
      }
    }
  } catch (error) {
    console.error("Hata:", error);
    throw error;
  }
};
  

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const verifyEmail = async (token) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/verify-email?token=${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Authcontext verifymail response:", response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "E-posta doğrulama işlemi başarısız.");
      }
  
      const data = await response.json();
      console.log("E-posta doğrulandı:", data.message);
      return data.message; // Başarı mesajını döndür
    } catch (error) {
      console.error("E-posta doğrulama hatası:", error.message);
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Bir hata oluştu.");
      }
  
      return "Şifre sıfırlama bağlantısı email adresinize gönderildi.";
    } catch (error) {
      throw error; // Hata mesajını yukarıya ilet
    }
  };

  //geçici bir çözüm olabilir alternatifler araştırılabilir
  // Token süresi dolduysa kullanıcıyı çıkış yap
  const checkTokenExpiration = () => {
    if (state.token) {
      const tokenParts = JSON.parse(atob(state.token.split('.')[1]));
      console.log("Token süresi:", new Date(tokenParts.exp * 1000).toLocaleString());
      const now = Math.floor(Date.now() / 1000); // Şu anki zamanı al
      console.log("Şu anki zaman:", new Date(now * 1000).toLocaleString());
      if (tokenParts.exp && tokenParts.exp < now) {
        console.log("Token süresi doldu. Çıkış yapılıyor...");
        logout(); 
      }
      console.log("Token kontrol edildi. Geçerli");
    }
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
      if (response.status === 401) { // Token geçersiz
        logout(); // Çıkış yap
        throw new Error("Oturumunuzun süresi doldu. Lütfen yeniden giriş yapın.");
      }
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


  useEffect(() => {
    console.log("Token kontrol ediliyor...");
    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 60000); // Her 1 dakikada bir kontrol
    return () => clearInterval(interval); 
  }, [state.token]);
  

  return (
    <AuthContext.Provider value={{
       ...state,
        login,
         logout,
          register,
           fetchUserProfile,
            updateUser,
             changePassword,
              verifyEmail,
               clearError,
                forgotPassword
              }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
