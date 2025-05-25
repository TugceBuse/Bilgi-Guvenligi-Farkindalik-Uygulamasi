import React, { useContext, useState } from "react";
import { useGameContext } from "../../Contexts/GameContext";
import { useFileContext } from "../../Contexts/FileContext";
import styles from "./CloudBox.module.css";

// Random paylaşım linki oluştur
const generatePackageLink = () =>
  "https://cloudbox.com/package/" + Math.random().toString(36).slice(2, 10);

const CloudBox = () => {
  // Global state'ler
  const { cloudUser, setCloudUser, cloudFiles, setCloudFiles } = useGameContext();
  const { files } = useFileContext();

  // Sadece personal konumdaki dosyalar
  const personalFiles = Object.values(files).filter(f => f.location === "personal");

  // Local UI state
  const [mode, setMode] = useState("login"); // "login" / "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [uploadState, setUploadState] = useState({});
  const [packageLink, setPackageLink] = useState("");
  const [permissions, setPermissions] = useState({ isPublic: false, canDownload: true });

  // Login/Register işlemleri
  const handleRegister = (e) => {
    e.preventDefault();
    if (email.length < 6 || !email.includes("@")) return setError("Geçerli bir e-posta girin.");
    if (password.length < 4) return setError("Şifre en az 4 karakter olmalı.");
    setCloudUser({ email, password, isLoggedIn: true });
    setCloudFiles([]);
    setError("");
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (cloudUser?.email !== email || cloudUser?.password !== password) {
      setError("E-posta veya şifre hatalı!");
      return;
    }
    setCloudUser({ ...cloudUser, isLoggedIn: true });
    setError("");
  };

  const logout = () => {
    setCloudUser({ ...cloudUser, isLoggedIn: false });
    setCloudFiles([]);
    setPackageLink("");
    setUploadState({});
    setShowUpload(false);
  };

  // Yedekleme animasyonu ve tek paylaşım linki
  const handleUploadAll = () => {
    let newUploadState = {};
    personalFiles.forEach(file => {
      newUploadState[file.label] = { progress: 0, status: "uploading", timer: null };
    });
    setUploadState(newUploadState);

    // Bütün dosyaları bir pakete yükleme animasyonu
    let progressAll = 0;
    const step = Math.max(2, Math.floor(100 / (personalFiles.length * 8 + 7)));
    const interval = setInterval(() => {
      progressAll += step;
      if (progressAll >= 100) {
        clearInterval(interval);
        // Hepsini CloudFiles'a ekle
        setCloudFiles(personalFiles.map(file => ({
          ...file,
        })));
        setUploadState({});
        setPackageLink(generatePackageLink());
        setShowUpload(false);
      } else {
        setUploadState(prev =>
          Object.fromEntries(personalFiles.map(f => [
            f.label,
            { progress: Math.min(progressAll, 100), status: "uploading" }
          ]))
        );
      }
    }, 48);
  };

  // İzin toggle
  const togglePermission = (perm) => {
    setPermissions(prev => ({
      ...prev,
      [perm]: !prev[perm]
    }));
  };

  // Kullanıcı girişi yoksa login/register ekranı
  if (!cloudUser?.isLoggedIn) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <img src="/icons/cloudbox-logo.svg" alt="CloudBox" className={styles.logo} />
          <span className={styles.title}>CloudBox</span>
          <span className={styles.slogan}>Kişisel Bulut Yedekleme Merkezi</span>
        </div>
        <div className={styles.authBox}>
          <div className={styles.authTitle}>{mode === "login" ? "Giriş Yap" : "Kayıt Ol"}</div>
          <form onSubmit={mode === "login" ? handleLogin : handleRegister}>
            <input
              type="email"
              required
              placeholder="E-posta"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
            />
            <input
              type="password"
              required
              placeholder="Şifre"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
            {error && <div className={styles.error}>{error}</div>}
            <button type="submit">{mode === "login" ? "Giriş Yap" : "Kayıt Ol"}</button>
          </form>
          <div className={styles.switchMode}>
            {mode === "login"
              ? <>Hesabın yok mu? <span onClick={() => setMode("register")}>Kayıt Ol</span></>
              : <>Zaten hesabın var mı? <span onClick={() => setMode("login")}>Giriş Yap</span></>
            }
          </div>
        </div>
      </div>
    );
  }

  // Ana ekran: Kullanıcı giriş yaptıysa
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src="/icons/cloudbox-logo.svg" alt="CloudBox" className={styles.logo} />
        <span className={styles.title}>CloudBox</span>
        <span className={styles.slogan}>Kişisel Bulut Yedekleme Merkezi</span>
        <div className={styles.userArea}>
          <span className={styles.userMail}>{cloudUser.email}</span>
          <button className={styles.logoutBtn} onClick={logout}>Çıkış</button>
        </div>
      </div>

      <div className={styles.section}>
        <h3>Kişisel Dosyalarını Yedekle</h3>
        <button className={styles.uploadBtn} onClick={() => setShowUpload(true)}>
          Dosya Yükle
        </button>
      </div>

      {/* Dosya yükleme modal */}
      {showUpload && (
        <div className={styles.modalOverlay}>
          <div className={styles.uploadModal}>
            <h2>Personal Folder</h2>
            <div className={styles.folderContent}>
              {personalFiles.length === 0 ? (
                <span className={styles.noFile}>Yedeklenecek kişisel dosya yok.</span>
              ) : (
                personalFiles.map((f, i) => (
                  <div key={f.label} className={styles.folderFile}>
                    <span className={styles.fileIcon}>
                      {f.type === "pdf" ? "📄" : f.type === "jpg" ? "🖼️" : "📁"}
                    </span>
                    <span>{f.label} ({f.size})</span>
                  </div>
                ))
              )}
            </div>
            {personalFiles.length > 0 && (
              <button className={styles.uploadAllBtn} onClick={handleUploadAll}>
                Hepsini Yedekle
              </button>
            )}
            <button className={styles.cancelBtn} onClick={() => setShowUpload(false)}>
              İptal
            </button>
            {personalFiles.length > 0 && Object.keys(uploadState).length > 0 && (
              <div className={styles.progressWrap}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progress}
                    style={{
                      width: `${uploadState[personalFiles[0].label]?.progress ?? 0}%`
                    }}
                  />
                </div>
                <span className={styles.progressText}>
                  {uploadState[personalFiles[0].label]?.progress ?? 0}%
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={styles.section}>
        <h3>Yedeklenen Dosyalarım</h3>
        <div className={styles.uploadList}>
          {cloudFiles.length === 0 ? (
            <span className={styles.noFile}>Henüz dosya yedeklenmedi.</span>
          ) : (
            cloudFiles.map((file, idx) => (
              <div key={file.label} className={styles.uploadCard}>
                <div className={styles.uploadFileInfo}>
                  <span className={styles.fileIcon}>
                    {file.type === "pdf" ? "📄" : file.type === "jpg" ? "🖼️" : "📁"}
                  </span>
                  <span>{file.label} ({file.size})</span>
                </div>
                <div className={styles.uploaded}>✔️ Yüklendi</div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={styles.section}>
        <h3>Yedek Paketi Linki & İzinler</h3>
        {packageLink ? (
          <div className={styles.packageLinkBox}>
            <b>Yedek Paketi Linki:</b>
            <span className={styles.fileLink}>{packageLink}</span>
            <button className={styles.copyBtn}
              onClick={() => navigator.clipboard.writeText(packageLink)}>
              Kopyala
            </button>
            <div className={styles.perms}>
              <label>
                <input
                  type="checkbox"
                  checked={permissions.isPublic}
                  onChange={() => togglePermission("isPublic")}
                />
                Public
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={permissions.canDownload}
                  onChange={() => togglePermission("canDownload")}
                />
                Downloadable
              </label>
            </div>
          </div>
        ) : (
          <span className={styles.noFile}>Yedekleme sonrası link oluşturulacaktır.</span>
        )}
      </div>
    </div>
  );
};

export default CloudBox;
