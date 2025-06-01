// ConnectionOverlay.jsx
import React from 'react';
import styles from './ConnectionOverlay.module.css'; // veya .css uzantın neyse

const ConnectionOverlay = ({ isConnected, children, top = 0 }) => (
  <div style={{ position: "relative", height: "100%" }}>
    {!isConnected && (
      <div
        className={styles.disabledOverlay}
        style={{ top }}
      >
        <div className={styles.overlayMessage + " overlay-message"}>
          <svg viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" fill="#ffbe6f" stroke="#c97e09" strokeWidth="2"/>
            <path d="M20 10 v12" stroke="#c97e09" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="20" cy="29" r="2.3" fill="#c97e09"/>
          </svg>
          İnternet bağlantısı yok!
        </div>
      </div>
    )}
    {children}
  </div>
);

export default ConnectionOverlay;
