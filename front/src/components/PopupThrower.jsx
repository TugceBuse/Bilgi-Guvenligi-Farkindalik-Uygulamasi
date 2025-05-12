import React, { useEffect, useState } from "react";
import { useVirusContext } from "../Contexts/VirusContext";
import { useNotification } from "../Contexts/NotificationContext";

// Sahte sistem bildirimleri
const fakeNotifications = [
  {
    title: "Sistem Performansı",
    message: "RAM kullanımı %97 seviyesine ulaştı!",
    type: "warning",
    icon: "/icons/ram.png"
  },
  {
    title: "Güncelleme Mevcut",
    message: "Sistem bileşenleriniz güncel değil.",
    type: "info",
    icon: "/icons/update.png"
  },
  {
    title: "Güvenlik Uyarısı",
    message: "Bilinmeyen ağ trafiği tespit edildi.",
    type: "danger",
    icon: "/icons/shield.png"
  },
  {
    title: "Tarayıcı Önerisi",
    message: "NovaSecure Browser ile daha hızlı bağlantı.",
    type: "info",
    icon: "/icons/browser.png"
  }
];

// Sahte popup bileşenleri (her biri bir sekme içeriği gibi)
const AdPopupVPN = () => (
  <div>
    <h3>🔒 NovaVPN - 6 Aylık Ücretsiz!</h3>
    <p>Sınırlı süreli teklif! Tüm cihazlarda kullanılabilir.</p>
    <button className="popup-btn">Şimdi Etkinleştir</button>
  </div>
);

const AdPopupPrize = () => (
  <div>
    <h3>🎁 1000 TL Kazandınız!</h3>
    <p>Hemen başvurun, şanslı 100 kişiden biri siz olun.</p>
    <button className="popup-btn">Ödülümü Al</button>
  </div>
);

const AdPopupCleaner = () => (
  <div>
    <h3>🧼 NovaCleaner - Ücretsiz Sistem Temizleyici</h3>
    <p>Bilgisayarınız yavaşladı mı? Tek tıkla hızlandırın.</p>
    <button className="popup-btn">Temizlemeye Başla</button>
  </div>
);

const AdPopupCard = () => (
  <div>
    <h3>💳 Kart Aidatı Geri Ödeme</h3>
    <p>Son 6 ayın aidatlarını hemen geri alın.</p>
    <button className="popup-btn">Geri Ödeme Talep Et</button>
  </div>
);

// PopupThrower ana bileşeni
const PopupThrower = () => {
  const { viruses } = useVirusContext();
  const { addNotification } = useNotification();
  const [openPopups, setOpenPopups] = useState([]);

  // kullanılacak bileşenler
  const popupComponents = [AdPopupVPN, AdPopupPrize, AdPopupCleaner, AdPopupCard];

  useEffect(() => {
    const isAdwareActive = viruses.some(v => v.type === "adware");
    if (!isAdwareActive) return;

    const scheduleNext = () => {
      const randomDelay = Math.floor(Math.random() * 5000) + 10000; // 20–50s

      setTimeout(() => {
        const isPopup = Math.random() < 0.5;

        if (isPopup) {
          const Component = popupComponents[Math.floor(Math.random() * popupComponents.length)];
          setOpenPopups(prev => [...prev, { id: Date.now(), Component }]);
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

        scheduleNext(); // tekrar kur
      }, randomDelay);
    };

    scheduleNext(); // ilk çağrı
  }, [viruses]);

  const closePopup = (id) => {
    setOpenPopups(prev => prev.filter(p => p.id !== id));
  };

  return (
    <>
      {openPopups.map(({ id, Component }) => (
        <div
          key={id}
          className="adware-browser-popup"
          style={{
            position: "fixed",
            top: `${Math.floor(Math.random() * 300) + 50}px`,
            left: `${Math.floor(Math.random() * 600) + 100}px`,
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
            <Component />
          </div>
        </div>
      ))}
    </>
  );
};

export default PopupThrower;
