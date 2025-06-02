import React, { useEffect, useRef, useState } from "react";
import styles from "./CargoTrackingFake.module.css";

const statusSteps = [
  {
    status: "Kargo Bilgisi Alındı",
    desc: "Kargo kaydınız oluşturuldu.",
    icon: "📝"
  },
  {
    status: "Yolda",
    desc: "Kargonuz teslimat merkezinde bekliyor.",
    icon: "🚚"
  },
  {
    status: "Teslimat Bekleniyor",
    desc: "Teslimat adresinizde bekleniyor.",
    icon: "🏠"
  }
];

function getUrlParams(url) {
  try {
    const u = new URL(url);
    const trackingNo = u.searchParams.get("trackingNo") || "F4K3XXXX";
    let shippingCompany = u.hostname.split(".")[0];
    shippingCompany = shippingCompany.charAt(0).toUpperCase() + shippingCompany.slice(1);
    return { shippingCompany, trackingNo };
  } catch {
    return { shippingCompany: "Cargonova", trackingNo: "F4K3XXXX" };
  }
}

const CargoTrackingFake = (props) => {
  const url = props.url || window.location.href;
  let { shippingCompany, trackingNo } = getUrlParams(url);

  if (props.shippingCompany) shippingCompany = props.shippingCompany;
  if (props.trackingNo) trackingNo = props.trackingNo;

  // Rastgele kargo statüsünü sahte olarak göster
  const [currentStep] = useState(() => Math.floor(Math.random() * statusSteps.length));
  const progress = Math.round(((currentStep + 1) / statusSteps.length) * 100);

  return (
    <div className={styles.trackingContainer}>
      <div className={styles.header}>
        <img
          src={`/cargo/cargonova.png`}
          alt={shippingCompany}
          className={styles.logo}
        />
        <div className={styles.headerInfo}>
          <h2>{shippingCompany} Kargo Takip</h2>
          <div className={styles.trackingNo}>Takip No: <span>{trackingNo}</span></div>
        </div>
      </div>

      <div className={styles.progressBarBox}>
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
          <span>Sahte Transfer Merkezi</span>
        </div>
      </div>

      <div className={styles.phishingFooter}>
        <span>
          <b>Uyarı:</b> Bu site güvenli değildir. Tarayıcı adresini ve bağlantının gerçekliğini kontrol edin.
        </span>
      </div>
    </div>
  );
};

export default CargoTrackingFake;
