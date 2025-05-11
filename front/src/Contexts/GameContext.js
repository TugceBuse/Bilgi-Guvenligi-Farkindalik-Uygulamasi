import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMailContext } from './MailContext';

const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [seconds, setSeconds] = useState(0); // oyun süresi
  const [isWificonnected, setIsWificonnected] = useState(false);
  const [updating_antivirus, setUpdating_antivirus] = useState(false);
  const [wifiMailSent, setWifiMailSent] = useState(false); // Wi-Fi bağlantısı için mail gönderildi mi kontrolü
  const [isTaskAppInstalled, setIsTaskAppInstalled] = useState(false); // Task App'in kurulu olup olmadığını kontrol et

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

  const constUser = {
    email: "hilal.kaya@oriontech.colum",
    phone: "054164944",
    adres: "Atatürk Mahallesi, Gökkuşağı Sokak No:17/3, 34850, Yıldızlı İlçesi, İstanbul",
    tcNo: "1716",
    digitalPassword: "123456",
    cardNumber: '54545454',
    cardName: 'Tugce Buse',
    cardExpiryDate: '05/26',
    cardCVV: '123',
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
    cardNumber: constUser.cardNumber,
    cardName: constUser.cardName,
    cardExpiryDate: constUser.cardExpiryDate,
    cardCVV: constUser.cardCVV,
    saveCard: false,
    adres: constUser.adres
  });

  const [productInfo, setProductInfo] = useState({
    productIDs: []
  });

  const [BankInfo, setBankInfo] = useState({
    rememberMe: false,
    savedTcNo: '',
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
      addMailToMailbox('inbox', 5);
      addMailToMailbox('inbox', 1);
      addMailToMailbox('inbox', 2);
      addMailToMailbox('spam', 31);
      addMailToMailbox('spam', 32);
  
      // 📢 30 saniye sonra 3 numaralı maili inbox'a ekle
      const timeoutId = setTimeout(() => {
        console.log('📩 30 saniye sonra 3 numaralı mail gönderiliyor...');
        addMailToMailbox('inbox', 3);
      }, 30000); // 30 saniye = 30000 ms
  
      setWifiMailSent(true);
  
      // Temizlik: component unmount olursa timeout iptal olsun
      return () => clearTimeout(timeoutId);
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
        isTaskAppInstalled,
        setIsTaskAppInstalled,
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
        constUser,
        BankInfo,
        setBankInfo,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(GameContext);
};