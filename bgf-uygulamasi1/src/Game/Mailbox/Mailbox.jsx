import React from 'react';
import './Mailbox.css';
import { useState } from 'react';

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

const mails = [
  {Name:'Ahmet Karaköse', from:'Ahmet@gmail.com', title: 'Mail1', content: 'Mail1 content' },
  {Name:'Tuce ergun', from:'Tuce@gmail.com', title: 'Mail2', content: 'Mail2 content' },
  {Name:'Onur yildiz',
  from:'Onur@gmail.com',
  title: 'Mail3', 
  content: `Merhaba Ahtkrk,

Kargonuz yola çıktı. Teslimat detaylarını ve takip numaranızı görmek için buraya tıklayın:
 <a href="https://kargo-takip-linki.com" target="_blank" rel="noopener noreferrer">Kargo Takip</a>.

Teşekkürler,
[Ruzgar Kargo]`
},
];

const handleMailClick = (mail,index) => {
  setSelectedMail(mail);
  setActiveIndex(index);
};


  return (
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
              <li
                key={index}
                onClick={() => handleMailClick(mail, index)}
                className={activeIndex === index ? 'active' : ''}
              >
                <h3>{mail.title}</h3>
                <p>{/* mail contentin uzunlugunu belirler*/}
                  {mail.content.length > 50
                    ? `${mail.content.slice(0, 50)}...`
                    : mail.content}
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
              <h3>{selectedMail?.Name}</h3>
              <h3>&lt;{selectedMail?.from}&gt;</h3>
            </div>
          ) : (
            <p></p>
          )}
          {selectedMail ? (
            <div className="mailbox-mailcontenttext">
              <h2>{selectedMail.title}</h2>
              {/* pre yapılınca boşluk ve satir başlarini aliyor
              ancak responsive olmuyor yazi taşarsa görünmüyor 
              p ile yapilinca da düz yaziyor */}
              <pre dangerouslySetInnerHTML=
              {{ __html: selectedMail.content }}
                ></pre>
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