import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // type: info, warning, danger, error, success... (renk için)
  // appType: system, mail, phone  (kaynak/kategori)
  const addNotification = ({
    type = "info",        // RENK
    appType = "system",   // KATEGORİ
    title,
    message,
    icon,
    isPopup = false,
    isTaskbar = false,
    actions = [],
    duration = 5000,
    appData,
  }) => {
    const id = Date.now() + Math.random();
    const notification = {
      id,
      type,
      appType,
      title,
      message,
      icon: icon || getDefaultIcon(appType),
      isPopup,
      isTaskbar,
      actions,
      read: false,
      duration,
      appData,
      createdAt: new Date()
    };
    setNotifications(prev => [...prev, notification]);

    // Popup ise otomatik kaldır
    if (isPopup && actions.length === 0) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, duration);
    }
    return id;
  };

  const getDefaultIcon = (appType) => {
    if (appType === "mail") return "/icons/mail.png";
    if (appType === "phone") return "/PhoneApp/comment.png";
    if (appType === "system") return "/icons/info.png";
    return "/icons/info.png";
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Filtreleyici fonksiyonlar:
  const popupNotifications = notifications.filter(n => n.isPopup);
  const taskbarNotifications = notifications.filter(n => n.isTaskbar && !n.read);
  const unreadTaskbarCount = taskbarNotifications.length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      markAsRead,
      popupNotifications,
      taskbarNotifications,
      unreadTaskbarCount,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
