import React, { useState, useRef } from "react";
import styles from './ChatAppDownloadOfficial.module.css';
import { useWindowConfig } from '../../Contexts/WindowConfigContext';

const ChatAppDownloadOfficial = () => {
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
          // İndirilen chatapp masaüstüne ekleniyor:
          updateAvailableStatus("chatapp", { available: true });
          setTimeout(() => setShowPopup(false), 2600);
          setDownloading(false);
          return 100;
        }
        return Math.min(prev + Math.floor(Math.random() * 5) + 4, 100);
      });
    }, 170);
  };

  return (
    <div className={styles.downloadContainer}>
      <div className={styles.header}>
        <img src="/chatbox/logo.png" alt="ChatBox Logo" className={styles.logo} />
        <h2>ChatBox Masaüstü Uygulaması</h2>
        <p className={styles.tagline}>Güvenli, hızlı ve modern sohbet deneyimi.</p>
        <div className={styles.badges}>
          <span className={styles.version}>v3.4.1</span>
          <span className={styles.license}>✔ Ücretsiz</span>
          <span className={styles.rating}>⭐ 4.9 / 5</span>
        </div>
      </div>

      <div className={styles.infobox}>
        <h3>Neden ChatBox?</h3>
        <p>
          ChatBox, mesajlarınızı uçtan uca şifreleme ile korur, anlık bildirimler ve grup sohbetleriyle modern bir iletişim deneyimi sunar.
        </p>
      </div>

      <ul className={styles.featureList}>
        <li>🔒 Uçtan uca şifreli mesajlaşma</li>
        <li>🖥️ Modern ve sade arayüz</li>
        <li>⚡ Gerçek zamanlı iletiler</li>
        <li>💬 Grup ve bireysel sohbet desteği</li>
      </ul>

      <button className={styles.downloadButton} onClick={startDownload} disabled={downloading}>
        {downloading ? `İndiriliyor... %${progress}` : "ChatBoxSetup.exe İndir"}
      </button>

      {showPopup && (
        <div className={styles.popup}>
          <img src="/chatbox/check.png" alt="Check Icon" className={styles.popupIcon} />
          ChatBox kurulum dosyası başarıyla indirildi!
        </div>
      )}
    </div>
  );
};

export default ChatAppDownloadOfficial;
