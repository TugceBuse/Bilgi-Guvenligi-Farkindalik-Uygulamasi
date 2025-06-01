import { createContext, useContext, useState } from 'react';
import { useNotificationContext } from './NotificationContext';
import { useUIContext } from './UIContext';

const PhoneContext = createContext();

export const PhoneProvider = ({ children }) => {
  // NotificationContext ve UIContext'i çek
  const { addNotification, markAsRead} = useNotificationContext();
  const { openWindow } = useUIContext();

  // İlk mesajlar için notification çıkmaz!
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

  // Başlangıçta ilk mesajların hepsi okundu!
  const [readMessages, setReadMessages] = useState(messages.map(m => m.id));
  const [lastCodes, setLastCodes] = useState({});
  const [codeTimers, setCodeTimers] = useState({});

  // 🔔 Yeni mesaj ekleme ve notification gösterme
  const addMessage = (sender, content, showNotification = true) => {
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

    // Bildirim göstermek için doğrudan context fonksiyonlarını kullan
    if (showNotification) {
      addNotification({
        id: newMessage.id,
        appType: 'phone',
        type: 'info',
        title: sender,
        message: content,
        icon: '/PhoneApp/comment.png',
        isPopup: true,
        isTaskbar: true,
        duration: 7000,
        actions: [
          {
            label: 'Oku',
            onClick: () => {
              openWindow('phoneapp');
              markMessageAsRead(newMessage.id);
              markAsRead(newMessage.id);
            }
          }
        ],
        appData: { smsId: newMessage.id, sender }
      });
    }
  };

  const markMessageAsRead = (id) => {
    if (!readMessages.includes(id)) {
      setReadMessages(prev => [...prev, id]);
    }
  };

  const getUnreadCount = () => {
    return messages.filter(msg => !readMessages.includes(msg.id)).length;
  };

  // KOD SMSİ üretme fonksiyonları
  const generate6DigitCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const generateCodeMessage = (senderName, key) => {
    const code = generate6DigitCode();
    const content = `Kodunuz: ${code}. Kimseyle paylaşmayın.`;
    addMessage(senderName, content, true);

    setLastCodes(prev => ({ ...prev, [key]: code }));

    // Mevcut timer varsa temizle
    if (codeTimers[key]) clearTimeout(codeTimers[key]);

    // 2 dakika sonra kodu sil
    const timerId = setTimeout(() => {
      setLastCodes(prev => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    }, 2 * 60 * 1000);

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
        getUnreadCount,
      }}
    >
      {children}
    </PhoneContext.Provider>
  );
};

export const usePhoneContext = () => useContext(PhoneContext);
