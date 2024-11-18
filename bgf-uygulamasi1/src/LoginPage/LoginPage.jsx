import React, { useEffect, useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engeller
    console.log("Username:", username);
    console.log("Password:", password);

    // API KISMI
  };

  return (
    <div className="login_page">
      <div className="box">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <form className="inputPart" onSubmit={handleLogin}>
          <img src="./user (1).png" alt="user" />
          <div className="textbox">
            <input
              type="text"
              placeholder=" Kullanıcı Adı"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)} // State'e bağlama
            />
          </div>
          <div className="textbox">
            <input
              type="password"
              placeholder=" Şifre"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // State'e bağlama
            />
          </div>
          <input type="submit" className="btn" value="Giriş Yap" />
          <div className="signIn">
            <p>Henüz hesabınız yok mu? </p>
            <a href="https://www.w3schools.com/">Kayıt Ol</a>
          </div>
          <p style={{ color: "white", marginTop: 15 }}>Şifremi Unuttum</p>
        </form>
      </div>
      <circle className="circle1" />
      <circle className="circle2" />
    </div>
  );
};

export default LoginPage;
