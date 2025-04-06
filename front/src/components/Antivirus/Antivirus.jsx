import React, { useState, useRef, useEffect } from 'react';
import './Antivirus.css';
import { MakeDraggable } from '../../utils/Draggable';
import { useUIContext } from '../../Contexts/UIContext';
import { useVirusContext } from '../../Contexts/VirusContext';
import { useFileContext } from '../../Contexts/FileContext';

const icons = [
  "/icons/folder-home.png",
  "/icons/gallery.png",
  "/icons/desktop.png",
  "/icons/download.png",
  "/icons/docs.png",
  "/icons/picture.png",
  "/icons/music-player.png",
  "/icons/video.png",
  "/icons/computer.png",
  "/icons/network.png"
];

export const useAntivirus = () => {
  const { toggleWindow } = useUIContext();
  return {
    openHandler: () => toggleWindow('antivirus'),
    closeHandler: () => toggleWindow('antivirus')
  };
};

const Antivirus = ({ closeHandler, style }) => {
  const antivirusRef = useRef(null);
  MakeDraggable(antivirusRef, '.antivirus-header');

  const [isScanning, setIsScanning] = useState(false);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [quarantinedFiles, setQuarantinedFiles] = useState([]);
  const [activeTab, setActiveTab] = useState("home");

  const { viruses, removeVirus, scanLogs, setScanLogs, isantivirusOn, setIsAntivirusOn } = useVirusContext();
  const { files, updateFileStatus } = useFileContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScanClick = () => {
    setIsScanning(true);
    setScanComplete(false);
    setQuarantinedFiles([]);

    const now = new Date();
    const date = now.toLocaleDateString('tr-TR');
    const time = now.toLocaleTimeString('tr-TR');
    const scanDate = `${date} - ${time}`;

    setTimeout(() => {
      const detectableViruses = viruses.filter(v => v.detectable && v.sourcefile);
      const quarantined = [];

      detectableViruses.forEach(virus => {
        const fileKey = Object.keys(files).find(file => files[file].label.toLowerCase() === virus.sourcefile.toLowerCase());
        if (fileKey) {
          updateFileStatus(fileKey, {
            quarantined: true,
            available: false
          });
          quarantined.push({ fileName: fileKey, virusType: virus.type });
          removeVirus(virus.type);
        }
      });

      setIsScanning(false);
      setScanComplete(true);
      setQuarantinedFiles(quarantined);

      const resultLog = {
        date: scanDate,
        files: quarantined
      };

      setScanLogs(prev => [...prev, resultLog]);

      setTimeout(() => setScanComplete(false), 3000);
    }, 5000);
  };

  const handleToggleAntivirus = () => {
    setIsAntivirusOn(!isantivirusOn);
  };

  const handleDeleteFile = (fileName) => {
    updateFileStatus(fileName, { available: false, quarantined: false });
  };

  const handleRestoreFile = (fileName) => {
    updateFileStatus(fileName, { available: true, quarantined: false });
  };

  // 🔄 Tüm scanLogs içinden karantinaya alınmış ve hala karantinada olan dosyaları bul
  const allQuarantinedFromLogs = scanLogs
    .flatMap(log => log.files)
    .filter((value, index, self) =>
      index === self.findIndex(v => v.fileName === value.fileName)
    )
    .filter(file => files[file.fileName]?.quarantined);

  return (
    <div className="antivirus-window" style={style} ref={antivirusRef}>
      <div className="antivirus-header">
        <div className="antivirus-header-left">
          <img src="/icons/shieldSecure.png" alt="Antivirus Icon" />
          <h2>Shield Secure Antivirus</h2>
        </div>
        <button className="antivirus-close" onClick={closeHandler}>×</button>
      </div>

      <div className="antivirus-content">
        <div className="antivirus-menu">
          <button onClick={() => setActiveTab("home")}>Giriş</button>
          <button onClick={() => setActiveTab("scan")}>Tarama</button>
          <button onClick={() => setActiveTab("quarantine")}>Karantina</button>
          <button onClick={() => setActiveTab("settings")}>Ayarlar</button>
        </div>

        {activeTab === "home" && (
          <div className="antivirus-home">
            <h2>Shield Secure Antivirus'e Hoşgeldiniz!</h2>
            <p>Bu antivirüs bilgisayarınızı güvende tutar.</p>
            <h3>📜 Geçmiş Tarama Kayıtları:</h3>
            <div className="log-listbox">
              {scanLogs.length === 0 ? (
                <p>Henüz tarama yapılmadı.</p>
              ) : (
                <ul>
                  {scanLogs.map((log, index) => (
                    <li key={index}>
                      <strong>{log.date}</strong>
                      <ul>
                        {log.files.length === 0 ? (
                          <li>Herhangi bir tehdit bulunamadı.</li>
                        ) : (
                          log.files.map((file, i) => (
                            <li key={i}>
                              📄 <strong>{file.fileName}</strong> dosyasında <em>{file.virusType}</em> tespit edildi.
                            </li>
                          ))
                        )}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {activeTab === "scan" && (
          <div className="antivirus-scan">
            <h3>Bilgisayarınızı tarayın ve tehditleri bulun!</h3>
            <div className="antivirus-controls">
              <button onClick={handleScanClick} disabled={isScanning}>
                <img src="/icons/scanner.png" alt="Scanner Icon" />
                <span className="now">ŞİMDİ!</span>
                <span className="play">Taramayı başlat</span>
              </button>
            </div>

            {isScanning && (
              <div className="antivirus-scan-progress">
                <p>🌀 Tarama Yapılıyor...</p>
                <div className="antivirus-icons">
                  <img src={icons[currentIconIndex]} alt="Icon" />
                </div>
              </div>
            )}

            {scanComplete && quarantinedFiles.length === 0 && (
              <div className="antivirus-scan-complete success">
                <img src="/icons/security.png" alt="Security Icon" />
                <p>✅ Tarama tamamlandı. Herhangi bir tehdit bulunamadı.</p>
              </div>
            )}

            {scanComplete && quarantinedFiles.length > 0 && (
              <div className="antivirus-scan-complete warning">
                <img src="/icons/caution.png" alt="Caution Icon" />
                <p>Tarama tamamlandı. {quarantinedFiles.length} dosya karantinaya alındı:</p>
                <ul>
                  {quarantinedFiles.map(({ fileName, virusType }) => (
                    <li key={fileName}>
                      <strong>{fileName}</strong> — ({virusType})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === "quarantine" && (
          <div className="antivirus-quarantine">
            <h3>🛑 Karantinadaki Dosyalar</h3>
            {allQuarantinedFromLogs.length === 0 ? (
              <p>Şu anda karantinada dosya bulunmuyor.</p>
            ) : (
              allQuarantinedFromLogs.map(({ fileName, virusType }) => (
                <div key={fileName} className="quarantine-entry">
                  <strong>{fileName}</strong> — ({virusType})
                  <button onClick={() => {
                    handleDeleteFile(fileName);
                    setScanLogs([...scanLogs]); // Görünümü tetikle
                  }}>Sil</button>
                  <button onClick={() => {
                    handleRestoreFile(fileName);
                    setScanLogs([...scanLogs]); // Görünümü tetikle
                  }}>Karantinadan Çıkar</button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="antivirus-settings">
            <h3>⚙️ Ayarlar</h3>
            <label>
              Antivirüs Durumu:
              <input
                type="checkbox"
                checked={isantivirusOn}
                onChange={handleToggleAntivirus}
              />
              {isantivirusOn ? " Açık" : " Kapalı"}
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Antivirus;
