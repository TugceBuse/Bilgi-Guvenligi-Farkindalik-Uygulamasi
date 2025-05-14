import React, { useEffect, useState } from "react";
import { useVirusContext } from "../../Contexts/VirusContext";
import { useNotification } from "../../Contexts/NotificationContext";
import { useUIContext } from "../../Contexts/UIContext";
import "./PopupThrower.css";

// Sahte sistem bildirimleri
const fakeNotifications = [
  {
    title: "Sistem Performansı",
    message: "RAM kullanımı %97 seviyesine ulaştı!",
    type: "warning",
    icon: "/icons/caution.png"
  },
  {
    title: "Güncelleme Mevcut",
    message: "Sistem bileşenleriniz güncel değil.",
    type: "info",
    icon: "/icons/info.png"
  },
  {
    title: "Güvenlik Uyarısı",
    message: "Bilinmeyen ağ trafiği tespit edildi. Bağlantınızı kontrol edin.",
    type: "danger",
    icon: "/icons/danger.png"
  },
  {
    title: "Tarayıcı Önerisi",
    message: "NovaSecure Browser ile daha hızlı, güvenli ve reklamsız gezinme!",
    type: "info",
    icon: "/icons/info.png"
  }
];

// Reklam popup içerikleri
const AdPopupVPN = ({ onClick }) => (
  <div>
    <h3>🔒 NovaVPN - 6 Aylık Ücretsiz!</h3>
    <p>
      Tüm cihazlarınızda sınırsız koruma. <br />
      Kimliğinizi gizleyin, internet özgürlüğünün tadını çıkarın.
    </p>
    <button className="popup-btn" onClick={onClick}>Şimdi Etkinleştir</button>
  </div>
);

const AdPopupPrize = ({ onClick }) => (
  <div>
    <h3>🎁 1000 TL Değerinde Alışveriş Çeki!</h3>
    <p>
      Sadece bugün için geçerli! <br />
      Şanslı 100 kişiden biri siz olun. Numaranızı doğrulayın.
    </p>
    <button className="popup-btn" onClick={onClick}>Ödülümü Al</button>
  </div>
);

const AdPopupCleaner = ({ onClick }) => (
  <div>
    <h3>🧼 NovaCleaner - Ücretsiz Sistem Temizleyici</h3>
    <p>
      Bilgisayarınız yavaşladı mı? <br />
      Tek tıkla derin temizlik, gereksiz dosyalardan kurtulun!
    </p>
    <button className="popup-btn" onClick={onClick}>Temizlemeye Başla</button>
  </div>
);

const AdPopupCard = ({ onClick }) => (
  <div>
    <h3>💳 Kart Aidatı Geri Ödeme</h3>
    <p>
      Banka aidatlarınızı geri alın. <br />
      Başvurunuzu yapın, son 6 ayın ücretlerini anında iade alın!
    </p>
    <button className="popup-btn" onClick={onClick}>Geri Ödeme Talep Et</button>
  </div>
);

// Ana bileşen
const PopupThrower = () => {
  const { viruses } = useVirusContext();
  const { addNotification } = useNotification();
  const { toggleWindow } = useUIContext();
  const [openPopups, setOpenPopups] = useState([]);

  const popupComponents = [
  { component: AdPopupVPN, url: "https://novasecure.com/vpn-promo" },
  { component: AdPopupPrize, url: "https://novasecure.com/prize" },
  { component: AdPopupCleaner, url: "https://novasecure.com/cleaner" },
  { component: AdPopupCard, url: "https://novasecure.com/card-refund" }
];

  useEffect(() => {
    const isAdwareActive = viruses.some(v => v.type === "adware");
    if (!isAdwareActive) return;

    const scheduleNext = () => {
      const delay = Math.floor(Math.random() * 5000) + 10000; // 10–15s

      setTimeout(() => {
        const showPopup = Math.random() < 0.5;

        if (showPopup) {
          const ComponentSet = popupComponents[Math.floor(Math.random() * popupComponents.length)];
          const newPopup = {
            id: Date.now(),
            Component: ComponentSet.component,
            url: ComponentSet.url,
            position: {
              top: `${Math.floor(Math.random() * 300) + 50}px`,
              left: `${Math.floor(Math.random() * 600) + 100}px`
            }
          };
          setOpenPopups(prev => [...prev, newPopup]);

        } else {
          const notif = fakeNotifications[Math.floor(Math.random() * fakeNotifications.length)];
          addNotification({
            title: notif.title,
            message: notif.message,
            type: notif.type,
            icon: notif.icon,
            duration: 10000
          });
        }

        scheduleNext();
      }, delay);
    };

    scheduleNext();
  }, [viruses]);

  const closePopup = (id) => {
    setOpenPopups(prev => prev.filter(p => p.id !== id));
  };

  return (
    <>
      {openPopups.map(({ id, Component, position, url }) => (
        <div
          key={id}
          className="adware-browser-popup"
          style={{
            position: "fixed",
            top: position.top,
            left: position.left,
            width: "480px",
            height: "320px",
            background: "#fff",
            border: "2px solid #333",
            zIndex: 9999,
            borderRadius: "6px",
            boxShadow: "0 0 20px rgba(0,0,0,0.6)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div style={{
            background: "#222", color: "#fff", padding: "8px",
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <span>Reklam - Sponsorlu İçerik</span>
            <button onClick={() => closePopup(id)}
              style={{
                background: "#e74c3c", color: "#fff",
                border: "none", padding: "4px 8px", cursor: "pointer"
              }}>
              ×
            </button>
          </div>
          <div style={{ padding: "16px", fontSize: "14px", overflowY: "auto", flexGrow: 1 }}>
            <Component onClick={() => {
              toggleWindow("browser", { initialUrl: url });
              closePopup(id);
            }} />
          </div>
        </div>
      ))}
    </>
  );
};

export default PopupThrower;
