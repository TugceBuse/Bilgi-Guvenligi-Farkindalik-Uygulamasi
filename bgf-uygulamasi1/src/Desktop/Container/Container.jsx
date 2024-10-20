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
      <div className="mailbox-window">
        
          <div className="mailbox-header">
            <h2>Mailbox</h2>
              <button className="mailbox-close" onClick={closeMailbox}>×</button>
          </div>
          {/* headerden sonra soldan sağa dizilen iç pencere */}
        <div className="mailbox-inwindow">

          <div className="mailbox-sidebar">
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
          {mails.map((mail, index) => (
            <li key={index} onClick={() => handleMailClick(mail,index)}
            className={activeIndex === index ? 'active' : ''}
            >
              <h3>{mail.title}</h3>
              <p>{mail.content}</p>
            </li>
          ))}
          </ul>
          </div>

            {/* mail içeriği --> Bu kısma Header falan eklenerek
            mailin kimden ne zaman geldiği tarzında bilgiler eklenmeli */}
            <div className="mailbox-mailcontent">
            {selectedMail ? (
            <div className="mailbox-mailcontentheader">
              <h3>{selectedMail?.Name}</h3>
              <h3>&lt;{selectedMail?.from}&gt;</h3>
            </div>
            ) : (
              <h3>No mail selected</h3>
            )}
              {selectedMail ? (
              <div className="mailbox-mailcontenttext">
                <h2>{selectedMail.title}</h2>
                <p>{selectedMail.content}</p>
              </div>
              ) : (
                <p>No mail selected</p>
              )}
           </div>

        </div>
          
        


      </div>)}



    </div>);
};

export default Container;
