import React, { useContext, useState } from "react";
import { useGameContext } from "../../Contexts/GameContext";
import { useFileContext } from "../../Contexts/FileContext"; 
import styles from "./CloudBox.module.css";

// Random link oluşturucu
const generateRandomLink = () =>
  "https://cloudbox.com/file/" + Math.random().toString(36).substring(2, 12);

const CloudBox = () => {
  // Kullanıcı state'leri GameContext'te
  const { cloudUser, setCloudUser, cloudFiles, setCloudFiles } = useGameContext();
  // Kişisel dosyalar FileContext'ten
  const { files } = useFileContext();
  // Sadece location: "personal" olan dosyalar
  const personalFiles = Object.values(files).filter(f => f.location === "personal");

  // UI state
  const [mode, setMode] = useState("login"); // "login" veya "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadState, setUploadState] = useState({}); // { dosyaAdı: {progress: 0, status: "idle|uploading|done"} }

  // Kayıt işlemi (simülasyon, tek kullanıcı)
  const handleRegister = (e) => {
    e.preventDefault();
    if (email.length < 6 || !email.includes("@")) return setError("Geçerli bir e-posta girin.");
    if (password.length < 4) return setError("Şifre en az 4 karakter olmalı.");
    setCloudUser({ email, password, isLoggedIn: true });
    setError("");
  };

  // Giriş işlemi (simülasyon)
  const handleLogin = (e) => {
    e.preventDefault();
    if (cloudUser?.email !== email || cloudUser?.password !== password) {
      setError("E-posta veya şifre hatalı!");
      return;
    }
    setCloudUser({ ...cloudUser, isLoggedIn: true });
    setError("");
  };

  // Tüm personal dosyaları yükle
  const handleUploadAll = () => {
    let newUploadState = {};
    personalFiles.forEach(file => {
      newUploadState[file.label] = { progress: 0, status: "uploading", timer: null };
    });
    setUploadState(newUploadState);

    personalFiles.forEach(file => {
      // 1 MB ve üstü dosyalar için daha yavaş, küçükler daha hızlı
      const isMB = file.size.toLowerCase().includes("mb");
      const size = parseFloat(file.size);
      const step = Math.max(1, Math.floor(isMB ? 100 / (size * 15) : 100 / (size / 12)));
      const interval = setInterval(() => {
        setUploadState(prev => {
          const prevProg = prev[file.label]?.progress ?? 0;
          const newProgress = Math.min(prevProg + step, 100);
          if (newProgress >= 100) {
            clearInterval(prev[file.label]?.timer);
            // Dosya cloudFiles'a ekleniyor
            setCloudFiles(prevFiles => [
              ...prevFiles,
              {
                ...file,
                link: generateRandomLink(),
                permissions: { isPublic: false, canDownload: true },
              }
            ]);
          }
          return {
            ...prev,
            [file.label]: {
              ...prev[file.label],
              progress: newProgress,
              status: newProgress >= 100 ? "done" : "uploading",
              timer: newProgress >= 100 ? null : prev[file.label]?.timer,
            }
          };
        });
      }, 50);

      setUploadState(prev => ({
        ...prev,
        [file.label]: { progress: 0, status: "uploading", timer: interval }
      }));
    });
  };

  // İzinleri değiştirme (cloudFiles dizisinin ilgili elemanını güncelle)
  const handleTogglePermission = (label, permKey) => {
    setCloudFiles(prevFiles =>
      prevFiles.map(f =>
        f.label === label
          ? { ...f, permissions: { ...f.permissions, [permKey]: !f.permissions[permKey] } }
          : f
      )
    );
  };

  // Eğer giriş yapılmadıysa login/register paneli göster
  if (!cloudUser?.isLoggedIn) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <img src="/icons/cloudbox-logo.svg" alt="CloudBox" className={styles.logo} />
          <span className={styles.title}>CloudBox</span>
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

  // Kullanıcı giriş yaptıysa dosya yükleme alanı ve yüklenenler göster
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src="/icons/cloudbox-logo.svg" alt="CloudBox" className={styles.logo} />
        <span className={styles.title}>CloudBox</span>
        <span className={styles.slogan}>Kişisel Bulut Yedekleme Merkezi</span>
      </div>
      <div className={styles.section}>
        <h3>Kişisel Dosyalarını Yedekle</h3>
        <div className={styles.folderBox}>
          <div className={styles.folderTitle}>Personal Folder</div>
          <div className={styles.folderContent}>
            {personalFiles.length === 0 ? (
              <span>Yedeklenecek kişisel dosya yok.</span>
            ) : (
              <>
                {personalFiles.map((f, i) => (
                  <div key={f.label} className={styles.folderFile}>
                    <span>{f.type === "pdf" ? "📄" : f.type === "jpg" ? "🖼️" : "📁"}</span>
                    <span>{f.label} ({f.size})</span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        {personalFiles.length > 0 && (
          <button className={styles.uploadAllBtn} onClick={handleUploadAll} disabled={loading}>
            Tümünü Yedekle
          </button>
        )}
      </div>
      <div className={styles.section}>
        <h3>Yedeklenen Dosyalarım</h3>
        <div className={styles.uploadList}>
          {personalFiles.map((file, idx) => {
            const state = uploadState[file.label] || { progress: 0, status: "idle" };
            const alreadyUploaded = cloudFiles.some(f => f.label === file.label);
            return (
              <div key={file.label} className={styles.uploadCard}>
                <div className={styles.uploadFileInfo}>
                  <span className={styles.fileIcon}>
                    {file.type === "pdf" ? "📄" : file.type === "jpg" ? "🖼️" : "📁"}
                  </span>
                  <span>{file.label} ({file.size})</span>
                </div>
                <div className={styles.uploadStatus}>
                  {alreadyUploaded ? (
                    <span className={styles.uploaded}>✔️ Yüklendi</span>
                  ) : state.status === "uploading" ? (
                    <div className={styles.progressWrapper}>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progress}
                          style={{ width: `${state.progress}%` }}
                        />
                      </div>
                      <span className={styles.progressText}>{state.progress}%</span>
                    </div>
                  ) : (
                    <span>Bekliyor</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.section}>
        <h3>Dosya İzinleri & Paylaşım Linki</h3>
        <div className={styles.uploadList}>
          {cloudFiles.map((file, idx) => (
            <div key={file.label} className={styles.uploadCard}>
              <div className={styles.uploadFileInfo}>
                <span className={styles.fileIcon}>
                  {file.type === "pdf" ? "📄" : file.type === "jpg" ? "🖼️" : "📁"}
                </span>
                <span>{file.label} ({file.size})</span>
              </div>
              <div className={styles.uploadPerms}>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={file.permissions.isPublic}
                      onChange={() => handleTogglePermission(file.label, "isPublic")}
                    />
                    Public
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={file.permissions.canDownload}
                      onChange={() => handleTogglePermission(file.label, "canDownload")}
                    />
                    Downloadable
                  </label>
                </div>
                <div>
                  <span className={styles.fileLink}>{file.link}</span>
                  <button className={styles.copyBtn}
                    onClick={() => {navigator.clipboard.writeText(file.link)}}>Kopyala</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CloudBox;
