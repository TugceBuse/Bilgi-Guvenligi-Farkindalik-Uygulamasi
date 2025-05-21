import React, { useState, useRef } from 'react';
import styles from './QuickPDFViewApp.module.css';
import { MakeDraggable } from '../../utils/Draggable';
import { useUIContext } from '../../Contexts/UIContext';

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

const dummyFiles = [
  {
    name: 'Kişisel Kullanıcı Bilgileri.pdf',
    size: '740KB',
    modified: '12.05.2025',
    content: `
    NovaTech A.Ş. - Kişisel Kullanıcı Bilgileri

    👤 Ad Soyad: Onur Yıldız
    🆔 Çalışan ID: 487231
    💼 Departman: Bilgi Teknolojileri
    📧 Kurumsal E-posta: onur.yildiz@novatech.com
    📞 Dahili Numara: 2211
    🧑‍💻 Kullanıcı Adı: onur.yildiz
    🔑 Geçici Şifre: Nova_25xyz!

    Lütfen bu bilgileri sadece kurum içi sistemlerde kullanınız. Güvenliğiniz için şifreyi ilk oturum açma sonrası değiştirmeniz önerilir.
      `
  },
  {
    name: 'İş Sözleşmesi.pdf',
    size: '1.2MB',
    modified: '12.05.2025',
    content: `
    İŞ SÖZLEŞMESİ

    Bu sözleşme, işveren NovaTech A.Ş. ile çalışan Ahmet Yıldız arasında, 12 Mayıs 2025 tarihinde düzenlenmiştir.
    
    Çalışanın görev tanımı: Yazılım Geliştirici.
    Çalışma saatleri: Haftada 40 saat.
    Maaş: Aylık brüt 38.000 TL.
    Gizlilik ve veri güvenliği hükümleri işbu sözleşmenin ayrılmaz bir parçasıdır.
    `
  },
  {
    name: 'Gizlilik Politikası.pdf',
    size: '860KB',
    modified: '10.05.2025',
    content: `
    GİZLİLİK POLİTİKASI

    Bu belge, NovaTech uygulamaları ve servislerinde kullanıcı verilerinin nasıl toplandığını, saklandığını ve kullanıldığını açıklar.

    Toplanan veriler:
    - İsim, e-posta, IP adresi
    - Cihaz bilgileri ve kullanım istatistikleri

    Kullanıcıların verileri yalnızca hizmet kalitesini artırmak amacıyla işlenir.
    Veriler üçüncü kişilerle paylaşılmaz.
    `
  },
  {
    name: 'Personel El Kitabı.pdf',
    size: '2.1MB',
    modified: '09.05.2025',
    content: `
    PERSONEL EL KİTABI

    NovaTech çalışanlarının uyması gereken temel ilkeler:

    - Her zaman profesyonel ve etik davranış sergilenmelidir.
    - Şirket bilgileri gizli tutulmalıdır.
    - İşyerinde fiziksel ve dijital güvenlik kurallarına riayet edilmelidir.
    - Bilgi güvenliği ihlalleri derhal BT departmanına bildirilmelidir.

    Tüm personel, bu kuralları okumuş ve kabul etmiş sayılır.
    `
  }
];

const QuickPDFViewApp = ({ closeHandler, style }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [search, setSearch] = useState('');
  const appRef = useRef(null);
  MakeDraggable(appRef, `.${styles.header}`);

  const filtered = dummyFiles.filter(file =>
    file.name.toLowerCase().includes(search.toLowerCase())
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
              <div className={styles.empty}>Gösterilecek belge bulunamadı.</div>
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
              <button className={styles.toolButton}>⭐ Puanla</button>
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

export default QuickPDFViewApp;
