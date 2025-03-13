import React, { useState, useEffect } from "react";
import styles from "./ProCareerHub.module.css";

const ProCareerHub = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("hilal.kaya@oriontech.colum");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(sessionStorage.getItem("loggedInUser") || null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(JSON.parse(localStorage.getItem("is2FAEnabled")) || false);
  const [error2FA, setError2FA] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem("phoneNumber") || "");
  const [profilePicture, setProfilePicture] = useState(localStorage.getItem("profilePicture") || "Varsayılan");

  const [successPassword, setSuccessPassword] = useState("");

  const [registeredUser, setRegisteredUser] = useState(localStorage.getItem("registeredUser") || null);
  const [registeredPassword, setRegisteredPassword] = useState(localStorage.getItem("registeredPassword") || null);
  const [notifications, setNotifications] = useState(JSON.parse(localStorage.getItem("notifications")) || true);

  useEffect(() => {
    if (!sessionStorage.getItem("sessionActive")) {
      localStorage.removeItem("registeredUser");
      localStorage.removeItem("registeredPassword");
    }
    sessionStorage.setItem("sessionActive", "true");

  }, []);

  useEffect(() => {
    if (registeredUser) {
      localStorage.setItem("registeredUser", registeredUser);
      localStorage.setItem("registeredPassword", registeredPassword);
    }
  }, [registeredUser, registeredPassword]);

  const handleAuth = () => {
    if (!isLogin) {
      if (registeredUser === email) {
        setErrorMessage("Bu e-posta adresi ile zaten bir hesap oluşturulmuş!");
        return;
      }
      if (!name || !surname || !password) {
        setErrorMessage("Lütfen tüm alanları doldurun!");
        return;
      }
      setRegisteredUser(email);
      setRegisteredPassword(password);
      setLoggedInUser(name);
      sessionStorage.setItem("loggedInUser", name);
      setErrorMessage("");
    } else {
      if (!registeredUser || registeredUser !== email) {
        setErrorMessage("Bu e-posta ile kayıtlı bir hesap bulunmamaktadır.");
        return;
      }
      if (!password || password !== registeredPassword) {
        setErrorMessage("Hatalı şifre! Lütfen tekrar deneyin.");
        return;
      }
      setLoggedInUser(email);
      sessionStorage.setItem("loggedInUser", email);
      setErrorMessage("");
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setName("");
    setSurname("");
    setPassword("");
    sessionStorage.removeItem("loggedInUser");

    setShowSettings(false);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const toggle2FA = () => {
    if (!phoneNumber) {
      setError2FA("Çift faktörlü doğrulamayı açmak için telefon numarası girmeniz gerekiyor.");
      return;
    }
    setError2FA("");
    setIs2FAEnabled(!is2FAEnabled);
    localStorage.setItem("is2FAEnabled", JSON.stringify(!is2FAEnabled));
  };

  const updatePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
    localStorage.setItem("phoneNumber", e.target.value);
  };

  const updateProfilePicture = () => {
    const newPicture = prompt("Yeni profil fotoğrafı ismi girin:");
    if (newPicture) {
      setProfilePicture(newPicture);
      localStorage.setItem("profilePicture", newPicture);
    }
  };

  const updatePassword = () => {
    const newPassword = prompt("Yeni şifrenizi girin:");

    setRegisteredPassword(newPassword);
    localStorage.setItem("registeredPassword", newPassword);
    
    setSuccessPassword("Şifreniz başarıyla güncellendi!");

    setTimeout(() => {
      setSuccessPassword("");
    }, 2000);
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
    localStorage.setItem("notifications", JSON.stringify(!notifications));
  };

  return (
    <div className={styles.careerContainer}>
      {loggedInUser && (
        <div className={styles.userPanel}>
          <p className={styles.userName}>👤 {loggedInUser}</p>
          <button className={styles.settingsButton} onClick={toggleSettings}>
            ⚙ Ayarlar
          </button>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Çıkış Yap
          </button>
        </div>
      )}

{showSettings && (
        <div className={styles.settingsMenu}>
          <h3>⚙ Kullanıcı Ayarları</h3>
          <p>📧 E-posta: {email}</p>
          <p>📷 Profil Fotoğrafı: {profilePicture} <button onClick={updateProfilePicture}>Değiştir</button></p>
          <p>📱 Telefon Numarası:</p>
          <input type="text" value={phoneNumber} onChange={updatePhoneNumber} placeholder="Telefon numarası girin" />

          <p>🔐 Parola: ******** <button onClick={updatePassword}>Değiştir</button></p>
          {successPassword && <p className={styles.successMessage}>{successPassword}</p>}

          <p>📢 Bildirimler: {notifications ? "Açık" : "Kapalı"} <button onClick={toggleNotifications}>Değiştir</button></p>
          <p>🌙 Tema: {"Açık Mod"} <button>Değiştir</button></p>
          <button className={styles.twoFAButton} onClick={toggle2FA}>{is2FAEnabled ? "2FA Kapat" : "2FA Aç"}</button>
          {error2FA && <p className={styles.errorMessage}>{error2FA}</p>}
        </div>
      )}
      <header className={styles.header}>
        <h1>🚀 ProCareerHub</h1>
        <p>Kariyerini geliştirmek ve iş fırsatlarını yakalamak için doğru yerdesin!</p>
      </header>

      {!loggedInUser && (
        <div className={styles.authBox}>
          <h2>{isLogin ? "Giriş Yap" : "Kayıt Ol"}</h2>
          {!isLogin && (
            <>
              <input type="text" placeholder="Ad" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="text" placeholder="Soyad" value={surname} onChange={(e) => setSurname(e.target.value)} />
            </>
          )}
          <input className="disabled-input" type="email" placeholder="E-posta adresiniz" readOnly value={email} />
          <input type="password" placeholder="Şifreniz" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleAuth}>{isLogin ? "Giriş Yap" : "Kayıt Ol"}</button>
          {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
          <p onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Hesabınız yok mu? Kayıt olun!" : "Zaten üye misiniz? Giriş yapın!"}
          </p>
        </div>
      )}

{/* İş İlanları Bölümü */}
<div className={styles.jobListings}>
        <h2>📌 Güncel İş İlanları</h2>
        <ul>
          <li><strong>Yazılım Geliştirici</strong> - ABC Teknoloji | İstanbul | <span className={styles.salary}>75.000₺/yıl</span></li>
          <li><strong>Siber Güvenlik Uzmanı</strong> - XYZ Şirketi | Ankara | <span className={styles.salary}>85.000₺/yıl</span></li>
          <li><strong>Veri Analisti</strong> - DataCorp | İzmir | <span className={styles.salary}>70.000₺/yıl</span></li>
          <li><strong>Proje Yöneticisi</strong> - GlobalSoft | Uzaktan | <span className={styles.salary}>90.000₺/yıl</span></li>
        </ul>
      </div>

      {/* CV Hazırlama Bölümü */}
      <div className={styles.cvTips}>
        <h2>📄 CV Hazırlama Rehberi</h2>
        <ul>
          <li>✔ Kendinizi öne çıkaracak bir <strong>özet yazı</strong> ekleyin.</li>
          <li>✔ Deneyimlerinizi <strong>yıl ve şirket ismi</strong> ile belirtin.</li>
          <li>✔ Teknik becerilerinizi ve sertifikalarınızı açıkça listeleyin.</li>
          <li>✔ <strong>Hata içermeyen, temiz ve profesyonel</strong> bir CV hazırlayın.</li>
        </ul>
      </div>

      {/* Röportaj Teknikleri */}
      <div className={styles.interviewTips}>
        <h2>🎤 Mülakat Başarı Rehberi</h2>
        <p>İş görüşmesine hazırlanırken dikkat etmeniz gereken bazı noktalar:</p>
        <ul>
          <li>👔 <strong>Profesyonel bir kıyafet</strong> tercih edin.</li>
          <li>⏳ Görüşmeye <strong>en az 10 dakika önce</strong> gidin.</li>
          <li>💡 Şirket hakkında önceden <strong>araştırma yapın</strong>.</li>
          <li>🗣️ Kendinizi etkili şekilde <strong>tanıtmayı</strong> öğrenin.</li>
        </ul>
      </div>

      <footer className={styles.footer}>
        <p>© 2025 ProCareerHub | Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
};

export default ProCareerHub;


