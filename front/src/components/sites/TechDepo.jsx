import React, { useState, useEffect } from "react";
import styles from "./TechDepo.module.css";
import { useGameContext } from "../../Contexts/GameContext";

const cards = [
  {
    id: 1,
    name: "UltraBook X200",
    price: "₺22.999",
    image: "/techDepo/computer1.jpg"
  },
  {
    id: 2,
    name: "ProClick Mouse",
    price: "₺399",
    image: "/techDepo/computer2.jpg"
  },
  {
    id: 3,
    name: "Ses Yalıtımlı Kulaklık",
    price: "₺799",
    image: "/techDepo/mouse1.jpg"
  },
  {
    id: 4,
    name: "RGB Klavye",
    price: "₺649",
    image: "/techDepo/mouse2.jpg"
  },

  {
    id: 5,
    name: "RGB Klavye",
    price: "₺649",
    image: "/techDepo/head1.jpg"
  },

  {
    id: 6,
    name: "RGB Klavye",
    price: "₺649",
    image: "/techDepo/head2.jpg"
  },
  {
    id: 7,
    name: "RGB Klavye",
    price: "₺649",
    image: "/techDepo/head2.jpg"
  },
  {
    id: 8,
    name: "RGB Klavye",
    price: "₺649",
    image: "/techDepo/head2.jpg"
  },
  {
    id: 9,
    name: "RGB Klavye",
    price: "₺649",
    image: "/techDepo/head2.jpg"
  },
  {
    id: 10,
    name: "RGB Klavye",
    price: "₺649",
    image: "/techDepo/head2.jpg"
  }

];

const TechDepo = () => {
  const { TechInfo, setTechInfo } = useGameContext();

  const [page, setPage] = useState("welcome");

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [password, setPassword] = useState("");
  const isPasswordStrongEnough = (password) => {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&._-]).{8,}$/.test(password);
  };
  const passwordStrong = isPasswordStrongEnough(password);
  const [newPassword, setNewPassword] = useState("");
  const [successPassword, setSuccessPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const email = TechInfo.email;

  useEffect(() => {
          if(!TechInfo.isLoggedIn) {
              setName("");
              setSurname("");
              setPassword("");
              setErrorMessage("");
          } 
    }, [TechInfo.isLoggedIn]);

  const handleAuth = () => {
    const showError = (message) => {
      setErrorMessage(message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000); // 3 saniye sonra silinir
    };
  
    if (!isLogin) {
      if (TechInfo.isRegistered && TechInfo.email === email) {
        showError("Bu e-posta adresi ile zaten bir hesap oluşturulmuş!");
        return;
      }
      if (!name || !surname || !password) {
        showError("Lütfen tüm alanları doldurun!");
        return;
      }
  
      setTechInfo({
        ...TechInfo,
        name,
        surname,
        password,
        phone: "05416494438",
        is2FAEnabled: false,
        isRegistered: true,
        isLoggedIn: true,
        isPasswordStrong: passwordStrong,
      });
      setErrorMessage("");
    } else {
      if (!TechInfo.isRegistered || TechInfo.email !== email) {
        showError("Bu e-posta ile kayıtlı bir hesap bulunmamaktadır");
        return;
      }
      if (!password || password !== TechInfo.password) {
        showError("Hatalı şifre! Lütfen tekrar deneyin");
        return;
      }
  
      setTechInfo({
        ...TechInfo,
        isLoggedIn: true,
      });
      setErrorMessage("");
    }
  
    setPage("products");
  };
  
  const handleLogout = () => {
    setTechInfo({
      ...TechInfo,
      isLoggedIn: false,
    });
    setName("");
    setSurname("");
    setPassword("");
    setPage("welcome");
  };

  const handleSignInOut = () => {
    setIsLogin(!isLogin);
    setName("");
    setSurname("");
    setPassword("");
    setErrorMessage("");
  };

  const handlePayment = () => {
   
  };

  return (
    <div className={styles.container}>
        
      <div className={styles.header}>
            <div className={styles.logoContainer} onClick={() => setPage("welcome")}>
            <img src="/techDepo/techHome.png" alt="TechDepo Logo" className={styles.logo} />
            <h1>TechDepo</h1>
            <h4>Teknoloji Deposu</h4>
            </div>
            {TechInfo.isLoggedIn ? (
              <div className={styles.userPanel}>
                <p className={styles.userName}>👤 {TechInfo.name}</p>
                <div className={styles.userActions}>
                  <button className={styles.settingsButton}>⚙ Ayarlar</button>
                  <button className={styles.logoutButton} onClick={handleLogout}>Çıkış Yap</button>
                </div>
              </div>
            ) : (
              <button className={styles.loginButton} onClick={() => setPage("login")}>
                Giriş Yap
              </button>
            )}
      </div>

      {page === "welcome" && (
        <div className={styles.welcome}>
          <div className={styles.productGrid}>
            {cards.map((card) => (
              <div key={card.id} className={styles.animatedCard}>
                <img src={card.image} alt={card.name} className={styles.productImage} />
                <h3>{card.name}</h3>
                <p>{card.price}</p>
                <button
                  className={styles.addButton}
                  onClick={() => {
                    if (TechInfo.isLoggedIn) {
                      setPage("products");
                    } else {
                      setErrorMessage("Öncelikle giriş yapmalısınız!");
                      setTimeout(() => {
                        setErrorMessage("");
                      }, 3000); 
                      setPage("login");                      
                    }
                  }}
                >
                  Sepete Ekle
                </button>

              </div>
            ))}
          </div>
        </div>
      )}

      {page === "login" && !TechInfo.isLoggedIn && (
        <div className={styles.loginForm}>
          <h2>{isLogin ? "Giriş Yap" : "Kayıt Ol"}</h2>
          {!isLogin && (
            <>
              <input type="text" placeholder="Ad" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="text" placeholder="Soyad" value={surname} onChange={(e) => setSurname(e.target.value)} />
            </>
          )}
          <input className="disabled-input" type="email" placeholder="E-posta adresiniz" readOnly value={email} />
          <input type="password" placeholder="Şifreniz" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleAuth}>{isLogin ? "Giriş Yap" : "Kayıt Ol"}</button>
          {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}

          <p onClick={handleSignInOut}>
            {isLogin ? "Hesabınız yok mu? Kayıt olun!" : "Zaten üye misiniz? Giriş yapın!"}
          </p>
        </div>
      )}

      {page === "products" && (
        <div className={styles.products}>
          <h2>İndirimli Ürünler</h2>
          <div className={styles.productGrid}>
            {cards.map((card) => (
              <div key={card.id} className={styles.animatedCard}>
                <img src={card.image} alt={card.name} className={styles.productImage} />
                <h3>{card.name}</h3>
                <p>{card.price}</p>
                <button className={styles.addButton} onClick={() => setPage("payment")}>Sepete Ekle</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {page === "payment" && (
        <div className={styles.paymentForm}>
          <h2>Ödeme Bilgileri</h2>
          <input type="text" placeholder="Kart Numarası" />
          <input type="text" placeholder="Son Kullanma Tarihi" />
          <input type="text" placeholder="CVV" />
          <button onClick={handlePayment}>Ödemeyi Tamamla</button>
        </div>
      )}

      <footer className={styles.footer}>
        <p>&copy; 2025 TechDepo - Sahte Görev Senaryosu</p>
      </footer>
    </div>
  );
};

export default TechDepo;