import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMailContext } from './MailContext';
import { statusSteps } from '../utils/cargoStatus';
import { useTimeContext } from './TimeContext'; // 🆕
import { useSecurityContext } from './SecurityContext';

const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  // Zaman artık TimeContext'ten alınacak!
  const { seconds, secondsRef, gameStart, getRelativeDate } = useTimeContext();

  // --- Mevcut State'ler ---
  const {isWificonnected, setIsWificonnected} = useSecurityContext()
  const [updating_antivirus, setUpdating_antivirus] = useState(false);
  const [wifiMailSent, setWifiMailSent] = useState(false);
  const [isTaskAppInstalled, setIsTaskAppInstalled] = useState(false);
  const { addMailToMailbox } = useMailContext();
  const [cardBalance, setCardBalance] = useState("12345");
  const [cargoTrackingList, setCargoTrackingList] = useState([]);
  const [cargoTrackingSiteVisited, setCargoTrackingSiteVisited] = useState({});

  // Kullanıcı bilgileri ve site bazlı bilgiler (aynen korunur)
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

  const [orders, setOrders] = useState([]);
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
  });

  // Kargo takibi fonksiyonları
  const addCargoTracking = ({ trackingNo, shippingCompany, startSeconds }) => {
    setCargoTrackingList(prev => [
      ...prev,
      {
        trackingNo,
        shippingCompany,
        startSeconds,
        currentStep: 0,
        delivered: false,
      }
    ]);
  };

  const updateCargoStep = (trackingNo, step, statusSteps) => {
    setCargoTrackingList(prev => prev.map(item =>
      item.trackingNo === trackingNo
        ? { ...item, currentStep: step, delivered: step === statusSteps.length - 1 }
        : item
    ));
  };

  const [TechInfoF, setTechInfoF] = useState({
    name: '',
    surname: '',
    email: constUser.email,
    password: '',
    phone: constUser.phone,
    isRegistered: false,
    isLoggedIn: false,
    isPasswordStrong: false,
    cardNumber: constUser.cardNumber,
    cardName: constUser.cardName,
    cardExpiryDate: constUser.cardExpiryDate,
    cardCVV: constUser.cardCVV,
    saveCard: false,
    adres: constUser.adres,
    tckn: "",
    birthDate: "",
    motherMaiden: "",
    acceptedPreApprovedLoan: false,
    acceptedCampaignTerms: false,
    isGuest: null
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

  // CloudBox
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

  const [openDropPublicFiles, setOpenDropPublicFiles] = useState([
    { label: "YeniÇıkanlar2025.pdf", type: "pdf", size: "2.1 MB", url: "https://opendrop.com/file/yenicikanlar2025ab2x" },
    { label: "EtkinlikPosteri.jpg", type: "jpg", size: "1.4 MB", url: "https://opendrop.com/file/etkinlikposteri9sd7" }
  ]);

  // --- Kargo takibi için zaman bazlı adım güncelleyici (TimeContext ile) ---
  useEffect(() => {
    setCargoTrackingList(prevList =>
      prevList.map(item => {
        if (item.startSeconds == null) return item;
        let elapsed = seconds - item.startSeconds;
        let total = 0, currentStep = 0;
        for (let i = 0; i < statusSteps.length; i++) {
          total += statusSteps[i].durationSeconds || 0;
          if (elapsed < total) {
            currentStep = i;
            break;
          } else {
            currentStep = i;
          }
        }
        const delivered = (currentStep === statusSteps.length - 1);
        return { ...item, currentStep, delivered };
      })
    );
  }, [seconds]);

  // Wifi bağlanınca ilk mailleri gönder (kendi fonksiyonunu bozmadan)
  useEffect(() => {
      addMailToMailbox('inbox', 5);
      addMailToMailbox('inbox', 1);
      addMailToMailbox('inbox', 2);
      addMailToMailbox('spam', 31);
      addMailToMailbox('spam', 32);
      const timeoutId = setTimeout(() => {
        addMailToMailbox('inbox', 3);
      }, 180000);
      return () => clearTimeout(timeoutId);
  }, []);

  return (
    <GameContext.Provider
      value={{
        // Zaman bilgisini isteyen componentler burada da ulaşabilir
        seconds,
        secondsRef,
        gameStart,
        getRelativeDate,
        isWificonnected, setIsWificonnected,
        updating_antivirus, setUpdating_antivirus,
        isTaskAppInstalled, setIsTaskAppInstalled,
        ProCareerHubInfo, setProCareerHubInfo,
        SkillForgeHubInfo, setSkillForgeHubInfo,
        PostifyInfo, setPostifyInfo,
        TechInfo, setTechInfo,
        cargoTrackingList, setCargoTrackingList,
        addCargoTracking,
        updateCargoStep,
        TechInfoF, setTechInfoF,
        orders, setOrders,
        productInfo, setProductInfo,
        constUser,
        BankInfo, setBankInfo,
        openlitePermissions, setOpenlitePermissions,
        cloudUser, setCloudUser,
        cloudBoxBackup, setCloudBoxBackup,
        openDropPublicFiles, setOpenDropPublicFiles,
        cardBalance, setCardBalance,
        cargoTrackingSiteVisited, setCargoTrackingSiteVisited,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
