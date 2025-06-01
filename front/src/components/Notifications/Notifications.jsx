import React from 'react';
import './Notifications.css';
import { useNotificationContext } from '../../Contexts/NotificationContext';

const Notifications = () => {
  // Yalnızca pop-up notificationları göster!
  const { popupNotifications, removeNotification } = useNotificationContext();

  return (
    <div className="notification-container">
      {popupNotifications.map(({ id, title, message, icon, type, actions }) => (
        <div key={id} className={`notification ${type}`}>
          <div className="notification-header">
            <img src={icon} alt="Icon" className="notification-icon" />
            <h2>{title}</h2>
            {/* Elle kapat için buton (action yoksa gözükür) */}
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
                      removeNotification(id); // Butona tıklanınca bildirimi kaldır
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
  );
};

export default Notifications;
