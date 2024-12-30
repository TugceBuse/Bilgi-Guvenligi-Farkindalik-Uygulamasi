import "./SignPage.css";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";

const SignPage = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // pop-up mesajı için const
  const [showPopup, setShowPopup] = useState(false); // Pop-up mesajını kontrol eden state
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await register(formData); // AuthContext'teki register fonksiyonunu çağır
      setShowPopup(true); // Pop-up mesajını göster
      setTimeout(() => {
        setShowPopup(false); // Pop-up mesajını gizle
        navigate("/"); // Ana sayfaya yönlendir
      }, 2000); // 5 saniye bekle
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="sign_page">
      <div className="box2">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <form className="inputPart2" onSubmit={handleSubmit}>
          <img src="./user (1).png" alt="user" />
          <div className="textbox2">
            <div className="textbox_signAd">
              <input
                type="text"
                placeholder="Ad"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="textbox_signSoyad">
              <input
                type="text"
                placeholder="Soyad"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="textbox_signkullanıcıAdı">
              <input
                type="text"
                placeholder="Kullanıcı Adı"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="textbox_email">
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="pswd">
              <input
                type="password"
                placeholder="Şifre"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <input type="submit" className="btn" value="Kayıt Ol" />
          {error && <p className="error">{error}</p>}
        </form>

         {/* Pop-up mesajı */}
         {showPopup && (
        <div className="popupRegister">
          Kayıt başarılı! Ana sayfaya yönlendiriliyorsunuz...
        </div>
        )}

      </div>
      <squre className="circle1" />
      <squre className="circle2" />
    </div>
  );
};

export default SignPage;
