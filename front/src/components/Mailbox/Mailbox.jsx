import './Mailbox.css';
import React, { useRef, useEffect, useState } from 'react';
import { MakeDraggable } from '../../utils/Draggable';
import { useUIContext } from '../../Contexts/UIContext';
import { useMailContext } from '../../Contexts/MailContext';
import { useGameContext } from '../../Contexts/GameContext';
import { resetScroll } from '../../utils/resetScroll';
import { useNotificationContext } from '../../Contexts/NotificationContext';

export const useMailbox = () => {
  const { openWindow, closeWindow } = useUIContext();

  const openHandler = () => openWindow('mailbox');
  const closeHandler = () => closeWindow('mailbox');

  return { openHandler, closeHandler };
};

const Mailbox = ({ closeHandler, style }) => {
  const mailboxRef = useRef(null);
  MakeDraggable(mailboxRef, '.mailbox-header');

  const [activeTab, setActiveTab] = useState('inbox');
  const [showSpamMenu, setShowSpamMenu] = useState(false);
  
  const { removeNotification } = useNotificationContext();
  // Context
  const {
    inboxMails, setInboxMails,
    initsentMails,
    spamboxMails, setSpamboxMails,
    selectedMail, setSelectedMail,
  } = useMailContext();

  const { isWificonnected } = useGameContext();
  const contentRef = useRef(null);

  // Okunmamış mail sayısı
  const unreadCountMail = inboxMails.filter(mail => !mail.readMail).length;
  const unreadCountSpam = spamboxMails.filter(mail => !mail.readMail).length;

  // Scroll reset
  useEffect(() => {
    if (selectedMail) resetScroll(contentRef);
  }, [selectedMail]);

  const handleMailClick = (mail) => {
    if (!isWificonnected) return;
    setSelectedMail(mail);

    // Okundu olarak işaretle ve bildirimi kaldır
    if (activeTab === "inbox") {
      setInboxMails(prev =>
        prev.map(m =>
          m.id === mail.id ? { ...m, readMail: true } : m
        )
      );
      removeNotification(mail.id); // okunduysa bildirimi kaldır
    } else if (activeTab === "spam") {
      setSpamboxMails(prev =>
        prev.map(m =>
          m.id === mail.id ? { ...m, readMail: true } : m
        )
      );
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSelectedMail(null);
  };

  // Okunma durumunu sıfırla (geliştirici aracı)
  const resetReadMails = () => {
    setInboxMails(prev => prev.map(m => ({ ...m, readMail: false })));
  };

  return (
    <div className="mailbox-window" style={style} ref={mailboxRef} data-window="mailbox" >
      <div className="mailbox-header">
        <div className='mailbox-header-left'>
          <img className="menu-icon" src="./icons/menu.png" alt="Menu Icon"/>
          <img className="search-icon" src="./icons/search.png" alt="Search Icon"/>
          <input type="text" placeholder=" Ara" />
          <img src="./icons/undo.png" alt="Undo Icon"/>
          <img src="./icons/undo-all.png" alt="Undo-All Icon"/>
          <img src="./icons/next.png" alt="Right-Arrow Icon"/>
        </div>
        <button className="mailbox-close" onClick={closeHandler}>×</button>
      </div>

      <div className="mailbox-inwindow">
        <div className="mailbox-sidebar">
          <ul>
            <li
              className={activeTab === 'inbox' ? 'active' : ''}
              onClick={() => handleTabClick('inbox')}
            >
              <img className="is-icon" src="./icons/inbox.png" alt="Inbox Icon"/>  Inbox
              <div className="number-of-mails">{unreadCountMail}</div>
            </li>
            <li
              className={activeTab === 'spam' ? 'active' : ''}
              onClick={() => handleTabClick('spam')}
            >
              <img className="is-icon" src="./icons/spam.png" alt="Spam Icon"/>Spam
              <div className="number-of-mails">{unreadCountSpam}</div>
            </li>
            <li
              className={activeTab === 'sent' ? 'active' : ''}
              onClick={() => handleTabClick('sent')}
            >
              <img className="is-icon" src="./icons/sent.png" alt="Sent Icon"/>Sent
            </li>
            <div style={{display:"flex", flexDirection:"column", padding: 10, gap:10, marginTop: 50, opacity:0.7}}>
              <span>
                <img className="is-icon" src="./icons/junk-mail.png" alt="Junk Mail Icon"/>Junk Mail
              </span>
              <span>
                <img className="is-icon" src="./icons/draft.png" alt="Draft Icon"/>Drafts
              </span>
              <span>
                <img className="is-icon" src="./icons/remove.png" alt="Remove Icon"/>Deleted Items
              </span>
              <span>
                <img className="is-icon" src="./icons/inbox (2).png" alt="Archive Icon"/>Archives
              </span>
              <span>
                <img className="is-icon" src="./icons/writing.png" alt="Writing Icon"/>Notes
              </span>
            </div>
          </ul>
        </div>

        {/* mail listesi */}
        <div className="mailbox-mails">
          <div style={{display:"flex", flexDirection:"column"}}>
            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
            <button
              style={{width:200, height:20, alignSelf:"center", backgroundColor:"rgb(255, 242, 225)", color:"black", border:"none", borderRadius:10, cursor:"pointer",}}
              onClick={resetReadMails}
            >
              Okunma Durumunu Sıfırla
            </button>
          </div>

          <ul className="mailbox-maillist">
            {activeTab === 'inbox' &&
              inboxMails.slice().reverse().map((mail) => (
                <li
                  key={mail.id}
                  onClick={() => handleMailClick(mail)}
                  className={selectedMail?.id === mail.id ? 'active' : ''}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    {!mail.readMail && <div className="dot"></div>}
                    <h3>{mail.title}</h3>
                  </div>
                  <p>
                    {mail.precontent.length > 50
                      ? `${mail.precontent.slice(0, 50)}...`
                      : mail.precontent}
                  </p>
                </li>
              ))
            }
            {activeTab === 'sent' &&
              initsentMails.map((mail) => (
                <li
                  key={mail.id}
                  onClick={() => handleMailClick(mail)}
                  className={selectedMail?.id === mail.id ? 'active' : ''}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <h3>{mail.title}</h3>
                  </div>
                  <p>
                    {mail.precontent.length > 50
                      ? `${mail.precontent.slice(0, 50)}...`
                      : mail.precontent}
                  </p>
                </li>
              ))
            }
            {activeTab === 'spam' &&
              spamboxMails.slice().reverse().map((mail) => (
                <li
                  key={mail.id}
                  onClick={() => handleMailClick(mail)}
                  className={selectedMail?.id === mail.id ? 'active' : ''}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    {!mail.readMail && <div className="dot"></div>}
                    <h3>{mail.title}</h3>
                  </div>
                  <p>
                    {mail.precontent.length > 50
                      ? `${mail.precontent.slice(0, 50)}...`
                      : mail.precontent}
                  </p>
                </li>
              ))
            }
          </ul>
        </div>

        {/* mail içeriği */}
        <div className="mailbox-mailcontent" ref={contentRef}>
          {selectedMail ? (
            <>
              <div className="mailbox-mailcontentheader">
                <img src="./icons/user (2).png" alt="Mail Pic" className="mail-image"/>
                <div style={{display:"flex", flexDirection:"column", gap:10}}>
                  <h3>{selectedMail?.title}</h3>
                  <h3>&lt;{selectedMail?.from}&gt;</h3>
                  <h3 style={{paddingTop:8}}>Bugün</h3>
                </div>
                <div className="mailbox-mailcontentheader-rightBox">
                  <img src="./icons/undo.png" alt="Undo Icon"/>
                  <img src="./icons/undo-all.png" alt="Undo-All Icon"/>
                  <img src="./icons/next.png" alt="Right-Arrow Icon"/>
                  {activeTab === 'inbox' && (
                    <>
                      <span onClick={() => setShowSpamMenu(prev => !prev)} style={{ cursor: 'pointer' }}>...</span>
                      {showSpamMenu && (
                        <div style={{
                          position: 'absolute',
                          top: '100%',
                          right: 0,
                          background: 'white',
                          color: 'black',
                          border: '1px solid gray',
                          padding: '5px 10px',
                          borderRadius: '5px',
                          zIndex: 999
                        }}>
                          <button
                            onClick={() => {
                              if (selectedMail) {
                                setInboxMails(prev => prev.filter(mail => mail.id !== selectedMail.id));
                                setSpamboxMails(prev => [...prev, { ...selectedMail, readMail: true }]);
                                setSelectedMail(null);
                              }
                              setShowSpamMenu(false);
                            }}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'black' }}
                          >
                            📩 Bildir (Spam olarak işaretle)
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="mailbox-mailcontenttext">
                {selectedMail?.content}
              </div>
            </>
          ) : (
            <div style={{
              display:"flex",
              flexDirection:"column",
              alignItems:"center",
              textAlign:"center",
            }}>
              <img
                className='postbox-icon'
                src="./icons/postbox.png"
                alt="MailBox Icon"/>
              <h2 style={{color:"rgb(255, 242, 225)"}} >Okumak için bir öge seçin</h2><br/>
              <h3 style={{color:"rgb(255, 242, 225)"}} >Hiçbir şey seçilmedi</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mailbox;
