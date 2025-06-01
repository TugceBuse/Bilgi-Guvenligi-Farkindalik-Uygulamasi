import React, { useState, useRef } from 'react';
import styles from './OpenLitePDFApp.module.css';
import { MakeDraggable } from '../../utils/Draggable';
import { useUIContext } from '../../Contexts/UIContext';
import { useFileContext } from '../../Contexts/FileContext';
import { useGameContext } from '../../Contexts/GameContext';

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

const OpenLitePDFApp = ({ closeHandler, style }) => {
  const { openlitePermissions, setOpenlitePermissions } = useGameContext();
  const [page, setPage] = useState(openlitePermissions.permissionsOpened ? 'permissions' : 'viewer');
  const [search, setSearch] = useState('');
  const appRef = useRef(null);
  MakeDraggable(appRef, `.${styles.header}`);

  // Dosyalar FileContext'ten
  const { files, openFile } = useFileContext();

  // Sadece pdf ve uygun olanları filtrele
  const pdfFiles = Object.values(files).filter(
    file => file.type === "pdf" && file.available
  );

  const filtered = pdfFiles.filter(file =>
    file.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.appWindow} style={style} ref={appRef} data-window="openlitepdfviewer">
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <img src="/PDFViewer/pdf-logo-open.png" alt="OpenLite Icon" />
          <h2>OpenLite PDF</h2>
        </div>
        <button className={styles.closeButton} onClick={closeHandler}>×</button>
      </div>

      <div className={styles.body}>
        {page === 'permissions' ? (
          <div className={styles.permissionPage}>
            <h3>PDF Erişim İzinleri</h3>
            <form className={styles.permissionForm}>
              <label><input type="checkbox" checked disabled /> 📄 Dosya Görüntüleme Erişimi</label>
              <label><input type="checkbox" checked disabled /> 🖨 Yazdırma Erişimi</label>
              <label><input type="checkbox" checked /> ✏️ Not Alma Erişimi</label>
              <label>
                <input
                  type="checkbox"
                  checked={openlitePermissions.microphone}
                  onChange={(e) =>
                    setOpenlitePermissions(prev => ({ ...prev, microphone: e.target.checked }))
                  }
                /> 🎤 Ses Notu Eklenmesine İzin Ver
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={openlitePermissions.camera}
                  onChange={(e) =>
                    setOpenlitePermissions(prev => ({ ...prev, camera: e.target.checked }))
                  }
                /> 📷 Belge Tarama Özelliği (Kamera Erişimi)
              </label>
            </form>
            <button className={styles.continueBtn} onClick={() => {
              setOpenlitePermissions(prev => ({ ...prev, permissionsOpened: false }));
              setPage('viewer');
            }}>
              Devam Et
            </button>
          </div>
        ) : (
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
                {filtered.map((file) => {
                  // files objesindeki key'i bul
                  const fileKey = Object.keys(files).find(key => files[key] === file);
                  return (
                    <div
                      key={file.label}
                      className={styles.item}
                      onClick={() => openFile(fileKey, "openlite")}
                    >
                      <img src="/PDFViewer/pdf-format-open.png" alt="PDF" />
                      <div>
                        <div className={styles.filename}>{file.label}</div>
                        <div className={styles.meta}>{file.size} • {file.modified}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OpenLitePDFApp;
