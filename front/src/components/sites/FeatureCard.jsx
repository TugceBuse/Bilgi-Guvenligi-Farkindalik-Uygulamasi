import React, { useState } from 'react';
import styles from './DocuLite.module.css';

const FeatureCard = ({ icon, title, description }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`${styles.card} ${expanded ? styles.open : ''}`}>
      <div className={styles.cardHeader} onClick={() => setExpanded(!expanded)}>
        <div className={styles.cardTitle}>
          <span className={styles.icon}>{icon}</span>
          {title}
        </div>
        <button
          className={styles.infoButton}
          onClick={() => setExpanded(!expanded)}
          aria-label="Detay Göster/Gizle"
        >
          🛈
        </button>
      </div>

      <div
        className={styles.cardDescriptionWrapper}
        style={{
          maxHeight: expanded ? '500px' : '0',
          padding: expanded ? '10px 0' : '0',
        }}
      >
        <div className={styles.cardDescription}>
          {description}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
