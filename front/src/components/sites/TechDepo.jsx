import React, { useState, useEffect, useRef } from "react";
import styles from "./TechDepo.module.css";
import { useGameContext } from "../../Contexts/GameContext";

const cards = [
  {
    id: 1,
    name: "UltraBook X200",
    price: "₺22.999",
    image: "/techDepo/computer1.jpg",
    description: "Yüksek performanslı, taşınabilir iş bilgisayarı.",
    seller: "TechDepo Bilgisayar",
    comments: [
      "Gerçekten çok hızlı, özellikle yazılım geliştirme için mükemmel.",
      "Klavye biraz küçük ama taşınabilirlik harika."
    ]
  },
  {
    id: 2,
    name: "LiteBook 14 Laptop",
    price: "₺18.499",
    image: "/techDepo/computer2.jpg",
    description: "Hafif ve taşınabilir yapısıyla günlük işler için ideal laptop.",
    seller: "Dijitek",
    comments: [
      "Ofis işleri için yeterli, taşımak çok kolay.",
      "Ekran parlaklığı biraz düşük ama f/p ürünü."
    ]
  },
  {
    id: 3,
    name: "SilentClick Mouse",
    price: "₺319",
    image: "/techDepo/mouse1.jpg",
    description: "Sessiz tıklama özelliğiyle ofis kullanımı için ideal ergonomik fare.",
    seller: "MouseLine Teknoloji",
    comments: [
      "Sessiz çalışıyor, iş yerinde çok işe yarıyor.",
      "Tıklama hissi yumuşak ama alışmak zaman aldı."
    ]
  },
  {
    id: 4,
    name: "NeonMouse RGB",
    price: "₺479",
    image: "/techDepo/mouse2.jpg",
    description: "RGB aydınlatmalı, yüksek hassasiyetli oyuncu faresi.",
    seller: "GamerX Donanım",
    comments: [
      "FPS oyunları için çok iyi, ışıkları da çok şık.",
      "Tuş konumu biraz alışılmışın dışında ama güzel."
    ]
  },
  {
    id: 5,
    name: "DeepSound Kulaklık",
    price: "₺689",
    image: "/techDepo/head1.jpg",
    description: "Gelişmiş mikrofonlu, kulak çevreleyen tasarım.",
    seller: "SesUzmanı Elektronik",
    comments: [
      "Mikrofon kalitesi çok iyi, toplantılar için birebir.",
      "Kulak yastıkları rahat ama biraz sıcak tutuyor."
    ]
  },
  {
    id: 6,
    name: "Compact Bass Kulaklık",
    price: "₺729",
    image: "/techDepo/head2.jpg",
    description: "Kablosuz bağlantılı, yüksek bas destekli kulaklık.",
    seller: "TechDepo Kulaklık",
    comments: [
      "Bluetooth bağlantısı stabil.",
      "Baslar oldukça güçlü, müzik keyfi yüksek."
    ]
  },
  {
    id: 7,
    name: "SlimBook i7 Laptop",
    price: "₺26.499",
    image: "/techDepo/computer3.jpg",
    description: "Gün boyu pil ömrü sunan ultra ince dizüstü bilgisayar.",
    seller: "NotebookCenter",
    comments: [
      "Şarjı uzun gidiyor, performansı da çok iyi.",
      "Fan sesi neredeyse yok, çok sessiz çalışıyor."
    ]
  },
  {
    id: 8,
    name: "OfficeMate Laptop",
    price: "₺17.999",
    image: "/techDepo/computer4.jpg",
    description: "Günlük kullanım ve ofis işleri için ideal laptop.",
    seller: "TechDepo Resmi Satıcısı",
    comments: [
      "Fiyatına göre başarılı.",
      "Klavyesi ergonomik ama ekran yansımalı."
    ]
  },
  {
    id: 9,
    name: "Surround Kulaklık",
    price: "₺899",
    image: "/techDepo/head3.jpg",
    description: "7.1 surround destekli oyun kulaklığı.",
    seller: "SesMaster",
    comments: [
      "Oyunlarda ses yönü harika.",
      "Kablo biraz uzun ama sağlam."
    ]
  },
  {
    id: 10,
    name: "FlexFit Kulaklık",
    price: "₺599",
    image: "/techDepo/head4.jpg",
    description: "Katlanabilir, hafif yapıda taşınabilir kulaklık.",
    seller: "Mobil Aksesuarlar",
    comments: [
      "Katlanabilir oluşu çantada taşıma açısından çok avantajlı.",
      "Ses kalitesi fiyatına göre iyi."
    ]
  },
  {
    id: 11,
    name: "ProRGB Klavye",
    price: "₺749",
    image: "/techDepo/key3.jpg",
    description: "RGB aydınlatmalı sessiz tuşlu klavye.",
    seller: "GameType",
    comments: [
      "Tuşlar sessiz, RGB çok canlı.",
      "Malzeme kalitesi harika."
    ]
  },
  {
    id: 12,
    name: "SilentBoard Klavye",
    price: "₺599",
    image: "/techDepo/key4.jpg",
    description: "Geceleri sessiz çalışma için optimize edilmiş klavye.",
    seller: "OfisPlus",
    comments: [
      "Tuş sesi neredeyse yok, gece rahatça kullanılıyor.",
      "Tuşlar yumuşak ve ergonomik."
    ]
  },
  {
    id: 13,
    name: "QuickMouse Lite",
    price: "₺289",
    image: "/techDepo/mouse3.jpg",
    description: "Kompakt ve ergonomik kablosuz fare.",
    seller: "MouseLine Teknoloji",
    comments: [
      "Küçük boyutu sayesinde rahat taşınıyor.",
      "Pil ömrü çok uzun."
    ]
  },
  {
    id: 14,
    name: "ErgoMouse X",
    price: "₺449",
    image: "/techDepo/mouse4.jpg",
    description: "Elde kaymayı önleyen özel yüzeye sahip fare.",
    seller: "TechDepo Donanım",
    comments: [
      "Kaymaz yüzeyi gerçekten etkili.",
      "Uzun süreli kullanımda bile el yormuyor."
    ]
  },
  {
    id: 15,
    name: "JetPrint 220 Yazıcı",
    price: "₺1.899",
    image: "/techDepo/printer1.jpg",
    description: "Renkli baskı destekli çok işlevli yazıcı.",
    seller: "BaskıMarket",
    comments: [
      "Kurulumu kolay, yazıcı hızı yeterli.",
      "WiFi özelliği çok pratik."
    ]
  },
  {
    id: 16,
    name: "TabOne 10.1\" Tablet",
    price: "₺5.499",
    image: "/techDepo/tablet1.jpg",
    description: "Geniş ekranlı, uzun pil ömürlü Android tablet.",
    seller: "MobilTek",
    comments: [
      "Ekranı çok net, dersler için aldım gayet yeterli.",
      "Bataryası uzun süre gidiyor."
    ]
  },
  {
    id: 17,
    name: "EduTab 8\" Tablet",
    price: "₺3.199",
    image: "/techDepo/tablet2.jpg",
    description: "Öğrenciler için optimize edilmiş taşınabilir tablet.",
    seller: "EduTeknoloji",
    comments: [
      "Çocuğum için aldım, çok memnunuz.",
      "Ders videoları ve temel uygulamalar için ideal."
    ]
  }
];


