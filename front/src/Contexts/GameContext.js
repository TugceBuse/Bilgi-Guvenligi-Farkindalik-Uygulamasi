import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [seconds, setSeconds] = useState(0); // oyun süresi
  const [isWificonnected, setIsWificonnected] = useState(false);
  const [updating_antivirus, setUpdating_antivirus] = useState(false);
  const [isantivirusuptodate, setAntivirusisuptodate] = useState(false);
  const [isransomware, setIsransomware] = useState(false);
  const email = "hilal.kaya@oriontech.colum";
  const phone = "05416494438";


  // Kullanıcı bilgileri (sadece context içinde tutuluyor)
  const [ProCareerHubInfo, setProCareerHubInfo] = useState({
    name: '',
    surname: '',
    email: email,
    password: '',
    phone: phone,
    is2FAEnabled: false,
    isRegistered: false,
    isLoggedIn: false,
    isPasswordStrong: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <GameContext.Provider 
      value={{ 
        seconds, 
        isWificonnected, 
        setIsWificonnected, 
        updating_antivirus, 
        setUpdating_antivirus, 
        isantivirusuptodate, 
        setAntivirusisuptodate, 
        isransomware, 
        setIsransomware,
        ProCareerHubInfo,
        setProCareerHubInfo
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(GameContext);
};