import React, { useEffect, useState } from "react";
import "./LoginPage.css";


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engeller
    console.log("Username:", username);
    console.log("Password:", password);};

    const handleRegisterClick = (e) => {
      e.preventDefault();
      setShowRegister(true);
    };
    // useEffect(() => {
    //     // Sayfa yenilendiğinde showRegister state'ini false olarak ayarla
    //     if (performance.navigation.type === 1) {
    //       setShowRegister(false);
    //     }
    //   }, []);

    return (
      <div className="login_page">
            <div className={`box ${showRegister ? "shift-left" : ""}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                <form className="inputPart" onSubmit={handleLogin} >
                   <img src="./user (1).png" alt="user"/> 
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
                        <input type="submit" className="btn" value="Giriş Yap"/>
                        <div className="signIn">
                            <p>Henüz hesabınız yok mu? </p>
                            <a href="#" onClick={handleRegisterClick}>Kayıt Ol</a>
                        </div>
                        <p style={{color:"white", marginTop:15}}>Şifremi Unuttum</p>
                  </form>
               
            </div> 
            {showRegister && (
        <div className="register_box">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
          <form className="inputPart">
            <img style={{marginTop:-15}} src="./user (1).png" alt="user" />
            <div className="textbox">
              <input 
              type="text" 
              placeholder=" Ad" 
              name="name" 
              required />
            </div>
            <div className="textbox">
              <input type="text" placeholder=" Soyad" name="surname" required  />
            </div>
            <div className="textbox">
              <input type="email" placeholder=" Email" name="email" required />
            </div>
            <div className="textbox">
              <input type="password" placeholder=" Şifre" name="password" required />
            </div>
            <input type="submit" className="btn" value="Kayıt Ol" />
          </form>
        </div>
      )}
            <circle className="circle1"/>
            <circle className="circle2"/>
      </div>
    );
  };


export default LoginPage;
