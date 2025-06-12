import React, { useState } from "react";
import { useFileContext } from "../../Contexts/FileContext";
import styles from "./FileVault.module.css";

// Token kontrolü
const VALID_TOKEN = "a92cf10a-27d4-476b-98f3-8d2fa98c7d84";

// Dosya listesi, ContextFile anahtarlarıyla birebir eşleşen `key` eklenmiştir
const importantFiles = [
  {
    key: "kisiselkullanicibilgileri",
    name: "Kişisel Kullanıcı Bilgileri.pdf",
    type: "pdf",
    size: "740 KB",
    description: "T.C. kimlik kartı taraması"
  },
  {
    key: "issozlesmesi",
    name: "İş Sözleşmesi.pdf",
    type: "pdf",
    size: "1.2 MB",
    description: "İşe giriş sözleşmesi"
  },
  {
    key: "gizlilikpolitikasi",
    name: "Gizlilik Politikası.pdf",
    type: "pdf",
    size: "860 KB",
    description: "Kişisel verilerin gizliliği politikası"
  },
  {
    key: "personelelkitabi",
    name: "Personel El Kitabı.pdf",
    type: "pdf",
    size: "2.1 MB",
    description: "Şirket içi yönergeler ve kurallar"
  }
];

// Başlangıç durumu
const initialDownloadState = {};
importantFiles.forEach(f => {
  initialDownloadState[f.name] = { status: "idle", progress: 0, timer: null };
});

const FileVault = () => {
  const { updateFileStatus } = useFileContext();
  const [entered, setEntered] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [downloadState, setDownloadState] = useState(initialDownloadState);

  const handleEntry = (e) => {
    e.preventDefault();
    if (input.trim() === VALID_TOKEN) {
      setEntered(true);
      setError("");
    } else {
      setError("Geçersiz veya hatalı token!");
    }
  };

  const handleDownload = (file) => {
    if (downloadState[file.name].status !== "idle") return;

    const isMB = file.size.toLowerCase().includes("mb");
    const rawSize = parseFloat(file.size);
    const sizeInKB = isMB ? rawSize * 1024 : rawSize;

    const estimatedStepCount = Math.max(10, Math.floor(sizeInKB / 12));
    const step = 100 / estimatedStepCount;

    const timer = setInterval(() => {
      setDownloadState(prev => {
        let rawProgress = prev[file.name].progress + step;
        const newProgress = Number(Math.min(rawProgress, 100).toFixed(0));
        const isDone = newProgress >= 100;

        if (isDone) {
          clearInterval(prev[file.name].timer);
          updateFileStatus(file.key, { available: true });
        }

        return {
          ...prev,
          [file.name]: {
            ...prev[file.name],
            progress: newProgress,
            status: isDone ? "done" : "downloading",
            timer: isDone ? null : prev[file.name].timer
          }
        };
      });
    }, 45);

    setDownloadState(prev => ({
      ...prev,
      [file.name]: { ...prev[file.name], status: "downloading", progress: 0, timer }
    }));
  };


  const handleCancel = (file) => {
    if (downloadState[file.name].status !== "downloading") return;
    clearInterval(downloadState[file.name].timer);
    setDownloadState(prev => ({
      ...prev,
      [file.name]: { ...prev[file.name], status: "idle", progress: 0, timer: null }
    }));
  };

  if (!entered) {
    return (
      <div className={styles.entryContainer}>
        <div className={styles.entryBox}>
          <img src="/icons/filevault-logo.png" alt="FileVaultLogo" className={styles.logo} />
          <h2>FileVault</h2>
          <p>
            <b>Yedeklenen dosyalarınıza erişmek için size özel token’ı girin.</b>
            <br />Token’ınızı kimseyle paylaşmayın!
          </p>
          <form onSubmit={handleEntry}>
            <input
              type="text"
              placeholder="Erişim token’ı"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={styles.entryInput}
              autoFocus
            />
            <button type="submit" className={styles.entryButton}>
              Erişim Sağla
            </button>
          </form>
          {error && <div className={styles.error}>{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src="/icons/filevault-logo.png" alt="FileVault" className={styles.logo} />
        <div>
          <div className={styles.sitename}>FileVault</div>
          <div className={styles.slogan}>Kişisel Yedekleme Kasası</div>
        </div>
      </div>
      <div className={styles.gradientdivider}></div>
      <div className={styles.banner}>
        🔒 <b>Bu dosyalar yalnızca size özel token ile erişilebilir.</b>
        <span> Token’ınızı güvenli bir yerde saklayın.</span>
      </div>
      <div className={styles.section}>
        <h3>Yedeklenmiş Önemli Dosyalarınız</h3>
        <div className={styles.fileList}>
          {importantFiles.map((file, idx) => {
            const state = downloadState[file.name];
            return (
              <div key={idx} className={styles.fileCard}>
                <div className={styles.fileTop}>
                  <div className={styles.fileIcon}>
                    {file.type === "pdf" ? "📄" : file.type === "jpg" ? "🖼️" : "📁"}
                  </div>
                  <div className={styles.fileInfo}>
                    <span className={styles.fileName}>{file.name}</span>
                    <span className={styles.fileDesc}>{file.description}</span>
                    <span className={styles.fileSize}>{file.size}</span>
                  </div>
                </div>
                <div className={styles.actionRow}>
                  {state.status === "downloading" && (
                    <div className={styles.downloadArea}>
                      <div className={styles.progressWrapper}>
                        <div className={styles.progressBar}>
                          <div
                            className={styles.progress}
                            style={{ width: `${state.progress}%` }}
                          />
                        </div>
                        <span className={styles.progressText}>{state.progress}%</span>
                      </div>
                      <button className={styles.cancelButton} onClick={() => handleCancel(file)}>
                        İptal
                      </button>
                    </div>
                  )}
                  {state.status === "idle" && (
                    <button className={styles.downloadButton} onClick={() => handleDownload(file)}>
                      İndir
                    </button>
                  )}
                  {state.status === "done" && (
                    <button className={styles.downloadedButton} disabled>
                      İndirildi
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.footer}>
        <span>FileVault, kişisel dosyalarınızı güvenle saklar.</span>
      </div>
    </div>
  );
};

export default FileVault;
