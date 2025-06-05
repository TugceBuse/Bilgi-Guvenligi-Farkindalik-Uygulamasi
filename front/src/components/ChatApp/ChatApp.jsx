import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatApp.module.css';
import { MakeDraggable } from '../../utils/Draggable';
import { useUIContext } from '../../Contexts/UIContext';
import { useGameContext } from '../../Contexts/GameContext';
import { statusSteps } from '../../utils/cargoStatus'; // Kargo durum adımları

// 💬 Yeni ekle
import { useChatContext } from '../../Contexts/ChatContext';

export const useChatApp = () => {
  const { openWindow, closeWindow } = useUIContext();

  const openHandler = () => openWindow('chatapp');
  const closeHandler = () => closeWindow('chatapp');

  return { openHandler, closeHandler };
};

const dummyUsers = [
  { id: 1, name: 'IT Destek', avatar: '/icons/user (2).png' },
  { id: 2, name: 'İK Birimi', avatar: '/icons/user (2).png' }
];

const ChatApp = ({ closeHandler, style }) => {
  const chatAppRef = useRef(null);
  MakeDraggable(chatAppRef, `.${styles.chatHeader}`);

  const { cargoTrackingList, orders, cargoTrackingSiteVisited  } = useGameContext();
  const printerOrder = orders.find(order =>
    order.items.some(item => item.id === 15)
  );
  const trackingNo = printerOrder?.trackingNo;
  const cargo = cargoTrackingList.find(item => item.trackingNo === trackingNo);

  useEffect(() => {
    if (!cargo) return;

    setUserOptions(1, // IT departman userId
      statusSteps.map((step, idx) => ({
        id: idx,
        label: `Kargo Durumu: ${step.status}`,
        enabled: cargoTrackingSiteVisited[cargo.trackingNo] === true && cargo.currentStep === idx // sadece güncel step aktif
      }))
    );
  }, [cargo?.currentStep]);

  const [selectedUser, setSelectedUser] = useState(dummyUsers[0]);

  // Contextten konuşma ve seçenekler
  const { messages, addChatMessage, options, setUserOptions } = useChatContext();

  // İlk açılışta dummy mesajları yükle (bir kez)
  useEffect(() => {
    // Eğer context'te hiç mesaj yoksa dummy mesaj ekle
    if (!(messages[selectedUser.id] && messages[selectedUser.id].length > 0)) {
      if (selectedUser.id === 1) {
        addChatMessage(1, {
          sender: 'them',
          text: 'Merhaba, bilgisayarında bir sorun yaşadın mı?',
          time: '09:45'
        });
      }
      if (selectedUser.id === 2) {
        addChatMessage(2, {
          sender: 'them',
          text: 'CV’ni sistemimize yüklemeyi unutma.',
          time: '14:20'
        });
      }
    }
  }, [selectedUser, addChatMessage, messages]);

  // Kullanıcı değiştiğinde mesajları context'ten getir
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  // Seçenekli butona tıklanınca mesaj gönder
  const handleOptionSend = (option) => {
    addChatMessage(selectedUser.id, {
      sender: "me",
      text: option.label,
      time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
      optionId: option.id
    });

    // Senaryo ilerletme veya karşıdan otomatik cevap verme mantığını burada kurabilirsin
    if (option.onSend) option.onSend(); // opsiyonel callback desteği
  };

  // Seçenekler context'ten geliyor. Eğer yoksa boş dizi
  const userOptions = options[selectedUser.id] || [];

  return (
    <div className={styles.chatWindow} style={style} ref={chatAppRef} data-window="chatapp">
      <div className={styles.chatHeader}>
        <h2>Mesajlaşma</h2>
        <button className={styles.chatClose} onClick={closeHandler}>×</button>
      </div>

      <div className={styles.body}>
        <div className={styles.userList}>
          {dummyUsers.map(user => (
            <div key={user.id} className={styles.userItem} onClick={() => handleUserClick(user)}>
              <img src={user.avatar} alt={user.name} />
              <span>{user.name}</span>
            </div>
          ))}
        </div>

        <div className={styles.chatContent}>
          <div className={styles.chatTitle}>{selectedUser.name}</div>
          <div className={styles.messageList}>
            {(messages[selectedUser.id] || []).map((msg, idx) => (
              <div key={idx} className={msg.sender === 'me' ? styles.myMessage : styles.theirMessage}>
                <span>{msg.text}</span>
                <small>{msg.time}</small>
              </div>
            ))}
          </div>
          <div className={styles.inputArea}>
            {userOptions.length === 0 ? (
              <span style={{ color: "#aaa" }}>Şu anda gönderilebilecek bir mesaj yok.</span>
            ) : (
              userOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSend(option)}
                  disabled={!option.enabled}
                  className={option.enabled ? styles.activeButton : styles.disabledButton}
                >
                  {option.label}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;