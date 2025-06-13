import React, { createContext, useContext, useState } from "react";
import { useNotificationContext } from "./NotificationContext";
import { useUIContext } from './UIContext';
import { useWindowConfig } from "./WindowConfigContext";

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {

  // Dinamik kullanıcı listesi
  const [users, setUsers] = useState([
    { id: 1, name: 'IT Destek', avatar: '/icons/user (2).png' },
    { id: 2, name: 'İK Birimi', avatar: '/icons/user (2).png' }
  ]);

  const [messages, setMessages] = useState({});
  // Dinamik buton seçenekleri { [userId]: [{id, label, enabled, data}] }
  const [options, setOptions] = useState({});
  const [cargoStepShared, setCargoStepShared] = useState({});
  const { addNotification, removeNotification } = useNotificationContext();
  const { openWindow } = useUIContext();
  const { windowConfig } = useWindowConfig();

  const [uploadTasks, setUploadTasks] = useState([]);

  // Görev ekleme (tekrarlı eklemez)
  const addUploadTask = (task) => {
    setUploadTasks(prev =>
      prev.some(t =>
        t.userId === task.userId &&
        t.allowedTypes?.join(',') === task.allowedTypes?.join(',') &&
        t.filterLabelContains === task.filterLabelContains
      )
        ? prev
        : [...prev, { ...task, completed: false }]
    );
  };

  // Görev tamamlandığında
  const markUploadTaskCompleted = (userId, filter) => {
    setUploadTasks(prev => prev.map(t =>
      t.userId === userId && (!filter || t.filterLabelContains === filter)
        ? { ...t, completed: true }
        : t
    ));
  };

  const addUser = (user) => setUsers(prev => [...prev, user]);

  // Konuşma geçmişine mesaj ekler
  const addChatMessage = (userId, msg, notify) => {
    setMessages(prev => ({
      ...prev,
      [userId]: [...(prev[userId] || []), msg]
    }));

    setUsers(prev =>
      prev.some(u => u.id === userId)
        ? prev
        : msg.sender === "them"
          ? [...prev, { id: userId, name: msg.senderName || "Bilinmeyen", avatar: '/icons/user (2).png' }]
          : prev
    );
    // Bildirim tetikle
    if( notify &&
        msg.sender === "them" &&
        windowConfig?.chatapp?.available === true) 
    { 
      const notificationId = (Date.now() + Math.random());
      console.log("CHAT POPUP TETİKLENDİ", msg, notificationId);
      addNotification({
        id: notificationId,
        type: "info",
        appType: "chatapp",
        title: msg.senderName || "IT Destek",
        message: msg.text,
        icon: "/icons/user (2).png",
        isPopup: true, // Bunu MUTLAKA true ver
        isTaskbar: true,
        duration: 7000,
        actions: [
          {
            label: "Sohbete Git",
            onClick: () => openWindow('chatapp')
          },
          {
            label: "Bildirimden Kaldır",
            onClick: () => removeNotification(notificationId)
          }
        ],
        appData: { userId }
      });
    }
  };
  
  // Örnek mesaj ekleme, eğer kişi yoksa ekler
  // addChatMessage(5, {
  //   sender: "them",
  //   text: "Hoş geldiniz, ben Ar-Ge Destek ekibi!",
  //   senderName: "Ar-Ge Destek",
  //   time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })
  // });

  // Seçenekleri günceller
  const setUserOptions = (userId, opts) => {
    setOptions(prev => ({
      ...prev,
      [userId]: opts
    }));
  };

  // Tümünü dışa aktar
  return (
    <ChatContext.Provider value={{
      messages, addChatMessage,
      options, setUserOptions,
      cargoStepShared, setCargoStepShared,
      users, addUser, setUsers,
      uploadTasks, addUploadTask, markUploadTaskCompleted,
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);