import React, { useRef } from 'react';
import styles from './PhoneApp.module.css';
import { MakeDraggable } from '../../utils/Draggable';
import { useUIContext } from '../../Contexts/UIContext';
import { usePhoneContext } from '../../Contexts/PhoneContext';
import { useNotificationContext } from '../../Contexts/NotificationContext';

export const usePhoneApp = () => {
  const { openWindow, closeWindow } = useUIContext();

  const openHandler = () => openWindow('phoneapp');
  const closeHandler = () => closeWindow('phoneapp');

  return { openHandler, closeHandler };
};

const PhoneApp = ({ closeHandler, style }) => {
  const PhoneAppRef = useRef(null);
  MakeDraggable(PhoneAppRef, `.${styles.phoneWindow}`);
  const { markAsRead, closePopupNotification } = useNotificationContext();
  const { messages, markMessageAsRead, readMessages, getUnreadCount } = usePhoneContext();

  // Okunmamış sms varsa barı kırmızı yap
  const unreadCount = getUnreadCount();

  return (
    <div className={styles.phoneFrame} ref={PhoneAppRef} data-window="phoneapp" style={style}>
      <div className={styles.phoneSpeaker}></div>
      <div className={styles.phoneWindow}>
        <div className={styles.phoneStatusBar}>
          <span className={styles.phoneClock}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <div className={styles.phoneCamera}>
            <div className={styles.phoneCameraCircle}></div>
          </div>
          <div className={styles.statusRightArea}>
            <div className={styles.phoneStatus}>
              <img src="/PhoneApp/wifi-slash.png" alt="Wifi Icon" className={styles.phoneImage} />
              <img src="/PhoneApp/signal.png" alt="Mobile Signal Icon" className={styles.phoneImage} />
              <img src="/PhoneApp/power.png" alt="Battery Icon" className={styles.phoneImage} />
              <p>%87</p>
            </div>
            <button className={styles.phoneClose} onClick={closeHandler}>×</button>
          </div>
        </div>

        <div
          className={`${styles.unreadInfo} ${
            unreadCount > 0 ? styles.hasUnread : ''
          }`}
        >
          {unreadCount > 0
            ? `${unreadCount} adet okunmamış mesajınız var`
            : "Tüm mesajlar okundu"}
        </div>

        <div className={styles.messageList}>
          <div className={styles.phoneMessages}>
            <div className={styles.phoneMessagesTitle}>
              <img src="/PhoneApp/comment.png" alt="Mesajlar" />
              <h2>Mesajlar</h2>
            </div>
            <h4>Gelen Kutusu</h4>
          </div>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.messageItem} ${
                readMessages.includes(msg.id) ? styles.read : styles.unread
              }`}
              onClick={() => { markMessageAsRead(msg.id); markAsRead(msg.id); closePopupNotification(msg.id); }}
              tabIndex={0}
              role="button"
              aria-label={`Mesaj ${msg.sender} - ${msg.content}`}
            >
              <div className={styles.messageSender}>{msg.sender}</div>
              <div className={styles.messageContent}>{msg.content}</div>
                <div className={styles.messageTimeRow}>
                  <div className={styles.messageTime}>
                    <span className="timeIcon" role="img" aria-label="Saat">🕒</span>
                    {msg.sendTime
                      ? new Date(msg.sendTime).toLocaleString("tr-TR", {
                          day: "2-digit", month: "2-digit", year: "2-digit",
                          hour: "2-digit", minute: "2-digit"
                        })
                      : msg.time}
                  </div>
                  <span className={styles.readStatus}>
                    {readMessages.includes(msg.id) ? "✅ Okundu" : "\u00A0"}
                  </span>
                </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.phoneHomeButton}></div>
    </div>
  );
};

export default PhoneApp;
