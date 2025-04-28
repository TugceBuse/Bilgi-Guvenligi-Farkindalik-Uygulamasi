import React, { useState, useRef, useEffect } from 'react';
import styles from './BankApp.module.css';
import { MakeDraggable } from '../../utils/Draggable';
import { useUIContext } from '../../Contexts/UIContext';
import { useGameContext } from '../../Contexts/GameContext';

export const useBankApp = () => {
    const { toggleWindow } = useUIContext();
  
    const openHandler = () => {
      toggleWindow('bankapp');
    };
  
    const closeHandler = () => {
      toggleWindow('bankapp');
    };
  
    return { openHandler, closeHandler };
  };

const BankApp = ({ closeHandler, style }) => {
  const { constUser, BankInfo, setBankInfo } = useGameContext(); // GameContext'ten constUser'ı çekiyoruz
  const BankAppRef = useRef(null);
  MakeDraggable(BankAppRef, `.${styles.bankHeader}`);

 

  const [page, setPage] = useState('login'); // login veya dashboard
  const [tcNo, setTcNo] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Error state'ler
  const [errors, setErrors] = useState({
    tcNo: '',
    password: '',
    login: ''
  });

  const handleLogin = () => {
    let newErrors = { tcNo: '', password: '', login: '' };
  
    if (!tcNo.trim()) {
      newErrors.tcNo = 'TC kimlik numarası zorunludur.';
    }
    if (!password.trim()) {
      newErrors.password = 'Şifre zorunludur.';
    }
  
    if (tcNo && password) {
      if (tcNo === constUser.tcNo && password === constUser.digitalPassword) {
        setPage('dashboard');
        return;
      } else {
        newErrors.login = 'Giriş bilgileriniz hatalıdır.';
      }
    }
    setErrors(newErrors);
  };

    useEffect(() => {
        if (BankInfo.rememberMe) {
            setTcNo(constUser.tcNo);
        } else {
            setTcNo('');
        }
    }, [BankInfo.rememberMe]);


  return (
    <div className={styles.bankWindow} style={style} ref={BankAppRef}>
        <div className={styles.bankHeader}>
            <h2>NovaBank</h2>
            <button className={styles.bankClose} onClick={closeHandler}>×</button>
        </div>
      {page === 'login' && (
        <div className={styles.loginPage}>
            <div className={styles.leftPanel}>
                <img src="/novaBank/novaLogo.png" alt="Nova Logo" className={styles.logo} />
                <h2>NovaBank Şubemize Hoşgeldiniz</h2>
                <div className={styles.inputGroup}>
                    <label>TC/Müşteri No</label>
                    <input
                        type="text"
                        value={tcNo}
                        maxLength={10}
                        onChange={(e) => setTcNo(e.target.value)}
                        placeholder={errors.tcNo ? "Bu alan zorunludur" : "TC Kimlik Numaranız"}
                        className={errors.tcNo || errors.login ? styles.inputError : ''}
                    />
                    {errors.tcNo && <span className={styles.errorText}>{errors.tcNo}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                    <label>Dijital Bankacılık Şifresi</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={errors.password ? "Bu alan zorunludur" : "Şifreniz"}
                        className={errors.password || errors.login ? styles.inputError : ''}
                    />
                    {errors.password && <span className={styles.errorText}>{errors.password}</span>}
                </div>

                    {/* Genel login hatası */}
                    {errors.login && <div className={styles.errorText}>{errors.login}</div>}

                <div className={styles.options}>
                    <div className={styles.options}>
                        <label className={styles.switch}>
                            <input
                            type="checkbox"
                            checked={BankInfo.rememberMe}
                            onChange={() => setBankInfo(prev => ({
                                ...prev,
                                rememberMe: !prev.rememberMe
                              }))}
                            />
                            <span className={styles.slider}></span>
                        </label>
                        <span className={styles.switchLabel}>Beni Hatırla</span>
                    </div>
                    <button className={styles.forgotPassword}>Şifremi Unuttum</button>
                </div>

                <button className={styles.loginButton} onClick={handleLogin}>
                Giriş Yap
                </button>
            </div>

            <div className={styles.rightPanel}>
                <h3>NovaBank ile Güvendesiniz!</h3>
                <ul>
                <li>7/24 Müşteri Hizmeti</li>
                <li>Gelişmiş Şifreleme Teknolojisi</li>
                <li>Hızlı Para Transferleri</li>
                </ul>
            </div>
        </div>
      )}

      {page === 'dashboard' && (
        <div className={styles.dashboard}>
          <div className={styles.dashboardHeader}>
            <div className={styles.userInfo}>
              Hoşgeldin, Onur Yılmaz
            </div>
          </div>
          <div className={styles.accountInfo}>
            <div className={styles.card}>
              <h3>Kart Bilgileri</h3>
              <p>Kart No: 1234 5678 9012 3456</p>
            </div>
            <div className={styles.card}>
              <h3>IBAN</h3>
              <p>TR12 3456 7890 1234 5678 9012 34</p>
            </div>
            <div className={styles.card}>
              <h3>Bakiye</h3>
              <p>₺ 12,345.67</p>
            </div>
          </div>
          <div className={styles.otherServices}>
            <h3>Diğer Bankacılık İşlemleri</h3>
            <button disabled>Para Transferi (Kapalı)</button>
            <button disabled>Fatura Ödeme (Kapalı)</button>
            <button disabled>Kredi Başvurusu (Kapalı)</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankApp;
