import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMailContext } from './MailContext';

const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [seconds, setSeconds] = useState(0); // oyun süresi
  const [isWificonnected, setIsWificonnected] = useState(false);
  const [updating_antivirus, setUpdating_antivirus] = useState(false);
  const [wifiMailSent, setWifiMailSent] = useState(false); // Wi-Fi bağlantısı için mail gönderildi mi kontrolü

  const { addMailToMailbox } = useMailContext();

  const [gameStart, setGameStart] = useState(() => {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      hour: now.getHours(),
      minute: now.getMinutes()
    };
  });

  const email = "hilal.kaya@oriontech.colum";
  const phone = "05416494438";

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

  const [productInfo, setProductInfo] = useState({
    productIDs: []
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isWificonnected && !wifiMailSent) {
      console.log('🌐 İnternete ilk bağlanıldı, mailler gönderiliyor...');
      addMailToMailbox('inbox', 1);
      addMailToMailbox('inbox', 2);
      addMailToMailbox('spam', 1);
      addMailToMailbox('spam', 2);
      setWifiMailSent(true); // 📢 Artık tekrar çalışmaz
    }
  }, [isWificonnected, wifiMailSent]);


  const getRelativeDate = ({ days = 0, months = 0, hours = 0, minutes = 0 }) => {
    const baseDate = new Date(
      gameStart.year,
      gameStart.month - 1,
      gameStart.day,
      gameStart.hour,
      gameStart.minute || 0
    );

    baseDate.setMonth(baseDate.getMonth() + months);
    baseDate.setDate(baseDate.getDate() + days);
    baseDate.setHours(baseDate.getHours() + hours);
    baseDate.setMinutes(baseDate.getMinutes() + minutes);

    return {
      year: baseDate.getFullYear(),
      month: baseDate.getMonth() + 1,
      day: baseDate.getDate(),
      hour: baseDate.getHours(),
      minute: baseDate.getMinutes()
    };
  };

  return (
    <GameContext.Provider 
      value={{ 
        seconds,
        gameStart,
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
        getRelativeDate,
        productInfo,
        setProductInfo,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(GameContext);
};