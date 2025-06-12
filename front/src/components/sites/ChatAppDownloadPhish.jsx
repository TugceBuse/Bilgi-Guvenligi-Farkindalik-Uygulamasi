import React, { useState, useRef } from "react";
import styles from './ChatAppDownloadPhish.module.css';
import { useWindowConfig } from '../../Contexts/WindowConfigContext';

const highlights = [
  {
    title: "Akıllı Yanıtlar",
    icon: "/icons/conversation.png",
    desc: "ChatBox, gelen mesajları analiz ederek hızlı cevap önerileri sunar. Zaman kazanın, iletişimi hızlandırın."
  },
  {
    title: "Topluluk Alanları",
    icon: "/icons/discussion.png",
    desc: "Her ekip ve konu için ayrı sohbet odaları. Gelişmiş rol ve yetkilendirme."
  },
  {
    title: "Kurumsal Entegrasyon",
    icon: "/icons/live-chat.png",
    desc: "Slack, Teams, Asana ve Google Drive entegrasyonları ile iş akışınızı merkezileştirin."
  }
];

const mustKnows = [
  "ChatBox, tüm ekiplerin mesajlaşma deneyimini modernleştirir.",
  "Premium mod ile sohbetlerinizi kişiselleştirin.",
  "Mesajlarınızı 2 yıl boyunca otomatik arşivleyin.",
  "Sınırsız dosya, resim ve bağlantı paylaşımı.",
  "Masaüstü ve tarayıcıdan anında erişim."
];

const fakeClients = [
  "/avatars/avatar18.png", "/avatars/avatar3.png", "/avatars/avatar5.png", "/avatars/avatar8.png"
];

const ChatAppDownloadPhish = () => {
  const { updateAvailableStatus } = useWindowConfig();
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const intervalRef = useRef(null);

  const startDownload = () => {
    setDownloading(true);
    setProgress(0);
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          setShowPopup(true);
          updateAvailableStatus("chatappf", { available: true,});
          setTimeout(() => setShowPopup(false), 2200);
          setDownloading(false);
          return 100;
        }
        return Math.min(prev + Math.floor(Math.random() * 7) + 4, 100);
      });
    }, 150);
  };

  return (
    <div className={styles.downloadContainer}>
      <header className={styles.header}>
        <img src="/icons/chatting.png" alt="ChatBox Pro" className={styles.logo} />
        <div>
          <h1>ChatBox Pro</h1>
          <span className={styles.slogan}>Mesajlaşmanın geleceği: Güvenli. Akıllı. Kolay.</span>
        </div>
      </header>

      <section className={styles.heroSection}>
        <div className={styles.leftColumn}>
          <div className={styles.statsRow}>
            <span><b>10.000+</b> aktif ekip</span>
            <span><b>9M+</b> mesaj</span>
            <span><b>120+</b> ülke</span>
          </div>
          <div className={styles.downloadBox}>
            <p className={styles.downloadTitle}>ChatBox Pro'yu Ücretsiz İndir</p>
            <button
              className={styles.downloadButton}
              onClick={startDownload}
              disabled={downloading}
            >
              <img src="/icons/downloading.png" alt="indir" />
              ChatBoxPro.exe
            </button>
            {downloading &&
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                <span className={styles.progressText}>{progress}%</span>
              </div>
            }
            {showPopup && (
              <div className={styles.popup}>
                Kurulum dosyası indirildi! <b>ChatBox Pro'yu hemen kurun.</b>
              </div>
            )}
            <div className={styles.legalText}>Kurulum ile lisans ve KVKK koşullarını kabul etmiş olursunuz.</div>
          </div>
          <div className={styles.mustKnows}>
            <h3>Bilmeniz Gerekenler</h3>
            <ul>
              {mustKnows.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>
        <div className={styles.rightColumn}>
          Her yerden Herkesle anında iletişim kurun. ChatBox Pro, ekiplerinizi bir araya getirir, iş akışınızı hızlandırır ve güvenli bir iletişim ortamı sunar. İster masaüstü, ister mobil, her zaman yanınızda.
          <img src="/icons/group-discussion.png" alt="ChatBox Sohbet Ekranı" className={styles.appPreview} />
          <div className={styles.clientsRow}>
            {fakeClients.map((logo, i) => (
              <img key={i} src={logo} alt="Kurumsal Müşteri" />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.highlightsSection}>
        {highlights.map((h, i) => (
          <div key={i} className={styles.highlightCard}>
            <img src={h.icon} alt={h.title} />
            <h4>{h.title}</h4>
            <p>{h.desc}</p>
          </div>
        ))}
      </section>

      <section className={styles.securitySection}>
        <h2>Veri Güvenliği & Altyapı</h2>
        <ul>
          <li>Aktif kimlik doğrulama ve MFA (Multi Factor Auth)</li>
          <li>Yerleşik virüs koruması & dosya tarama altyapısı</li>
          <li>Verileriniz Avrupa’daki ISO 27001 sertifikalı sunucularda saklanır</li>
          <li>Her ay bağımsız güvenlik denetimi</li>
          <li>Silinen sohbetler 48 saat içinde kurtarılabilir</li>
        </ul>
      </section>

      <footer className={styles.footer}>
        <p>
          © 2025 ChatBox Ltd. | <span className={styles.footerSpan}>Gizlilik & Kullanım Koşulları</span>
        </p>
      </footer>
    </div>
  );
};

export default ChatAppDownloadPhish;
