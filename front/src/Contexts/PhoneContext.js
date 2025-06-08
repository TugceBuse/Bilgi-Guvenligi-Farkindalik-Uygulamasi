import { createContext, useContext, useState, useEffect } from 'react';
import { useNotificationContext } from './NotificationContext';
import { useUIContext } from './UIContext';
import { useTimeContext } from './TimeContext';
import { useSecurityContext } from './SecurityContext';

const PhoneContext = createContext();

export const PhoneProvider = ({ children }) => {
  // Contextler
  const { addNotification, markAsRead } = useNotificationContext();
  const { openWindow } = useUIContext();
  const { isWificonnected } = useSecurityContext();
  const { gameDate, getRelativeDate } = useTimeContext();

  // Mesajlar
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Migros',
      content: '🛒 Club Kart’a özel haftasonu fırsatları sizi bekliyor! Detaylar için uygulamamıza göz atın.',
      sendTime : getRelativeDate({ days : -1 , hours : 3 , minutes : 15 })
    },
    {
      id: 2,
      sender: 'OrionTech',
      content: '🔧 Planlı bakım çalışması nedeniyle sistemlerimiz 22:00 - 01:00 arasında geçici olarak devre dışı olacaktır.',
      sendTime : getRelativeDate({ days : -1 , hours : 9 , minutes : 0 })
    },
    {
      id: 3,
      sender: 'e-Devlet',
      content: '📌 Yeni bir e-Belge sisteminize yüklenmiştir. Detaylar için sisteme giriş yapınız.',
      sendTime : getRelativeDate({ days : -5 , hours : 2 , minutes : 10 })
    },
    {
      id: 4,
      sender: 'HepsiMarket',
      content: '🎉 Bugün geçerli! Tüm alışverişlerde %30 indirim. Kodu kullan: INDIRIM30',
      sendTime : getRelativeDate({ days : -5 , hours : 6 , minutes : 43 })
    },
    {
      id: 5,
      sender: 'PTT Kargo',
      content: 'Kargonuz dağıtıma çıkmıştır. Teslimat bugün 19:00’a kadar yapılacaktır.',
      sendTime : getRelativeDate({ days : -6 , hours : 1 , minutes : 18 })
    },
  ]);

  // Okunan mesajlar
  const [readMessages, setReadMessages] = useState(messages.map(m => m.id));
  const [lastCodes, setLastCodes] = useState({});
  const [codeTimers, setCodeTimers] = useState({});

  // Queue: İnternet yoksa biriken mesajlar burada tutulacak
  const [pendingMessages, setPendingMessages] = useState([]);

  // SMS gönderim fonksiyonu (artık gameDate kullanıyor)
  const addMessage = (sender, content, showNotification = true) => {
    if (!isWificonnected) {
      // İnternet yoksa queue'ya ekle, sonra işlenecek
      setPendingMessages(prev => [...prev, { sender, content, showNotification }]);
      return;
    }

    // Mesaj oluştur: gönderim zamanı oyun saati ile
    const sendTime = gameDate;

    const newMessage = {
      id: Date.now(),
      sender,
      content,
      sendTime,
      read: false
    };

    setMessages(prev => [newMessage, ...prev]);

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

  // İnternet geldiğinde biriken sms’leri işleyelim
  useEffect(() => {
    if (isWificonnected && pendingMessages.length > 0) {
      pendingMessages.forEach(({ sender, content, showNotification }) => {
        // Her bir mesaj, internet geldiğinde normal mesaj gibi işlenir
        const sendTime = gameDate;
        const newMessage = {
          id: Date.now() + Math.floor(Math.random() * 10000), // çakışma riskini azaltmak için
          sender,
          content,
          sendTime,
          read: false
        };
        setMessages(prev => [newMessage, ...prev]);

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
      });
      setPendingMessages([]); // Queue'yu temizle
    }
  }, [isWificonnected, pendingMessages, gameDate]);

  const markMessageAsRead = (id) => {
    if (!readMessages.includes(id)) {
      setReadMessages(prev => [...prev, id]);
    }
  };

  const getUnreadCount = () => {
    return messages.filter(msg => !readMessages.includes(msg.id)).length;
  };

  // KOD SMSİ üretme fonksiyonları (güncel gameDate ile)
  const generate6DigitCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const generateCodeMessage = (senderName, key) => {
    // İnternet yoksa da queue'ya düşecek
    const code = generate6DigitCode();
    const content = `Kodunuz: ${code}. Kimseyle paylaşmayın.`;
    addMessage(senderName, content, true);

    setLastCodes(prev => ({ ...prev, [key]: code }));

    if (codeTimers[key]) clearTimeout(codeTimers[key]);

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
        pendingMessages, // istersen kullanabilirsin
      }}
    >
      {children}
    </PhoneContext.Provider>
  );
};

export const usePhoneContext = () => useContext(PhoneContext);
