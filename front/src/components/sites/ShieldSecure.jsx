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

      {/* Reklam Kutusu */}
      <div className="ad-box">
        <h3>Özel Kampanya!</h3>
        <p>Yıllık ShieldSecure Premium lisansında %50 indirim fırsatını kaçırmayın!</p>
        <button className="premium-btn">Hemen Yükselt</button>
      </div>

      <h2>ShieldSecure Antivirüs İndirme Bölümü</h2>
      <p>ShieldSecure antivirüs yazılımını indirmek için aşağıdaki bağlantıları kullanabilirsiniz.</p>

    <div className="contentBox">
      {/* Bilgilendirme Bölümü */}
      <div className="shield-secure-container">
        {/* Bilgilendirme Bölümü */}
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
          <img src="/icons/right-arrow (1).png" style={{width:24, height:24}}></img>
        </div>
      </div>
  
      <div className="download-links">
          <h3>Mevcut İndirmeler</h3>
          <ul>
            <li>
              <button onClick={handleDownloadClick} disabled={buttonLoading} className="download-button">
                <strong>{buttonLoading ? <div className="progress-bar"></div> : "ShieldSecure Setup"}</strong>    
              </button>
            </li>
            <li>
              <button onClick={handleDownloadClick}><strong>ShieldSecure Güncelleme</strong></button>
            </li>
            <li>
              <button><strong>ShieldSecure Kullanım Kılavuzu</strong></button>
            </li>
          </ul>
          {downloadMessage && <p>{downloadMessage}</p>}
      </div>

    </div>
      
      {showPopup && <div className="popup">İndirildi!</div>}
    </div>
  );
};

export default ShieldSecure;
