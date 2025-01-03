import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Contexts/AuthContext"; // AuthContext'i içe aktar
import "./ResetPassword.css"; // CSS'i unutmayın

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const { resetPassword } = useAuthContext(); // AuthContext'ten resetPassword fonksiyonunu al
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    try {
      const msg = await resetPassword(searchParams.get("token"), password); // AuthContext'teki resetPassword fonksiyonunu çağır
      setMessage(msg);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="reset-password-page">
      <h1 className="reset-password-title">Şifre Sıfırlama</h1>
      <form className="reset-password-form" onSubmit={handleResetPassword}>
        <div className="reset-password-field">
          <label className="reset-password-label">Yeni Şifre:</label>
          <input
            type="password"
            className="reset-password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="reset-password-field">
          <label className="reset-password-label">Şifreyi Doğrula:</label>
          <input
            type="password"
            className="reset-password-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="reset-password-button">Şifreyi Güncelle</button>
      </form>
      {message && <p className="reset-password-success">{message}</p>}
      {error && <p className="reset-password-error">{error}</p>}
    </div>
  );
};

export default ResetPassword;
