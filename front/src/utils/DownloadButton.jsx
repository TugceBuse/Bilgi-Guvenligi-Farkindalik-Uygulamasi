import { useState, useEffect, useRef } from 'react';
import styles from './DownloadButton.module.css';
import { useFileContext } from '../Contexts/FileContext';
import { useGameContext } from '../Contexts/GameContext';
import { useMailContext } from '../Contexts/MailContext';

const DownloadButton = ({ label, fileName, mailId }) => {
  const { updateFileStatus } = useFileContext();
  const { isWificonnected } = useGameContext();
  const { selectedMail } = useMailContext();

  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cancelled, setCancelled] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCancelled, setShowCancelled] = useState(false);

  const downloadMailIdRef = useRef(null); // başlarken hangi maile bağlı olduğunu saklar

  const handleDownload = () => {
    if (!isWificonnected) return;
    setDownloading(true);
    setCancelled(false);
    setProgress(0);
    downloadMailIdRef.current = mailId;
  };

  const cancelDownload = () => {
    setCancelled(true);
    setDownloading(false);
    setProgress(0);
    setShowCancelled(true);
    setTimeout(() => setShowCancelled(false), 2500);
  };

  useEffect(() => {
    if (downloading && downloadMailIdRef.current !== selectedMail?.id) {
      console.log('Başka maile geçildi veya eski mail kapandı, iptal!');
      cancelDownload();
    }
  }, [selectedMail, downloading]);

  useEffect(() => {
    if (downloading && !cancelled && isWificonnected) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const randomIncrease = Math.floor(Math.random() * 4) + 2;
          if (prev >= 100) {
            clearInterval(interval);
            return prev;
          }
          return Math.min(prev + randomIncrease, 100);
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [downloading, cancelled, isWificonnected]);

  useEffect(() => {
    if (progress >= 100 && downloading && !cancelled) {
      updateFileStatus(fileName, { available: true });
      console.log(`📥 ${fileName} dosyası indirildi!`);
      setDownloading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    }
  }, [progress, downloading, cancelled, fileName, updateFileStatus]);

  return (
    <div className={styles.container}>
      {!downloading ? (
        <div className={`${styles.attachmentBox} ${styles.wrapperWithBubble}`}>
          {showSuccess && <div className={styles.successBubble}>✔ İndirildi</div>}
          {showCancelled && <div className={styles.cancelBubble}>❌ İptal Edildi</div>}
          <span className={styles.downloadIcon}>📎</span>
          <span>{label}</span>
          <button
            className={styles.downloadAction}
            onClick={handleDownload}
            disabled={!isWificonnected}
            title={!isWificonnected ? 'Wi-Fi bağlantısı yok' : ''}
          >
            İndir
          </button>
        </div>
      ) : (
        <div className={styles.progressWrapper}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
            <span className={styles.progressLabel}>{label}</span>
          </div>
          <button className={styles.cancel} onClick={cancelDownload}>✕</button>
        </div>
      )}
    </div>
  );
};

export default DownloadButton;
