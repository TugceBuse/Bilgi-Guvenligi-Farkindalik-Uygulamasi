import React from 'react';
import './Notifications.css';
import { useNotification } from '../../Contexts/NotificationContext';

const Notifications = () => {
  const { notifications } = useNotification();

  return (
    <div className="notification-container">
      {notifications.map(({ id, title, message, icon, type }) => (
        <div key={id} className={`notification ${type}`}>
          <div className="notification-header">
            <img src={icon} alt="Icon" className="notification-icon" />
            <h2>{title}</h2>
          </div>
          <div className="notification-content">
            <p>{message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