const TechDepo = ({scrollRef}) => {
  const { TechInfo, setTechInfo } = useGameContext();

  const [page, setPage] = useState("welcome");
  const [subPage, setSubPage] = useState("profileInfo");

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

  useEffect(() => {
    scrollRef?.current?.scrollTo?.({ top: 0, behavior: "auto" });
  }, [page]); // veya [subPage], [view], vb.

  const handleAuth = () => {
    const showError = (message) => {
      setErrorMessage(message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000); 
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
  
    setPage("welcome");
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

  const handleEdit = () => {
    setTechInfo({
      ...TechInfo,
      name: editableName,
      surname: editableSurname,
    });
  
    setInfoUpdated(true);
  
    setTimeout(() => {
      setInfoUpdated(false);
    }, 3000); 
  };


   const [showUserMenu, setShowUserMenu] = useState(false);
   const toggleUserMenu = () => setShowUserMenu(!showUserMenu);

   // Kullanıcı bilgilerini düzenlemek için state'ler
   const [editableName, setEditableName] = useState(TechInfo.name);
   const [editableSurname, setEditableSurname] = useState(TechInfo.surname);

   useEffect(() => {
     setEditableName(TechInfo.name);
     setEditableSurname(TechInfo.surname);
   }, [TechInfo.name, TechInfo.surname]);

   const [infoUpdated, setInfoUpdated] = useState(false); // ✔ güncellendi bildirimi
   const isChanged =
   editableName !== TechInfo.name ||
   editableSurname !== TechInfo.surname;


   // User menu dışına tıklanıldığında menüyü kapat
   // useRef ile referans alıyoruz
   const userMenuRef = useRef(null);
   useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setShowUserMenu(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
        
      {/* TechDepo navbar */}
      <div className={styles.header}>
            <div className={styles.logoContainer} onClick={() => setPage("welcome")}>
            <img src="/techDepo/techHome.png" alt="TechDepo Logo" className={styles.logo} />
            <h1>TechDepo</h1>
            <h4>Teknoloji Deposu</h4>
            </div>
     
            {TechInfo.isLoggedIn ? (
              <div className={styles.userPanel}   onClick={toggleUserMenu}>
                <p className={styles.userName}><img src={"/techDepo/programmer.png"} alt="user"/> {TechInfo.name} {TechInfo.surname}</p>
                {showUserMenu &&
                  <div className={styles.userActions} ref={userMenuRef}>
                  <button className={styles.settingsButton}  onClick={() => setPage("userProfile")}> Kullanıcı Bilgilerim</button>
                  <button className={styles.logoutButton} onClick={handleLogout}>Çıkış Yap</button>
                </div>
                }
              </div>
            ) : (
              <button className={styles.loginButton} 
              onClick={() => {
                setIsLogin(true);
                setPage("login");
              }}>
                Giriş Yap
              </button>
            )}
      </div>

      {/* TechDepo ana sayfa */}
      {page === "welcome" && (
        <div className={styles.welcome}>
          <div className={styles.productGrid}>
            {cards.map((card) => (
              <div key={card.id} className={styles.animatedCard}
                onClick={() => {
                  if (TechInfo.isLoggedIn) {
                    setPage(`product_${card.id}`);
                  } else {
                    setErrorMessage("Öncelikle giriş yapmalısınız!");
                    setTimeout(() => {
                      setErrorMessage("");
                    }, 3000); 
                    setPage("login");                      
                  }
                }}  
              >    
                <img src={card.image} alt={card.name} className={styles.productImage} />
                <h3>{card.name}</h3>
                <p>{card.price}</p>
                <button
                  className={styles.addButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (TechInfo.isLoggedIn) {
                      setPage("payment");
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

      {/* TechDepo spesifik ürün sayfası */}
      {page.startsWith("product_") && (
        <div className={styles.productDetail}>
          {(() => {
            const productId = parseInt(page.split("_")[1]);
            const product = cards.find((card) => card.id === productId);
            return (
              <div className={styles.detailCard}>
                <button className={styles.backButton} onClick={() => setPage("welcome")}>◀️ Geri</button>
                <img src={product.image} alt={product.name} className={styles.detailImage} />
                <h2>{product.name}</h2>
                <p><strong>Fiyat:</strong> {product.price}</p>
                <p><strong>Satıcı:</strong> {product.seller}</p>
                <p className={styles.description}>{product.description}</p>
                <div className={styles.comments}>
                  <h4>Yorumlar</h4>
                  <ul>
                    {product.comments.map((comment, i) => (
                      <li key={i}>🗨️ {comment}</li>
                    ))}
                  </ul>
                </div>
                
                <button className={styles.addButton} 
                onClick={(e) => {
                  e.stopPropagation();                   
                    setPage("payment");                     
                }}> 
                  <img src="/techDepo/add-to-cart.png" alt="add-to-cart"/> 
                  Sepete Ekle
                </button>
                
              </div>
            );
          })()}
        </div>
      )}

      {/* TechDepo giriş/kayıt olma sayfası */}
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

      {/* TechDepo ödeme sayfası */}
      {page === "payment" && (
        <div className={styles.paymentForm}>
          <h2>Ödeme Bilgileri</h2>
          <input type="text" placeholder="Kart Numarası" />
          <input type="text" placeholder="Son Kullanma Tarihi" />
          <input type="text" placeholder="CVV" />
          <button onClick={handlePayment}>Ödemeyi Tamamla</button>
        </div>
      )}

      {/* TechDepo kullanıcı bilgileri sayfası */}
      {page === "userProfile" && (
        <div className={styles.userProfile}>
          <div className={styles.sidebar}>
            <h3>Hesabım</h3>
            <ul>
               <li onClick={() => setSubPage("profileInfo")}>Kullanıcı Bilgilerim</li>
               <li onClick={() => setSubPage("cards")}>Kayıtlı Kartlarım</li>
            </ul>
          </div>

          <div className={styles.profileContent}>
            {subPage === "profileInfo" && (
              <>
                <div className={styles.profileForm}>
                  <h2>Kullanıcı Bilgilerim</h2>
                  <div className={styles.userBasicInfo}>
                    <strong>Ad:</strong>
                    <input value={editableName} onChange={(e) => setEditableName(e.target.value)} />
                    <strong>Soyad:</strong>
                    <input value={editableSurname} onChange={(e) => setEditableSurname(e.target.value)} />
                  </div>

                  <strong>Email:</strong>
                  <input value={email} disabled />

                  <strong>Telefon:</strong>
                  <input value={TechInfo.phone} disabled />

                  <button
                    onClick={handleEdit}
                    disabled={!isChanged}
                    className={isChanged ? styles.saveButton : styles.saveButtonDisabled}
                  >
                    Bilgilerimi Güncelle
                  </button>

                  {infoUpdated && (
                    <p className={styles.updateMessage}>Bilgiler başarıyla güncellendi ✅</p>
                  )}
                </div>


                <div className={styles.twoFactor}>
                  <div className={styles.twoFactorHeader}>
                    <h4>🔐 Çift Faktörlü Doğrulama</h4>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={TechInfo.is2FAEnabled}
                        onChange={(e) =>
                          setTechInfo({ ...TechInfo, is2FAEnabled: e.target.checked })
                        }
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                  <p className={styles.twoFactorDescription}>
                    Hesabınıza girişlerde ek güvenlik katmanı sağlar.
                  </p>
                </div>
                </>
            )}

                {subPage === "cards" && (
                  <div>
                    <h2>Kayıtlı Kartlarım</h2>
                    <p style={{color: "black"}}>💳 Henüz kart eklenmemiş.</p>
                    {/* Buraya ileride kart yönetimi eklersin */}
                  </div>
                )}
          </div>

        </div>
      )}


      <footer className={styles.footer}>
        <p>&copy; 2025 TechDepo</p>
      </footer>
    </div>
  );
};

export default TechDepo;