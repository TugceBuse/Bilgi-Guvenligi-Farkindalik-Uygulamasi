import React from 'react';
import './Container.css';
import { useState } from 'react';

const Desktop = () => {

  const [openWindow, setOpenWindow] = useState(null);

  const handleIconClick = (windowName) => {
    setOpenWindow(windowName);
  }
  

  return (

    <div className="desktop">
      {/* Masaüstü Arka Planı */}
        <div className="desktop-icons">
          {/* Masaüstü simgeleri */}
          <div className="icon">
            <img src="https://img.icons8.com/fluency/48/000000/folder-invoices.png" alt="Folder Icon" />
            <span>My Documents</span>
          </div>
          <div className="icon" onClick={() => handleIconClick('recycleBin')}>
            <img src="https://img.icons8.com/fluency/48/000000/recycle-bin.png" alt="Recycle Bin Icon" />
            <span>Recycle Bin</span>
          </div>
        </div>

        
        {openWindow === 'recycleBin' && (
        <div className="window">
          <h2>Recycle Bin</h2>
          <button onClick={() => setOpenWindow(null)}>Close</button>

          <div className="window-content">
            {/* Geri dönüşüm kutusu içeriği */}
            <p>Here is the content of the Recycle Bin.</p>
          </div>    
        </div>
      )}
    </div>
  );
};

export default Desktop;
