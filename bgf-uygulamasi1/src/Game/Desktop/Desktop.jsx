import React from 'react';
import './Desktop.css';
import { useState } from 'react';
import Mailbox from '../Mailbox/Mailbox';

const Container = () => {

  //recycleBin penceresini açmak için state tanımladık
  const [openWindow, setOpenWindow] = useState(null);
  const handleIconClick = (windowName) => {
    setOpenWindow(windowName);
  }
  //////////////////////////////////////////////

  //Mail kutusu açma işlemleri
  const [isMailboxOpen, setIsMailboxOpen] = useState(false);
  //seçilen maili ve indexi tutacak state'ler
  const [selectedMail, setSelectedMail] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const mails = [
    {Name:'Ahmet Karaköse', from:'Ahmet@gmail.com', title: 'Mail1', content: 'Mail1 content' },
    {Name:'Tuce ergun', from:'Tuce@gmail.com', title: 'Mail2', content: 'Mail2 content' },
    {Name:'Onur yildiz', from:'Onur@gmail.com', title: 'Mail3', content: 'Mail3 content' },
  ];

  const handleMailClick = (mail,index) => {
    setSelectedMail(mail);
    setActiveIndex(index);
  };

  const openMailbox = () => {
    setIsMailboxOpen(true);
  };

  const closeMailbox = () => {
    setSelectedMail(null);
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
      {isMailboxOpen && (
        <Mailbox
          mails={mails}
          selectedMail={selectedMail}
          activeIndex={activeIndex}
          handleMailClick={handleMailClick}
          closeMailbox={closeMailbox}
        />
      )}



    </div>);
};

export default Container;
