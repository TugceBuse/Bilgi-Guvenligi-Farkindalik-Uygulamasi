import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Contexts/AuthContext";
import {Icon} from 'react-icons-kit';
import {eyeOff} from "react-icons-kit/feather/eyeOff";
import {eye} from "react-icons-kit/feather/eye";

const LoginPage = () => {
  const { login, error, clearError } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [localError, setLocalError] = useState(null);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    clearError();
    setLocalError(null);
  }, []);

  useEffect(() => {
      document.body.classList.add("no-scroll");
      return () => {
        document.body.classList.remove("no-scroll");
      };
    }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLocalError(null);

    try {
      await login(email, password);
      setShowPopup(true);
      clearError();
      setTimeout(() => {
        setShowPopup(false);
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Login error:", err.message);
      setLocalError(err.message || "Bir hata oluştu.");
    }
  };

  const handleRegisterClick = () => {
    navigate("/sign-up");
    setLocalError(null);
  };

  const handleToggle = () => {
    if (type==='password'){
       setIcon(eye);
       setType('text')
    } else {
       setIcon(eyeOff)
       setType('password')
    }
  }

  return (
    <div className="login_page">
      <div className="box">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <form className="inputPart" onSubmit={handleLogin}>
          <img
            src="/logo2.png"
            alt="SafeClicksLogo"
            className="backHome"
            title="www.safeClicks.com"
            onClick={() => navigate("/")}
          />
          <h1>GİRİŞ SAYFASI</h1>
          <img className="userLogin" src="./user (1).png" alt="user" />
          <div className="textbox">
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="textbox">
            <input
              type={type} // Şifreyi göster/gizle
              placeholder="Şifre"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="password-toggle" onClick={handleToggle}>
              <Icon icon={icon} size={20} />
            </div>
          </div>
          <input type="submit" className="btn" value="Giriş Yap" />
          {(error || localError) && <p className="error">{error || localError}</p>}
          <div className="signIn">
            <p>Henüz hesabınız yok mu?</p>
            <button
              onClick={handleRegisterClick}
              className="link-button"
              type="button"
            >
              Kayıt Ol
            </button>
          </div>
          <p
            style={{
              color: "white",
              marginTop: 15,
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => navigate("/forgot-password")}
          >
            Şifremi Unuttum
          </p>
        </form>

        {showPopup && (
          <div className="popupLogin">
            Giriş başarılı! Ana sayfaya yönlendiriliyorsunuz...
          </div>
        )}
      </div>
      <div className="circle1" />
      <div className="circle2" />
    </div>
  );
};

export default LoginPage;
