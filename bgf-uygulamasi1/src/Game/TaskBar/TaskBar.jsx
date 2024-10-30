import "./Taskbar.css";
import React, { useState, useEffect } from 'react';

const TaskBar = ({isWificonnected , setIsWificonnected }) => {

  const [time, setTime] = useState(new Date());

  //baglanti olup olmadıgı ama bu kontrol değişkeni aynı zamanda
  //nerede tanımlanacağı henüz net değil
  // const [isWificonnected, setIsWificonnected] = useState(false);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showWifiList, setShowWifiList] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [selectedWifi, setSelectedWifi] = useState('');

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    console.log("Bildirimler açıldı/kapatıldı");
  };


  const toggleWifiList = () => {
    setShowWifiList(!showWifiList);
  };

  const handleWifiClick = (wifiName, requiresPassword) => {
    if (requiresPassword) {
      setSelectedWifi(wifiName);
      setShowPasswordPrompt(true);
    } else {
      //şifresiz wifi baglantı saglanır
      setIsWificonnected(true);
      console.log(`Connecting to ${wifiName}`);
      // WiFi bağlantı işlemleri olabilir
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    //formdan sifreyi alir (sifreyi kullanici üretecek dogrulamalıyız)
    const password = e.target.elements.password.value;
    console.log(`Connecting to ${selectedWifi} with password ${password}`);
    setShowPasswordPrompt(false);
    // WiFi bağlantı işlemleri olabilir
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (


    // Görev çubuğu bileşeni
  <div className="taskbar">

    {/* Başlat Menüsü */}
    <div className="start-menu">
      <img src="/icons/windows-10.png" alt="Start Button" />
    </div>
    
    <div className="taskbar-icons">
      <img src="/icons/internet.png" alt="Internet Icon" />
      {/* <img src="/icons/folder-invoices.png" alt="File Explorer Icon" /> */}
    </div>
      
      {/* Görev Çubuğu Sağ Tarafı */}
    <div className="taskbar-right">

      <div className="taskbar-wifi" onClick={toggleWifiList}>
        {isWificonnected ? (
          <img src="/icons/wifi.png" alt="Wifi Connected Icon" />
        ) : (
          <img src="/icons/no-wifi.png" alt="Wifi Disconnected Icon" />
        )}
          {showWifiList && (
            <div className="wifi-list">
              <ul>
              <li onClick={() => handleWifiClick('WiFi Network 1', true)}>
                  WiFi Network 1 <img src="/icons/lock.png" alt="Lock Icon" />
                </li>
                <li onClick={() => handleWifiClick('WiFi Network 2', false)}>WiFi Network 2</li>
                <li onClick={() => handleWifiClick('WiFi Network 3', false)}>WiFi Network 3</li>
              </ul>
            </div>
          )}
      </div>

      <div className="taskbar-antivirus">
          <img src="/icons/antivirus.png" alt="Antivirus Icon" />
      </div>

      <div className="taskbar-status">
            {/* Saat */}
          <div className="taskbar-clock">

            <div className="clock">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' ,hour12: false })}</div>

            <div>{time.toLocaleDateString('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</div>

          </div>

          {/* Bildirimler */}
          <div className="taskbar-notifications" onClick={toggleNotifications}>
            <img src="/icons/notification_blck.png"
            alt="Notification Icon" />
            {showNotifications && (
        <div className="notifications-window">
          <h3>Bildirimler</h3>
          <p>Henüz bir bildiriminiz yok.</p>
        </div>
            )
            }
          </div>

      </div>

    </div>

    {showPasswordPrompt && (
        <div className="password-prompt">
          <form onSubmit={handlePasswordSubmit}>
            <h3>{selectedWifi} için şifre girin:</h3>
            <input type="password" name="password" required />
            <button type="submit">Bağlan</button>
            <button type="cancel" onClick={() => setShowPasswordPrompt(false)}>İptal</button>
          </form>
        </div>
      )}
  </div>
  );
  }

export default TaskBar;
