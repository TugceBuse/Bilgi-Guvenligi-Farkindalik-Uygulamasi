import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const getDefaultIcon = (appType) => {
    if (appType === "mail") return "/icons/mail.png";
    if (appType === "phone") return "/PhoneApp/comment.png";
    if (appType === "system") return "/icons/info.png";
    if (appType === "chatapp") return "/icons/speak.png";
    if (appType === "taskapp") return "/icons/task-list.png";
    return "/icons/info.png";
  };

  const addNotification = ({
    id, // id dışarıdan gelirse onu kullan (mail.id olmalı!)
    type = "info",
    appType = "system",
    title,
    message,
    icon,
    isPopup = false,
    isTaskbar = false,
    actions = [],
    duration = 5000,
    appData,
  }) => {
    // id parametresi dışarıdan gelmezse oluştur
    const notificationId = id !== undefined ? id : (Date.now() + Math.random());
    const notification = {
      id: notificationId,
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
      createdAt: new Date(),
      popupClosed: false,
    };
    setNotifications(prev => [...prev, notification]);

    // Otomatik kaldırma sadece popup için (taskbar'dan silinmez)
    if (isPopup && actions.length === 0) {
      setTimeout(() => {
        setNotifications(prev =>
          prev.map(n => n.id === notificationId ? { ...n, popupClosed: true } : n)
        );
      }, duration);
    }
    return notificationId;
  };

  const closePopupNotification = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, popupClosed: true } : n)
    );
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const popupNotifications = notifications.filter(n => n.isPopup && !n.popupClosed);
  const taskbarNotifications = notifications.filter(n => n.isTaskbar && !n.read);
  const unreadTaskbarCount = taskbarNotifications.length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      markAsRead,
      closePopupNotification,
      popupNotifications,
      taskbarNotifications,
      unreadTaskbarCount,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
