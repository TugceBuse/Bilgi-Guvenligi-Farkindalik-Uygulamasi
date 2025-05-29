import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMailContext } from './MailContext';

const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  // --- Mevcut State'ler ---
  const [seconds, setSeconds] = useState(0); // oyun süresi
  const [isWificonnected, setIsWificonnected] = useState(false);
  const [updating_antivirus, setUpdating_antivirus] = useState(false);
  const [wifiMailSent, setWifiMailSent] = useState(false);
  const [isTaskAppInstalled, setIsTaskAppInstalled] = useState(false);
  const { addMailToMailbox } = useMailContext();
  const [cardBalance, setCardBalance] = useState("12345"); // Başlangıç bakiyesi


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

  // --- Site bazlı bilgiler ---
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
    lockoutUntil: null,
    loginAttempts: 0
  });
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
    lockoutUntil: null,
    loginAttempts: 0
  });
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
    lockoutUntil: null,
    loginAttempts: 0
  });
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
    adres: constUser.adres,
    lockoutUntil: null,
    loginAttempts: 0,
    tckn: "",
    birthDate: "",
    motherMaiden: ""
  });

  const [productInfo, setProductInfo] = useState({
    productIDs: []
  });
  
  const [BankInfo, setBankInfo] = useState({
    rememberMe: false,
    lockoutUntil: null,
    loginAttempts: 0,
  });
  const [openlitePermissions, setOpenlitePermissions] = useState({
    permissionsOpened: true,
    fileAccess: true,
    printAccess: true,
    annotationAccess: true,
    microphone: true,
    camera: true
  });

  // --- CloudBox İçin Eklenenler ---
  const [cloudUser, setCloudUser] = useState({
    email: "",
    password: "",
    isLoggedIn: false
  });
  const [cloudBoxBackup, setCloudBoxBackup] = useState({
    files: [],
    packageLink: "",
    permissions: { isPublic: true, canDownload: true },
  });

  // Oyun süresi arttırıcı
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // İnternete ilk bağlanıldığında otomatik mailleri ekle
  useEffect(() => {
    if (isWificonnected && !wifiMailSent) {
      addMailToMailbox('inbox', 5);
      addMailToMailbox('inbox', 1);
      addMailToMailbox('inbox', 2);
      addMailToMailbox('spam', 31);
      addMailToMailbox('spam', 32);
      const timeoutId = setTimeout(() => {
        addMailToMailbox('inbox', 3);
      }, 30000);
      setWifiMailSent(true);
      return () => clearTimeout(timeoutId);
    }
  }, [isWificonnected, wifiMailSent]);

  return (
    <GameContext.Provider 
      value={{ 
        seconds,
        gameStart,
        isWificonnected, setIsWificonnected,
        updating_antivirus, setUpdating_antivirus,
        isTaskAppInstalled, setIsTaskAppInstalled,
        ProCareerHubInfo, setProCareerHubInfo,
        SkillForgeHubInfo, setSkillForgeHubInfo,
        PostifyInfo, setPostifyInfo,
        TechInfo, setTechInfo,
        getRelativeDate,
        productInfo, setProductInfo,
        constUser,
        BankInfo, setBankInfo,
        openlitePermissions, setOpenlitePermissions,
        cloudUser, setCloudUser,
        cloudBoxBackup, setCloudBoxBackup,
        cardBalance, setCardBalance,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
