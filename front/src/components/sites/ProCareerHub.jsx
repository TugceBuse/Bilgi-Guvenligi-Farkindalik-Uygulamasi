import React, { useState, useEffect } from "react";
import styles from "./ProCareerHub.module.css";
import { useGameContext } from "../../Contexts/GameContext";
import { usePhoneContext } from "../../Contexts/PhoneContext";
import { use } from "react";

const ProCareerHub = () => {

  const { ProCareerHubInfo, setProCareerHubInfo} = useGameContext();

  const [isLogin, setIsLogin] = useState(true);
  const { generateCodeMessage, lastCodes, clearCode } = usePhoneContext();
  const [twoFACodeInput, setTwoFACodeInput] = useState("");
  const [is2FAwaiting, setIs2FAwaiting] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [password, setPassword] = useState("");
  const isPasswordStrongEnough = (password) => {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&._-]).{8,}$/.test(password);
  };
  const passwordStrong = isPasswordStrongEnough(password);
  const [newPassword, setNewPassword] = useState("");
  const [successPassword, setSuccessPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const email = ProCareerHubInfo.email;

  const [showSettings, setShowSettings] = useState(false);
  const [showAd, setShowAd] = useState(false); // Reklam gösterme kontrolü
  const [showWarning, setShowWarning] = useState(false);
  const [showFakeBrowser, setShowFakeBrowser] = useState(false);

  useEffect(() => {
    const adTimer = setTimeout(() => {
      setShowAd(true);
    }, 8000); 
  
    return () => clearTimeout(adTimer);
  }, []);

  // Hata mesajını göster ve 2 saniye sonra temizle
  const showTemporaryError = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => {
      setErrorMessage("");
    }, 2000);
  };

  const handleAuth = () => {
    if (!isLogin) {
      if (ProCareerHubInfo.isRegistered && ProCareerHubInfo.email === email) {
        showTemporaryError("Bu e-posta adresi ile zaten bir hesap oluşturulmuş!");
        return;
      }
      if (!name || !surname || !password) {
        showTemporaryError("Lütfen tüm alanları doldurun!");
        return;
      }
  
      setProCareerHubInfo({
        ...ProCareerHubInfo,
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
      if (!ProCareerHubInfo.isRegistered || ProCareerHubInfo.email !== email) {
        showTemporaryError("Bu e-posta ile kayıtlı bir hesap bulunmamaktadır.");
        return;
      }
      if (!password || password !== ProCareerHubInfo.password) {
        showTemporaryError("Hatalı şifre! Lütfen tekrar deneyin.");
        return;
      }

      // Eğer 2FA aktifse, kod üret
      if (ProCareerHubInfo.is2FAEnabled) {
        generateCodeMessage("ProCareerHub", "procareerhub");
        setIs2FAwaiting(true);
        return;
      }

      // 2FA yoksa doğrudan girişe izin ver
      setProCareerHubInfo({ ...ProCareerHubInfo, isLoggedIn: true });
      setErrorMessage("");

  
      setProCareerHubInfo({
        ...ProCareerHubInfo,
        isLoggedIn: true,
      });
      setErrorMessage("");
    }
  };


  useEffect(() => {
    return () => {
      // Bileşen kapatıldığında kodu temizle
      clearCode("procareerhub");
    };
  }, []);

  const handleLogout = () => {
    setProCareerHubInfo({
      ...ProCareerHubInfo,
      isLoggedIn: false,
    });
    setName("");
    setSurname("");
    setPassword("");
    setShowSettings(false);
    setIsLogin("Giriş Yap");
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const toggle2FA = () => {
    setProCareerHubInfo({
      ...ProCareerHubInfo,
      is2FAEnabled: !ProCareerHubInfo.is2FAEnabled,
    });
  };

  const handlePasswordUpdate = () => {
    if (!newPassword) return;
  
    const passwordStrong = isPasswordStrongEnough(newPassword);

    setProCareerHubInfo({
      ...ProCareerHubInfo,
      password: newPassword,
      isPasswordStrong: passwordStrong,
    });
    console.log(passwordStrong);
    setSuccessPassword("Şifreniz başarıyla güncellendi!");
    setNewPassword("");
  
    setTimeout(() => setSuccessPassword(""), 2000);
  };

  const handleAdClick = () => {
    setShowFakeBrowser(true);
    setShowAd(false);

    // 3 saniye sonra sahte siteyi kapat
    setTimeout(() => {
      setShowFakeBrowser(false);
    }, 3000);
  };

  useEffect(() => {
    setName("");
    setSurname("");
    setPassword("");
  }, [isLogin]);

  return (
    <div className={styles.careerContainer}>
      {ProCareerHubInfo.isLoggedIn && (
        <div className={styles.userPanel}>
          <p className={styles.userName}>👤 {ProCareerHubInfo.name}</p>
          <button className={styles.settingsButton} onClick={toggleSettings}>⚙ Ayarlar</button>
          <button className={styles.logoutButton} onClick={handleLogout}>Çıkış Yap</button>
        </div>
      )}

      {/* Reklam Pop-up (2 saniye sonra açılacak) */}
      {showAd && (
        <div className={`${styles.adPopup} ${showAd ? styles.show : ""}`} onClick={handleAdClick}>
          <h2>🚀 Kariyerinde Bir Adım Öne Geç!</h2>
          <p>📢 Yeni iş ilanları, uzmanlık kursları ve networking fırsatları seni bekliyor!</p>
          <ul>
            <li>✔ Ücretsiz CV Analizi</li>
            <li>✔ Günlük Yeni İş Fırsatları</li>
            <li>✔ Profesyonel Kariyer Koçluğu</li>
            <li>✔ Özel Web Seminerlerine Katıl</li>
          </ul>
          <button onClick={(e) => e.stopPropagation() || setShowAd(false)}>Kapat</button>
        </div>
      )}

      {/* Sahte Tarayıcı Penceresi */}
      {showFakeBrowser && (
        <div className={styles.fakeBrowser}>
          <div className={styles.fakeBrowserHeader}>
            <span className={styles.fakeCloseButton} onClick={() => setShowFakeBrowser(false)}>✖</span>
            <span className={styles.fakeUrlBar}>https://job-career-offers.com</span>
          </div>
          <div className={styles.fakeBrowserContent}>
            <h1>⚠ Dikkat!</h1>
            <p>Bu site güvenli değil! Kişisel bilgilerinizi paylaşmayın.</p>
          </div>
        </div>
      )}

      {/* Güvenlik Uyarısı Bildirimi */}
      {showWarning && (
        <div className={styles.warningNotification}>
          ⚠ Dikkat! Güvensiz bir bağlantıya tıklamış olabilirsiniz. Bilinmeyen bağlantılara tıklamayın!
        </div>
      )}

      {showSettings && (
        <div className={styles.settingsMenu}>
          <h3>⚙ Kullanıcı Ayarları</h3>
          <p>📧 E-posta: {ProCareerHubInfo.email}</p>
          <p>📷 Profil Fotoğrafı:  <button>Değiştir</button></p>
          <p>📱 Telefon Numarası:</p>
          <input type="text" value={ProCareerHubInfo.phone} disabled/>

          <div>
            <p>🔐 Parola Güncelle:</p>
            <input
              type="password"
              placeholder="Yeni şifrenizi giriniz:"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handlePasswordUpdate}>Güncelle</button>
          </div>
          {successPassword && <p className={styles.successMessage}>{successPassword}</p>}

          <p>📢 Bildirimler: <button>Değiştir</button></p>

          <button className={styles.twoFAButton} onClick={toggle2FA}>{ProCareerHubInfo.is2FAEnabled ? "2FA Kapat" : "2FA Aç"}</button>
        </div>
      )}

      <header className={styles.header}>
        <h1>🚀 ProCareerHub</h1>
        <p>Kariyerini geliştirmek ve iş fırsatlarını yakalamak için doğru yerdesin!</p>
      </header>

      {!ProCareerHubInfo.isLoggedIn && !is2FAwaiting && (
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

      {is2FAwaiting && (
        <div className={styles.twoFAInputArea}>
          <p>📲 Telefonunuza gelen doğrulama kodunu girin:</p>
          <input
            type="text"
            placeholder="6 haneli kod"
            value={twoFACodeInput}
            onChange={(e) => setTwoFACodeInput(e.target.value)}
          />
          <button onClick={() => {
            if (twoFACodeInput === lastCodes["procareerhub"]) {
              setProCareerHubInfo({ ...ProCareerHubInfo, isLoggedIn: true });
              setIs2FAwaiting(false);
              setTwoFACodeInput("");
              clearCode("procareerhub");
            } else {
              setErrorMessage("⚠ Kod hatalı!");
              setTimeout(() => setErrorMessage(""), 2000);
            }
          }}>
            Giriş Yap
          </button>

          {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
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


