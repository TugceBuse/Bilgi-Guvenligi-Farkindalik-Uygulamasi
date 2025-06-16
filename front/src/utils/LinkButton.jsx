// components/TrackedLinkButton.jsx
import React from 'react';
import styles from './LinkButton.module.css'; 
import { useEventLog } from '../Contexts/EventLogContext';
import { useMailContext } from '../Contexts/MailContext';

const LinkButton = ({ 
    label, 
    url, 
    questId, 
    type = "click_link", 
    logEventType, 
    value = 0, 
    mailId,
    shippingCompany,
    trackingNo,
    orderNo
}) => {
  const { addEventLog } = useEventLog();
  const { selectedMail } = useMailContext();

  const handleClick = () => {
    addEventLog({
      type: type,
      questId: questId,
      logEventType: logEventType,
      value,
      data: {
        app: "MailBox",
        mailId: mailId || selectedMail?.id,
        url
      }
    });

    
    // Oyun içi simülasyon tarayıcısında aç
    window.dispatchEvent(new CustomEvent("open-browser-url", {
      detail: {
        url,
        shippingCompany,
        trackingNo,
        orderNo,
      }
    }));
  };

  return (
    <div className={styles.attachmentBox}>
      <span className={styles.downloadIcon}>🔗</span>
      <span>{label}</span>
      <button
        className={styles.downloadAction}
        onClick={handleClick}
        title="Bağlantıya Git"
      >
        Git
      </button>
    </div>
  );
};

export default LinkButton;
