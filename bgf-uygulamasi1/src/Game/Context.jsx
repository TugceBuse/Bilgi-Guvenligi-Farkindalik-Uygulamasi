import React, { createContext, useContext, useState, useEffect } from 'react';
import {mails as initialMails } from './Mailbox/Mails'
import {sentMails as initialsentMails}  from './Mailbox/Mails'

// Context oluşturma
const GameContext = createContext();

// Context sağlayıcı (provider) bileşeni
export const GameContextProvider = ({ children }) => {

  const [seconds, setSeconds] = useState(0);//oyun süresi

  //Ağ bağlantısı ve antivirüs güncellemesi için state'ler
  const [isWificonnected, setIsWificonnected] = useState(false);
  const [updating_antivirus, setUpdating_antivirus] = useState(false);
  const [isantivirusuptodate, setAntivirusisuptodate] = useState(false);

  //virusler
  const [isransomware, setIsransomware] = useState(false);

  //Pencere yönetimi için state'ler
  const [openWindows, setOpenWindows] = useState([]);
  const [visibleWindows, setVisibleWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [zindex , setZindex] = useState(100);

  //mail.js den import edilen mail state'i
  const [mails, setMails] = useState(initialMails);
  const [sentMails, setSentMails] = useState(initialsentMails);

  
  


  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleWindow = (windowName) => {
    setOpenWindows((prevOpenWindows) =>
      prevOpenWindows.includes(windowName)
        ? prevOpenWindows.filter((name) => name !== windowName)
        : [...prevOpenWindows, windowName]
    );
    setVisibleWindows((prevVisibleWindows) =>
      prevVisibleWindows.includes(windowName)
        ? prevVisibleWindows.filter((name) => name !== windowName)
        : [...prevVisibleWindows, windowName]
    );
    handleIconClick(windowName);
  };

  const handleIconClick = (windowName) => {
    if (activeWindow === windowName) {
     setActiveWindow(null);
    }
    else {
      setActiveWindow(windowName);
    }
  };

  return (
    <GameContext.Provider 
    value=
    {{  seconds,
        isWificonnected, setIsWificonnected,
        isantivirusuptodate, setAntivirusisuptodate,
        updating_antivirus, setUpdating_antivirus,
        openWindows, setOpenWindows,
        toggleWindow, 
        activeWindow, setActiveWindow,
        visibleWindows, setVisibleWindows,
        handleIconClick,
        mails, setMails,
        sentMails, setSentMails,
        zindex, setZindex,
        isransomware, setIsransomware
    }}>
      {children}
    </GameContext.Provider>
  );
};

// Context'i kullanmak için özel kanca (hook)
export const useGameContext = () => {
  return useContext(GameContext);
};