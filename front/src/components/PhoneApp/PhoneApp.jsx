import React, { useState, useRef, useEffect } from 'react';
import styles from './PhoneApp.module.css';
import { MakeDraggable } from '../../utils/Draggable';
import { useUIContext } from '../../Contexts/UIContext';
import { useGameContext } from '../../Contexts/GameContext';
import { usePhoneContext } from '../../Contexts/PhoneContext';

export const usePhoneApp = () => {
  const { openWindow, closeWindow } = useUIContext();

  const openHandler = () => {
    openWindow('phoneapp');
  };

  const closeHandler = () => {
    closeWindow('phoneapp');
  };

  return { openHandler, closeHandler };
};

const PhoneApp = ({ closeHandler, style }) => {
  const PhoneAppRef = useRef(null);
  MakeDraggable(PhoneAppRef, `.${styles.phoneHeader}`);

  const { messages, markMessageAsRead, readMessages, getUnreadCount } = usePhoneContext();

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
        <div className={styles.messageList}>
            <div className={styles.phoneMessages}>
                <img src="/PhoneApp/comment.png" alt="Mesajlar" />
                <h2>Mesajlar</h2>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.messageItem} ${readMessages.includes(msg.id) ? styles.read : styles.unread}`}
                onClick={() => markMessageAsRead(msg.id)}
              >
                <div className={styles.messageSender}>{msg.sender}</div>
                <div className={styles.messageContentRow}>
                  <div className={styles.messageContent}>{msg.content}</div>
                  <span className={styles.readStatus}>
                    {readMessages.includes(msg.id) ? "✅ Okundu" : "\u00A0"}
                  </span>
                </div>
                <div className={styles.messageTime}>{msg.time}</div>
              </div>
            ))}
        </div>
        
      </div>

      
    </div>
  );
};

export default PhoneApp;
