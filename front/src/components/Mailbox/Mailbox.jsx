import './Mailbox.css';
import React, { useRef, useEffect, useState } from 'react';
import { MakeDraggable } from '../../utils/Draggable';
import { useUIContext } from '../../Contexts/UIContext';
import { useMailContext } from '../../Contexts/MailContext';
import { useGameContext } from '../../Contexts/GameContext';
import { resetScroll } from '../../utils/resetScroll';

export const useMailbox = () => {
  const { toggleWindow } = useUIContext();

  const openHandler = () => {
    toggleWindow('mailbox');
  };

  const closeHandler = () => {
    toggleWindow('mailbox');
  };

  return { openHandler, closeHandler };
};

const Mailbox = ({ closeHandler, style }) => {

  //seçilen maili ve indexi tutacak state'ler
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('inbox');

  const [unreadCountMail, setUnreadCountMail] = useState(0);
  const [unreadCountSpam, setUnreadCountSpam] = useState(0);
  const contentRef = useRef(null);

  // Context Değişkenler
  const {
    initMail,
    inboxMails, setInboxMails,
    initsentMails, setInitSentMails,
    // initspamMails, setInitSpamMails,
    spamboxMails, setSpamboxMails,
    selectedMail, setSelectedMail
  } = useMailContext();

  const {isWificonnected} = useGameContext();
  
  // Okunmamış ve notified özelliği true olan mailleri filtrele
  useEffect(() => {
    setInboxMails(prevMails => {
        const filteredMails = initMail.filter(mail => !mail.readMail && mail.notified); 
        
        const newMails = filteredMails.filter(mail => 
            !prevMails.some(prevMail => prevMail.title === mail.title)
        );

        return [...newMails, ...prevMails];
    });
}, [initMail]);

useEffect(() => {
  console.log('Mails değişikliği oldu,UseEffect çalıştı ve sentMails:',inboxMails);
}, [inboxMails]);


  // **Eğer `selectedMail` varsa, onu varsayılan olarak aç**
  useEffect(() => {
    if (selectedMail) {
      const selectedIndex = inboxMails.findIndex(mail => mail.title === selectedMail.title);
      if(!selectedIndex===-1) {
        setActiveIndex(selectedIndex);
      }
    }
    resetScroll(contentRef);//yeni mail seçildiğinde scrollu sıfırlar -- util import
    }, [selectedMail]);

 useEffect(() => {
    const count = inboxMails.filter(mail => !mail.readMail).length;
    setUnreadCountMail(count);
  }, [inboxMails]); 

  useEffect(() => {
    const count = spamboxMails.filter(mail => !mail.readMail).length;
    setUnreadCountSpam(count);
  }, [spamboxMails]); 

  const mailboxRef = useRef(null);
  MakeDraggable(mailboxRef, '.mailbox-header');

  const handleMailClick = (mail,index) => {
    if(!isWificonnected) {
      return;
    }
    setSelectedMail(mail);
    setActiveIndex(index);
    
    // Maili okundu olarak işaretle
    if (mail.hasOwnProperty('readMail')) {
      setInboxMails((prevMails) =>
        prevMails.map((m, i) =>
          i === index ? { ...m, readMail: true } : m
        )
      );
    }
    else if (mail.hasOwnProperty('readSpam')) {
      setSpamboxMails((prevMails) =>
        prevMails.map((m, i) =>
          i === index ? { ...m, readMail: true } : m
        )
      );
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSelectedMail(null);
    setActiveIndex(null);
  };


  const resetReadMails = () => {
    setInboxMails((prevMails) =>
      prevMails.map((m) => ({ ...m, readMail: false }))
    );
  };

    return (
      <div className="mailbox-window" style={style} ref={mailboxRef} >
        <div className="mailbox-header">
          {/* Mailbox header */}
                <div className = 'mailbox-header-left'>
                  <img className = "menu-icon" src="./icons/menu.png" alt="Menu Icon"/>
                  <img className = "search-icon" src="./icons/search.png" alt="Search Icon"/>
                  <input type="text" placeholder = " Ara" />
                  <img  src="./icons/undo.png" alt="Undo Icon"/>
                  <img  src="./icons/undo-all.png" alt="Undo-All Icon"/>
                  <img  src="./icons/next.png" alt="Right-Arrow Icon"/>
                </div>
          <button className="mailbox-close" onClick={closeHandler}>×</button>
        </div>
        {/* headerden sonra soldan sağa dizilen iç pencere */}
        <div className="mailbox-inwindow">
          <div className="mailbox-sidebar">
            <ul>
              <li 
                className={activeTab === 'inbox' ? 'active' : ''}
                onClick={() => handleTabClick('inbox')}
              >
                <img className = "is-icon" src="./icons/inbox.png" alt="Inbox Icon"/>  Inbox <div className="number-of-mails">{unreadCountMail}</div>
              </li>
                
                
              <li 
               className={activeTab === 'spam' ? 'active' : '' }
               onClick={() => handleTabClick('spam')}
              ><img className = "is-icon" src="./icons/spam.png" alt="Spam Icon"/>Spam <div className="number-of-mails">{unreadCountSpam}</div>
              </li>

              <li 
                className={activeTab === 'sent' ? 'active' : ''}
                onClick={() => handleTabClick('sent')}
              ><img className = "is-icon" src="./icons/sent.png" alt="Sent Icon"/>Sent</li>


             <div style={{display:"flex", flexDirection:"column", padding: 10, gap:10, marginTop: 50, opacity:0.7}}>
                <span>
                  <img className = "is-icon" src="./icons/junk-mail.png" alt="Junk Mail Icon"/>Junk Mail
                </span>

                <span>
                  <img className = "is-icon" src="./icons/draft.png" alt="Draft Icon"/>Drafts
                </span>

                <span>
                  <img className = "is-icon" src="./icons/remove.png" alt="Remove Icon"/>Deleted Items
                </span>

                <span>
                  <img className = "is-icon" src="./icons/inbox (2).png" alt="Archive Icon"/>Archives
                </span>

                <span>
                  <img className = "is-icon" src="./icons/writing.png" alt="Writing Icon"/>Notes
                </span>
             
             </div>
            </ul>
          </div>
          {/* mail listesi */}
          <div className="mailbox-mails">
            <div style={{display:"flex", flexDirection:"column"}}>
            <h2>{activeTab === 'inbox' ? 'Inbox' : 'Sent'}</h2>
            <button 
              style={{width:200, height:20, alignSelf:"center",alignItems:"center", justifyContent:"center", backgroundColor:"rgb(255, 242, 225)", color:"black", border:"none", borderRadius:10, cursor:"pointer",}}
              onClick={resetReadMails}>
              Okunma Durumunu Sıfırla
              </button>
            </div>
            
            <ul className="mailbox-maillist">
              { activeTab === 'inbox' ?
                (inboxMails.map((mail, index) => (
                  <li
                    key={index}
                    onClick={() => handleMailClick(mail, index)}
                    className={activeIndex === index ? 'active' : ''}
                  >
                    <div style={{display:"flex", flexDirection:"row"}}>        
                      {!mail.readMail && <div className="dot"></div>}
                      <h3>{mail.title}</h3>
                    </div>
                    <p>{/* mail contentin uzunlugunu belirler*/}
                      {mail.precontent.length > 50
                        ? `${mail.precontent.slice(0, 50)}...`
                        : mail.precontent}
                    </p> 
                  </li>
                ))) : activeTab === 'sent' ?
                (initsentMails.map((mail, index) => (
                  <li
                    key={index}
                    onClick={() => handleMailClick(mail, index)}
                    className={activeIndex === index ? 'active' : ''}
                  >
                    <div style={{display:"flex", flexDirection:"row"}}>        
                      <h3>{mail.title}</h3>
                    </div>
                    <p>{/* mail contentin uzunlugunu belirler*/}
                      {mail.precontent.length > 50
                        ? `${mail.precontent.slice(0, 50)}...`
                        : mail.precontent}
                    </p>
                  </li>
                ))) : activeTab === 'spam' ?
                (spamboxMails.map((mail, index) => (
                  <li
                    key={index}
                    onClick={() => handleMailClick(mail, index)}
                    className={activeIndex === index ? 'active' : ''}
                  >
                    <div style={{display:"flex", flexDirection:"row"}}>        
                      {!mail.readMail && <div className="dot"></div>}
                      <h3>{mail.title}</h3>
                    </div>
                    <p>{/* mail contentin uzunlugunu belirler*/}
                      {mail.precontent.length > 50
                        ? `${mail.precontent.slice(0, 50)}...`
                        : mail.precontent}
                    </p>
                  </li>
                ))) : null
              }
              <div style={{height:3}}></div>
            </ul>
          </div>
          {/* mail içeriği*/}
          <div className="mailbox-mailcontent" ref={contentRef}>
                {selectedMail ? (               
                  <div className="mailbox-mailcontentheader">
                    <img src="./icons/user (2).png" alt="Mail Pic" className="mail-image"/>
                      <div style={{display:"flex", flexDirection:"column", gap:10}}>
                        <h3>{selectedMail?.title}</h3>
                        <h3>&lt;{selectedMail?.from}&gt;</h3>
                        <h3 style={{paddingTop:8}}>Bugün</h3>
                      </div>
                      <div style={{position: 'absolute', top:20, right:30, display:"flex", flexDirection:"row", gap:20}}>
                        <img  src="./icons/undo.png" alt="Undo Icon"/>
                        <img  src="./icons/undo-all.png" alt="Undo-All Icon"/>
                        <img  src="./icons/next.png" alt="Right-Arrow Icon"/>
                      </div>      
                  </div>
                ) : (
                  <p></p>
                )} 
                {selectedMail ? (
                  <div className="mailbox-mailcontenttext">
                    { selectedMail?.content }
                  </div>
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
                </div>)}
                  
          </div>
          
        </div>
      </div>
    );
};

export default Mailbox;