import React, { useState, useRef } from "react";
import styles from './ChatAppDownloadPhish.module.css';
import { useVirusContext } from '../../Contexts/VirusContext';
import { useQuestManager } from "../../Contexts/QuestManager";
import { useEventLog } from "../../Contexts/EventLogContext";

// Sahte öne çıkarılan özellikler
const highlights = [
  {
    title: "Akıllı Yanıtlar",
    icon: "/icons/conversation.png",
    desc: "ChatBox, mesajları analiz ederek anında yanıt önerileri sunar. Hiçbir sohbeti kaçırmayın."
  },
  {
    title: "Kurumsal Entegrasyon",
    icon: "/icons/live-chat.png",
    desc: "Bir çok işletim sistemi ile tam uyumlu! Dosya ve toplantı entegrasyonu."
  },
  {
    title: "Rol & Erişim Yönetimi",
    icon: "/icons/roles.png",
    desc: "Her seviyeden çalışan için ayrı ayrı yetkilendirme, şifreli arşiv ve detaylı raporlar."
  }
];

const mustKnows = [
  "ChatBox ile tüm ekibinizle gerçek zamanlı iletişim kurun.",
  "Premium üyelik ile sınırsız sohbet ve dosya transferi.",
  "Mesajlarınızı 2 yıl boyunca otomatik yedekleyin.",
  "Masaüstü, web ve mobil uyumlu erişim.",
  "KVKK ve GDPR uyumlu arşivleme."
];

const fakeClients = [
  "/avatars/avatar12.png", "/avatars/avatar5.png", "/avatars/avatar8.png", "/avatars/avatar11.png"
];

const ChatAppF = () => {
  const { addVirus } = useVirusContext();
  const { addEventLog } = useEventLog();
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const intervalRef = useRef(null);
  const {failQuest} = useQuestManager();

  const [cancelled, setCancelled] = useState(false);

  const startDownload = () => {
    setCancelled(false);
    setDownloading(true);
    setProgress(0);

    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          setShowPopup(true);

          // 2sn sonra popup kapanacak VE sadece iptal edilmediyse virüs eklenecek
          setTimeout(() => {
            setShowPopup(false);
            setDownloading(false);

            if (!cancelled) {
              addVirus({ type: "credential-stealer", source: "chatappdownloadf" });
              failQuest("download_chatapp");
              addEventLog({
                type: "download_setup",
                questId: "download_chatapp",
                logEventType: "download",
                value: -10,
                data: 
                {
                  site: "ChatAppDownloadPhish",
                  infected: true,
                  virusType: "credential-stealer",
                }
              });
            }
          }, 2000);

          return 100;
        }
        return Math.min(prev + Math.floor(Math.random() * 6) + 4, 100);
      });
    }, 130);
  };

  const cancelDownload = () => {
    setCancelled(true);
    setDownloading(false);
    setProgress(0);
    setShowPopup(false);
    clearInterval(intervalRef.current);
  };

  return (
    <div className={styles.downloadContainer}>
      <header className={styles.header}>
        <img src="/icons/chatting.png" alt="ChatBox" className={styles.logo} />
        <div>
          <h1>ChatBox <span style={{color:"#e36a9d"}}></span></h1>
          <span className={styles.slogan}>Kurumsal iletişimin yeni nesil güvencesi.</span>
        </div>
      </header>

      <section className={styles.heroSection}>
        <div className={styles.leftColumn}>
          <div className={styles.statsRow}>
            <span><b>11.000+</b> aktif kurum</span>
            <span><b>15M+</b> mesaj</span>
            <span><b>134</b> ülke</span>
          </div>
          <div className={styles.downloadBox}>
            <p className={styles.downloadTitle}>ChatBox'ı Şimdi İndir</p>
            <button
              className={styles.downloadButton}
              onClick={startDownload}
              disabled={downloading}
            >
              <img src="/icons/downloading.png" alt="indir" />
              ChatBox_Setup.exe
            </button>
            {downloading &&
              <div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                  <span className={styles.progressText}>{progress}%</span>
                </div>
                <button className={styles.cancelButton} onClick={cancelDownload}>
                  İptal Et
                </button>
              </div>
            }
            {showPopup && (
              <div className={styles.popup}>
                Kurulum dosyası indirildi! <b>Hemen kuruluma başlayın.</b>
              </div>
            )}
            <div className={styles.legalText}>Kurulum ile tüm sözleşme ve veri politikalarını kabul etmiş sayılırsınız.</div>
          </div>
          <div className={styles.mustKnows}>
            <h3>Bilmeniz Gerekenler</h3>
            <ul>
              {mustKnows.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>
        <div className={styles.rightColumn}>
          Her yerde, herkesle güvenli iletişim. ChatBox ekiplerinizi buluşturur, işlerinizi hızlandırır ve bulutta şifreli tutar.
          <img src="/icons/group-discussion.png" alt="ChatBox Sohbet" className={styles.appPreview} />
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
      <span className={styles.phishHint}>Bu sayfa ChatBox'ın resmi sitesi değildir.</span>
      <section className={styles.securitySection}>
        <h2>Veri Güvenliği & Altyapı</h2>
        <ul>
          <li>Çok katmanlı kimlik doğrulama ve MFA (Multi Factor Auth)</li>
          <li>Dosya yüklemelerinde gelişmiş virüs taraması</li>
          <li>Verileriniz sadece Avrupa merkezli ISO 27001 sertifikalı sunucularda tutulur</li>
          <li>Düzenli dış bağımsız güvenlik denetimi</li>
          <li>Silinen sohbetler 72 saat içinde kurtarılabilir</li>
        </ul>
      </section>

      <footer className={styles.footer}>
        <p>
          © 2025 ChatBox Ltd. | <span className={styles.footerSpan}>Kullanım & Gizlilik Sözleşmesi</span>
        </p>
      </footer>
    </div>
  );
};

export default ChatAppF;
