import React, { useEffect, useState } from 'react';
import './Notifications.css';
import { useGameContext } from '../Contexts/GameContext';

const Notification = () => {
  const [showNotification, setShowNotification] = useState(false);

  const {
    isantivirusuptodate, setAntivirusisuptodate,
    isantivirusinstalled,setUpdating_antivirus,
    seconds
  } = useGameContext();

  const [remindTime, setRemindTime] = useState(-1);

  const handleUpdateNow = () => {
    console.log('Şimdi Güncelle butonuna tıklandı');
    setUpdating_antivirus(true); // Yükleme işlemi başlatıldı
    setShowNotification(false);
    // Yükleme işlemini taklit etmek için setTimeout kullanıyoruz
    setTimeout(() => {
      setUpdating_antivirus(false);
      setAntivirusisuptodate(true); 
    }, 10000); // 10 saniye bekleme süresi
  };

  //daha sonra hatırlatmaya bastıgında 
  const handleRemindLater = () => {
    console.log('Daha Sonra Hatırlat butonuna tıklandı');
    setAntivirusisuptodate(false); //güncelleme yapılmadı
    //bu durumda kullanici bir saldiriya maruz kalir
    setRemindTime(seconds + 60);//1 dakika sonra tekrar hatirlat
    setShowNotification(false);
  };

  useEffect(() => {
    // ilk bildirim gösterileceği süre ve daha sonra hatırlat durumunda süre
    if ( (isantivirusinstalled && (remindTime === -1 || seconds === remindTime) ) && !isantivirusuptodate) {
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
          {/* <button className="notification-close" onClick={() => setShowNotification(false)}>×</button> */}
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