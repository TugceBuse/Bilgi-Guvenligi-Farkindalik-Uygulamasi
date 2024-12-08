import React, { useState, useRef } from 'react';
import './Scanner.css';
import { MakeDraggable } from '../Draggable';
import { useGameContext } from '../Context';
import QrScanner from "react-qr-scanner";


export const useScanner = () => {
    const { toggleWindow, setActiveWindow } = useGameContext();
    

    const openScanner = () => {
        toggleWindow('scanner');
    };
    
    const closeScanner = () => {
        toggleWindow('scanner');
    };
    
    return { openScanner, closeScanner };
    }

const Scanner = ({ closeScanner, style }) => {

    const ScannerRef = useRef(null);
    MakeDraggable(ScannerRef, '.scanner-header');

    const [scanResult, setScanResult] = useState("");
    const [showScanner, setShowScanner] = useState(false);
  
    const handleScan = (data) => {
      if (data) {
        setScanResult(data);
        setShowScanner(false);
      }
    };
  
    const handleError = (err) => {
      console.error(err);
    };
  
    const handleScanButtonClick = () => {
      setShowScanner(true);
    };

    return (
        <div className="scanner-window" style={style} ref={ScannerRef}>
            <div className="scanner-header">
                <h2>QR Scanner</h2>
                <button className="scanner-close" onClick={closeScanner}>×</button>
            </div>

            <div className="scanner-container">
      <button className="scan-button" onClick={handleScanButtonClick}>
        QR Kod Tarayıcıyı Aç
      </button>
      {showScanner && (
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%", height: "50%" }}
        />
      )}
      {scanResult && (
        <div className="scan-result">
          <h3>Tarama Sonucu:</h3>
          <p>{scanResult}</p>
        </div>
      )}
    </div>
        </div>
    );

}

export default Scanner;