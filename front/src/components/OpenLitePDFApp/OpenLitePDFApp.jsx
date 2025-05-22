import React, { useState, useRef } from 'react';
import styles from './OpenLitePDFApp.module.css';
import { MakeDraggable } from '../../utils/Draggable';
import { useUIContext } from '../../Contexts/UIContext';

export const useOpenLitePDFApp = () => {
  const { openWindow, closeWindow } = useUIContext();

  const openHandler = () => {
    openWindow('openlitepdfviewer');
  };

  const closeHandler = () => {
    closeWindow('openlitepdfviewer');
  };

  return { openHandler, closeHandler };
};

const dummyFiles = [
  {
    name: 'Yeni Çalışan Giriş Rehberi.pdf',
    size: '610KB',
    modified: '13.05.2025',
    content: `
    HOŞ GELDİNİZ!

    📌 İlk Gün Kontrolleri
    ✅ Hesap bilgileri ve e-posta kurulumu
    ✅ Güvenlik politikası okundu
    ✅ VPN bağlantısı sağlandı

    Lütfen şifrelerinizi kimseyle paylaşmayın.
    `
  },
  {
    name: 'Erişim Protokolleri.pdf',
    size: '1.0MB',
    modified: '12.05.2025',
    content: `
    GİZLİ ERİŞİM PROTOKOLLERİ

    - VPN Kullanımı
    - Çok Faktörlü Doğrulama
    - Şifre Yedekleme ve Güvenlik Kuralları
    `
  },
  {
    name: 'Bilgi Güvenliği Talimatı.pdf',
    size: '890KB',
    modified: '10.05.2025',
    content: `
    🔐 GÜVENLİK TALİMATLARI

    - Dış USB kullanımı yasaktır.
    - Kötü amaçlı yazılım tespiti için antivirüs yüklenmelidir.
    - E-postalardaki ekler açılmadan önce kontrol edilmelidir.
    `
  }
];

const OpenLitePDFApp = ({ closeHandler, style }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [search, setSearch] = useState('');
  const appRef = useRef(null);
  MakeDraggable(appRef, `.${styles.header}`);

  const filtered = dummyFiles.filter(file =>
    file.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.appWindow} style={style} ref={appRef} data-window="openlitepdfviewer">
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <img src="/PDFViewer/openlite-logo.png" alt="OpenLite Icon" />
          <h2>OpenLite PDF</h2>
        </div>
        <button className={styles.closeButton} onClick={closeHandler}>×</button>
      </div>

      <div className={styles.body}>
        {!selectedFile && (
          <>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Belge ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {filtered.length === 0 ? (
              <div className={styles.empty}>Hiçbir belge bulunamadı.</div>
            ) : (
              <div className={styles.list}>
                {filtered.map((file, index) => (
                  <div key={index} className={styles.item} onClick={() => setSelectedFile(file)}>
                    <img src="/PDFViewer/pdf-file-format2.png" alt="PDF" />
                    <div>
                      <div className={styles.filename}>{file.name}</div>
                      <div className={styles.meta}>{file.size} • {file.modified}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {selectedFile && (
          <div className={styles.viewer}>
            <div className={styles.fakeToolbar}>
              <button onClick={() => setSelectedFile(null)} className={styles.backButton}>← Geri</button>
              <button className={styles.toolButton}>%100</button>
              <button className={styles.toolButton}>🖨 Yazdır</button>
              <button className={styles.toolButton}>✏️ Not Al</button>
            </div>
            <div className={styles.viewerHeader}>
              <span>{selectedFile.name}</span>
            </div>
            <div className={styles.fakePreview}>
              <div>{selectedFile.content}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenLitePDFApp;
