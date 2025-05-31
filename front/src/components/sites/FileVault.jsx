import React, { useState } from "react";
import { useFileContext } from "../../Contexts/FileContext";
import styles from "./FileVault.module.css";

// Uzun bir token
const VALID_TOKEN = "a92cf10a-27d4-476b-98f3-8d2fa98c7d84";

const importantFiles = [
  { name: "kimlik.pdf", type: "pdf", size: "364 KB", description: "T.C. kimlik kartı taraması" },
  { name: "banka_ekstresi.pdf", type: "pdf", size: "144 KB", description: "Banka ekstresi (Nisan 2025)" },
  { name: "aile_fotografi.jpg", type: "jpg", size: "2.4 MB", description: "Aileyle özel fotoğraf" },
  { name: "cv.pdf", type: "pdf", size: "242 KB", description: "Güncel özgeçmiş (CV)" },
  { name: "tibbi_rapor.pdf", type: "pdf", size: "312 KB", description: "Tıbbi tahlil sonuçları" }
];

// Her dosya için state tutmak gerek
const initialDownloadState = {};
importantFiles.forEach(f => {
  initialDownloadState[f.name] = { status: "idle", progress: 0, timer: null };
});

const FileVault = () => {
  const { addFile } = useFileContext();
  const [entered, setEntered] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [downloadState, setDownloadState] = useState(initialDownloadState);

  // Token girişi
  const handleEntry = (e) => {
    e.preventDefault();
    if (input.trim() === VALID_TOKEN) {
      setEntered(true);
      setError("");
    } else {
      setError("Geçersiz veya hatalı token!");
    }
  };

  // İndirmeyi başlat
  const handleDownload = (file) => {
    if (downloadState[file.name].status !== "idle") return;
    let progress = 0;

    // MB dosya için: step küçük (yavaş), KB için step büyük (hızlı)
    const isMB = file.size.toLowerCase().includes("mb");
    const size = parseFloat(file.size);

    // Yeni formül: MB dosya daha çok adımda, KB daha az adımda bitsin!
    const step = Math.max(1, Math.floor(isMB
      ? 100 / (size * 18)    // MB için örneğin 1 MB = 18 adım, 2 MB = 36 adım
      : 100 / (size / 14)    // KB için örneğin 140 KB = 10 adım, 280 KB = 20 adım
    ));

    const timer = setInterval(() => {
      setDownloadState(prev => {
        const newProgress = Math.min(prev[file.name].progress + step, 100);
        if (newProgress >= 100) {
          clearInterval(prev[file.name].timer);
          // addFile({ ...file }); // Yüklenen dosyayı ekleyebilirsin
        }
        return {
          ...prev,
          [file.name]: {
            ...prev[file.name],
            progress: newProgress,
            status: newProgress >= 100 ? "done" : "downloading",
            timer: newProgress >= 100 ? null : prev[file.name].timer,
          }
        };
      });
    }, 45);

    setDownloadState(prev => ({
      ...prev,
      [file.name]: { ...prev[file.name], status: "downloading", progress: 0, timer }
    }));
  };

  // İndirmeyi iptal et
  const handleCancel = (file) => {
    if (downloadState[file.name].status !== "downloading") return;
    clearInterval(downloadState[file.name].timer);
    setDownloadState(prev => ({
      ...prev,
      [file.name]: { ...prev[file.name], status: "idle", progress: 0, timer: null }
    }));
  };

  // Token girişi ekranı
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
                  {/* İndirme sırasında animasyon + iptal */}
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
                  {/* Hazırsa */}
                  {state.status === "idle" && (
                    <button
                      className={styles.downloadButton}
                      onClick={() => handleDownload(file)}
                    >
                      İndir
                    </button>
                  )}
                  {/* Bitti ise */}
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
