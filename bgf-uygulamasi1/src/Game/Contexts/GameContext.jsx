import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [seconds, setSeconds] = useState(0); // oyun süresi
  const [isWificonnected, setIsWificonnected] = useState(false);
  const [updating_antivirus, setUpdating_antivirus] = useState(false);
  const [isantivirusuptodate, setAntivirusisuptodate] = useState(false);
  const [isransomware, setIsransomware] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <GameContext.Provider value={{ seconds, isWificonnected, setIsWificonnected, updating_antivirus, setUpdating_antivirus, isantivirusuptodate, setAntivirusisuptodate, isransomware, setIsransomware }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(GameContext);
};