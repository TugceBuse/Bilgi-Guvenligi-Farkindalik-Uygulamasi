import './Mailbox.css';
import React, { useRef, useEffect, useState } from 'react';
import { MakeDraggable } from '../Draggable';
import { useGameContext } from '../Context';
import { mails as initialMails } from './Mails';

export const useMailbox = () => {
  const { toggleWindow, setActiveWindow } = useGameContext();

  const openMailbox = () => {
    toggleWindow('mailbox');
  };

  const closeMailbox = () => {
    toggleWindow('mailbox');
  };

  return { openMailbox, closeMailbox };
};

const Mailbox = ({ closeMailbox, style }) => {

//seçilen maili ve indexi tutacak state'ler
const [selectedMail, setSelectedMail] = useState(null);
const [activeIndex, setActiveIndex] = useState(null);
const {mails, setMails } = useGameContext();


const mailboxRef = useRef(null);//mailbox referansı
MakeDraggable(mailboxRef, '.mailbox-header');//mailboxi sürüklemek için kullanılan fonksiyon

const handleMailClick = (mail,index) => {
  setSelectedMail(mail);
  setActiveIndex(index);
  // Maili okundu olarak işaretle
  setMails((prevMails) =>
    prevMails.map((m, i) =>
      i === index ? { ...m, read: true } : m
    )
  );
};




const resetReadMails = () => {
  setMails((prevMails) =>
    prevMails.map((m) => ({ ...m, read: false }))
  );
};

  return (
    <div className="mailbox-window" /*style={style}*/ ref={mailboxRef} >
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
        <button className="mailbox-close" onClick={closeMailbox}>×</button>
      </div>
      {/* headerden sonra soldan sağa dizilen iç pencere */}
      <div className="mailbox-inwindow">
        <div className="mailbox-sidebar">
          <ul>
            <li className="active"><img className = "inbox-icon" src="./icons/inbox.png" alt="Inbox Icon"/> Inbox</li>
            <li>Sent</li>
          </ul>
        </div>
        {/* vvvvvvvvvvvvv mail listesi vvvvvvvvvvvvv
         - Mailler dinamik eklenebilir hale gelmeli
         - bir maile tıklandığında içeriği mailbox-mailcontent e gelmeli
       */}
        <div className="mailbox-mails">
          <div style={{display:"flex", flexDirection:"column"}}>
          <h2>Inbox</h2>
          <button 
            style={{width:200, height:20, alignSelf:"center",alignItems:"center", justifyContent:"center", backgroundColor:"rgb(255, 242, 225)", color:"black", border:"none", borderRadius:10, cursor:"pointer",}}
            onClick={resetReadMails}>
            Okunma Durumunu Sıfırla
            </button>
          </div>
          
          <ul className="mailbox-maillist">
            {mails.map((mail, index) => (
              <li
                key={index}
                onClick={() => handleMailClick(mail, index)}
                className={activeIndex === index ? 'active' : ''}
              >
                <div style={{display:"flex", flexDirection:"row"}}>

                  
                {!mail.read && <div className="dot"></div>}
                  
                  
                  <h3>{mail.title}</h3>
                </div>
                <p>{/* mail contentin uzunlugunu belirler*/}
                  {mail.precontent.length > 50
                    ? `${mail.precontent.slice(0, 50)}...`
                    : mail.precontent}
                </p>
                
              </li>
            ))}
          </ul>
        </div>
        {/* mail içeriği --> Bu kısma Header falan eklenerek
        mailin kimden ne zaman geldiği tarzında bilgiler eklenmeli */}
        <div className="mailbox-mailcontent">
              {selectedMail ? (               
                <div className="mailbox-mailcontentheader">
                   <img src="./icons/user (2).png" alt="Mail Image" className="mail-image" />
                      <div style={{display:"flex", flexDirection:"column", gap:10}}>
                        <h3>{selectedMail?.Name}</h3>
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
                  <p>
                  { selectedMail.content }
                    </p>
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