import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useGameContext } from '../../Contexts/GameContext';
import { useUIContext } from '../../Contexts/UIContext';
import Alert from "../Notifications/Alert";
import "./Taskbar.css";
import { useMailContext } from '../../Contexts/MailContext'; 
import { useFileContext } from '../../Contexts/FileContext';
import { useVirusContext } from '../../Contexts/VirusContext';

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
  const [popupQueue, setPopupQueue] = useState([]); // 📌 Pop-up bildirimi yöneten state
  const popupTimeout = useRef(null);

  const pass = "1234";
  const navigate = useNavigate();
  const {
    isWificonnected, setIsWificonnected,
    updating_antivirus
  } = useGameContext();

  const { antivirusUpdated , antivirusUpdating } = useVirusContext();

  const { initMail, setInitMail, setSelectedMail,
    inboxMails, setInboxMails,
    spamboxMails, setSpamboxMails,
    notifiedMails, setNotifiedMails,
  } = useMailContext(); 

  const {
    openWindows, activeWindow, setActiveWindow,
    visibleWindows, setVisibleWindows,
    handleIconClick, zindex, setZindex
  } = useUIContext();

  const { openedFiles, files } = useFileContext();

  const renderIcons = () => {
    // Tekrar eden öğeleri engellemek için `Set` kullanıyoruz
    const uniqueWindows = [...new Set([...openWindows, ...openedFiles])];

    return uniqueWindows.map((windowName) => {
        const appConfig = windowConfig[windowName]; // Eğer bir uygulama ise
        const fileConfig = files[windowName]; // Eğer bir dosya ise

        if (!appConfig && !fileConfig) {
            console.warn(`❌ Taskbar'da bilinmeyen pencere/dosya: ${windowName}`);
            return null;
        }

        return (
            <img
                key={appConfig ? `app-${windowName}` : `file-${windowName}`} // Aynı isimde çakışmayı önler
                src={appConfig?.icon || fileConfig?.icon || "/icons/file.png"} // Doğru ikon kullanılıyor
                alt={`${windowName} Icon`}
                className={activeWindow === windowName ? 'active' : ''}
                onClick={() => handleIconClickWithVisibility(windowName)}
            />
        );
    });
  };


  // Bildirim Silme Fonksiyonu
  const handleDeleteNotification = (mail) => {
    setNotifiedMails(prevNotifiedMails => prevNotifiedMails.filter(m => m.id !== mail.id));
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

    const isFile = files[windowName] !== undefined;
    const innerSelector = isFile 
    ? `[data-filename="${windowName}"]` 
    : `.${windowName}-window`;

    const innerElement = document.querySelector(innerSelector);
    const element = isFile 
    ? innerElement?.closest('.file-window') 
    : innerElement;

    if(!element) {
      console.log(`.${windowName}-window elementi bulunamadı`);
    return;
    }

    // İlk çalışmada orijinal display değerini kaydet
    if (!element.dataset.originalDisplay) {
      const computedDisplay = getComputedStyle(element).display;
      element.dataset.originalDisplay = computedDisplay;
    }

    if (activeWindow === windowName) {
        element.style.display = 'none';
        setVisibleWindows((prevVisibleWindows) => {
          const filteredWindows = prevVisibleWindows.filter(name => name !== windowName);
          return [...filteredWindows];
        });
      handleIconClick(windowName);
    } else {
      setZindex((prevZindex) => {
        let newZindex = prevZindex + 1;
        element.style.display = element.dataset.originalDisplay || 'flex';
        element.style.zIndex = `${newZindex}`;
        return newZindex;
      });
  
      setVisibleWindows((prevVisibleWindows) => {
        const filteredWindows = prevVisibleWindows.filter(name => name !== windowName);
        return [...filteredWindows, windowName];
      });
  
      handleIconClick(windowName);
    }
  };

  // Mail anlık bildirime tıklanma durumu(mailbox aç, maili seçili hale getir)
  const handleOpenMailbox = (mail) => {
    if (!isWificonnected) {
      setShowWifiAlert(true);
      return;
    }
  
    if (popupTimeout.current) {
      clearTimeout(popupTimeout.current); //  Kullanıcı tıklarsa timeout'u iptal et
      popupTimeout.current = null;
    }
  
    setSelectedMail(mail);
  
    setInboxMails(prevMails =>
      prevMails.map(m => 
        m.id === mail.id ? { ...m, readMail: true } : m
      )
    );    
  
    if (!openWindows.includes('mailbox')) {
      toggleWindow('mailbox');
    }
  
    setNotifiedMails(prevNotifiedMails => 
      prevNotifiedMails.filter(m => m.id !== mail.id)
    );
    setPopupQueue(prev => prev.slice(1)); //  Tıklanınca popup sırasını ilerlet
    setShowNotifications(false);
  };
  

   // 📌 **Rastgele Zamanlarda Bildirim Çıkartma**
  // useEffect(() => {
  //   const showRandomNotification = () => {

  //     if(!isWificonnected) return;
      
  //     const unread = initMail.filter(mail => !mail.readMail && !mail.notified && !mail.used);
  //     if (unread.length > 0) {
  //       const randomMail = unread[Math.floor(Math.random() * unread.length)];

  //       setPopupNotification(randomMail);

  //       // Seçilen rastgele mail bildirim olarak gösterilmiş sayılacak
  //       setInitMail(prevMails =>
  //         prevMails.map(m =>
  //           m.id === randomMail.id ? { ...m, notified: true, used: true } : m
  //         )
  //       );
  //       setInboxMails(prevMails => [{ ...randomMail, notified: true, used: true }, ...prevMails]);
  //       // 📌 Eğer kullanıcı 8 saniye içinde bildirime basmazsa bildirim kutusuna ekle
  //       popupTimeout.current = setTimeout(() => {
  //         setNotifiedMails(prev => [randomMail, ...prev]);
  //         setPopupNotification(null);
  //       }, 8000);
  //     }else{
  //       // 📌 Eğer okunmamış mail kalmamışsa bildirim çıkartma işlemi durdur
  //       clearInterval(interval);
  //     }
  //   };

  //   // 📌 Rastgele 30-90 saniye arasında bir süre belirle
  //   const interval = setInterval(showRandomNotification, Math.floor(Math.random() * 5 + 10) * 1000);

  //   return () => clearInterval(interval);
  // }, [ initMail, isWificonnected ]);



    // useEffect(() => {
    //   setNotifiedMails((initMail.filter(mail => !mail.readMail && mail.notified && mail.used)));
    // }, []);

  // 📌 **Yeni Mail Geldiğinde Bildirim Gösterme**
  useEffect(() => {
    if (!isWificonnected) return;
  
    const newUnreadMails = inboxMails.filter(mail => 
      !mail.readMail && mail.used && !mail.notified &&
      !popupQueue.some(q => q.id === mail.id) && // Popup'ta da yoksa
      !notifiedMails.some(n => n.id === mail.id)  // Bildirim kutusunda da yoksa
    );
  
    if (newUnreadMails.length > 0) {
      const newMail = { ...newUnreadMails[0], notified: true }; // direk notified:true yap
  
      setInboxMails(prevMails =>
        prevMails.map(m => (m.id === newMail.id ? newMail : m))
      );
  
      setPopupQueue(prev => [...prev, newMail]);
    }
  }, [inboxMails, isWificonnected]);

  // useEffect(() => {
  //   console.log("Popup Queue:", popupQueue);
  // }, [popupQueue]);

  // useEffect(() => {
  //   console.log("Notified Mails:", notifiedMails);
  // }, [notifiedMails]);

  // useEffect(() => {
  //   console.log("Inbox Mails:", inboxMails);
  // }, [inboxMails]);

  
  

    // 📌 **Pop-up Bildirimini Gösterme**
    useEffect(() => {
      if (popupQueue.length > 0 && !popupTimeout.current) {
        const timer = setTimeout(() => {
          const currentMail = popupQueue[0]; // 📌 Son eklenen mail
    
          // 📌 8 saniye sonunda popup kayboluyor ve bildirim kutusuna düşüyor
          setNotifiedMails(prev => [currentMail, ...prev]);
          setPopupQueue(prev => prev.slice(1)); // 📌 Son maili çıkar (stack mantığı)
          popupTimeout.current = null; // 📌 Yeni popup için hazır hale getir
        }, 3000);
    
        popupTimeout.current = timer;
      }
    }, [popupQueue]);
    
    

  useEffect(() => {
    setActiveWindow(visibleWindows[visibleWindows.length - 1]);
  }, [visibleWindows]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const setAntivirus = () => {
    if (antivirusUpdating) {
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
    } else if (antivirusUpdated) {
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
      {popupQueue.length > 0 && (
        <div className="popup-notification" onClick={() => handleOpenMailbox(popupQueue[0])}>
          <img style={{width:30, height:30}} src="/icons/mail.png" alt="Mail Icon" />
          <h4>{popupQueue[0].title}</h4>
          <p>{popupQueue[0].precontent}</p>
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
      {windowConfig.antivirus.available && (
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
