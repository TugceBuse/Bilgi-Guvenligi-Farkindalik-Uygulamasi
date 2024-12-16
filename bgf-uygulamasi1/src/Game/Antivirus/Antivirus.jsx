import React, { useState, useRef } from 'react';
import './Antivirus.css';
import { MakeDraggable } from '../Draggable';
import { useUIContext } from '../Contexts/UIContext';



export const useAntivirus = () => {
    const { toggleWindow } = useUIContext();
    

    const openHandler = () => {
        toggleWindow('antivirus');
    };
    
    const closeHandler = () => {
        toggleWindow('antivirus');
    };
    
    return { openHandler, closeHandler };
    }

    const Antivirus = ({ closeHandler, style }) => {
        const antivirusRef = useRef(null);
        MakeDraggable(antivirusRef, '.antivirus-header');


        const [isScanning, setIsScanning] = useState(false);
        const [isAntivirusOn, setIsAntivirusOn] = useState(true);
      
        const handleScanClick = () => {
          setIsScanning(true);
          setTimeout(() => {
            setIsScanning(false);
            alert("Tarama tamamlandı. Herhangi bir tehdit bulunamadı.");
          }, 5000); // 5 saniyelik tarama süresi
        };
      
        const handleToggleAntivirus = () => {
          setIsAntivirusOn(!isAntivirusOn);
        };
      
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
               <h2>Shield Secure Antivirus, bilgisayarınızı güvende tutmak için geliştirilmiş bir antivirüs programıdır.</h2>
               <h3>Bilgisayarınızı tarayarak zararlı yazılımları tespit eder ve sizi korur.</h3>
               <h4>Tarayın, Güvende Kalın!</h4>
              <div className="antivirus-controls">
                <button onClick={handleScanClick} disabled={isScanning}>
                  
                  
                  <img src="/icons/scanner.png" alt="Scanner Icon" />
                  
                  <span class="now">ŞİMDİ!</span>
                  <span class="play">Taramayı başlat</span>
                  {isScanning ? "Tarama Yapılıyor..." : ""}
                </button>
                <button onClick={handleToggleAntivirus}>
                  {isAntivirusOn ? "Antivirüsü Kapat" : "Antivirüsü Aç"}
                  <input
                    type="checkbox"
                    checked={isAntivirusOn}
                    onChange={handleToggleAntivirus}
                  />
                </button>
              </div>
              {isScanning && <div className="antivirus-scan-progress">Tarama Yapılıyor...</div>}
            </div>
          </div>
        );
      };

export default Antivirus;