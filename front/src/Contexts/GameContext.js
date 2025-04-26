import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [seconds, setSeconds] = useState(0); // oyun süresi
  const [isWificonnected, setIsWificonnected] = useState(false);
  const [updating_antivirus, setUpdating_antivirus] = useState(false);

  const constUser = {
    email: "hilal.kaya@oriontech.colum",
    phone: "05416494438",
    adres: "Atatürk Mahallesi, Gökkuşağı Sokak No:17/3, 34850, Yıldızlı İlçesi, İstanbul",
  };

  // PROCAREERHUB - Kullanıcı bilgileri (sadece context içinde tutuluyor)
  const [ProCareerHubInfo, setProCareerHubInfo] = useState({
    name: '',
    surname: '',
    email: constUser.email,
    password: '',
    phone: constUser.phone,
    is2FAEnabled: false,
    isRegistered: false,
    isLoggedIn: false,
    isPasswordStrong: false,
  });

  // SKILLFORGEHUB - Kullanıcı bilgileri (sadece context içinde tutuluyor)
  const [SkillForgeHubInfo, setSkillForgeHubInfo] = useState({
    name: '',
    surname: '',
    email: constUser.email,
    password: '',
    phone: constUser.phone,
    is2FAEnabled: false,
    isRegistered: false,
    isLoggedIn: false,
    isPasswordStrong: false,
  });

  // POSTİFY - Kullanıcı bilgileri (sadece context içinde tutuluyor)
  const [PostifyInfo, setPostifyInfo] = useState({
    name: '',
    surname: '',
    email: constUser.email,
    password: '',
    phone: constUser.phone,
    is2FAEnabled: false,
    isRegistered: false,
    isLoggedIn: false,
    isPasswordStrong: false,
    privacySettings: "Herkese Açık",
  });

   // TECHDEPO - Kullanıcı bilgileri (sadece context içinde tutuluyor)
   const [TechInfo, setTechInfo] = useState({
    name: '',
    surname: '',
    email: constUser.email,
    password: '',
    phone: constUser.phone,
    is2FAEnabled: false,
    isRegistered: false,
    isLoggedIn: false,
    isPasswordStrong: false,
    cardNumber: '54545454',
    cardName: 'Tugce Buse',
    cardExpiryDate: '05/26',
    cardCVV: '123',
    saveCard: false,
    adres: constUser.adres
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
        ProCareerHubInfo,
        setProCareerHubInfo,
        SkillForgeHubInfo,
        setSkillForgeHubInfo,
        PostifyInfo,
        setPostifyInfo, 
        TechInfo,
        setTechInfo,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(GameContext);
};