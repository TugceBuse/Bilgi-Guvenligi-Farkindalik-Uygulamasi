import React, { useState } from "react";
import styles from "./CyberSentinel.module.css";

const CyberSentinel = () => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleDownloadClick = () => {
    setButtonLoading(true);
    setDownloadMessage("İndiriliyor...");
    setTimeout(() => {
      setButtonLoading(false);
      setDownloadMessage("İndirme tamamlandı!");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        setDownloadMessage("");
      }, 3000);
    }, 5000);
  };

  return (
    <div className={styles.downloadContainer}>
      <div className={styles.promoBox}>
        <h3>CyberSentinel Premium</h3>
        <p>Bugün satın alın, yıllık planda %50 indirim fırsatını kaçırmayın!</p>
        <button className={styles.upgradeBtn}>Premium'a Yükselt</button>
      </div>
      
      <h2>CyberSentinel İndirme Merkezi</h2>
      <p>CyberSentinel antivirüs yazılımını güvenli şekilde indirin.</p>
      
      <div className={styles.contentBox}>
        <div className={styles.infoSection}>
          <h2>CyberSentinel Antivirus</h2>
          <p>Cihazınızı virüslere, kötü amaçlı yazılımlara ve kimlik avına karşı korur.</p>
          <ul>
            <li>Gerçek zamanlı tarama</li>
            <li>Akıllı güvenlik duvarı</li>
            <li>Otomatik güncellemeler</li>
            <li>Güvenli web gezintisi</li>
          </ul>
        </div>
        
        <div className={styles.downloadSection}>
          <h3>İndirme Seçenekleri</h3>
          <ul>
            <li>
              <button 
                onClick={handleDownloadClick} 
                disabled={buttonLoading} 
                className={styles.downloadBtn}
              >
                {buttonLoading ? <div className={styles.progress}></div> : "CyberSentinel Kurulum"}
              </button>
            </li>
            <li>
              <button className={styles.downloadBtn} onClick={handleDownloadClick}>
                CyberSentinel Güncelleme
              </button>
            </li>
            <li>
              <button className={styles.downloadBtn}>Kullanım Kılavuzu</button>
            </li>
          </ul>
          {downloadMessage && <p>{downloadMessage}</p>}
        </div>
      </div>
      
      {showPopup && <div className={styles.popup}>İndirme Tamamlandı!</div>}
    </div>
  );
};

export default CyberSentinel;
