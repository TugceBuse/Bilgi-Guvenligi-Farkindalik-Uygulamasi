import { useGameContext } from "../Context";
import Alert from "../Notifications/Alert";
import "./Taskbar.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const TaskBar = () => {

  const [time, setTime] = useState(new Date());
  const {
    isWificonnected , setIsWificonnected,
    updating_antivirus,isantivirusuptodate,
    openWindows,setOpenWindows,
    activeWindow, setActiveWindow,
    visibleWindows, setVisibleWindows,
    handleIconClick,
    zindex, setZindex
   } = useGameContext();
   
   /* Windows Menüsü İçin Gerekli Fonksiyonlar */
   const [showStartMenu, setShowStartMenu] = useState(false);
   const [shuttingDown, setShuttingDown] = useState(false);
   const navigate = useNavigate();

   const handleStartButtonClick = () => {
     setShowStartMenu(!showStartMenu);
   };

   const handleShutdownClick = () => {
    setShuttingDown(true);
    setTimeout(() => {
      navigate("/"); // Ana ekrana yönlendir
    }, 2000); // 2 saniye gecikme
  };

   
  const [wifiname, setwifiname] = useState('');
  const pass = "1234";

  const [showNotifications, setShowNotifications] = useState(false);
  const [showWifiList, setShowWifiList] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [selectedWifi, setSelectedWifi] = useState('');

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

  const handleIconClickWithVisibility = (windowName) => {
    const element = document.querySelector(`.${windowName}-window`);
    if (activeWindow === windowName) {
      if (element) {
        element.style.visibility = 'hidden';
        setVisibleWindows((prevVisibleWindows) => {
          const filteredWindows = prevVisibleWindows.filter(name => name !== windowName);
          return [...filteredWindows];
        });
      }
      handleIconClick(windowName); // aktif ise pasif, pasifse aktif yapar
    } else {
      if (element) {
        if (zindex < 9999) {
          let newZindex = zindex + 1;
          setZindex(newZindex);
          element.style.visibility = 'visible';
          element.style.zIndex = `${newZindex}`; // Ön plana çıkarmak için z-index artırma
          // visibleWindows dizisini güncelle
          setVisibleWindows((prevVisibleWindows) => {
            const filteredWindows = prevVisibleWindows.filter(name => name !== windowName);
            return [...filteredWindows, windowName];
          });
        }
      }
      handleIconClick(windowName);
    }
  };

  //zindex şişmemesi için bütün pencereler kapatıldığında 100 e çek
  useEffect(() => {
    if(openWindows.length === 0) {
      setZindex(100);
    }
  }, [openWindows]);

  useEffect(() => {
    setActiveWindow(visibleWindows[visibleWindows.length - 1]);
  }, [activeWindow]);

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
    antivirusTooltip = (
      <div className="tooltip tooltip-visible">
        Antivirus güncelleniyor...
        <div className="loading-bar">
          <div className="loading-bar-progress"></div>
        </div>
      </div>
    );
  } else if (isantivirusuptodate) {
    antivirusIcon = <img src="/icons/antivirus_latest.png" alt="Antivirus Icon" />;
    antivirusTooltip = (
      <div className="tooltip">
        Antivirus güncel!
      </div>
    )
  } else {
    antivirusIcon = <img src="/icons/antivirus_update.png" alt="Antivirus Warning Icon" />;
    antivirusTooltip = (
      <div className="tooltip">
        Antivirus güncellemesi gerekli!
      </div>
    );
  }

  if (isWificonnected) {
    wifiIcon = <img src="/icons/wifi.png" alt="Wifi Connected Icon" />;
    wifiTooltip = ( 
      <>
        <b>{wifiname}</b>
        <br />
        Internet erişimi
      </>
     );
  } else {
    wifiIcon = <img src="/icons/no-wifi.png" alt="Wifi Disconnected Icon" />;
    wifiTooltip = "WiFi Bağlı Değil";
  }

  return (


    // Görev çubuğu bileşeni
  <div className="taskbar">

    {/* Başlat Menüsü */}
    <div className="taskbar-icons" onClick={handleStartButtonClick}>
      <img src="/icons/menu (1).png" alt="Start Button" />
    </div>

    {/* Başlat Menüsü Penceresi */}
      {showStartMenu && (
        <div className="start-menu-window">
          <h2>Başlat Menüsü</h2>
          
          <div style={{display:"flex", flexDirection:"column", gap: 10, padding: 30, justifyItems:"center"}}>
            <img style={{width: 30, height: 30, cursor: "pointer"}} src="/icons/synchronize.png" alt="Synchronize Icon"/>
            <p style={{marginLeft:-12}}>Yedekle</p>
          </div>
          
          
          <div className="shutdown-button" onClick={handleShutdownClick}>
            <img src="/icons/switch.png" alt="Switch Icon" />
            Bilgisayarı Kapat
          </div>

            {/* Kapanıyor Ekranı */}
            {shuttingDown && (
              <div className="shutdown-screen">
                <p className="shutdown-text">Kapanıyor...</p>
              </div>
            )}

        </div>
      )}
    
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
        {openWindows.includes('folder') && (
          <img
            src="/icons/folder.png"
            alt="Folder Icon"
            className={activeWindow === 'folder' ? 'active' : ''}
            onClick={() => handleIconClickWithVisibility('folder')}
          />
        )}
    </div>
      
      {/* Görev Çubuğu Sağ Tarafı */}
    <div className="taskbar-right">

      <div className="taskbar-wifi" onClick={toggleWifiList}>
          {wifiIcon}
          <div className="tooltip">
            {wifiTooltip}
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
          {antivirusTooltip}
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
