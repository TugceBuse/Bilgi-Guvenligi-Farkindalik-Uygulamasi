import React, { useState } from "react";
import { useGameContext } from "../../Contexts/GameContext";
import { useFileContext } from "../../Contexts/FileContext";
import styles from "./CloudBox.module.css";

const generatePackageLink = () =>
  "https://cloudbox.com/package/" + Math.random().toString(36).slice(2, 10);

const InfoScreen = ({ onLogin, onRegister }) => (
  <div className={styles.infoWrapper}>
    <div className={styles.infoHeader}>
      <img src="/Cloud/cloud-hosting.png" alt="CloudBox" className={styles.siteLogo} />
      <div>
        <h1 className={styles.siteTitle}>CloudBox</h1>
        <div className={styles.siteSubtitle}>Kişisel Bulut Yedekleme Merkezi</div>
      </div>
    </div>
    <div className={styles.infoBody}>
      <div className={styles.infoBox}>
        <b>CloudBox</b> ile önemli dosyalarınızı <b>güvenli ve şifreli</b> şekilde yedekleyin.<br /><br />
        Hesabınıza giriş yaptıktan sonra yüklediğiniz dosyalar <b>yalnızca size ait</b> olarak saklanır.<br />
        <b>Paylaşım linklerinin izin ve gizlilik ayarları tamamen sizin kontrolünüzdedir.</b>
        <ul>
          <li>Dosya ve yedek paketlerinizi <b>tek tıkla</b> paylaşabilirsiniz.</li>
          <li>Bağlantılarınızın <b>gizli veya herkese açık</b> olmasını siz belirlersiniz.</li>
          <li>İzin vermedikçe <b>hiçbir dosya paylaşılmaz</b> veya görüntülenmez.</li>
        </ul>
        <span className={styles.infoHighlight}>
          CloudBox, modern bulut güvenlik standartları ve <b>gizlilik önceliği</b> ile tasarlanmıştır.
        </span>
      </div>
    </div>
    <div className={styles.infoFooter}>
      <button onClick={onLogin} className={styles.loginButton}>Giriş Yap</button>
      <button onClick={onRegister} className={styles.registerButton}>Kayıt Ol</button>
    </div>
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} CloudBox - Güvenli Yedekleme</span>
      <span style={{fontSize:12}}>CloudBox Teknolojileri A.Ş. tarafından geliştirilmiştir.</span>
    </footer>
  </div>
);


const CloudBox = () => {
  const { cloudUser, setCloudUser, cloudBoxBackup, setCloudBoxBackup } = useGameContext();
  const { files } = useFileContext();
  const personalFiles = Object.values(files).filter(f => f.location === "personal");

  // Local UI state
  const [page, setPage] = useState("info"); // "info" / "login" / "register" / "main"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [uploadState, setUploadState] = useState({});

  // login/register işlemleri
  const handleRegister = (e) => {
    e.preventDefault();
    if (email.length < 6 || !email.includes("@")) return setError("Geçerli bir e-posta girin.");
    if (password.length < 4) return setError("Şifre en az 4 karakter olmalı.");
    setCloudUser({ email, password, isLoggedIn: true });
    setPage("main");
    setError("");
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (cloudUser?.email !== email || cloudUser?.password !== password) {
      setError("E-posta veya şifre hatalı!");
      return;
    }
    setCloudUser({ ...cloudUser, isLoggedIn: true });
    setPage("main");
    setError("");
  };
  const logout = () => {
    setCloudUser({ ...cloudUser, isLoggedIn: false });
    setPage("info");
    setUploadState({});
    setShowUpload(false);
  };

  // Yedekleme işlemi (tek paket, progress animasyonlu)
  const handleUploadAll = () => {
    let newUploadState = {};
    personalFiles.forEach(file => {
      newUploadState[file.label] = { progress: 0, status: "uploading" };
    });
    setUploadState(newUploadState);

    let progressAll = 0;
    const step = Math.max(2, Math.floor(100 / (personalFiles.length * 7 + 6)));
    const interval = setInterval(() => {
      progressAll += step;
      if (progressAll >= 100) {
        clearInterval(interval);
        setCloudBoxBackup({
          files: personalFiles,
          packageLink: generatePackageLink(),
          permissions: { isPublic: false, canDownload: true }
        });
        setUploadState({});
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

  // İzin toggle işlemleri
  const togglePermission = (perm) => {
    setCloudBoxBackup(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [perm]: !prev.permissions[perm]
      }
    }));
  };

  // Ana sayfa ve auth ekran yönetimi
  if (!cloudUser?.isLoggedIn) {
    if (page === "info") {
      return (
        <InfoScreen
          onLogin={() => setPage("login")}
          onRegister={() => setPage("register")}
        />
      );
    }
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <img src="/icons/cloudbox-logo.svg" alt="CloudBox" className={styles.logo} />
          <span className={styles.title}>CloudBox</span>
          <span className={styles.slogan}>Kişisel Bulut Yedekleme Merkezi</span>
        </div>
        <div className={styles.authBox}>
          <div className={styles.authTitle}>{page === "login" ? "Giriş Yap" : "Kayıt Ol"}</div>
          <form onSubmit={page === "login" ? handleLogin : handleRegister}>
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
              autoComplete={page === "login" ? "current-password" : "new-password"}
            />
            {error && <div className={styles.error}>{error}</div>}
            <button type="submit">{page === "login" ? "Giriş Yap" : "Kayıt Ol"}</button>
          </form>
          <div className={styles.switchMode}>
            {page === "login"
              ? <>Hesabın yok mu? <span onClick={() => setPage("register")}>Kayıt Ol</span></>
              : <>Zaten hesabın var mı? <span onClick={() => setPage("login")}>Giriş Yap</span></>
            }
          </div>
        </div>
      </div>
    );
  }

  // Ana ekran
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

      {/* Modal */}
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
          {cloudBoxBackup.files.length === 0 ? (
            <span className={styles.noFile}>Henüz dosya yedeklenmedi.</span>
          ) : (
            cloudBoxBackup.files.map((file, idx) => (
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
        {cloudBoxBackup.packageLink ? (
          <div className={styles.packageLinkBox}>
            <b>Yedek Paketi Linki:</b>
            <span className={styles.fileLink}>{cloudBoxBackup.packageLink}</span>
            <button className={styles.copyBtn}
              onClick={() => navigator.clipboard.writeText(cloudBoxBackup.packageLink)}>
              Kopyala
            </button>
            <div className={styles.perms}>
              <label>
                <input
                  type="checkbox"
                  checked={cloudBoxBackup.permissions.isPublic}
                  onChange={() => togglePermission("isPublic")}
                />
                Herkese Açık
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={cloudBoxBackup.permissions.canDownload}
                  onChange={() => togglePermission("canDownload")}
                />
                İndirilebilir
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
