import './Mailbox.css';
import React, { useRef, useEffect, useState } from 'react';
import { MakeDraggable } from '../Draggable';
import { useGameContext } from '../Context';

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

const Mailbox = ({ closeMailbox }) => {

//seçilen maili ve indexi tutacak state'ler
const [selectedMail, setSelectedMail] = useState(null);
const [activeIndex, setActiveIndex] = useState(null);
const [readMails, setReadMails] = useState(new Set());


const mailboxRef = useRef(null);//mailbox referansı
MakeDraggable(mailboxRef, '.mailbox-header');//mailboxi sürüklemek için kullanılan fonksiyon

const mails = [
  {Name:'IT Departmanı', from:'IT.Destek@globalbank-support.com', title: 'IT Departmanı', precontent: `Hesabınız Geçici Olarak Askıya Alındı!`, 
    content: 
    (
      <div className="mail-content">
          <pre>
              <b>Merhaba Onur,</b><br/><br/>
              Son yapılan sistem güncellemelerimiz sırasında hesabınızda güvenlik açığı tespit edilmiştir. 
              Bu nedenle hesabınız geçici olarak askıya alınmıştır. 
              Hesabınıza yeniden erişebilmeniz için aşağıdaki bağlantıdan giriş yaparak bilgilerinizi güncellemeniz gerekmektedir.<br/><br/>

              Bağlantı: <span style={{color:"blue", textDecoration: "underline", cursor:"pointer"}}>Hesabı Yeniden Etkinleştir!</span><br/><br/>
              
              Bu işlemi 24 saat içinde gerçekleştirmezseniz, hesabınız kalıcı olarak kapatılacaktır ve tüm verileriniz silinecektir.
              E-posta güvenliği politikamız gereğince, bu bağlantının gizliliğini koruyun ve kimseyle paylaşmayın.<br/><br/><br/>

              <b>Teşekkürler,<br/><br/>
              GlobalBank IT Destek Ekibi</b><br/>
              <b>E-posta:</b> <span style={{color:"blue", cursor:"pointer"}}>destek@globalbank.com</span><br/>
              <b>Telefon:</b> +90 212 555 0101
            </pre>
      </div>
    )
   },
   {Name:'UPS Kargo Şirketi', from:'info@shipmenttracker.com', title: 'UPS Kargo Şirketi', precontent: `Paketiniz Teslim Edilemedi!`, 
    content: 
    (
      <div className="mail-content">
          <pre>
              <b>Değerli Müşterimiz,</b><br/><br/>
              Sizin için hazırlanan gönderimizle ilgili bir teslimat sorunu oluştu. [Order #123456] numaralı siparişiniz teslim edilememiştir. 
              Bunun temel nedeni, adres bilgilerinizde eksiklik veya yanlışlık olabileceğidir.<br/><br/>

              Teslimat sürecinde yaşanan bu aksaklığı en kısa sürede çözmek ve paketinizi yeniden yönlendirebilmek için lütfen aşağıdaki bağlantıya tıklayarak adres bilgilerinizi doğrulayınız:<br/><br/>

              <span style={{color:"blue", textDecoration: "underline", cursor:"pointer"}}>Paketimi Güncelle</span><br/><br/>
              
              Güncellenen bilgilerle paketinizin yeniden sevkiyatını gerçekleştirebiliriz. Eğer adres doğrulama işlemi gerçekleştirilmezse, gönderinizi teslim edemeyeceğimiz için siparişiniz otomatik olarak 3 iş günü içerisinde iade edilecektir.

              Siparişinizin durumu hakkında anlık bildirim almak ve kargo sürecinizi kesintisiz takip etmek için bilgilerinizi eksiksiz doldurduğunuzdan emin olun.<br/><br/>

              Eğer bu mesajı yanlışlıkla aldıysanız ya da başka bir konuda yardıma ihtiyaç duyuyorsanız, lütfen bizimle iletişime geçmekten çekinmeyin.<br/><br/>
              Gönderinizin güvenliği ve memnuniyetiniz bizim önceliğimizdir.<br/><br/><br/>

              <b>Teşekkürler,<br/><br/>
              Kargo Takip Ekibi</b><br/>
              <b>Info:</b> info@shipmenttracker.com<br/>
              <b>Info:</b> shipmenttracker.com
            </pre>
      </div>
    )
   },
];

const handleMailClick = (mail,index) => {
  setSelectedMail(mail);
  setActiveIndex(index);
  setReadMails((prevReadMails) => new Set(prevReadMails).add(index));
};

// const { seconds } = useGameContext();
// const [remindTime, setRemindTime] = useState(-1);
// const [showMailNotification, setShowMailNotification] = useState(false);
// useEffect(() => {
//   console.log('Seconds:', seconds);
//   // ilk bildirim gösterileceği süre ve daha sonra hatırlat durumunda süre
//   if ( (seconds === 3 || seconds===remindTime)) {
//     setShowMailNotification(true);
//   }
// }, [seconds]);

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
          <h2>Inbox</h2>
          <ul className="mailbox-maillist">
            {mails.map((mail, index) => (
              <li
                key={index}
                onClick={() => handleMailClick(mail, index)}
                className={activeIndex === index ? 'active' : ''}
              >
                <div style={{display:"flex", flexDirection:"row"}}>

                  
                {!readMails.has(index) && <div className="dot"></div>}
                  
                  
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
                      <div style={{width:24, height:24, display:"flex", flexDirection:"row", gap:20,marginLeft:200}}>
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
                  {/* pre yapılınca boşluk ve satir başlarini aliyor
                  ancak responsive olmuyor yazi taşarsa görünmüyor 
                  p ile yapilinca da düz yaziyor */}
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