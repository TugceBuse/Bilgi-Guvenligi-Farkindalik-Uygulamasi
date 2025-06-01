import React, { useEffect, useRef, useState } from 'react';
import './NotificationPopup.css';
import { useNotificationContext } from '../../Contexts/NotificationContext';

const ANIMATION_MS = 320;

const NotificationPopup = ({ notification }) => {
  const { closePopupNotification } = useNotificationContext();
  const [fadeOut, setFadeOut] = useState(false);
  const [entering, setEntering] = useState(true);
  const timerRef = useRef();

  useEffect(() => {
    // Giriş animasyonu için kısa bir süre
    const enterTimeout = setTimeout(() => setEntering(false), ANIMATION_MS);

    timerRef.current = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        closePopupNotification(notification.id);
      }, ANIMATION_MS);
    }, notification.duration || 4000);

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(enterTimeout);
    };
  }, [notification, closePopupNotification]);

  // Sadece UI kontrol, context'e dokunmaz!
  const handleOkuClick = () => {
    if (notification.actions && typeof notification.actions[0]?.onClick === 'function') {
      notification.actions[0].onClick();
    }
    setFadeOut(true);
    setTimeout(() => closePopupNotification(notification.id), ANIMATION_MS);
  };

  const handleCloseClick = () => {
    setFadeOut(true);
    setTimeout(() => closePopupNotification(notification.id), ANIMATION_MS);
  };

  return (
    <div
      className={`mail-popup${entering ? " entering" : ""}${fadeOut ? " fade-out" : ""}`}
    >
      <div className="mail-popup-main">
        <div className="mail-popup-icon">
          <img src={notification.icon || "/icons/mail.png"} alt="Mail" />
        </div>
        <div className="mail-popup-content">
          <div className="mail-popup-title">{notification.title}</div>
          <div className="mail-popup-msg">{notification.message}</div>
        </div>
        {notification.actions && notification.actions.length > 0 && (
          <button className="mail-popup-btn" onClick={handleOkuClick}>
            {notification.actions[0].label || "Oku"}
          </button>
        )}
        <button className="mail-popup-close" onClick={handleCloseClick}>×</button>
      </div>
    </div>
  );
};

export default NotificationPopup;
