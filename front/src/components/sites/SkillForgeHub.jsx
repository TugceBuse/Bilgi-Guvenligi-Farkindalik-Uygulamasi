import React, { useState, useEffect } from "react";
import styles from "./SkillForgeHub.module.css";
import { useGameContext } from "../../Contexts/GameContext";
import { usePhoneContext } from "../../Contexts/PhoneContext";

const SkillForgeHub = () => {
  const { SkillForgeHubInfo, setSkillForgeHubInfo } = useGameContext();

  const { generateCodeMessage, lastCodes, clearCode } = usePhoneContext();
  const [is2FAwaiting, setIs2FAwaiting] = useState(false);
  const [twoFACodeInput, setTwoFACodeInput] = useState("");

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [password, setPassword] = useState("");
  const isPasswordStrongEnough = (password) => {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&._-]).{8,}$/.test(password);
  };
  const passwordStrong = isPasswordStrongEnough(password);
  const [newPassword, setNewPassword] = useState("");
  const [successPassword, setSuccessPassword] = useState("");
  
  const [showSettings, setShowSettings] = useState(false);
  const email = SkillForgeHubInfo.email;
  const [errorMessage, setErrorMessage] = useState("");

  // Hata mesajını göster ve 2 saniye sonra temizle
  const showTemporaryError = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => {
      setErrorMessage("");
    }, 2000);
  };

  const handleAuth = () => {
    if (!isLogin) {
      if (SkillForgeHubInfo.isRegistered && SkillForgeHubInfo.email === email) {
        showTemporaryError("Bu e-posta adresi ile zaten bir hesap oluşturulmuş!");
        return;
      }
      if (!name || !surname || !password) {
        showTemporaryError("Lütfen tüm alanları doldurun!");
        return;
      }
  
      setSkillForgeHubInfo({
        ...SkillForgeHubInfo,
        name,
        surname,
        password,
        phone: "05416494438",
        is2FAEnabled: false,
        isRegistered: true,
        isLoggedIn: true,
        isPasswordStrong: passwordStrong,
      });
      setErrorMessage("");
    } else {
      if (!SkillForgeHubInfo.isRegistered || SkillForgeHubInfo.email !== email) {
        showTemporaryError("Bu e-posta ile kayıtlı bir hesap bulunmamaktadır.");
        return;
      }
      if (!password || password !== SkillForgeHubInfo.password) {
        showTemporaryError("Hatalı şifre! Lütfen tekrar deneyin.");
        return;
      }


      if (SkillForgeHubInfo.is2FAEnabled) {
        generateCodeMessage("SkillForgeHub", "skillforgehub");
        setIs2FAwaiting(true);
        return;
      }
  
      setSkillForgeHubInfo({
        ...SkillForgeHubInfo,
        isLoggedIn: true,
      });
      setErrorMessage("");
    }
  };

  useEffect(() => {
    return () => {
      clearCode("skillforgehub");
    };
  }, []);

  useEffect(() => {
    setName("");
    setSurname("");
    setPassword("");
  }, [isLogin]);

  const handleLogout = () => {
    setSkillForgeHubInfo({
      ...SkillForgeHubInfo,
      isLoggedIn: false,
    });
    setName("");
    setSurname("");
    setPassword("");
    setNewPassword("");
    setSuccessPassword("");
    setShowSettings(false);
    setIsLogin("Giriş Yap");
  };

  const handlePasswordUpdate = () => {
    if (!newPassword) return;

    const strong = isPasswordStrongEnough(newPassword);
    setSkillForgeHubInfo({
      ...SkillForgeHubInfo,
      password: newPassword,
      isPasswordStrong: strong,
    });

    setSuccessPassword("Şifreniz başarıyla güncellendi!");
    setNewPassword("");
    setTimeout(() => setSuccessPassword(""), 2000);
  };

  return (
    <div className={styles.skillContainer}>
      {/* Header */}
      <header className={styles.header}>
        <h1>🚀 SkillForgeHub</h1>
        <p>Geleceğe hazır olmak için becerilerini geliştir!</p>
      </header>

      {/* Kullanıcı Paneli */}
      {SkillForgeHubInfo.isLoggedIn && (
        <div className={styles.userPanel}>
          <p className={styles.userName}>👤 {SkillForgeHubInfo.name}</p>
          <button className={styles.settingsButton} onClick={() => setShowSettings(!showSettings)}>⚙ Ayarlar</button>
          <button className={styles.logoutButton} onClick={handleLogout}>Çıkış Yap</button>
        </div>
      )}

      {/* Ayarlar Menüsü */}
      {showSettings && (
        <div className={`${styles.settingsMenu} ${showSettings ? styles.active : ""}`}>
          <div className={styles.settingsHeader}>
            <h3>⚙ Kullanıcı Ayarları</h3>
            <span className={styles.closeIcon} onClick={() => setShowSettings(false)}>✖</span>
          </div>
          <p>📧 E-posta: {SkillForgeHubInfo.email}</p>
          <p>📷 Profil Fotoğrafı: <button className={styles.profilePictureButton}>Değiştir</button></p>
          <p>📱 Telefon Numarası:</p>
          <input type="text" value={SkillForgeHubInfo.phone} disabled />

          <div>
            <p>🔐 Parola Güncelle:</p>
            <input
              type="password"
              placeholder="Yeni şifrenizi giriniz:"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
             {successPassword && <p className={styles.successMessage}>{successPassword}</p>}

            <button onClick={handlePasswordUpdate}>Güncelle</button>
            <p>📢 Bildirimler: <button>Değiştir</button></p>
          </div>

          <button
            className={styles.twoFAButton}
            onClick={() => {
              setSkillForgeHubInfo({
                ...SkillForgeHubInfo,
                is2FAEnabled: !SkillForgeHubInfo.is2FAEnabled,
              });
            }}
          >
            {SkillForgeHubInfo.is2FAEnabled ? "2FA Kapat" : "2FA Aç"}
          </button>
        </div>
      )}

      {/* Giriş / Kayıt Butonu */}
      {!SkillForgeHubInfo.isLoggedIn && (
        <button className={styles.loginButton} onClick={() => setIsLoginOpen(true)}>
          Giriş Yap | Kayıt Ol
        </button>
      )}

      {!SkillForgeHubInfo.isLoggedIn && isLoginOpen && !is2FAwaiting && (
        <div className={`${styles.authBox} ${isLoginOpen ? styles.active : ""}`}>
          <h2>{isLogin ? "Giriş Yap" : "Kayıt Ol"}</h2>

          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Ad"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Soyad"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </>
          )}

          <input
            type="email"
            placeholder="E-posta adresiniz"
            value={SkillForgeHubInfo.email}
            disabled
          />
          <input
            type="password"
            placeholder="Şifreniz"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleAuth}>
            {isLogin ? "Giriş Yap" : "Kayıt Ol"}
          </button>

          {errorMessage && (
            <span className={styles.errorMessage}>{errorMessage}</span>
          )}

          <p onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Hesabınız yok mu? Kayıt olun!" : "Zaten üye misiniz? Giriş yapın!"}
          </p>
          <button onClick={() => setIsLoginOpen(false)}>Kapat</button>
        </div>
      )}

      {!SkillForgeHubInfo.isLoggedIn && is2FAwaiting && (
        <div className={`${styles.authBox} ${styles.active}`}>
          <h2>🔐 2 Adımlı Doğrulama</h2>
          <div className={styles.twoFAInputArea}>
            <p>📲 Telefonunuza gelen doğrulama kodunu girin:</p>
            <input
              type="text"
              placeholder="6 haneli kod"
              value={twoFACodeInput}
              onChange={(e) => setTwoFACodeInput(e.target.value)}
            />
            <button
              onClick={() => {
                if (twoFACodeInput === lastCodes["skillforgehub"]) {
                  setSkillForgeHubInfo({ ...SkillForgeHubInfo, isLoggedIn: true });
                  setIs2FAwaiting(false);
                  setTwoFACodeInput("");
                  clearCode("skillforgehub");
                } else {
                  setErrorMessage("⚠ Kod hatalı!");
                  setTimeout(() => setErrorMessage(""), 2000);
                }
              }}
            >
              Giriş Yap
            </button>
            <button
            onClick={() => {
              setIs2FAwaiting(false);
              setTwoFACodeInput(""); // input alanını temizle
            }}
          >
            Kapat
          </button>
            {errorMessage && (
              <span className={styles.errorMessage}>{errorMessage}</span>
            )}
          </div>
          
        </div>
      )}

      {/* Sayfa İçeriği */}
      <div className={styles.infoSection}>
        <div className={styles.popularSkills}>
          <h2>🔥 Popüler Beceriler</h2>
          <ul>
            <li>💻 Kodlama & Yapay Zeka</li>
            <li>🎨 UI/UX Tasarımı & Yaratıcılık</li>
            <li>📈 Dijital Pazarlama & SEO</li>
            <li>🚀 Girişimcilik & Ürün Yönetimi</li>
            <li>👔 Liderlik & Takım Yönetimi</li>
          </ul>
        </div>

        <div className={styles.learningTools}>
          <h2>📚 Öğrenme Araçları</h2>
          <p>SkillForgeHub, bilgi edinmeyi daha eğlenceli ve verimli hale getiriyor.</p>
          <ul className={styles.learningList}>
            <li>🎥 Canlı Dersler</li>
            <li>🛠️ Proje Tabanlı Öğrenme</li>
            <li>💡 Simülasyonlar</li>
            <li>🧑‍🏫 Mentor Görüşmeleri</li>
            <li>🏆 Hackathon ve Yarışmalar</li>
          </ul>
          <button className={styles.exploreButton}>Keşfet</button>
        </div>

        <div className={styles.communitySection}>
          <h2>🌍 Topluluğa Katıl</h2>
          <ul className={styles.communityList}>
            <li>💬 Forumlar</li>
            <li>🎤 Canlı Etkinlikler</li>
            <li>📢 Proje Paylaşımları</li>
            <li>🔗 LinkedIn Bağlantıları</li>
          </ul>
          <button className={styles.joinButton}>Topluluğa Katıl</button>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2025 SkillForgeHub | Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
};

export default SkillForgeHub;