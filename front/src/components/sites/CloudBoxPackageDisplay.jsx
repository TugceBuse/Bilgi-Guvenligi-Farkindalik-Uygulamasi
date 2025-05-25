import React from "react";
import { useGameContext } from "../../Contexts/GameContext";
import styles from "./CloudBox.module.css";

const CloudBoxPackageDisplay = ({ url }) => {
  // URL'den link kodunu ayıkla
  const packageCode = url.split("/package/")[1];
  const { cloudBoxBackup } = useGameContext();

  // Doğru paket mi kontrol et
  if (!cloudBoxBackup.packageLink.endsWith(packageCode)) {
    return <div className={styles.container}>
      <h2>Paket Bulunamadı</h2>
      <div>Böyle bir yedek paketi mevcut değil veya bağlantı süresi dolmuş olabilir.</div>
    </div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>CloudBox</span>
        <span className={styles.slogan}>Yedek Paketi İçeriği</span>
      </div>
      <div className={styles.section}>
        <h3>Paket İçindeki Dosyalar</h3>
        <div className={styles.uploadList}>
          {cloudBoxBackup.files.map(file => (
            <div className={styles.uploadCard} key={file.label}>
              <span className={styles.fileIcon}>
                {file.type === "pdf" ? "📄" : file.type === "jpg" ? "🖼️" : "📁"}
              </span>
              <span>{file.label} ({file.size})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CloudBoxPackageDisplay;
