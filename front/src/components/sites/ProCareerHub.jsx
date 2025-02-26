import React, { useState } from "react";
import styles from "./ProCareerHub.module.css";

const ProCareerHub = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleAuth = () => {
    if (!isLogin && !name) {
      alert("Lütfen adınızı girin!");
      return;
    }
    setLoggedInUser(name || email.split("@")[0]); // Eğer ad girildiyse onu, yoksa email'in @ öncesini gösterir
  };
  const handleLogout = () => {
    setLoggedInUser(null);
    setName("");
    setSurname("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.careerContainer}>

      {/* Kullanıcı Paneli (Sağ Üst Köşe) */}
      {loggedInUser && (
        <div className={styles.userPanel}>
          <p className={styles.userName}>👤 {loggedInUser}</p>
          <button className={styles.logoutButton} onClick={handleLogout}>Çıkış Yap</button>
        </div>
      )}

      {/* Header */}
      <header className={styles.header}>
        <h1>🚀 ProCareerHub</h1>
        <p>Kariyerini geliştirmek ve iş fırsatlarını yakalamak için doğru yerdesin!</p>
      </header>

      {/* Giriş / Kayıt Alanı */}
      {!loggedInUser && (
        <div className={styles.authBox}>
          <h2>{isLogin ? "Giriş Yap" : "Kayıt Ol"}</h2>
          {!isLogin && (
            <input
              type="text"
              placeholder="Ad"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          {!isLogin && (
            <input
              type="text"
              placeholder="Soyad"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="E-posta adresiniz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Şifreniz"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleAuth}>{isLogin ? "Giriş Yap" : "Kayıt Ol"}</button>
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

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2025 ProCareerHub | Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
};

export default ProCareerHub;
