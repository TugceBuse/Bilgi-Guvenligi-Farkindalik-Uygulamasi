import React, { createContext, useContext, useState, useEffect } from 'react';

// Context oluşturma
const GameContext = createContext();

// Context sağlayıcı (provider) bileşeni
export const GameContextProvider = ({ children }) => {
  const [seconds, setSeconds] = useState(0);
  const [isWificonnected, setIsWificonnected] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <GameContext.Provider value={{ seconds, isWificonnected, setIsWificonnected}}>
      {children}
    </GameContext.Provider>
  );
};

// Context'i kullanmak için özel kanca (hook)
export const useGameContext = () => {
  return useContext(GameContext);
};