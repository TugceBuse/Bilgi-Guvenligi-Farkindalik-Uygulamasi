import React from 'react';
import './Desktop.css';
import { useState } from 'react';
import Mailbox from '../Mailbox/Mailbox';

const Desktop = () => {

  //recycleBin penceresini açmak için state tanımladık
  const [openWindow, setOpenWindow] = useState(null);
  const handleIconClick = (windowName) => {
    setOpenWindow(windowName);
  }
  //////////////////////////////////////////////

  //Mail kutusu açma işlemleri
  const [isMailboxOpen, setIsMailboxOpen] = useState(false);
  

  const openMailbox = () => {
    setIsMailboxOpen(true);
  };

  const closeMailbox = () => {
    setIsMailboxOpen(false);
  };
  //////////////////////////////////////////////

  

  return (

    <div className="desktop">

      {/* Masaüstü Arka Planı */}
        <div className="desktop-icons">
          {/* Masaüstü simgeleri */}
          <div className="icon">
            <img src="/icons/folder-invoices.png" alt="Folder Icon" />
            <span>My Documents</span>
          </div>

          <div className="icon" onClick={openMailbox}>
            <img src="/icons/mail.png" alt="Mail Icon" />
            <span>Mail</span>
          </div>

          <div className="icon" onClick={() => handleIconClick('recycleBin')}>
            <img src="/icons/recycle-bin.png" alt="Recycle Bin Icon" />
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

      {/* Mailbox penceresi */}
      {isMailboxOpen && ( <Mailbox closeMailbox={closeMailbox}/> )}

    </div>);
};

export default Desktop;
