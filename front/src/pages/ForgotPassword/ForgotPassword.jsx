import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css"; // CSS'i unutmayın

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

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

      setMessage("Şifre sıfırlama bağlantısı email adresinize gönderildi.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="forgot-password-page">
      <h1 className="forgot-password-title">Şifremi Unuttum</h1>
      <form className="forgot-password-form" onSubmit={handleForgotPassword}>
        <div className="forgot-password-field">
          <label className="forgot-password-label">Email Adresi:</label>
          <input
            type="email"
            className="forgot-password-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="forgot-password-button">Şifre Sıfırlama Bağlantısı Gönder</button>
      </form>
      {message && <p className="forgot-password-success">{message}</p>}
      {error && <p className="forgot-password-error">{error}</p>}
      <button
        className="forgot-password-back-button"
        onClick={() => navigate("/login")}
      >
        Giriş Sayfasına Dön
      </button>
    </div>
  );
};

export default ForgotPassword;
