import React, { useEffect, useRef, useState } from 'react';
import './NotificationPopup.css';
import { useNotificationContext } from '../../Contexts/NotificationContext'; // 🔴 Eklenmeli

const NotificationPopup = ({ notification }) => {
  const { closePopupNotification } = useNotificationContext(); // 🔴 Buradan alınacak!
  const [fadeOut, setFadeOut] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    // Otomatik fade-out ve kapanma sadece popup için
    timerRef.current = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        closePopupNotification(notification.id); // 🔴 Sadece popup'ı kapat!
      }, 350);
    }, notification.duration || 4000);

    return () => clearTimeout(timerRef.current);
  }, [notification, closePopupNotification]);

  // "Oku" butonuna tıklanınca, callback fonksiyonunu çağırıp popup'ı kapat
  const handleOkuClick = () => {
    if (notification.actions && typeof notification.actions[0]?.onClick === 'function') {
      notification.actions[0].onClick();
    }
    closePopupNotification(notification.id); // 🔴 Sadece popup'ı kapat!
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
        setTimeout(() => closePopupNotification(notification.id), 350);
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
