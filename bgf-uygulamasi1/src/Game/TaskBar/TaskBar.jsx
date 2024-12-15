import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useGameContext } from '../Contexts/GameContext';
import { useUIContext } from '../Contexts/UIContext';
import { useWindowConfigState } from '../windowConfig';
import Alert from "../Notifications/Alert";
import "./Taskbar.css";

const TaskBar = () => {
  const [time, setTime] = useState(new Date());
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [shuttingDown, setShuttingDown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWifiList, setShowWifiList] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [selectedWifi, setSelectedWifi] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [wifiname, setwifiname] = useState('');

  const { windowConfig, updateDownloadedStatus } = useWindowConfigState();

  const pass = "1234";
  const navigate = useNavigate();
  const {
    isWificonnected, setIsWificonnected,
    updating_antivirus, isantivirusuptodate,
    isantivirusinstalled
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
      setShowAlert(true);
      setIsWificonnected(false);
    }
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
      handleIconClick(windowName);
    } else {
      if (element) {
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
      }
      handleIconClick(windowName);
    }
  };

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
        {isantivirusinstalled && (
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

          <div className="taskbar-notifications" onClick={toggleNotifications}>
            <img src="/icons/notification_blck.png" alt="Notification Icon" />
            {showNotifications && (
              <div className="notifications-window">
                <h3>Bildirimler</h3>
                <p>Henüz bir bildiriminiz yok.</p>
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
      <Alert show={showAlert} handleClose={() => setShowAlert(false)} message={'Şifre yanlış'}></Alert>
    </div>
  );
};

export default TaskBar;
