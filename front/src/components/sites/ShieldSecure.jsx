import React, { useState } from "react";

const ShieldSecure = () => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleDownloadClick = () => {
    setButtonLoading(true);
    setDownloadMessage("İndiriliyor...");
    setTimeout(() => {
      setButtonLoading(false);
      setDownloadMessage("İndirme tamamlandı!");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        setDownloadMessage("");
      }, 3000);
    }, 10000);
  };

  return (
    <div className="download-div-inside">
      <h2>ShieldSecure Antivirüs İndirme Bölümü</h2>
      <p>ShieldSecure antivirüs yazılımını indirmek için aşağıdaki bağlantıları kullanabilirsiniz.</p>
      <div className="download-links">
        <h3>Mevcut İndirmeler:</h3>
        <ul>
          <li>
            <button onClick={handleDownloadClick} disabled={buttonLoading} className="download-button">
              {buttonLoading ? <div className="progress-bar"></div> : "ShieldSecure Setup"}
            </button>
          </li>
          <li>
            <button onClick={handleDownloadClick}>ShieldSecure Güncelleme</button>
          </li>
          <li>
            <button>ShieldSecure Kullanım Kılavuzu</button>
          </li>
        </ul>
        {downloadMessage && <p>{downloadMessage}</p>}
      </div>
      {showPopup && <div className="popup">İndirildi!</div>}
    </div>
  );
};

export default ShieldSecure;
