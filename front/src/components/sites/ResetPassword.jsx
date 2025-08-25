import React, { useState, useEffect } from "react";
import styles from "./ResetPassword.module.css";
import { useGameContext } from "../../Contexts/GameContext";
import { useTimeContext } from "../../Contexts/TimeContext";

const ResetPassword = ({ siteName = "DefaultSite", onSuccessRedirect }) => {
  const [siteKey, setSiteKey] = useState("procareerhub"); // url’den çekiyoruz
  const [isExpired, setIsExpired] = useState(false);

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const { secondsRef } = useTimeContext();
  const { setProCareerHubInfo } = useGameContext();

  useEffect(() => {
    try {
      const currentUrl = window.currentBrowserUrl;
      if (!currentUrl || !currentUrl.startsWith("http://reset/")) return;

      // "http://reset/procareerhub?email=...&expire=123"
      const dummyUrl = currentUrl.replace("http://", "http://dummy.");
      const urlObj = new URL(dummyUrl);
      const expireParam = urlObj.searchParams.get("expire");
      const expireAt = Number(expireParam);

      if (expireAt && secondsRef?.current > expireAt) {
        setIsExpired(true);
      }
    } catch (err) {
      console.error("ResetPassword link parsing error:", err);
    }
  }, [secondsRef?.current]);

  
  useEffect(() => {
    if (successMessage && siteName) {
      const redirectUrl = `https://${siteName.toLowerCase()}.com`;

      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("open-browser-url", {
          detail: {
            url: redirectUrl
          }
        }));
      }, 3000);
    }
  }, [successMessage, siteName]);

  if (isExpired) {
    return (
      <div className={styles.resetContainer}>
        <h2>⏰ Bağlantı Süresi Doldu</h2>
        <p>Bu şifre sıfırlama bağlantısı artık geçerli değil.</p>
        <p>Lütfen yeni bir şifre sıfırlama talebinde bulunun.</p>
      </div>
    );
  }

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
    console.log("site ismi:", siteName);
    // ✅ Şifre güncelle
    if (siteName?.toLowerCase() === "procareerhub") {
      setProCareerHubInfo(prev => ({
        ...prev,
        password: password1
      }));
    }
    
    setErrorMessage("");
    setSuccessMessage("✅ Şifreniz başarıyla güncellendi!");

    // 3 saniye sonra yönlendir
    const redirectUrl = `https://${siteName.toLowerCase()}.com`;

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("open-browser-url", {
        detail: { url: redirectUrl }
      }));
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
