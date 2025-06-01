// components/Notifications/NotificationPopup.jsx
import React, { useEffect, useRef, useState } from 'react';
import './NotificationPopup.css';
import { useUIContext } from '../../Contexts/UIContext';
import { useMailContext } from '../../Contexts/MailContext';
// Eğer sms için de kullanılacaksa usePhoneContext eklenebilir

const NotificationPopup = ({ notification, onClose }) => {
  const { openWindow } = useUIContext();
  const { setSelectedMail } = useMailContext();
  const [fadeOut, setFadeOut] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    // Otomatik fade-out için önce fade animasyonu başlatıp sonra kapat
    timerRef.current = setTimeout(() => {
      setFadeOut(true); // Fade out başlat
      setTimeout(() => {
        onClose(notification.id);
      }, 350); // CSS animasyon süresi ile uyumlu (örn: 350ms)
    }, notification.duration || 4000);

    return () => clearTimeout(timerRef.current);
  }, [notification, onClose]);

  // OKU butonuna tıklayınca mailbox aç ve ilgili maili seç
  const handleOkuClick = () => {
    if (notification.appType === 'mail') {
      openWindow('mailbox');
      setSelectedMail(notification.appData?.mail || notification.appData); // appData'da mail objesi olmalı
    }
    // Burada SMS için de benzer logic ekleyebilirsin
    if (notification.actions && typeof notification.actions[0]?.onClick === 'function') {
      notification.actions[0].onClick();
    }
    onClose(notification.id);
  };

  return (
    <div className={`mail-popup${fadeOut ? " fade-out" : ""}`}>
      <div className="mail-popup-icon">
        <img src={notification.icon || "/icons/mail.png"} alt="Mail" />
      </div>
      <div className="mail-popup-content">
        <div className="mail-popup-title">{notification.title}</div>
        <div className="mail-popup-msg">{notification.message}</div>
      </div>
      <button className="mail-popup-close" onClick={() => {
        setFadeOut(true);
        setTimeout(() => onClose(notification.id), 350);
      }}>×</button>
      {notification.actions && notification.actions.length > 0 &&
        <button className="mail-popup-btn" onClick={handleOkuClick}>
          {notification.actions[0].label || "Oku"}
        </button>
      }
    </div>
  );
};

export default NotificationPopup;
