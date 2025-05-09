import React, { useState, useEffect, useRef } from "react";
import styles from './NovaBankSite.module.css';
import { useGameContext } from "../../Contexts/GameContext";

const NovaBankSite = () => {
  const { setBankInfo } = useGameContext();

  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);
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
          setBankInfo(prev => ({ ...prev, available: true }));
          setTimeout(() => setShowPopup(false), 3000);
          setDownloading(false);
          return 100;
        }
        const randomIncrease = Math.floor(Math.random() * 4) + 1; // 1-4 arasında rastgele artış
        const newProgress = Math.min(prev + randomIncrease, 100); // 100'ü aşmamasını sağla

        return newProgress;
      });
    }, 200); // Her 200ms'de bir güncelle
  };

  const cancelDownload = () => {
    clearInterval(intervalRef.current);
    setDownloading(false);
    setProgress(0);
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <img src="/icons/novabank-logo.png" alt="NovaBank Logo" className={styles.logo} />
        <h1>NovaBank Masaüstü Uygulaması</h1>
        <p>Dijital bankacılık işlemleriniz için hızlı ve güvenli masaüstü çözüm.</p>
      </div>

      <div className={styles.features}>
        <h2>Uygulama Özellikleri</h2>
        <ul>
          <li>🔐 Gelişmiş Güvenlik (2FA & 256-bit şifreleme)</li>
          <li>💳 Kart ve IBAN Yönetimi</li>
          <li>⚡ Anında FAST / EFT / Havale</li>
          <li>📄 Tüm Ödeme ve Transfer İşlemleri</li>
          <li>🧾 Hesap Geçmişi ve Raporlama</li>
        </ul>
      </div>

      <div className={styles.downloadSection}>
        <h2>İndirme</h2>
        <p>Windows için NovaBank uygulamasını indirerek kuruluma başlayabilirsiniz:</p>
        <button
          className={styles.downloadBtn}
          onClick={downloading ? cancelDownload : startDownload}
        >
          {downloading ? `${progress}% indiriliyor...` : "NovaBankSetup.exe"}
        </button>
        {downloading && (
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>

      {showPopup && <div className={styles.popup}>✅ Kurulum dosyası indirildi.</div>}

      <footer className={styles.footer}>
        © 2025 NovaBank | Tüm hakları saklıdır. | Destek: 0850 5050 4567
      </footer>
    </section>
  );
};

export default NovaBankSite;
