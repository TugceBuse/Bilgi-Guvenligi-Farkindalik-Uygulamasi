// components/Viruses/RansomwareHash.jsx
import React, { useEffect, useState } from 'react';
import styles from './RansomwareHash.module.css';
import { useFileContext } from '../../Contexts/FileContext';
import { useUIContext } from '../../Contexts/UIContext';

const RansomwareHash = (style) => {
  const { files, updateFileStatus } = useFileContext();
  const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        // 🔒 Dosyaları şifrele
        Object.keys(files).forEach(fileName => {
        const file = files[fileName];
        if (file.available && !file.locked && !file.quarantined) {
            updateFileStatus(fileName, {
            locked: true,
            infected: true,
            virusType: "ransomwareHash",
            label: `encrypted_${file.label}`
            });
        }
        });

        // ⏱ 3 saniye sonra popup göster
        const timeout = setTimeout(() => {
        setShowPopup(true);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    if (!showPopup) return null;

    return (
        <div className={styles.popupWrapper}>
        <h2 className={styles.title}>💀 Dosyalarınız Şifrelendi!</h2>
        <p className={styles.message}>
            Tüm dosyalarınız <span className={styles.highlight}>SHA-256 algoritması</span> ile kilitlendi.<br /><br />
            <b>Geri almak için:</b>
            <ul>
            <li>300₺ değerinde hediye kartı satın alın</li>
            <li>Kodu şu adrese gönderin: <span className={styles.highlight}>decrypt@teehdeppo-pay.com</span></li>
            </ul>
            <div className={styles.example}>📎 Örnek dosya: <i>encrypted_OfisNotları.txt</i></div>
        </p>
        </div>
    );
};

export default RansomwareHash;
