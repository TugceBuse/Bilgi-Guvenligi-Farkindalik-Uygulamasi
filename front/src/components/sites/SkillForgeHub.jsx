import React, { useState } from "react";
import styles from "./SkillForgeHub.module.css";

const SkillForgeHub = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleAuth = () => {
    if (!isLogin && (!name || !surname)) {
      alert("Lütfen adınızı ve soyadınızı girin!");
      return;
    }
    setLoggedInUser(!isLogin ? `${name} ${surname}` : email.split("@")[0]); 
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setName("");
    setSurname("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.skillContainer}>
        {/* Header */}
      <header className={styles.header}>
        <h1>🚀 SkillForgeHub</h1>
        <p>Geleceğe hazır olmak için becerilerini geliştir!</p>
      </header>
      {/* Kullanıcı Paneli */}
      {loggedInUser && (
        <div className={styles.userPanel}>
          <p className={styles.userName}>👤 {loggedInUser}</p>
          <button className={styles.logoutButton} onClick={handleLogout}>Çıkış Yap</button>
        </div>
      )}

      {/* Giriş Yap Butonu */}
      {!loggedInUser && (
        <button className={styles.loginButton} onClick={() => setIsLoginOpen(true)}>
          Giriş Yap | Kayıt Ol
        </button>
      )}

      {/* Giriş / Kayıt Alanı */}
      {!loggedInUser && isLoginOpen && (
        <div className={`${styles.authBox} ${isLoginOpen ? styles.active : ""}`}>
          <h2>{isLogin ? "Giriş Yap" : "Kayıt Ol"}</h2>
          {!isLogin && <input type="text" placeholder="Ad" value={name} onChange={(e) => setName(e.target.value)} />}
          {!isLogin && <input type="text" placeholder="Soyad" value={surname} onChange={(e) => setSurname(e.target.value)} />}
          <input type="email" placeholder="E-posta adresiniz" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Şifreniz" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleAuth}>{isLogin ? "Giriş Yap" : "Kayıt Ol"}</button>
          <p onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Hesabınız yok mu? Kayıt olun!" : "Zaten üye misiniz? Giriş yapın!"}
          </p>
          <button onClick={() => setIsLoginOpen(false)}>Kapat</button>
        </div>
      )}

    <div className={styles.infoSection}>
        {/* Popüler Alanlar Bölümü */}
        <div className={styles.popularSkills}>
            <h2>🔥 Popüler Beceriler</h2>
            <ul>
            <li>💻 **Kodlama & Yapay Zeka**</li>
            <li>🎨 **UI/UX Tasarımı & Yaratıcılık**</li>
            <li>📈 **Dijital Pazarlama & SEO**</li>
            <li>🚀 **Girişimcilik & Ürün Yönetimi**</li>
            <li>👔 **Liderlik & Takım Yönetimi**</li>
            </ul>
        </div>

        {/* Öğrenme Araçları */}
<div className={styles.learningTools}>
    <h2>📚 Öğrenme Araçları</h2>
    <p>
        Teknoloji ve iş dünyasının hızla değiştiği bu çağda, kendini sürekli geliştirmen gerekiyor.  
        SkillForgeHub, etkileşimli öğrenme araçlarıyla **bilgi edinmeyi daha eğlenceli ve verimli** hale getiriyor.  
        **Online derslerden simülasyonlara, mentor görüşmelerinden hackathonlara kadar** birçok araç ile kendini geliştirebilirsin.
    </p>

    <ul className={styles.learningList}>
        <li>🎥 <strong>Canlı Dersler:</strong> Uzman eğitmenlerden gerçek zamanlı eğitimler alabilir, soru sorabilir ve etkileşimde bulunabilirsin.</li>
        <li>🛠️ <strong>Proje Tabanlı Öğrenme:</strong> Teorik bilgiyi pratiğe dökerek, **gerçek dünya problemlerini çözebileceğin projeler yapabilirsin**.</li>
        <li>💡 <strong>Simülasyonlar:</strong> Gerçek hayat senaryolarını birebir deneyimleyerek **daha hızlı ve etkili öğrenme sağlayabilirsin**.</li>
        <li>🧑‍🏫 <strong>Mentor Görüşmeleri:</strong> Alanında başarılı kişilerle birebir görüşerek **doğrudan bilgi ve deneyim kazanabilirsin**.</li>
        <li>🏆 <strong>Hackathon ve Yarışmalar:</strong> Kendi yeteneklerini test edebilir, **ödüller kazanarak CV’ni güçlendirebilir ve sektörle bağlantı kurabilirsin**.</li>
    </ul>

    <p>
        Bütün bu araçlarla **daha hızlı, etkili ve pratik öğrenme yöntemlerini keşfet!**  
        Kendi öğrenme tarzına uygun içerikleri bul ve kariyerine güç kat.
    </p>

    <button className={styles.exploreButton}>Keşfet</button>
</div>

{/* Topluluk ve Networking */}
<div className={styles.communitySection}>
    <h2>🌍 Topluluğa Katıl</h2>
    <p>
        **Öğrenmenin en iyi yolu, bilgiyi paylaşmaktır!**  
        SkillForgeHub topluluğu, profesyoneller, girişimciler ve öğrenmeye hevesli bireylerden oluşur.  
        **Sektördeki diğer kişilerle tanışarak, bilgi paylaşımı yapabilir ve birlikte projeler geliştirebilirsin.**
    </p>

    <ul className={styles.communityList}>
        <li>💬 <strong>Forumlar:</strong> Sorularını sorabilir, bilgi alışverişi yapabilir ve topluluktan destek alabilirsin.</li>
        <li>🎤 <strong>Canlı Etkinlikler:</strong> Webinarlar, networking buluşmaları ve sektör liderleriyle panel tartışmalarına katılabilirsin.</li>
        <li>📢 <strong>Proje Paylaşımları:</strong> Kendi projelerini sergileyebilir, geri bildirim alabilir ve iş fırsatları yakalayabilirsin.</li>
        <li>🔗 <strong>LinkedIn Bağlantıları:</strong> Profesyonel çevreni genişletebilir, yeni iş fırsatlarını keşfedebilirsin.</li>
    </ul>

    <p>
        **Tek başına öğrenmek yerine bir toplulukla büyümek, sana daha fazla fırsat ve motivasyon sağlayacaktır!**  
        **Topluluğa katıl ve sektörün en iyi isimleriyle bağlantı kur!**
    </p>

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
