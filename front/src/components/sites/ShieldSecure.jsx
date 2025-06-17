import React, { useState, useRef } from "react";
import "./ShieldSecure.css";
import { useFileContext } from "../../Contexts/FileContext";
import { useEventLog } from "../../Contexts/EventLogContext";

const ShieldSecure = () => {
  const [progress, setProgress] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const intervalRef = useRef(null);

  const { files, updateFileStatus } = useFileContext();
  const { addEventLog } = useEventLog();

  const antivirusDownloaded = files?.antivirussetup?.available;

  // Başlat
  const handleDownloadClick = () => {
    setButtonLoading(true);
    setProgress(0);

    // LOG: İndirme başladı
    addEventLog({
      type: "antivirus_download_started",
      logEventType: "antivirus",
      questId: "antivirus_install",
      value: 0,
      data: { site: "ShieldSecure" },
    });

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          setButtonLoading(false);
          setShowPopup(true);

          // FileContext'i güncelle
          updateFileStatus("antivirussetup", {available:  true});

          // LOG: İndirme tamamlandı
          addEventLog({
            type: "antivirus_download_completed",
            logEventType: "antivirus",
            questId: "antivirus_install",
            value: 10,
            data: { site: "ShieldSecure" },
          });

          // Popup otomatik gizle
          setTimeout(() => {
            setShowPopup(false);
          }, 3000);

          return 100;
        }
        return prev + 2;
      });
    }, 200); // %2 ilerleme = 10sn'de biter
  };

  // İptal Et
  const handleCancel = () => {
    clearInterval(intervalRef.current);
    setButtonLoading(false);
    setProgress(0);
    // LOG: İndirme iptal edildi
    addEventLog({
      type: "antivirus_download_cancelled",
      logEventType: "antivirus",
      questId: "antivirus_install",
      value: 0,
      data: { site : "ShieldSecure" }
    });
  };

  return (
    <div className="download-div-inside">
      {/* Reklam Kutusu */}
      <div className="ad-box">
        <h3>Özel Kampanya!</h3>
        <p>Yıllık ShieldSecure Premium lisansında %50 indirim fırsatını kaçırmayın!</p>
        <button className="premium-btn">Hemen Yükselt</button>
      </div>

      <h2>ShieldSecure Antivirüs İndirme Bölümü</h2>
      <p>ShieldSecure antivirüs yazılımını indirmek için aşağıdaki bağlantıyı kullanabilirsiniz.</p>

      <div className="contentBox">
        {/* Bilgilendirme Bölümü */}
        <div className="shield-secure-container">
          <div className="info-box">
            <h2>ShieldSecure Antivirus</h2>
            <p>
              ShieldSecure, cihazlarınızı virüslere, kötü amaçlı yazılımlara ve çevrimiçi tehditlere karşı koruyan güçlü bir antivirüs yazılımıdır.
            </p>
            <ul>
              <strong>
                <li>Gerçek zamanlı tehdit algılama</li>
                <li>Gelişmiş güvenlik duvarı koruması</li>
                <li>Günlük otomatik güncellemeler</li>
                <li>Güvenli internet gezintisi</li>
              </strong>
            </ul>
            <p>Hizmetin En İyisi İçin:</p>
            <img src="/icons/right-arrow (1).png" style={{ width: 24, height: 24 }} alt="ok" />
          </div>
        </div>

        <div className="download-links">
          <h3>Mevcut İndirme</h3>
          <ul>
            <li>
              {buttonLoading ? (
                <div className="progress-row">
                  <div className="progress-bar-outer">
                    <div className="progress-bar-inner" style={{ width: `${progress}%` }}>
                      <span className="progress-bar-text">{progress}%</span>
                    </div>
                  </div>
                  <button className="cancel-download" onClick={handleCancel}>İptal Et</button>
                </div>
              ) : (
                <button
                  onClick={handleDownloadClick}
                  disabled={antivirusDownloaded}
                  className="download-button"
                >
                  <strong>{antivirusDownloaded ? "Zaten indirildi" : "ShieldSecure Setup"}</strong>
                </button>
              )}
            </li>
          </ul>
        </div>

      </div>

      {showPopup && <div className="popup">İndirildi!</div>}
    </div>
  );
};

export default ShieldSecure;
