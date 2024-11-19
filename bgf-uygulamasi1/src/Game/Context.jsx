import React, { createContext, useContext, useState, useEffect } from 'react';

// Context oluşturma
const GameContext = createContext();

// Context sağlayıcı (provider) bileşeni
export const GameContextProvider = ({ children }) => {
  const [seconds, setSeconds] = useState(0);
  const [isWificonnected, setIsWificonnected] = useState(false);
  const [updating_antivirus, setUpdating_antivirus] = useState(false);
  const [isantivirusuptodate, setAntivirusisuptodate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <GameContext.Provider 
    value=
    {{ seconds,
     isWificonnected, setIsWificonnected,
     isantivirusuptodate, setAntivirusisuptodate,
     updating_antivirus, setUpdating_antivirus
    }}>
      {children}
    </GameContext.Provider>
  );
};

// Context'i kullanmak için özel kanca (hook)
export const useGameContext = () => {
  return useContext(GameContext);
};