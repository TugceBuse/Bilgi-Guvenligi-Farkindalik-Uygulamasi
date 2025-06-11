import React, { useState } from "react";
import styles from "./FileLocker.module.css";

const testimonials = [
  {
    avatar: "/avatars/avatar21.png",
    name: "Özge K.",
    comment: "Kurumsal dosyalarımı tek tıkla şifreleyebildim, arayüz çok sade ve anlaşılır. Teşekkürler BitLockr!"
  },
  {
    avatar: "/avatars/avatar16.png",
    name: "Deniz Y.",
    comment: "Bilgisayarımı kaybetsem bile dosyalarımın başkasının eline geçmeyeceğini bilmek harika!"
  },
  {
    avatar: "/avatars/avatar12.png",
    name: "Gökhan A.",
    comment: "Ofiste hassas belgeler için kullanıyoruz. İki faktörlü doğrulama çok başarılı."
  }
];

export default function FileLocker({ onDownload }) {
  const [platform, setPlatform] = useState("windows");
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    if (onDownload) onDownload(platform);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className={styles.wrapper}>
      {/* Hero */}
      <header className={styles.header}>
        <img src="/bitlockr/bitlockr-logo.svg" alt="BitLockr" className={styles.logo} />
        <div>
          <h1 className={styles.title}>
            BitLockr <span className={styles.lockIcon}>🔒</span>
          </h1>
          <h2 className={styles.subtitle}>
            Kişisel & Kurumsal Dosya Şifreleme Aracı
          </h2>
        </div>
        <div className={styles.announcement}>YENİ: <b>Hızlı Dosya Şifreleme!</b></div>
      </header>

      {/* Main Feature */}
      <div className={styles.mainSection}>
        <div className={styles.featureBox}>
          <img src="/bitlockr/illustration-main.svg" alt="BitLockr Güvenlik" />
          <div>
            <h3 className={styles.sectionTitle}>Dosyalarınızı Güvence Altına Alın!</h3>
            <ul>
              <li>📦 <b>Kritik verilerinizi</b> anında şifreleyin.</li>
              <li>💾 Yedeklerinizi kaybolma, çalınma ve kötü amaçlı yazılımlara karşı koruyun.</li>
              <li>🪪 Ofis ve kişisel bilgisayarlarda %100 gizlilik.</li>
              <li>🪢 <b>BitLockr ile tek tıkla şifreleme, parola ve kurtarma anahtarı yönetimi!</b></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Download CTA */}
      <div className={styles.downloadArea}>
        <div className={styles.downloadCard}>
          <h3 className={styles.sectionTitle}>Uygulamayı İndir</h3>
          <div className={styles.platformSelect}>
            <button className={platform === "windows" ? styles.selected : ""}
              onClick={() => setPlatform("windows")}>Windows</button>
            <button className={platform === "mac" ? styles.selected : ""}
              onClick={() => setPlatform("mac")}>macOS</button>
            <button className={platform === "linux" ? styles.selected : ""}
              onClick={() => setPlatform("linux")}>Linux</button>
          </div>
          <button className={styles.downloadBtn} onClick={handleDownload} disabled={downloaded}>
            {downloaded ? "İndiriliyor..." : `${platform === "windows" ? "BitLockrSetup.exe" : platform === "mac" ? "BitLockr.dmg" : "BitLockr.AppImage"} İndir`}
          </button>
          <div className={styles.infoText}>
            <span>⚠️ Yedek dosyalarınız sadece sizin belirleyeceğiniz bir parola ile açılabilir. Parolanızı unutmayın!</span>
          </div>
          <div className={styles.hashBox}>
            <span>SHA256:</span>
            <span className={styles.hashValue}>c8b22e92...e5a1b9f3</span>
            <span className={styles.hashHelp} title="Yükleme dosyanızın bütünlüğünü kontrol etmek için hash değerini kullanabilirsiniz.">?</span>
          </div>
        </div>
        <div className={styles.extraLinks}>
          <a href="/bitlockr/user-guide.pdf" target="_blank" rel="noopener noreferrer">Kullanıcı Rehberi</a>
          <a href="/bitlockr/faq" target="_blank" rel="noopener noreferrer">Sık Sorulanlar</a>
        </div>
      </div>

      {/* Testimonial Carousel */}
      <div className={styles.testimonialSection}>
        <h3>Kullanıcı Yorumları</h3>
        <div className={styles.testimonialCarousel}>
          {testimonials.map((t, i) => (
            <div className={styles.testimonialCard} key={i}>
              <img src={t.avatar} alt={t.name} className={styles.avatar} />
              <div>
                <b>{t.name}</b>
                <p>{t.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className={styles.featureGrid}>
        <div>
          <img src="/bitlockr/feature1.svg" alt="AES-256 Şifreleme" />
          <h4>Askeri Seviye Güvenlik</h4>
          <p>AES-256, RSA ve TPM modülüyle desteklenmiş ileri seviye şifreleme.</p>
        </div>
        <div>
          <img src="/bitlockr/feature2.svg" alt="Kurtarma Anahtarı" />
          <h4>Parola & Anahtar Yönetimi</h4>
          <p>Unutulsa bile: kurtarma anahtarınızla dosyalarınıza tekrar erişin.</p>
        </div>
        <div>
          <img src="/bitlockr/feature3.svg" alt="Çift Faktör" />
          <h4>2FA & Parmak İzi</h4>
          <p>İsteğe bağlı iki adımlı kimlik doğrulama ile ekstra koruma.</p>
        </div>
        <div>
          <img src="/bitlockr/feature4.svg" alt="Cloud Yedek" />
          <h4>Bulut Entegrasyonu</h4>
          <p>Google Drive & OneDrive ile otomatik yedeklemeyi etkinleştirin.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div>
          <img src="/bitlockr/bitlockr-logo.svg" alt="logo" className={styles.footerLogo} />
          <span>BitLockr © 2025 SecureWare Inc.</span>
        </div>
        <div>
          <a href="/bitlockr/privacy" target="_blank" rel="noopener noreferrer">Gizlilik</a> ·
          <a href="/bitlockr/eula" target="_blank" rel="noopener noreferrer">Kullanıcı Sözleşmesi</a>
        </div>
      </footer>
    </div>
  );
}
