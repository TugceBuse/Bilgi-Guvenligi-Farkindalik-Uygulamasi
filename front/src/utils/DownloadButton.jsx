import { useState, useEffect, useRef } from 'react';
import styles from './DownloadButton.module.css';
import { useFileContext } from '../Contexts/FileContext';
import { useGameContext } from '../Contexts/GameContext';
import { useMailContext } from '../Contexts/MailContext';
import { useChatContext } from '../Contexts/ChatContext';
import { useTimeContext } from '../Contexts/TimeContext';
import { useQuestManager } from '../Contexts/QuestManager';

const DownloadButton = ({ label, fileName, fileContent, fileLabel, mailId }) => {
  const { addFile, updateFileStatus, files, openFile } = useFileContext();
  const { isWificonnected } = useGameContext();
  const { selectedMail } = useMailContext();
  const { addChatMessage, setUserOptions, addUploadTask } = useChatContext();
  const { gameDate } = useTimeContext();
  const { completeQuest, failQuest } = useQuestManager();

  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cancelled, setCancelled] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCancelled, setShowCancelled] = useState(false);

  const downloadMailIdRef = useRef(null);

  // Dosya daha önce indirildiyse burada tutulacak (available true ise)
  const isDownloaded = !!files[fileName]?.available;

  // Yeni: Sadece bu maile ait butonda etkileşim
  const isActive = !mailId || (selectedMail?.id === mailId);

  const handleDownload = () => {
    if (!isWificonnected || !isActive || isDownloaded) return; // Ek kontrol
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
    if (progress >= 100 && downloading && !cancelled && isActive) {

      // ÖZEL DURUM: sahtefatura dosyasıysa, virüslü olarak ekle
      if (fileName === "sahtefatura") {
        updateFileStatus("sahtefatura", {
          available: true,
        });
        failQuest("save_invoice");
      }

      // Dinamik dosya ekle!
      if (!files[fileName]) {
        addFile(fileName, {
          available: true,
          quarantined: false,
          clickable: true,
          infected: false,
          virusType: null,
          type: "pdf",
          size: `${(fileContent?.length || 1024) / 1024}KB`,
          location: "downloads",
          label: fileLabel || fileName,
          icon: "/icons/pdf.png",
          content: fileContent
            ? URL.createObjectURL(new Blob([fileContent], { type: "text/plain" }))
            : "",
        });
      } else {
        updateFileStatus(fileName, { available: true });
      }

      // Eğer Fatura PDF’si indirildiyse
      if ((fileName?.toLowerCase()?.includes('fatura') || fileLabel?.toLowerCase()?.includes('fatura'))) {
        addUploadTask({
          userId: 3,
          allowedTypes: ["pdf"],
          filterLabelContains: "fatura",
          buttonText: "Fatura Yükle"
        });
        completeQuest("save_invoice");
        addChatMessage(3, {
          sender: "them",
          text: "Merhaba, fatura belgenizi dosya olarak bize iletir misiniz? İnceleme için yükleme alanını kullanabilirsiniz.",
          senderName: "Satış Departmanı",
          time: gameDate.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          requestInvoice: true,
        }, true);
        setUserOptions(3, []);
      }

      setDownloading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);

      // İstersen dosyayı otomatik açabilirsin:
      // openFile(fileName, "doculite");
    }
  }, [progress, downloading, cancelled, isActive, fileName, fileContent, addFile, updateFileStatus, files, fileLabel]);

  return (
    <div className={styles.container}>
      {/* Dosya indirildiyse: buton tamamen pasifleşir, "İndirildi" gösterimi */}
      {isDownloaded ? (
        <div className={`${styles.attachmentBox} ${styles.wrapperWithBubble}`}>
          <div className={styles.successBubble}>✔ İndirildi</div>
          <span className={styles.downloadIcon}>📎</span>
          <span>{label}</span>
          <button
            className={styles.downloadAction}
            disabled
            style={{ opacity: 0.4, cursor: "not-allowed" }}
            title="Bu dosya zaten indirildi"
          >
            İndir
          </button>
        </div>
      ) : !downloading ? (
        <div className={`${styles.attachmentBox} ${styles.wrapperWithBubble}`}>
          {showSuccess && <div className={styles.successBubble}>✔ İndirildi</div>}
          {showCancelled && <div className={styles.cancelBubble}>❌ İptal Edildi</div>}
          <span className={styles.downloadIcon}>📎</span>
          <span>{label}</span>
          <button
            className={styles.downloadAction}
            onClick={handleDownload}
            disabled={!isWificonnected || !isActive || isDownloaded}
            title={
              !isWificonnected
                ? 'Wi-Fi bağlantısı yok'
                : !isActive
                ? 'Yanlış mail'
                : isDownloaded
                ? 'Bu dosya zaten indirildi'
                : ''
            }
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
