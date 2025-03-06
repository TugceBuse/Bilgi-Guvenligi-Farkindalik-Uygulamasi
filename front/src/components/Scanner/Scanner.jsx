import React, { useState, useRef, useEffect } from 'react';
import './Scanner.css';
import { MakeDraggable } from '../../utils/Draggable';
import { useUIContext } from '../../Contexts/UIContext';



export const useScanner = () => {
    const { toggleWindow } = useUIContext();
    

    const openHandler = () => {
        toggleWindow('scanner');
    };
    
    const closeHandler = () => {
        toggleWindow('scanner');
    };
    
    return { openHandler, closeHandler };
    }

const Scanner = ({ closeHandler, style }) => {

    const ScannerRef = useRef(null);
    MakeDraggable(ScannerRef, '.scanner-header');

    const [dimScreen, setDimScreen] = useState(false);

    const handleScanButtonClick = () => {
        setDimScreen(true);
      };

      useEffect(() => {
        const cursor = document.querySelector('.cursor');
      
        const handleMouseMove = (e) => {
          if (cursor) {
            cursor.style.left = `${e.clientX - cursor.offsetWidth / 2}px`;
            cursor.style.top = `${e.clientY - cursor.offsetHeight / 2}px`;
          }
        };
      
        document.addEventListener('mousemove', handleMouseMove);
      
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
        };
      }, []);
    return (
        <div className="scanner-window" style={style} ref={ScannerRef}>
            <div className="cursor"></div>
            <div className="scanner-header">
                <h2>QR Scanner</h2>
                <button className="scanner-close" onClick={closeHandler}>×</button>
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