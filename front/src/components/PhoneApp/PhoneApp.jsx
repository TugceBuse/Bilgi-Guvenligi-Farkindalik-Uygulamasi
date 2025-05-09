import React, { useState, useRef, useEffect } from 'react';
import styles from './PhoneApp.module.css';
import { MakeDraggable } from '../../utils/Draggable';
import { useUIContext } from '../../Contexts/UIContext';
import { useGameContext } from '../../Contexts/GameContext';

export const usePhoneApp = () => {
  const { toggleWindow } = useUIContext();

  const openHandler = () => {
    toggleWindow('phoneapp');
  };

  const closeHandler = () => {
    toggleWindow('phoneapp');
  };

  return { openHandler, closeHandler };
};

const PhoneApp = ({ closeHandler, style }) => {
  const PhoneAppRef = useRef(null);
  MakeDraggable(PhoneAppRef, `.${styles.phoneHeader}`);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'NovaBank',
      content: 'Giriş kodunuz: 428179',
      time: '17:42'
    },
    {
      id: 2,
      sender: '2FA Güvenlik',
      content: 'Kodunuz: 982134. Kimseyle paylaşmayın.',
      time: '17:43'
    },
    {
      id: 3,
      sender: 'X Sosyal',
      content: 'Hesap doğrulama kodunuz: 112358',
      time: '17:45'
    }
  ]);
  
  const generate6DigitCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const add2FAMessage = () => {
    const code = generate6DigitCode();
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
    const newMessage = {
      id: Date.now(), // benzersiz
      sender: '2FA Güvenlik',
      content: `Kodunuz: ${code}. Kimseyle paylaşmayın.`,
      time: time
    };
  
    setMessages(prev => [...prev, newMessage]);
  };
  

  return (
    <div className={styles.phoneWindow} style={style} ref={PhoneAppRef} data-window="phoneapp">
      <div className={styles.phoneHeader}>
        <h2>Telefon</h2>
        <button className={styles.phoneClose} onClick={closeHandler}>×</button>
      </div>

      <div className={styles.phoneBody}>
        <div className={styles.phoneStatus}>
            <img src="/PhoneApp/bluetooth.png" alt="Bluetooth Icon" className={styles.phoneImage} />
            <img src="/PhoneApp/wifi-slash.png" alt="Wifi Icon" className={styles.phoneImage} />
            <img src="/PhoneApp/signal.png" alt="Mobile Signal Icon" className={styles.phoneImage} />
            <img src="/PhoneApp/power.png" alt="Battery Icon" className={styles.phoneImage} />
            <p>%87</p>
        </div>
        <button onClick={add2FAMessage} style={{ margin: '10px auto', width: '80%' }}>
            Yeni Kod Gönder
        </button>
        <div className={styles.messageList}>
            <div className={styles.phoneMessages}>
                <img src="/PhoneApp/comment.png" alt="Mesajlar" />
                <h2>Mesajlar</h2>
            </div>

            {messages.map((msg) => (
                <div key={msg.id} className={styles.messageItem}>
                <div className={styles.messageSender}>{msg.sender}</div>
                <div className={styles.messageContent}>{msg.content}</div>
                <div className={styles.messageTime}>{msg.time}</div>
                </div>
            ))}
        </div>
      </div>

      
    </div>
  );
};

export default PhoneApp;
