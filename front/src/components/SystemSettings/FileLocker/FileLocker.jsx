import React, { useState } from "react";
import styles from "./FileLocker.module.css";
import { useFileContext } from "../../../Contexts/FileContext";

const LOCK_ICON = (
  <img src="/FileLocker/locked.png" alt="Locked File" />
);

const FileLocker = ({ onClose }) => {
  const { files, updateFileStatus } = useFileContext();
  // Şifrelenmiş dosya isimleri
  const lockedFiles = Object.keys(files).filter(
    name => files[name].locked
  );
  // Sadece PDF ve DOCX dosyaları
  const fileList = Object.entries(files)
    .filter(([_, f]) =>
      (f.type === "pdf" || f.type === "docx") && f.available
    );

  const [selected, setSelected] = useState(null);
  const [lockSuccess, setLockSuccess] = useState(false);

  const handleLock = () => {
    if (!selected) return;
    updateFileStatus(selected, { locked: true });
    setLockSuccess(true);
    setTimeout(() => setLockSuccess(false), 1200);
  };

  const handleUnlock = () => {
    if (!selected) return;
    updateFileStatus(selected, { locked: false });
  };

  return (
    <div className={styles.lockerBox}>
      <div className={styles.header}>
        <img src="/FileLocker/secureFile.png" alt="FileLocker" />
        <h2>FileLocker — Dosya Şifreleme</h2>
      </div>
      <div className={styles.info}>
        <p>
          Şifrelemek istediğiniz <b>PDF</b> veya <b>Word (DOCX)</b> dosyasını seçin.<br />
          Seçilen dosya şifrelenerek erişime kapatılır.
        </p>
      </div>
      <div className={styles.fileListArea}>
        {fileList.length === 0 && (
          <div className={styles.noFiles}>Şifrelenebilir dosya bulunamadı.</div>
        )}
        {fileList.length > 0 && (
          <div className={styles.fileList}>
            {fileList.map(([fileName, file]) => (
              <div
                key={fileName}
                className={`${styles.fileItem} ${file.locked ? styles.locked : ""} ${selected === fileName ? styles.selected : ""}`}
                onClick={() => setSelected(fileName)}
                tabIndex={file.locked ? -1 : 0}
                aria-disabled={file.locked}
                title={file.locked ? "Bu dosya zaten şifreli" : "Şifrelemek için seç"}
              >
                <img src={file.icon} alt="icon" className={styles.icon} />
                <span className={styles.fileLabel}>{file.label}</span>
                <span className={styles.fileType}>.{file.type}</span>
                {file.locked && <span className={styles.lockedTag}>{LOCK_ICON} Kilitli</span>}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.actions}>
        <button
            className={styles.lockBtn}
            onClick={handleLock}
            disabled={!selected || (selected && files[selected].locked)}
        >
            {selected && files[selected].locked ? "Zaten Şifreli" : "Dosyayı Şifrele"}
        </button>
        {/* KİLİDİ AÇ butonu */}
        {selected && files[selected].locked && (
            <button className={styles.lockBtn} onClick={handleUnlock}>
            Kilidi Aç
            </button>
        )}
        {lockSuccess && (
            <span className={styles.successMsg}>Dosya şifrelendi!</span>
        )}
        </div>
      <div className={styles.footer}>
        <span>
          🔒 Şifrelenen dosyalar koruma altına alınır ve içeriklerine erişilemez.
        </span>
      </div>
    </div>
  );
};

export default FileLocker;
