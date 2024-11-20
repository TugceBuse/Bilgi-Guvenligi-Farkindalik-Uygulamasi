import './Mailbox.css';
import React, { useRef, useEffect, useState } from 'react';

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

const mailboxRef = useRef(null);//mailbox konumu

const mails = [
  {Name:'Ahmet Karaköse', from:'Ahmet@gmail.com', title: 'IT Departmanı', precontent: `Hesabınız Güvenlik Nedeniyle Geçici Olarak Askıya Alındı – Hızlı Erişim Gerekli!`, content: 
    (
      <img src="Onur Yildiz (2).png" alt="placeholder" />
    )
   },
//   {Name:'Tuce ergun', from:'Tuce@gmail.com', title: 'Mail2', content: 'Mail2 content' },
//   {Name:'Onur yildiz',
//   from:'Onur@gmail.com',
//   title: 'Mail3', 
//   content: (
//     <p>
//       Mail3 content <br />
//       <a href="https://www.google.com">Google</a> <br /> 
//       <img src="https://via.placeholder.com/150" alt="placeholder" />
//     </p>   
//   ),
// },
];


//vvvvvvvvvvvvvvv BILEŞENIN SURUKLENMESI vvvvvvvvvvvvvvvvvvvvvvvvvvvv
useEffect(() => {
  const mailbox = mailboxRef.current;
  if (!mailbox) return;
  
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  const handleMouseDown = (e) => {
    isDragging = true;
    offsetX = e.clientX - mailbox.getBoundingClientRect().left;
    offsetY = e.clientY - mailbox.getBoundingClientRect().top;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      mailbox.style.left = `${e.clientX - offsetX}px`;
      mailbox.style.top = `${e.clientY - offsetY}px`;
    }
  };

  const handleMouseUp = () => {
    isDragging = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const header = mailbox.querySelector('.mailbox-header');
  if (header) {
    header.addEventListener('mousedown', handleMouseDown);
  }

  return () => {
    if (header) {
      header.removeEventListener('mousedown', handleMouseDown);
    }
  };
}, []);
//////////////////////////////////////////////////////////////////

const handleMailClick = (mail,index) => {
  setSelectedMail(mail);
  setActiveIndex(index);
};


  return (
    <div className="mailbox-window" ref={mailboxRef}>
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