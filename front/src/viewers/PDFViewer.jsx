import React, { useRef, useState, useMemo } from "react";
import './PDFViewer.css';
import { useFileContext } from '../Contexts/FileContext';
import { MakeDraggable } from '../utils/Draggable';
import { useWindowConfig } from '../Contexts/WindowConfigContext';

const viewerDefs = [
  { key: "pdfviewer", theme: "doculite", label: "DocuLite PDF", icon: "/PDFViewer/pdf-file-format.png" },
  { key: "quickpdfviewer", theme: "quickpdf", label: "QuickPDF Viewer", icon: "/PDFViewer/pdf-file-format2.png" },
  { key: "openlitepdfviewer", theme: "openlite", label: "OpenLite PDF", icon: "/PDFViewer/pdf-format-open.png" },
];

const PdfViewer = ({ file, fileName, theme = "default" }) => {
  const { closeFile } = useFileContext();
  const { windowConfig } = useWindowConfig();
  const pdfRef = useRef(null);
  const [selectedTheme, setSelectedTheme] = useState(theme);

  MakeDraggable(pdfRef, '.pdf-viewer-header');

  const handleClose = () => closeFile(fileName);

  // Yüklü (available) viewerlara bak
  const availableViewers = useMemo(
    () => viewerDefs.filter(v => windowConfig[v.key]?.available),
    [windowConfig]
  );

  // 1. Theme doğrudan geldiyse veya sadece bir viewer varsa otomatik kullan
  React.useEffect(() => {
    if (theme !== "default") {
      setSelectedTheme(theme);
    } else if (availableViewers.length === 1) {
      setSelectedTheme(availableViewers[0].theme);
    }
  }, [theme, availableViewers]);

  // 2. Kullanıcı seçim yaptıysa theme güncellenir
  const handleViewerSelect = (theme) => {
    setSelectedTheme(theme);
  };

  // Eğer theme seçili değilse ve birden fazla viewer varsa seçim ekranı göster
  if (
    selectedTheme === "default" &&
    availableViewers.length > 1
  ) {
    return (
      <div className="pdf-viewer-select-modal">
        <div className="pdf-viewer-select-content">
          <h3>PDF dosyasını hangi uygulama ile açmak istersiniz?</h3>
          <div className="pdf-viewer-select-list">
            {availableViewers.map(v => (
              <button key={v.theme} className="pdf-viewer-select-btn" onClick={() => handleViewerSelect(v.theme)}>
                <img src={v.icon} alt={v.label} />
                <span>{v.label}</span>
              </button>
            ))}
          </div>
          <button className="close-btn" onClick={handleClose}>İptal</button>
        </div>
      </div>
    );
  }

  // Viewer seçilmemişse ve hiç viewer yoksa uyarı
  if (availableViewers.length === 0) {
    return (
      <div className="pdf-viewer-warning">
        <b>PDF görüntüleyici bulunamadı!</b><br />
        Bir PDF görüntüleyici yüklemeden bu dosyayı görüntüleyemezsiniz.
      </div>
    );
  }

  // Seçili theme'e göre ikon ve görsel
  const iconMap = {
    doculite: "/PDFViewer/pdf-file-format.png",
    quickpdf: "/PDFViewer/pdf-file-format2.png",
    openlite: "/PDFViewer/pdf-format-open.png",
    default: "/icons/pdf.png"
  };
  const iconSrc = iconMap[selectedTheme] || iconMap.default;

  const rootClass = `pdf-viewer-window theme-${selectedTheme}`;

  return (
    <div className={rootClass} ref={pdfRef} data-filename={fileName}>
      <div className="pdf-viewer-header">
        <div className="pdf-viewer-title">
          <img src={iconSrc} alt="PDF Icon" />
          <span>{file.label || "PDF Belgesi"}</span>
        </div>
        <button className="close-btn" onClick={handleClose}>×</button>
      </div>
      <div className="pdf-viewer-content" style={{ padding: 0 }}>
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
