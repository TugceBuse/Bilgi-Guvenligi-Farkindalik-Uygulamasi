import React, { useState, useRef } from 'react';
import styles from './DocuLiteApp.module.css';
import { MakeDraggable } from '../../utils/Draggable';
import { useUIContext } from '../../Contexts/UIContext';
import { useFileContext } from '../../Contexts/FileContext';

export const useDocuLiteApp = () => {
  const { openWindow, closeWindow } = useUIContext();

  const openHandler = () => {
    openWindow('pdfviewer');
  };

  const closeHandler = () => {
    closeWindow('pdfviewer');
  };

  return { openHandler, closeHandler };
};

const DocuLiteApp = ({ closeHandler, style }) => {
  const [filter, setFilter] = useState('');
  const appRef = useRef(null);
  MakeDraggable(appRef, `.${styles.header}`);

  const { files, openFile } = useFileContext();

  const pdfFiles = Object.values(files).filter(
    file => file.type === "pdf" && file.available
  );

  const filteredPDFs = pdfFiles.filter(pdf =>
    pdf.label.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.appWindow} style={style} ref={appRef} data-window="pdfviewer">
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <img src="/PDFViewer/pdf.png" alt="PDF Icon"/>
          <h2>DocuLite PDF Viewer</h2>
        </div>
        <button className={styles.closeButton} onClick={closeHandler}>×</button>
      </div>
      <div className={styles.body}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="PDF ara..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {filteredPDFs.length === 0 ? (
          <div className={styles.empty}>Hiçbir PDF bulunamadı.</div>
        ) : (
          <div className={styles.list}>
            {filteredPDFs.map((pdf) => {
              const fileKey = Object.keys(files).find(key => files[key] === pdf);
              return (
                <div
                  key={pdf.label}
                  className={styles.item}
                  onClick={() => openFile(fileKey, "doculite")}
                >
                  <img src={"/PDFViewer/pdf-file-format.png"} alt="PDF Icon" />
                  <div>
                    <div className={styles.filename}>{pdf.label}</div>
                    <div className={styles.meta}>{pdf.size} • {pdf.modified}</div>
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

export default DocuLiteApp;
