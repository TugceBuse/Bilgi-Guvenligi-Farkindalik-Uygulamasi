import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useGameContext } from '../../Contexts/GameContext';
import { useUIContext } from '../../Contexts/UIContext';
import Alert from "../Notifications/Alert";
import "./Taskbar.css";
import { useMailContext } from '../../Contexts/MailContext'; 
import { use } from 'react';

const TaskBar = ({windowConfig}) => {
  const [time, setTime] = useState(new Date());
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [shuttingDown, setShuttingDown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWifiList, setShowWifiList] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [selectedWifi, setSelectedWifi] = useState('');
  const [showPassAlert, setShowPassAlert] = useState(false);
  const [showWifiAlert, setShowWifiAlert] = useState(false);
  const [wifiname, setwifiname] = useState('');
  const { toggleWindow } = useUIContext();
  const { initMail, setInitMail, setSelectedMail } = useMailContext(); 
  const [popupNotification, setPopupNotification] = useState(null); // 📌 Pop-up bildirimi yöneten state
  const [notifiedMails, setNotifiedMails] = useState([]); // 📌 Bildirim kutusuna düşen mailleri takip eder.
  const popupTimeout = useRef(null);

  const pass = "1234";
  const navigate = useNavigate();
  const {
    isWificonnected, setIsWificonnected,
    updating_antivirus, isantivirusuptodate,
  } = useGameContext();

  const {
    openWindows, activeWindow, setActiveWindow,
    visibleWindows, setVisibleWindows,
    handleIconClick, zindex, setZindex
  } = useUIContext();

  const renderIcons = () => {
    return openWindows.map((windowName) => (
      <img
        key={windowName}
        src={windowConfig[windowName].icon}
        alt={`${windowName} Icon`}
        className={activeWindow === windowName ? 'active' : ''}
        onClick={() => handleIconClickWithVisibility(windowName)}
      />
    ));
  };

  // Mailbox Açma Fonksiyonu
  const handleOpenMailbox = (mail) => {
    if(!isWificonnected) {
      setShowWifiAlert(true);
      return;
    }
    
    if (popupTimeout.current) {
      clearTimeout(popupTimeout.current); // 📌 Kullanıcı tıklarsa timeout'u iptal et
    }

    setSelectedMail(mail);

    setInitMail(prevMails =>
      prevMails.map(m =>
        m.title === mail.title ? { ...m, readMail: true, notified: true } : m
      )
    );

    if(!openWindows.includes('mailbox')) {
      toggleWindow('mailbox');
    }
    setNotifiedMails(prevNotifiedMails => prevNotifiedMails.filter(m => m.title !== mail.title));
    setShowNotifications(false);
    setPopupNotification(null); // 📌 Pop-up bildirimi kapat
  };

  // Bildirim Silme Fonksiyonu
  const handleDeleteNotification = (mail) => {
    setNotifiedMails(prevNotifiedMails => prevNotifiedMails.filter(m => m.title !== mail.title));
};

  const handleStartButtonClick = () => {
    setShowStartMenu(!showStartMenu);
  };

  const handleShutdownClick = () => {
    setShuttingDown(true);
    setTimeout(() => navigate("/"), 2000);
  };

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
      setIsWificonnected(true);
      setwifiname(wifiName);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const password = e.target.elements.password.value;
    setShowPasswordPrompt(false);

    if (password === pass) {
      setIsWificonnected(true);
    } else {
      setShowPassAlert(true);
      setIsWificonnected(false);
    }
  };

  const handleIconClickWithVisibility = (windowName) => {
    const element = document.querySelector(`.${windowName}-window`);
    if(!element) return;

    if (activeWindow === windowName) {
        element.style.visibility = 'hidden';
        setVisibleWindows((prevVisibleWindows) => {
          const filteredWindows = prevVisibleWindows.filter(name => name !== windowName);
          return [...filteredWindows];
        });
      handleIconClick(windowName);
    } else {
        if (zindex < 9999) {
          let newZindex = zindex + 1;
          setZindex(newZindex);
          element.style.visibility = 'visible';
          element.style.zIndex = `${newZindex}`;
          setVisibleWindows((prevVisibleWindows) => {
            const filteredWindows = prevVisibleWindows.filter(name => name !== windowName);
            return [...filteredWindows, windowName];
          });
      }
      handleIconClick(windowName);
    }
  };

   // 📌 **Rastgele Zamanlarda Bildirim Çıkartma**
  useEffect(() => {
    const showRandomNotification = () => {
      const unread = initMail.filter(mail => !mail.readMail && !mail.notified);
      if (unread.length > 0) {
        const randomMail = unread[Math.floor(Math.random() * unread.length)];

        setPopupNotification(randomMail);
        setInitMail(prevMails =>
          prevMails.map(m =>
            m.title === randomMail.title ? { ...m, notified: true } : m
          )
        );
        // 📌 Eğer kullanıcı 8 saniye içinde bildirime basmazsa bildirim kutusuna ekle
        popupTimeout.current = setTimeout(() => {
          setNotifiedMails(prev => [randomMail, ...prev]);
          setPopupNotification(null);
        }, 8000);
      }
    };

    // 📌 Rastgele 30-90 saniye arasında bir süre belirle
    const interval = setInterval(showRandomNotification, Math.floor(Math.random() * 5 + 8) * 1000);

    return () => clearInterval(interval);
  }, [initMail]);

  useEffect(() => {
      setNotifiedMails((initMail.filter(mail => !mail.readMail && mail.notified)));
    }, []);

  useEffect(() => {
    if (openWindows.length === 0) {
      setZindex(100);
    }
  }, [openWindows]);

  useEffect(() => {
    setActiveWindow(visibleWindows[visibleWindows.length - 1]);
  }, [visibleWindows]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const setAntivirus = () => {
    if (updating_antivirus) {
      return {
        icon: <img src="/icons/antivirus_in_progress.png" alt="Antivirus Updating Icon" />,
        tooltip: (
          <div className="tooltip tooltip-visible">
            Antivirus güncelleniyor...
            <div className="loading-bar">
              <div className="loading-bar-progress"></div>
            </div>
          </div>
        )
      };
    } else if (isantivirusuptodate) {
      return {
        icon: <img src="/icons/antivirus_latest.png" alt="Antivirus Latest Icon" />,
        tooltip: (
          <div className="tooltip">
            Antivirus güncel!
          </div>
        )
      };
    } else {
      return {
        icon: <img src="/icons/antivirus_update.png" alt="Antivirus Warning Icon" />,
        tooltip: (
          <div className="tooltip">
            Antivirus güncellemesi gerekli!
          </div>
        )
      };
    }
  };

  const { icon: antivirusIcon, tooltip: antivirusTooltip } = setAntivirus();
  const wifiIcon = isWificonnected 
    ? <img src="/icons/wifi.png" alt="Wifi Connected Icon" /> 
    : <img src="/icons/no-wifi.png" alt="Wifi Disconnected Icon" />;
  const wifiTooltip = isWificonnected
    ? (
        <>
          <b>{wifiname}</b>
          <br />
          Internet erişimi
        </>
      )
    : "WiFi Bağlı Değil";

  return (
  <div className="taskbar">
      {popupNotification && (
        <div className="popup-notification" onClick={() => handleOpenMailbox(popupNotification)}>
          <img style={{width:30, height:30}} src="/icons/mail.png" alt="Mail Icon" />
          <h4>{popupNotification.title}</h4>
          <p>{popupNotification.precontent}</p>
        </div>
      )}
      
    <div className="taskbar-icons" onClick={handleStartButtonClick}>
      <img src="/icons/menu (1).png" alt="Start Button" />
    </div>

    {showStartMenu && (
      <div className="start-menu-window">
        <h2>Başlat Menüsü</h2>

        <div style={{display:"flex", flexDirection:"column", gap: 10, padding: 30, justifyItems:"center"}}>
          <img style={{width: 30, height: 30, cursor: "pointer"}} src="/icons/synchronize.png" alt="Synchronize Icon"/>
          <p style={{marginLeft:-12}}>Yedekle</p>
        </div>
        <div style={{display:"flex", flexDirection:"column", gap: 10, padding: 30, justifyItems:"center"}}>
          <img style={{width: 30, height: 30, cursor: "pointer"}} src="/icons/firewall.png" alt="Firewall Icon"/>
          <p style={{marginLeft:-12}}>Yedekle</p>
        </div>

        <div className="shutdown-button" onClick={handleShutdownClick}>
          <img src="/icons/switch.png" alt="Switch Icon" />
          Bilgisayarı Kapat
        </div>

        {shuttingDown && (
          <div className="shutdown-screen">
            <p className="shutdown-text">Kapanıyor...</p>
          </div>
        )}
      </div>
    )}

    <div className="taskbar-icons">{renderIcons()}</div>

    <div className="taskbar-right">
      {windowConfig.antivirus.downloaded && (
        <div className="taskbar-antivirus">
          {antivirusIcon}
          {antivirusTooltip}
        </div>
      )}

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

      <div className="taskbar-status">
        <div className="taskbar-clock">
          <div className="clock">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' ,hour12: false })}</div>
          <div>{time.toLocaleDateString('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</div>
        </div>

        <div className="taskbar-notifications" >
          <img src="/icons/notification_blck.png" alt="Notification Icon" onClick={toggleNotifications} />
          {notifiedMails.length > 0 && <span className="notification-count">{notifiedMails.length}</span>}

          {showNotifications && (
            <div className="notifications-window">
              <h3>Bildirimler</h3>

              {notifiedMails.length > 0 ? (
                notifiedMails.map((mail, index) => (
                  <div key={index} className="notification-item" onClick={() => handleOpenMailbox(mail)}>
                    <strong>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", position: "relative" }}>
                        <img style={{ width: 30, height: 30 }} src="/icons/mail.png" alt="Mail Icon" />
                        {mail.title}
                        {/* 📌 X Butonu ile Bildirimi Kaldır */}
                        <p className='mail-notification-close' onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNotification(mail);
                        }}>x</p>
                      </div>
                    </strong>
                    <p>{mail.precontent}</p>
                  </div>
                ))
              ) : (
                <div className="non-notification">
                  <p>Henüz bir bildiriminiz yok.</p>
                  <img className='sad-face' src="/anxiety.png" alt="Sad Face Icon" />
                </div>
              )}
              
            </div>
          )}
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
    <Alert show={showPassAlert} handleClose={() => setShowPassAlert(false)} message={'Şifre yanlış'}></Alert>
    <Alert show={showWifiAlert} handleClose={() => setShowWifiAlert(false)} message={'İnternet bağlantısı bulunamadı'}></Alert>
  </div>
  );
};

export default TaskBar;
