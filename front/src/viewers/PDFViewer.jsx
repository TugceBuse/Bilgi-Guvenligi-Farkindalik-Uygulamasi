import React, { useRef } from "react";
import './PDFViewer.css';
import { useFileContext } from '../Contexts/FileContext';
import { MakeDraggable } from '../utils/Draggable';

const PdfViewer = ({ file, fileName, theme = "default" }) => {
  const { closeFile } = useFileContext();
  const pdfRef = useRef(null);
  const rootClass = `pdf-viewer-window theme-${theme}`;

  MakeDraggable(pdfRef, '.pdf-viewer-header');

  const handleClose = () => {
    closeFile(fileName);
  };

  const iconMap = {
    doculite: "/PDFViewer/pdf-file-format.png",
    quickpdf: "/PDFViewer/pdf-file-format2.png",
    openlite: "/PDFViewer/pdf-format-open.png",
    default: "/icons/pdf.png"
  };
  const iconSrc = iconMap[theme] || iconMap.default;

  return (
    <div className={rootClass} ref={pdfRef} data-filename={fileName}>
      <div className="pdf-viewer-header">
        <div className="pdf-viewer-title">
          <img src={iconSrc} alt="PDF Icon" />
          <span>{file.label || "PDF Belgesi"}</span>
        </div>
        <button className="close-btn" onClick={handleClose}>×</button>
      </div>
      <div className="pdf-viewer-content" style={{padding:0}}>
        <iframe
          src={file.content}
          title={file.label}
          width="100%"
          height="100%"
          style={{ minHeight: "480px", minWidth: "100%", border: "none" }}
        />
      </div>
    </div>
  );
};

export default PdfViewer;
