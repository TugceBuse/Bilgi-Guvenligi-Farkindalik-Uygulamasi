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
  const [visibleWindows, setVisibleWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [mails, setMails] = useState(initialMails);
  const [zindex , setZindex] = useState(100);


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

  useEffect(() => {
    console.log(`openWindows: ${openWindows} AKTIF:${activeWindow}`);
    console.log(`visibleWindows: ${visibleWindows}`);
  }, [openWindows,activeWindow,visibleWindows]);

  const handleIconClick = (windowName) => {
    if (activeWindow === windowName) {
     setActiveWindow(null);
    }
    else {
      setActiveWindow(windowName);
    }
  };

  useEffect(() => {
   console.log(zindex);
  },[zindex]);

  return (
    <GameContext.Provider 
    value=
    {{ seconds,
     isWificonnected, setIsWificonnected,
     isantivirusuptodate, setAntivirusisuptodate,
     updating_antivirus, setUpdating_antivirus,
     openWindows, setOpenWindows,
     toggleWindow, 
     activeWindow, setActiveWindow,
     visibleWindows, setVisibleWindows,
     handleIconClick,
     mails, setMails,
    zindex, setZindex
    }}>
      {children}
    </GameContext.Provider>
  );
};

// Context'i kullanmak için özel kanca (hook)
export const useGameContext = () => {
  return useContext(GameContext);
};