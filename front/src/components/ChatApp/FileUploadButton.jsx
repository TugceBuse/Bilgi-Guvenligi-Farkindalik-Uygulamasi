import React, { useState } from "react";
import styles from "./FileUploadButton.module.css";
import { useFileContext } from "../../Contexts/FileContext";

const FileUploadButton = ({
  visible,
  allowedTypes = ["pdf"],
  filterLabelContains = null,
  buttonText = "Dosya Yükle",
  onFileSend,
}) => {
  const { files } = useFileContext();
  const [open, setOpen] = useState(false);

  const allFiles = Object.entries(files).filter(([k, f]) =>
    f.available && allowedTypes.includes(f.type)
  );

  if (!visible) return null;

  return (
    <>
      <button className={styles.uploadFab} onClick={() => setOpen(true)} style={{display: "block"}}>
        📄 {buttonText}
      </button>
      {open && (
        <div className={styles.uploadBackdrop}>
          <div className={styles.uploadModal}>
            <button className={styles.closeX} onClick={() => setOpen(false)} title="Kapat">×</button>
            <div className={styles.modalHeader}>Fatura PDF'si Seç</div>
            <div className={styles.fileList}>
              {allFiles.length === 0 && (
                <span className={styles.noFiles}>Yüklü PDF dosyan yok.</span>
              )}
              {allFiles.map(([fileName, file]) => {
                const isAllowed = !filterLabelContains || file.label.toLowerCase().includes(filterLabelContains);
                return (
                  <button
                    key={fileName}
                    className={`${styles.fileButton} ${isAllowed ? "" : styles.disabledFile}`}
                    onClick={() => {
                      if (!isAllowed) return;
                      if (onFileSend) onFileSend(file);
                      setOpen(false);
                    }}
                    disabled={!isAllowed}
                  >
                    <img src={file.icon} alt="icon" className={styles.fileIcon} />
                    {file.label}
                    {!isAllowed && (
                      <span className={styles.onlyInvoice}>Sadece fatura</span>
                    )}
                  </button>
                );
              })}
            </div>
            <button className={styles.cancelBtn} onClick={() => setOpen(false)}>
              İptal
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FileUploadButton;
