import React from 'react';
import './Container.css';
import { useState } from 'react';

const Container = () => {

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
      {isMailboxOpen && (
      <div className="mailbox-window">
        
          <div className="mailbox-header">
            <h2>Mailbox</h2>
              <button className="mailbox-close" onClick={closeMailbox}>×</button>
          </div>
          {/* headerden sonra soldan sağa dizilen iç pencere */}
        <div className="mailbox-inwindow">

          <div className="mailbox-menu">
            <ul>
              <li className="active">Inbox</li>
              <li>Sent</li>
            </ul>
          </div>
          {/* vvvvvvvvvvvvv mail listesi vvvvvvvvvvvvv
           - Mailler dinamik eklenebilir hale gelmeli
           - bir maile tıklandığında içeriği mailbox-mailcontent e gelmeli
         */}
          <div className="mailbox-mails">
            <ul className="mailbox-maillist">
              <li className="active">
                <h3>Mail1</h3>
                <p>Mail1 content</p>
              </li>
              <li>
                <h3>Mail2</h3>
                <p>Mail2 content</p>
              </li>
              <li>
                <h3>Mail3</h3>
                <p>Mail3 content</p>
              </li>
            </ul>
          </div>

            {/* mail içeriği --> Bu kısma Header falan eklenerek
            mailin kimden ne zaman geldiği tarzında bilgiler eklenmeli */}
            <div className="mailbox-mailcontent">
              
            </div>

        </div>
          
        
      </div>

      )}



    </div>
  );
};

export default Container;
