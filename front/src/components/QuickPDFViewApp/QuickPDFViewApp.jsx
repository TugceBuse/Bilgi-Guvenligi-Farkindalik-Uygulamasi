import React, { useState, useRef } from 'react';
import styles from './QuickPDFViewApp.module.css';
import { MakeDraggable } from '../../utils/Draggable';
import { useUIContext } from '../../Contexts/UIContext';
import { useFileContext } from '../../Contexts/FileContext';

export const useQuickPDFViewApp = () => {
  const { openWindow, closeWindow } = useUIContext();

  const openHandler = () => {
    openWindow('quickpdfviewer');
  };

  const closeHandler = () => {
    closeWindow('quickpdfviewer');
  };

  return { openHandler, closeHandler };
};

const QuickPDFViewApp = ({ closeHandler, style }) => {
  const [search, setSearch] = useState('');
  const appRef = useRef(null);
  MakeDraggable(appRef, `.${styles.header}`);

  const { files, openFile } = useFileContext();

  // files'tan pdf dosyalarını filtrele
  const pdfFiles = Object.values(files).filter(
    file => file.type === "pdf" && file.available
  );

  const filtered = pdfFiles.filter(file =>
    file.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.appWindow} style={style} ref={appRef} data-window="quickpdfviewer">
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <img src="/PDFViewer/pdf-logo.png" alt="QuickPDF Icon" />
          <h2>QuickPDF Viewer</h2>
        </div>
        <button className={styles.closeButton} onClick={closeHandler}>×</button>
      </div>

      <div className={styles.body}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Belge ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filtered.length === 0 ? (
          <div className={styles.empty}>Gösterilecek belge bulunamadı.</div>
        ) : (
          <div className={styles.list}>
            {filtered.map((file, index) => {
              // files objesindeki key'i bul
              const fileKey = Object.keys(files).find(key => files[key] === file);
              return (
                <div
                  key={file.label}
                  className={styles.item}
                  onClick={() => openFile(fileKey, "quickpdf")}
                >
                  <img src="/PDFViewer/pdf-file-format2.png" alt="PDF" />
                  <div>
                    <div className={styles.filename}>{file.label}</div>
                    <div className={styles.meta}>{file.size} • {file.modified}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickPDFViewApp;
