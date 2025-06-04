import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  // Her user için mesajlar { [userId]: [{sender, text, time, optionId, type}] }
  const [messages, setMessages] = useState({});
  // Dinamik buton seçenekleri { [userId]: [{id, label, enabled, data}] }
  const [options, setOptions] = useState({});

  // Konuşma geçmişine mesaj ekler
  const addChatMessage = (userId, msg) => {
    setMessages(prev => ({
      ...prev,
      [userId]: [...(prev[userId] || []), msg]
    }));
  };

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
      options, setUserOptions
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);