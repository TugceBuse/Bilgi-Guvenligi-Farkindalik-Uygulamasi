import React from "react";
import styles from "./CargoTracking.module.css";

const statusOptions = [
  "Kargo şubeye ulaştı.",
  "Dağıtıma çıktı.",
  "Teslimat bekleniyor.",
  "Teslim edildi."
];

function randomStatus() {
  const idx = Math.floor(Math.random() * statusOptions.length);
  return statusOptions[idx];
}

function getUrlParams(url) {
  try {
    const u = new URL(url);
    const trackingNo = u.searchParams.get("trackingNo") || "Bilinmiyor";
    // Domain'den şirket adını ayıkla
    let shippingCompany = u.hostname.split(".")[0];
    // İlk harfi büyük
    shippingCompany = shippingCompany.charAt(0).toUpperCase() + shippingCompany.slice(1);
    return { shippingCompany, trackingNo };
  } catch {
    return { shippingCompany: "Bilinmiyor", trackingNo: "Bilinmiyor" };
  }
}

const CargoTracking = (props) => {
  // Eğer props ile geldiyse (Browser üzerinden), öncelik ver.
  const url = props.url || window.location.href;
  let { shippingCompany, trackingNo } = getUrlParams(url);
  if (props.shippingCompany) shippingCompany = props.shippingCompany;
  if (props.trackingNo) trackingNo = props.trackingNo;

  return (
    <div className={styles.trackingContainer}>
      <div className={styles.header}>
        <img src={`/cargo/${shippingCompany.toLowerCase()}.png`} alt={shippingCompany} className={styles.logo} />
        <h2>{shippingCompany} Kargo Takip</h2>
      </div>
      <div className={styles.details}>
        <div>
          <span className={styles.label}>Takip No:</span>
          <span>{trackingNo}</span>
        </div>
        <div>
          <span className={styles.label}>Kargo Durumu:</span>
          <span>{randomStatus()}</span>
        </div>
        <div>
          <span className={styles.label}>Tahmini Teslimat:</span>
          <span>1-2 iş günü</span>
        </div>
      </div>
      <div className={styles.infoBox}>
        <b>Dikkat:</b> Kargo bilgilerinizi yalnızca resmi site üzerinden sorgulayınız!
      </div>
    </div>
  );
};

export default CargoTracking;
