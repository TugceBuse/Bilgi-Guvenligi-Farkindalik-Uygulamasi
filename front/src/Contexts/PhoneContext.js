// PhoneContext.js
import { createContext, useContext, useState } from 'react';

const PhoneContext = createContext();

export const PhoneProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
    id: 1,
    sender: 'Migros',
    content: '🛒 Club Kart’a özel haftasonu fırsatları sizi bekliyor! Detaylar için uygulamamıza göz atın.',
    time: '18:33',
    },
    {
    id: 2,
    sender: 'OrionTech',
    content: '🔧 Planlı bakım çalışması nedeniyle sistemlerimiz 22:00 - 01:00 arasında geçici olarak devre dışı olacaktır.',
    time: '18:25',
    },
    {
    id: 3,
    sender: 'e-Devlet',
    content: '📌 Yeni bir e-Belge sisteminize yüklenmiştir. Detaylar için sisteme giriş yapınız.',
    time: '18:13',
    },
    {
    id: 4,
    sender: 'HepsiMarket',
    content: '🎉 Bugün geçerli! Tüm alışverişlerde %30 indirim. Kodu kullan: INDIRIM30',
    time: '18:02',
  },
  {
    id: 5,
    sender: 'PTT Kargo',
    content: 'Kargonuz dağıtıma çıkmıştır. Teslimat bugün 19:00’a kadar yapılacaktır.',
    time: '18:10',
  },
  
  
  
  ]);
  const [lastCodes, setLastCodes] = useState({});
  const [codeTimers, setCodeTimers] = useState({});

  const addMessage = (sender, content) => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMessage = {
      id: Date.now(),
      sender,
      content,
      time, 
      read: false
    };

    setMessages(prev => [newMessage, ...prev]);
  };

  const [readMessages, setReadMessages] = useState(
  messages.map(m => m.id) // id’leri listeye ekle
  );    

  const markMessageAsRead = (id) => {
    if (!readMessages.includes(id)) {
        setReadMessages((prev) => [...prev, id]);
    }
  };

  const getUnreadCount = () => {
    return messages.filter(msg => !readMessages.includes(msg.id)).length;
  };

  const generate6DigitCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const generateCodeMessage = (senderName, key) => {
  const code = generate6DigitCode();
  const content = `Kodunuz: ${code}. Kimseyle paylaşmayın.`;
  addMessage(senderName, content);

  // Bu key'e ait son kodu sakla
  setLastCodes(prev => ({ ...prev, [key]: code }));

  // Mevcut zamanlayıcıyı temizle
  if (codeTimers[key]) clearTimeout(codeTimers[key]);

  // 2 dakika sonra kodu temizle
  const timerId = setTimeout(() => {
    setLastCodes(prev => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  }, 2 * 60 * 1000); // 2 dakika

  setCodeTimers(prev => ({ ...prev, [key]: timerId }));
};


const clearCode = (key) => {
  setLastCodes(prev => {
    const updated = { ...prev };
    delete updated[key];
    return updated;
  });
};

  return (
    <PhoneContext.Provider 
    value={{ 
        messages, 
        addMessage, 
        generateCodeMessage, 
        lastCodes, 
        clearCode, 
        readMessages, 
        markMessageAsRead, 
        getUnreadCount 
    }}>
      {children}
    </PhoneContext.Provider>
  );
};

export const usePhoneContext = () => useContext(PhoneContext);
