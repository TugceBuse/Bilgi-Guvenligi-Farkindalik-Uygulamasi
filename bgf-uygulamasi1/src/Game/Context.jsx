import React, { createContext, useContext, useState, useEffect } from 'react';
import {mails as initialMails } from './Mailbox/Mails'
// Context oluşturma
const GameContext = createContext();

// Context sağlayıcı (provider) bileşeni
export const GameContextProvider = ({ children }) => {
  const [seconds, setSeconds] = useState(0);
  const [isWificonnected, setIsWificonnected] = useState(false);
  const [updating_antivirus, setUpdating_antivirus] = useState(false);
  const [isantivirusuptodate, setAntivirusisuptodate] = useState(false);

  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [mails, setMails] = useState(initialMails);


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
    handleIconClick(windowName);
  };

  useEffect(() => {
    console.log(openWindows, activeWindow);
  }, [openWindows,activeWindow]);

  const handleIconClick = (windowName) => {
    if (activeWindow === windowName) {
      setActiveWindow(null);
    } else {
      setActiveWindow(windowName);
    }
  };

  return (
    <GameContext.Provider 
    value=
    {{ seconds,
     isWificonnected, setIsWificonnected,
     isantivirusuptodate, setAntivirusisuptodate,
     updating_antivirus, setUpdating_antivirus,
     openWindows, toggleWindow, 
     activeWindow, setActiveWindow,
     handleIconClick,
     mails, setMails
    }}>
      {children}
    </GameContext.Provider>
  );
};

// Context'i kullanmak için özel kanca (hook)
export const useGameContext = () => {
  return useContext(GameContext);
};