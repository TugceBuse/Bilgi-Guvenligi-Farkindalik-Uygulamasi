import React from "react";
import { useGameContext } from "../../Contexts/GameContext";
import styles from "./CloudBoxPackageDisplay.module.css";

// url prop: "https://cloudbox.com/package/xxxx"
const CloudBoxPackageDisplay = ({ url }) => {
  const { cloudBoxBackup } = useGameContext();

  // Paketin kodunu URL'den ayıkla
  const packageCode = url?.split("/package/")[1];
  const myCode = cloudBoxBackup.packageLink?.split("/package/")[1];

  // 1) Paket var mı, public mi?
  if (!packageCode || packageCode !== myCode) {
    return (
      <div className={styles.displayContainer}>
        <h2>Paket Bulunamadı</h2>
        <div>Bağlantı geçersiz veya paket artık mevcut değil.</div>
      </div>
    );
  }
  if (!cloudBoxBackup.permissions.isPublic) {
    return (
      <div className={styles.displayContainer}>
        <h2>Paket Gizli</h2>
        <div>Bu yedek paketi sahibi tarafından gizlenmiş.</div>
      </div>
    );
  }

  // 2) Dosyaları göster
  return (
    <div className={styles.displayContainer}>
      <div className={styles.displayHeader}>
        <img src="/icons/cloudbox-logo.svg" alt="CloudBox" className={styles.displayLogo} />
        <span className={styles.displayTitle}>CloudBox</span>
        <span className={styles.displaySlogan}>Yedek Paketi</span>
      </div>
      <div className={styles.displaySection}>
        <h3>Paket Dosyaları</h3>
        <div className={styles.displayList}>
          {cloudBoxBackup.files.length === 0
            ? <span className={styles.noFile}>Paket boş.</span>
            : cloudBoxBackup.files.map((file, idx) => (
              <div key={file.label} className={styles.displayCard}>
                <span className={styles.fileIcon}>
                  {file.type === "pdf" ? "📄" : file.type === "jpg" ? "🖼️" : "📁"}
                </span>
                <span>{file.label} ({file.size})</span>
                {cloudBoxBackup.permissions.canDownload &&
                  <button
                    className={styles.downloadBtn}
                    onClick={() => alert(`İndirme başlatılıyor: ${file.label}`)}
                  >İndir</button>}
                {!cloudBoxBackup.permissions.canDownload &&
                  <span className={styles.downloadDisabled}>İndirme kapalı</span>}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CloudBoxPackageDisplay;
