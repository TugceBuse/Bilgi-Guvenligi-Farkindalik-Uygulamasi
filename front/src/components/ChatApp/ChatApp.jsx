import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatApp.module.css';
import { MakeDraggable } from '../../utils/Draggable';
import { useUIContext } from '../../Contexts/UIContext';
import { useGameContext } from '../../Contexts/GameContext';




const dummyUsers = [
  { id: 1, name: 'IT Destek', avatar: '/icons/user (2).png' },
  { id: 2, name: 'İK Birimi', avatar: '/icons/user (2).png' }
];

// Dummy Messages artık bir fonksiyon
const dummyMessages = (getRelativeDate) => ({
  1: [
    { 
      sender: 'them', 
      text: 'Merhaba, bilgisayarında bir sorun yaşadın mı?', 
      time: formatTime(getRelativeDate({ days: -2, hours: -2, minutes: -30 })) 
    },
    { 
      sender: 'me', 
      text: 'Hayır, ama bir uyarı aldım.', 
      time: formatTime(getRelativeDate({ days: -2, hours: -1, minutes: -30 })) 
    }
  ],
  2: [
    { 
      sender: 'them', 
      text: 'CV’ni sistemimize yüklemeyi unutma.', 
      time: formatTime(getRelativeDate({ days: -1 })) 
    }
  ]
});

// Saat ve dakika formatlayan yardımcı fonksiyon
const formatTime = (dateObj) => {
  const hour = String(dateObj.hour).padStart(2, '0');
  const minute = String(dateObj.minute).padStart(2, '0');
  return `${hour}:${minute}`;
};


export const useChatApp = () => {
  const { toggleWindow } = useUIContext();

  const openHandler = () => {
    toggleWindow('chatapp');
  };

  const closeHandler = () => {
    toggleWindow('chatapp');
  };

  return { openHandler, closeHandler };
};

const ChatApp = ({ closeHandler, style }) => {
  const chatAppRef = useRef(null);
  MakeDraggable(chatAppRef, `.${styles.chatHeader}`);

  const { getRelativeDate } = useGameContext();
  const [selectedUser, setSelectedUser] = useState(dummyUsers[0]);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (getRelativeDate) {
      const newMessages = dummyMessages(getRelativeDate)[selectedUser.id];
      setMessages(newMessages);
    }
  }, [getRelativeDate, selectedUser]);
  

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg = { sender: 'me', text: inputText, time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
  };

  return (
    <div className={styles.chatWindow} style={style} ref={chatAppRef}>
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
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === 'me' ? styles.myMessage : styles.theirMessage}>
                <span>{msg.text}</span>
                <small>{msg.time}</small>
              </div>
            ))}
          </div>
          <div className={styles.inputArea}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Mesaj yaz..."
            />
            <button onClick={handleSend}>Gönder</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
