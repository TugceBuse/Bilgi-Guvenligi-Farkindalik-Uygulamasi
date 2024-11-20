import './Mailbox.css';
import React, { useRef, useEffect, useState } from 'react';
import { MakeDraggable } from '../Draggable';

export const useMailbox = () => {
  const [isMailboxOpen, setIsMailboxOpen] = useState(false);

  const openMailbox = () => {
    setIsMailboxOpen(true);
  };

  const closeMailbox = () => {
    setIsMailboxOpen(false);
  };

  return { isMailboxOpen, openMailbox, closeMailbox };
};


const Mailbox = ({ closeMailbox }) => {

//seçilen maili ve indexi tutacak state'ler
const [selectedMail, setSelectedMail] = useState(null);
const [activeIndex, setActiveIndex] = useState(null);

const mailboxRef = useRef(null);//mailbox referansı
MakeDraggable(mailboxRef, '.mailbox-header');//mailboxi sürüklemek için kullanılan fonksiyon

const mails = [
  {Name:'Ahmet Karaköse', from:'Ahmet@gmail.com', title: 'IT Departmanı', precontent: `Hesabınız Güvenlik Nedeniyle Geçici Olarak Askıya Alındı – Hızlı Erişim Gerekli!`, content: 
    (
      <img src="Onur Yildiz (2).png" alt="placeholder" />
    )
   },
];

const handleMailClick = (mail,index) => {
  setSelectedMail(mail);
  setActiveIndex(index);
};


  return (
    <div className="mailbox-window" ref={mailboxRef}>
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
          <ul className="mailbox-maillist">
            {mails.map((mail, index) => (
              <li
                key={index}
                onClick={() => handleMailClick(mail, index)}
                className={activeIndex === index ? 'active' : ''}
              >
                <h3>{mail.title}</h3>
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
              {/* {selectedMail ? (
                <div className="mailbox-mailcontentheader">
                  <h3>{selectedMail?.Name}</h3>
                  <h3>&lt;{selectedMail?.from}&gt;</h3>
                </div>
              ) : (
                <p></p>
              )} */}
              {selectedMail ? (
                <div className="mailbox-mailcontenttext">
                  {/* <h2>{selectedMail.title}</h2> */}
                  {/* pre yapılınca boşluk ve satir başlarini aliyor
                  ancak responsive olmuyor yazi taşarsa görünmüyor 
                  p ile yapilinca da düz yaziyor */}
                  <p>
                  { selectedMail.content }
                    </p>
                </div>
              ) : (
                <p></p>
              )}
        </div>
        
      </div>
    </div>
  );
};

export default Mailbox;