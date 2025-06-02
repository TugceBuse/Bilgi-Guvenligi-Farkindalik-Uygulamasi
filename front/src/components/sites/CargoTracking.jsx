import React, { useEffect, useRef, useState } from "react";
import styles from "./CargoTracking.module.css";
import { useMailContext } from "../../Contexts/MailContext";

const statusSteps = [
  {
    status: "Kargo kaydı oluşturuldu.",
    desc: "Gönderiniz için kargo kaydı alındı.",
    icon: "📝",
    duration: 1 * 60 * 1000, // 2 dakika
  },
  {
    status: "Kargo şubeye ulaştı.",
    desc: "Kargonuz çıkış şubesine ulaştı.",
    icon: "📦",
    duration: 1 * 60 * 1000, // 8 dakika
  },
  {
    status: "Transfer merkezinde.",
    desc: "Kargonuz transfer merkezinde işlem görüyor.",
    icon: "🏢",
    duration: 1 * 60 * 1000, // 10 dakika
  },
  {
    status: "Dağıtıma çıktı.",
    desc: "Kargonuz dağıtım için yola çıktı.",
    icon: "🚚",
    duration: 1 * 60 * 1000, // 7 dakika
     mail: {
      type: "cargo",
      title: "Kargonuz Dağıtıma Çıktı!",
      precontent: "Kargonuz dağıtıma çıktı. Tahmini teslimat için kargo sayfasını kontrol edebilirsiniz.",
      content: ({ trackingNo, shippingCompany }) => (
        <div style={{ fontFamily: 'Segoe UI, sans-serif', color: "#222", fontSize: "16px" }}>
          <h2 style={{ color: "#258cff", margin: "0 0 10px 0" }}>
            Kargonuz Dağıtıma Çıktı! 🚚
          </h2>
          <p>
            <span style={{ color: "#258cff", fontWeight: 600 }}>
              {trackingNo}
            </span> takip numaralı gönderiniz, bugün <b>{shippingCompany}</b> kargo tarafından dağıtıma çıkarılmıştır.
          </p>
          <div style={{
            background: "#e8f5ff",
            padding: "10px 14px",
            borderRadius: 8,
            margin: "10px 0 16px 0",
            borderLeft: "4px solid #258cff"
          }}>
            <b>Tahmini teslimat:</b> Aynı gün içerisinde, saat 17:00’ye kadar yapılacaktır.
          </div>
          <ul style={{ margin: "8px 0 16px 20px", color: "#258cff" }}>
            <li>Kargonuz dağıtım görevlisinde.</li>
            <li>Teslimat sırasında SMS ile ayrıca bilgilendirileceksiniz.</li>
            <li>Evde olmamanız durumunda şubeden teslim alabilirsiniz.</li>
          </ul> 
        </div>
      )
    }
  },
  {
    status: "Teslimat bekleniyor.",
    desc: "Kargonuz teslimat adresinizde bekleniyor.",
    icon: "🏠",
    duration: 1 * 60 * 1000, // 5 dakika
  },
  {
    status: "Teslim edildi.",
    desc: "Kargonuz alıcıya teslim edildi.",
    icon: "✅",
    duration: null, // Son adım, süre yok
    mail: {
      type: "cargo",
      title: "Kargonuz Teslim Edildi!",
      precontent: "Kargonuz başarıyla teslim edilmiştir. İyi günlerde kullanın!",
      content: ({ trackingNo, shippingCompany }) => (
        <div style={{ fontFamily: 'Segoe UI, sans-serif', color: "#222", fontSize: "16px" }}>
          <h2 style={{ color: "#22bb55", margin: "0 0 10px 0" }}>
            Kargonuz Teslim Edildi! 🎉
          </h2>

          <p>
            <span style={{ color: "#22bb55", fontWeight: 600 }}>{trackingNo}</span> takip numaralı gönderiniz,
            <b> {shippingCompany} </b>
            kargo tarafından başarıyla teslim edilmiştir.
          </p>
          <div style={{
            background: "#e8ffe8",
            padding: "10px 14px",
            borderRadius: 8,
            margin: "10px 0 16px 0",
            borderLeft: "4px solid #22bb55"
          }}>
            <b>Teslimat Tarihi:</b> {new Date().toLocaleDateString('tr-TR')}
          </div>
          <div style={{
            margin: "8px 0 12px 0",
            color: "#317e2e",
            fontWeight: 700
          }}>
            Ürününüzü iyi günlerde kullanmanızı dileriz!<br />
            <span style={{ color: "white", fontWeight: 600 }}>
              Teslimatla ilgili destek almak için bizimle iletişime geçebilirsiniz.
            </span>
          </div>
        </div>
      )
    }
  },
];

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
  const url = props.url || window.location.href;
  // ... getUrlParams kısmı aynı

  let { shippingCompany, trackingNo } = getUrlParams(url);
  if (props.shippingCompany) shippingCompany = props.shippingCompany;
  if (props.trackingNo) trackingNo = props.trackingNo;

    
  function getCurrentStep(trackingNo) {
    const start = Number(localStorage.getItem(`cargoTrackStart-${trackingNo}`));
      if (!start) return 0;
      const now = Date.now();
      let elapsed = now - start;
      let total = 0;
      for (let i = 0; i < statusSteps.length; i++) {
        total += statusSteps[i].duration || 0;
        if (elapsed < total) return i;
      }
      return statusSteps.length - 1; // Teslim edildi!
  }

  const [currentStep, setCurrentStep] = useState(() => getCurrentStep(trackingNo));

  useEffect(() => {
    // Her 3 saniyede bir adımı güncelle
    const interval = setInterval(() => {
      setCurrentStep(getCurrentStep(trackingNo));
    }, 3000);

    return () => clearInterval(interval);
  }, [trackingNo]);

  useEffect(() => {
    setCurrentStep(getCurrentStep(trackingNo));
  }, [trackingNo]);

  const { sendMail } = useMailContext(); // senin kullandığın context veya prop


  useEffect(() => {
    const step = statusSteps[currentStep];
    if (step && step.mail) {
      const mailSentKey = `cargoMailSent-${trackingNo}-${currentStep}`;
      if (!localStorage.getItem(mailSentKey)) {
        const mailContent = step.mail.content
          ? step.mail.content({
              trackingNo,
              shippingCompany,
              recipient: props.recipient || "Tugce Buse Ergün"
            })
          : undefined;

        sendMail(step.mail.type, {
          from: `${shippingCompany} <info@${shippingCompany.toLowerCase()}.com>`,
          title: step.mail.title,
          precontent: step.mail.precontent,
          trackingNo,
          shippingCompany,
          recipient: props.recipient || "Tugce Buse Ergün",
          content: mailContent
        });
        localStorage.setItem(mailSentKey, "1");
      }
    }
  }, [currentStep, trackingNo, shippingCompany, props.recipient]);


  // Progress, son adıma göre oranlansın
  const progress = Math.round(((currentStep + 1) / statusSteps.length) * 100);

  return (
    <div className={styles.trackingContainer}>
      {/* Diğer JSX aynı */}
      <div className={styles.header}>
        <img
          src={`Cargo/${shippingCompany.toLowerCase()}.png`}
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
