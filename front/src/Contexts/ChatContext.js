import React, { createContext, useContext, useState } from "react";

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

  const addUser = (user) => setUsers(prev => [...prev, user]);

  // Konuşma geçmişine mesaj ekler
  const addChatMessage = (userId, msg) => {
    setMessages(prev => ({
      ...prev,
      [userId]: [...(prev[userId] || []), msg]
    }));
    // Sadece "them" ve id contextte yoksa ekle
    setUsers(prev =>
      prev.some(u => u.id === userId)
        ? prev
        : msg.sender === "them"
          ? [...prev, {
              id: userId,
              name: msg.senderName || "Bilinmeyen",
              avatar: '/icons/user (2).png'
            }]
          : prev
    );
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
      users, addUser, setUsers
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);