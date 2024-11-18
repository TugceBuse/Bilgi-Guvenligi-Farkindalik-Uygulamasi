import React, { useEffect, useState } from 'react';
import './Notifications.css';
import { useGameContext } from '../Context';

const Notification = () => {
  const { seconds } = useGameContext();
  const [showNotification, setShowNotification] = useState(false);
  const {isuptodate, setIsuptodate} = useGameContext();

  //Güncelleme efekti eklenecek yükleme işlemi taklit edilecek...
  const handleUpdateNow = () => {
    console.log('Şimdi Güncelle butonuna tıklandı');
    setIsuptodate(true); //güncelleme yapıldı
    setShowNotification(false);
  };

  //daha sonra hatırlatmaya bastıgında 
  const handleRemindLater = () => {
    console.log('Daha Sonra Hatırlat butonuna tıklandı');
    setIsuptodate(false); //güncelleme yapılmadı
    //bu durumda kullanici bir saldiriya maruz kalir
    setShowNotification(false);
  };

  useEffect(() => {
    console.log('Seconds:', seconds);
    if (seconds === 3) {
      setShowNotification(true);
    }
  }, [seconds]);

  return (
    <>
      {showNotification && (
      <div className="notification">
        <div className="notification-header">
          <img src="/icons/caution.png" alt="Caution Icon" className="notification-icon" />
          <h2>Notification</h2>
          <button className="notification-close" onClick={() => setShowNotification(false)}>×</button>
        </div>
        
        <div className="notification-content">
          <h3>Antivirus güncellemesi gerekli!</h3>
          <p>Antivirüs programı güncel değil.</p>
          <p>Lütfen güvenliğiniz için programı güncelleyin.</p>
          <div className="notification-buttons">
          <button onClick={handleUpdateNow}>Şimdi Güncelle</button>
          <button onClick={handleRemindLater}>Daha Sonra Hatırlat</button>  
          </div>      
        </div>
      </div>
      )}
    </>
  );
};

export default Notification;