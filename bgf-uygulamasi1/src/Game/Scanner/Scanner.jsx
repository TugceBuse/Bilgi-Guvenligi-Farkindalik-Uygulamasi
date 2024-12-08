import React, { useState, useRef } from 'react';
import './Scanner.css';
import { MakeDraggable } from '../Draggable';
import { useGameContext } from '../Context';



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

    const [dimScreen, setDimScreen] = useState(false);

    const handleScanButtonClick = () => {
        setDimScreen(true);
      };

    return (
        <div className="scanner-window" style={style} ref={ScannerRef}>
            <div className="scanner-header">
                <h2>QR Scanner</h2>
                <button className="scanner-close" onClick={closeScanner}>×</button>
            </div>

            <div className={`scanner-container`}>
                <button className="scan-button" onClick={handleScanButtonClick}>
                    QR Kod Tarayıcıyı Aç
                </button>
            </div>

            <div className={`scanning ${dimScreen ? "dimmed" : ""}`}></div>
        </div>
    );

}

export default Scanner;