import { useGameContext } from "../Context";
import Alert from "../Notifications/Alert";
import "./Taskbar.css";
import React, { useState, useEffect } from 'react';

const TaskBar = () => {

  const [time, setTime] = useState(new Date());
  const {isWificonnected , setIsWificonnected } = useGameContext();
  const {updating_antivirus} = useGameContext();

  const [wifiname, setwifiname] = useState('');

  const [zindex, setzindex] = useState(100);

  const pass = "1234";

  //baglanti olup olmadıgı ama bu kontrol değişkeni aynı zamanda
  //nerede tanımlanacağı henüz net değil
  // const [isWificonnected, setIsWificonnected] = useState(false);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showWifiList, setShowWifiList] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [selectedWifi, setSelectedWifi] = useState('');

  const { openWindows, toggleWindow, activeWindow, handleIconClick } = useGameContext();
  const {isantivirusuptodate} = useGameContext();//antivirus güncel mi değil mi

  const [showAlert, setShowAlert] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
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
      setwifiname(wifiName);
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

    if (password === pass) {
      setIsWificonnected(true);
    } else {
      setShowAlert(true);
      setIsWificonnected(false);
    }
    // WiFi bağlantı işlemleri olabilir
  };

  useEffect(() => {
    console.log('Z-index değişti:', zindex);
  }, [zindex]);

  const handleIconClickWithVisibility = (windowName) => {
    const element = document.querySelector(`.${windowName}-window`);
    if (activeWindow === windowName) {
      if (element) {
        setzindex(zindex - 1);
        element.style.visibility = 'hidden';
        element.style.zIndex = `${zindex}`; // Arka plana almak için z-index azaltma
      }
      handleIconClick(windowName);
    } else {
      if (element) {//zindex < 9999 aslında koşul
        zindex < 9999 && setzindex(zindex + 1); // zindex şişip hata çıkarmasın diye
        element.style.visibility = 'visible';
        element.style.zIndex = `${zindex}`; // Ön plana çıkarmak için z-index artırma
        console.log(element.style.zIndex);
      }
      handleIconClick(windowName);
    }
  };

  //zindex şişmemesi için bütün pencereler kapatıldığında 100 e çek
  useEffect(() => {
    console.log('Active window değişti:', openWindows);
    if(openWindows.length === 0) {
      setzindex(100);
    }
  }, [openWindows]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  let antivirusIcon;
  let antivirusTooltip;
  let wifiIcon;
  let wifiTooltip;

  if (updating_antivirus) {
    antivirusIcon = <img src="/icons/antivirus_in_progress.png" alt="Antivirus Update Icon" />;
    antivirusTooltip = "Antivirus güncelleniyor...";
  } else if (isantivirusuptodate) {
    antivirusIcon = <img src="/icons/antivirus_latest.png" alt="Antivirus Icon" />;
    antivirusTooltip = "Antivirus güncel";
  } else {
    antivirusIcon = <img src="/icons/antivirus_update.png" alt="Antivirus Warning Icon" />;
    antivirusTooltip = "Antivirus güncellemesi gerekli!";
  }

  if (isWificonnected) {
    wifiIcon = <img src="/icons/wifi.png" alt="Wifi Connected Icon" />;
    wifiTooltip = `${wifiname}`;
  } else {
    wifiIcon = <img src="/icons/no-wifi.png" alt="Wifi Disconnected Icon" />;
    wifiTooltip = "WiFi Bağlı Değil";
  }

  return (


    // Görev çubuğu bileşeni
  <div className="taskbar">

    {/* Başlat Menüsü */}
    <div className="start-menu">
      <img src="/icons/windows-10.png" alt="Start Button" />
    </div>
    
    <div className="taskbar-icons">
        {openWindows.includes('browser') && (
          <img
            src="/icons/internet.png"
            alt="Browser Icon"
            className={activeWindow === 'browser' ? 'active' : ''}
            onClick={() => handleIconClickWithVisibility('browser')}
          />
        )}
        {openWindows.includes('itsupport') && (
          <img
            src="/icons/helpdesk.png"
            alt="IT Support Icon"
            className={activeWindow === 'itsupport' ? 'active' : ''}
            onClick={() => handleIconClickWithVisibility('itsupport')}
          />
        )}
        {openWindows.includes('todolist') && (
          <img
            src="/icons/to-do-list.png"
            alt="Todolist Icon"
            className={activeWindow === 'todolist' ? 'active' : ''}
            onClick={() => handleIconClickWithVisibility('todolist')}
          />
        )}
        {openWindows.includes('mailbox') && (
          <img
            src="/icons/mail.png"
            alt="Mailbox Icon"
            className={activeWindow === 'mailbox' ? 'active' : ''}
            onClick={() => handleIconClickWithVisibility('mailbox')}
          />
        )}
    </div>
      
      {/* Görev Çubuğu Sağ Tarafı */}
    <div className="taskbar-right">

      <div className="taskbar-wifi" onClick={toggleWifiList}>
          {wifiIcon}
          <div className="tooltip">
            <b>{wifiTooltip}</b>
            <br/>
            İnternet erişimi
          </div>
          {showWifiList && (
            <div className="wifi-list">
              <ul>
              <li onClick={() => handleWifiClick('WiFi Network 1', true)}>
                  XYZCompany Network 1 <img src="/icons/lock.png" alt="Lock Icon" />
                </li>
                <li onClick={() => handleWifiClick('WiFi Network 2', false)}>WiFi Network 2</li>
                <li onClick={() => handleWifiClick('WiFi Network 3', false)}>WiFi Network 3</li>
              </ul>
            </div>
          )}
      </div>

      <div className="taskbar-antivirus">
          {antivirusIcon}
          <div className="tooltip">{antivirusTooltip}</div>
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
      {/* WiFi şifre giriş ekranı */}
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
    <Alert show={showAlert} handleClose={() => setShowAlert(false)} message={'Şifre yanlış'}></Alert>
  </div>
  );
  }

export default TaskBar;
