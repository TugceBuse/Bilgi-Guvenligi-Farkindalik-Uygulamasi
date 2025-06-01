import React, { useEffect, useRef, useState } from 'react';
import './NotificationPopup.css';

const NotificationPopup = ({ notification, onClose }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    // Otomatik fade-out ve kapanma
    timerRef.current = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onClose(notification.id);
      }, 350);
    }, notification.duration || 4000);

    return () => clearTimeout(timerRef.current);
  }, [notification, onClose]);

  // "Oku" butonuna tıklanınca, callback fonksiyonunu çağır
  const handleOkuClick = () => {
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
