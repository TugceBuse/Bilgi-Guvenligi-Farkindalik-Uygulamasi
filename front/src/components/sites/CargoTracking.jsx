import React, { useEffect } from "react";
import styles from "./CargoTracking.module.css";
import { useGameContext } from "../../Contexts/GameContext";
import { useChatContext } from '../../Contexts/ChatContext';

// statusSteps'i ister context'ten, ister utils/cargoStatus.js'ten import et
import { statusSteps } from "../../utils/cargoStatus";

function getUrlParams(url) {
  try {
    const u = new URL(url);
    const trackingNo = u.searchParams.get("trackingNo") || "Bilinmiyor";
    let shippingCompany = u.hostname.split(".")[0];
    shippingCompany = shippingCompany.charAt(0).toUpperCase() + shippingCompany.slice(1);
    return { shippingCompany, trackingNo };
  } catch {
    return { shippingCompany: "Bilinmiyor", trackingNo: "Bilinmiyor" };
  }
}

const CargoTracking = (props) => {
  const { cargoTrackingList, cargoTrackingSiteVisited, setCargoTrackingSiteVisited } = useGameContext();
  const { setUserOptions } = useChatContext();

  
  // URL veya props üzerinden takip verilerini bul
  const url = props.url || window.location.href;
  let { shippingCompany, trackingNo } = getUrlParams(url);
  if (props.shippingCompany) shippingCompany = props.shippingCompany;
  if (props.trackingNo) trackingNo = props.trackingNo;

  const cargoData = cargoTrackingList.find(
    k =>
      k.trackingNo === trackingNo &&
      k.shippingCompany.toLowerCase() === shippingCompany.toLowerCase() &&
      k.startSeconds != null // sadece takip başlatılmış kargo!
  );
  useEffect(() => {
    if (!trackingNo) return;
    setCargoTrackingSiteVisited(prev => ({
      ...prev,
      [trackingNo]: true
    }));
  }, [trackingNo]);
  
  const currentStep = cargoData.currentStep;
    useEffect(() => {
      setUserOptions(1, // IT Destek userId
        statusSteps.map((step, idx) => ({
          id: idx,
          label: `Kargo Durumu: ${step.status}`,
          enabled:
            cargoTrackingSiteVisited[cargoData.trackingNo] === true && idx === currentStep
            // sadece siteye girildiyse ve doğru adımda aktif!
        }))
      );
    }, [currentStep, cargoTrackingSiteVisited, cargoData.trackingNo]);

    if (!cargoData) {
      return <div style={{ padding: 40, color: "#fff", textAlign: "center" }}>
        Takip edilen kargo kaydı bulunamadı veya henüz başlamadı.
      </div>;
    }

  // Progress bar
  const progress = Math.round(((currentStep + 1) / statusSteps.length) * 100);

  return (
    <div className={styles.trackingContainer}>
      <div className={styles.header}>
        <img
          src={`/Cargo/${shippingCompany.toLowerCase()}.png`}
          alt={shippingCompany}
          className={styles.logo}
          onError={e => { e.target.src = "/Cargo/tracking.png"; }}
        />
        <div className={styles.headerInfo}>
          <h2>{shippingCompany} Kargo Takip</h2>
          <div className={styles.trackingNo}>Takip No: <span>{trackingNo}</span></div>
        </div>
      </div>
      <div className={styles.progressBarBox}>
        <div
          className={styles.truckLine}
          style={{ position: "relative", height: "50px", marginBottom: "-28px" }}
        >
          <img
            src="/Cargo/tracking.png"
            alt="truck"
            className={styles.truckIcon}
            style={{
              left: `calc(${progress}% - 28px)`,
              transition: "left 0.7s cubic-bezier(0.23,1,0.32,1)",
              position: "absolute",
              top: "0",
              width: "52px",
              height: "38px",
              zIndex: 2
            }}
          />
        </div>
        <div className={styles.progressBarBg}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.progressLabel}>
          <span>{statusSteps[currentStep].status}</span>
          <span className={styles.progressPercent}>{progress}%</span>
        </div>
      </div>

      <ul className={styles.statusSteps}>
        {statusSteps.map((step, idx) => (
          <li
            key={idx}
            className={`${styles.stepItem} ${idx <= currentStep ? styles.active : ""}`}
          >
            <span className={styles.stepIcon}>{step.icon}</span>
            <div>
              <b>{step.status}</b>
              <div className={styles.stepDesc}>{step.desc}</div>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.details}>
        <div>
          <span className={styles.label}>Tahmini Teslimat:</span>
          <span>1-2 iş günü</span>
        </div>
        <div>
          <span className={styles.label}>Bulunduğu Şube:</span>
          <span>
            {currentStep === 0 ? "Sistem" :
              currentStep === 1 ? "Ankara Şube" :
              currentStep === 2 ? "Ankara Transfer Merkezi" :
              currentStep === 3 ? "Ankara - Dağıtım" :
              currentStep === 4 ? "İstanbul - Teslimat" :
              "Alıcı Adresi"}
          </span>
        </div>
        <div>
          <span className={styles.label}>Alıcı:</span>
          <span>{props.recipient || "Tugce Buse Ergün"}</span>
        </div>
      </div>

      <div className={styles.infoBox}>
        <b>Uyarı:</b> Kargo bilgilerinizi sadece resmi kargo sitesinden kontrol ediniz.<br />
        <span className={styles.infoText}>
          Şüpheli bağlantılardan giriş yapmayınız. <span role="img" aria-label="warning">⚠️</span>
        </span>
      </div>

      <div className={styles.supportBox}>
        <div>
          <b>Müşteri Hizmetleri</b>
          <div className={styles.supportDetail}>0850 000 0000</div>
        </div>
        <button className={styles.supportButton}>Canlı Destek</button>
      </div>
    </div>
  );
};

export default CargoTracking;