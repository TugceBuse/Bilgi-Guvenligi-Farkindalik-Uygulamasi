import React, { useEffect, useState, useRef } from 'react';
import { useFileContext } from '../Contexts/FileContext'
import './DocxViewer.css';
import { MakeDraggable } from '../utils/Draggable';

const DocxViewer = ({ file, fileName }) => {
  const { closeFile } = useFileContext();
  const [content, setContent] = useState("Yükleniyor...");
  const docxRef = useRef(null);

  MakeDraggable(docxRef, '.docx-viewer-header');

  

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(file.content); // içerik URL'den geliyor
        const text = await res.text();
        setContent(text);
      } catch (err) {
        setContent("❌ Dosya içeriği yüklenemedi.");
      }
    };

    fetchContent();
  }, [file]);

  const handleClose = () => {
    closeFile(fileName);
  };

  return (
    <div className="docx-viewer-window" data-filename={fileName} ref={docxRef}>
      <div className="docx-viewer-header">
        <div className="docx-viewer-title">
            <div className="docx-viewer-icon">
                <img src="/icons/docx.png" alt="Doc Icon" />
                <img src="/icons/txt.png" alt="txt Icon" />
            </div>
            <span>{file.label || 'Doküman'}</span>
        </div>
        <button className="close-btn" onClick={handleClose}>×</button>
      </div>

      <div className="docx-viewer-content">
        <pre className="docx-text">{content}</pre>
      </div>
    </div>
  );
};

export default DocxViewer;
