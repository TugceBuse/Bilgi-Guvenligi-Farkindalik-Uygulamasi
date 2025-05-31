import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = ({
    title,
    message,
    type = "info",
    icon = `/icons/${type}.png`,
    duration = 5000,
    actions
  }) => {
    const id = Date.now();
    const newNotification = { id, title, message, type, icon, actions };

    setNotifications(prev => [...prev, newNotification]);

    // Eğer buton/aksiyon yoksa otomatik kapanır, varsa kalıcı!
    if (!actions || actions.length === 0) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
      }, duration);
    }
  };


  // Kapatma fonksiyonu (özellikle aksiyon sonrası kullanmak için)
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
