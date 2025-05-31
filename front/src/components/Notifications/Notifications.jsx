import React from 'react';
import './Notifications.css';
import { useNotification } from '../../Contexts/NotificationContext';

const Notifications = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="notification-container">
      {notifications.map(({ id, title, message, icon, type, actions }) => (
        <div key={id} className={`notification ${type}`}>
          <div className="notification-header">
            <img src={icon} alt="Icon" className="notification-icon" />
            <h2>{title}</h2>
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
