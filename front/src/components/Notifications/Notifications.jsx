import React from 'react';
import './Notifications.css';
import { useNotificationContext } from '../../Contexts/NotificationContext';
import NotificationPopup from './NotificationPopup'; // Yeni import

const Notifications = () => {
  const { popupNotifications, removeNotification } = useNotificationContext();

  // Sistem ve mail/sms ayrımı
  const systemPopups = popupNotifications.filter(n => n.appType === "system" || !n.appType);
  const appPopups = popupNotifications.filter(n => n.appType === "mail" || n.appType === "phone" || n.appType === "chatapp");

  return (
    <>
      {/* Sistem için klasik kart kutusu */}
      <div className="notification-container">
        {systemPopups.map(({ id, title, message, icon, type, actions }) => (
          <div key={id} className={`notification ${type}`}>
            <div className="notification-header">
              <img src={icon} alt="Icon" className="notification-icon" />
              <h2>{title}</h2>
              {(!actions || actions.length === 0) && (
                <button
                  className="notification-action-btn"
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 12,
                    padding: '0 10px',
                    fontSize: 18,
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    boxShadow: 'none',
                  }}
                  onClick={() => removeNotification(id)}
                  aria-label="Kapat"
                >×</button>
              )}
            </div>
            <div className="notification-content">
              <p>{message}</p>
              {actions && actions.length > 0 && (
                <div className="notification-actions">
                  {actions.map((action, idx) => (
                    <button
                      key={idx}
                      className="notification-action-btn"
                      onClick={() => {
                        if (typeof action.onClick === 'function') action.onClick();
                        removeNotification(id);
                      }}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Mail/sms için küçük popup stack */}
      <div className="mail-popup-stack">
        {appPopups.map((notif) => (
          <NotificationPopup
            key={notif.id}
            notification={notif}
            onClose={removeNotification}
          />
        ))}
      </div>
    </>
  );
};

export default Notifications;
