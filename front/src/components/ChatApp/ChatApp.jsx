import React, { useState, useRef } from 'react';
import styles from './ChatApp.module.css';
import { MakeDraggable } from '../../utils/Draggable';
import { useUIContext } from '../../Contexts/UIContext';

const dummyUsers = [
  { id: 1, name: 'IT Destek', avatar: '/avatars/it.png' },
  { id: 2, name: 'İK Birimi', avatar: '/avatars/hr.png' }
];

const dummyMessages = {
  1: [
    { sender: 'them', text: 'Merhaba, bilgisayarında bir sorun yaşadın mı?', time: '09:42' },
    { sender: 'me', text: 'Hayır, ama bir uyarı aldım.', time: '09:43' }
  ],
  2: [
    { sender: 'them', text: 'CV’ni sistemimize yüklemeyi unutma.', time: '10:10' }
  ]
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

  const [selectedUser, setSelectedUser] = useState(dummyUsers[0]);
  const [messages, setMessages] = useState(dummyMessages[selectedUser.id]);
  const [inputText, setInputText] = useState('');

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setMessages(dummyMessages[user.id] || []);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg = { sender: 'me', text: inputText, time: new Date().toLocaleTimeString('tr-TR') };
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
