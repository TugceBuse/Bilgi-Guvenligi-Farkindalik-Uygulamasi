import React, { useState, useEffect } from "react";
import styles from "./ResetPassword.module.css";

const ResetPassword = ({ siteName = "DefaultSite", onSuccessRedirect }) => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleReset = () => {
    // Validation
    if (password1.length < 4 || password2.length < 4) {
      setErrorMessage("Şifre en az 4 karakter olmalıdır.");
      setSuccessMessage("");
      return;
    }

    if (password1 !== password2) {
      setErrorMessage("Şifreler eşleşmiyor.");
      setSuccessMessage("");
      return;
    }

    // Success
    setErrorMessage("");
    setSuccessMessage("✅ Şifreniz başarıyla güncellendi!");

    // 3 saniye sonra yönlendir
    setTimeout(() => {
      if (typeof onSuccessRedirect === "function") {
        onSuccessRedirect(); // örneğin `setPage("procareerhub")`
      }
    }, 3000);
  };

  return (
    <div className={styles.resetContainer}>
      <h2>🔐 {siteName} Şifre Yenileme</h2>
      <p>Yeni şifrenizi giriniz:</p>

      <input
        type="password"
        placeholder="Yeni şifre"
        value={password1}
        onChange={(e) => setPassword1(e.target.value)}
      />
      <input
        type="password"
        placeholder="Yeni şifre (tekrar)"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />

      <button onClick={handleReset}>Şifreyi Güncelle</button>

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
    </div>
  );
};

export default ResetPassword;
