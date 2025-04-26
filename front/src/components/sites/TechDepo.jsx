import React, { useState, useEffect, useRef } from "react";
import styles from "./TechDepo.module.css";
import { useGameContext } from "../../Contexts/GameContext";

const cards = [
  {
    id: 1,
    name: "UltraBook X200",
    price: "22999",
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
    price: "18499",
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
    price: "319",
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
    price: "479",
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
    price: "689",
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
    price: "729",
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
    price: "26499",
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
    price: "17999",
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
    price: "899",
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
    price: "599",
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
    price: "749",
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
    price: "599",
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
    price: "289",
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
    price: "449",
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
    price: "4899",
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
    price: "5499",
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
    price: "3199",
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
  const [orders, setOrders] = useState([]);

  const [cartItems, setCartItems] = useState([]);

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
  }, [page, subPage]);

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
    getCartItemCount(0);
    setCartItems([]);
  };

  const handleSignInOut = () => {
    setIsLogin(!isLogin);
    setName("");
    setSurname("");
    setPassword("");
    setErrorMessage("");
  };

  // Sepete ekleme bildirimi için state
  const [showCartNotice, setShowCartNotice] = useState(false);


  // Sepete ekleme bildirimi için fonksiyon
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find(item => item.id === product.id);
  
      if (existing) {
        // aynı üründen varsa, sadece quantity artır
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // yoksa yeni ürün olarak ekle
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  
    setShowCartNotice(true);
    setTimeout(() => setShowCartNotice(false), 1000);
  };
  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  

  // Sepetten kaldırmak için fonksiyon
  const removeFromCart = (productId, forceDelete = false) => {
    setCartItems(prevItems => {
      return prevItems
        .map(item => {
          if (item.id === productId) {
            if (forceDelete || item.quantity === 1) {
              return null; // tamamen kaldırılacak
            } else {
              return { ...item, quantity: item.quantity - 1 };
            }
          }
          return item;
        })
        .filter(Boolean); // null olanları (silinenler) at
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 2
    }).format(price);
  };

  const [selectedShippingPrice, setSelectedShippingPrice] = useState(0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.quantity * parseFloat(item.price), 0);
  const grandTotal = cartTotal + selectedShippingPrice;
  
  const [isPaying, setIsPaying] = useState(false);
  const [errors, setErrors] = useState({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [saveCard, setSaveCard] = useState(false);

  const handlePayment = () => {
    let newErrors = {};
  
    // Kart Bilgileri Kontrolü
    if (!cardNumber) newErrors.cardNumber = "Kart numarası zorunludur.";
    if (!cardName) newErrors.cardName = "Kart üzerindeki isim zorunludur.";
    if (!expiryDate) newErrors.expiryDate = "Son kullanma tarihi zorunludur.";
    if (!cvv) newErrors.cvv = "CVV zorunludur.";

    // Kargo Seçimi Kontrolü, Gizlilik Sözleşmesi Kontrolü
    if (!selectedShipping) newErrors.shipping = "Kargo seçimi zorunludur.";
    if (!acceptedTerms) newErrors.terms = "Gizlilik ve satış sözleşmesini onaylamalısınız.";
  
    // Kayıtlı kartla eşleşme kontrolü
    if (TechInfo) {
      const cardMatches =
        cardNumber === TechInfo.cardNumber &&
        cardName === TechInfo.cardName &&
        expiryDate === TechInfo.cardExpiryDate &&
        cvv === TechInfo.cardCVV;
    
      if (!cardMatches) {
        newErrors.registeredCard = "Kart bilgileri kayıtlı bilgilerle eşleşmiyor.";
      }
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    
      // 3 saniye sonra hataları sıfırla
      setTimeout(() => {
        setErrors({});
      }, 3000);
    
      return; // hatalıysa işlemi durdur
    }
    
  
    // Hatalar yoksa işlemi başlat
    setErrors({});
    setIsPaying(true);
    setShowCartNotice(true);

    setTimeout(() => {
      setIsPaying(false);
      setShowCartNotice(false);
      // Eğer kullanıcı 'Kartı kaydet' seçtiyse
      if (saveCard) {
        setTechInfo((prev) => ({
          ...prev,
          cardNumber: cardNumber,
          cardName: cardName,
          cardExpiryDate: expiryDate,
          cardCVV: cvv,
        }));
      }
      
      // 🆕 Sipariş ekleme
      const orderNumber = Math.floor(1000000000 + Math.random() * 9000000000); // 10 haneli random sipariş numarası
      setOrders(prevOrders => [
        ...prevOrders,
        {
          id: orderNumber,
          items: cartItems,
          shipping: selectedShipping,
          total: grandTotal,
          date: new Date().toLocaleString(),
        }
      ]);

      // Tüm alanları sıfırla
      setCardNumber("");
      setCardName("");
      setExpiryDate("");
      setCVV("");
      setSelectedShipping("");
      setAcceptedTerms(false);
      setSaveCard(false);
      setSelectedShippingPrice(0);
      setCartItems([]);
      setPage("welcome");
    }, 2000);
  };

  const maskCardNumber = (cardNumber) => {
    if (!cardNumber) return "";
    return "**** **** **** " + cardNumber.slice(-4);
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


  // Doldurulması zorunlu olan alanlar için gerekli state'ler
  const [selectedShipping, setSelectedShipping] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [isCardMatched, setIsCardMatched] = useState(false);

  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");


  return (
    <div className={styles.container}>

      {/* Sepete ürün eklendi bildirimi */}
      {showCartNotice && (
        <div className={styles.cartNotice}>
          ✅ {isPaying ? "Ödemeniz başarıyla gerçekleştirildi!" : "Sepetiniz başarıyla güncellendi!"}
        </div>
      )}
      
      {/* TechDepo navbar */}
      <div className={styles.header}>
            <div className={styles.logoContainer} onClick={() => setPage("welcome")}>
            <img src="/techDepo/techHome.png" alt="TechDepo Logo" className={styles.logo} />
            <h1>TechDepo</h1>
            <h4>Teknoloji Deposu</h4>
            </div>

            <div className={styles.navbarRight}>
              <div className={styles.addToCart} onClick={() => setPage("cart")}>
                <img src="/techDepo/add-to-cart (1).png" alt="Sepete Ekle" />
                <h4> Sepetim</h4>
                {getCartItemCount() > 0 && (
                  <span className={styles.cartCounter}>{getCartItemCount()}</span>
                )}
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
      </div>

      {page === "cart" && (
        <div className={styles.cartPage}>
          <h2>Sepetim</h2>
          {cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>Henüz sepetinize bir ekleme yapmadınız.</p>
              <img src={"techDepo/empty-cart.png"} alt="Sepet" />
            </div> 
          ) : (
            <div className={styles.cartList}>
              {cartItems.map((item, index) => (
                <div key={index} className={styles.cartItem}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <p className={styles.itemTotal}>
                      Toplam: {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>

                  <div className={styles.quantityControls}>
                    <button onClick={() => removeFromCart(item.id)} disabled={item.quantity === 1}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addToCart(item)}>+</button>
                  </div>
                  
                  <button className={styles.removeItem} onClick={() => removeFromCart(item.id, true)}>Kaldır</button>
                </div>
              ))}
            </div>
          )}
          <div className={styles.cartSummary}>
            <p>
              Sepet Toplamı: {
                formatPrice(cartItems.reduce((total, item) => {
                  return total + item.quantity * parseFloat(item.price);
                }, 0))
              } 
            </p>
            <button
              onClick={() => setPage("payment")}
              disabled={cartItems.length === 0}
              className={styles.checkoutButton}
            >
              Sepeti Onayla
            </button>
          </div>
        </div>
      )}


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
                <p>{formatPrice(card.price)}</p>
                <button
                  className={styles.addButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (TechInfo.isLoggedIn) {
                      addToCart(card);
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
                    addToCart(product);                     
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
          {/* Sol taraf */}
          <div className={styles.paymentLeft}>

            {/* 1. İndirim Kodu Bölümü */}
            <div className={styles.discountSection}>
              <h3>✨ İndirim Kodu</h3>
              <div>
                <input type="text" placeholder="Kodunuzu girin" />
                <button className={styles.applyButton}>Uygula</button>
              </div>
            </div>

            {/* 2. Adres ve İletişim Bilgileri */}
            <div className={styles.infoSection}>
              <h3><span>1</span>📞 Adres & İletişim Bilgileri</h3>
              <label>E-mail :</label>
              <input type="text" placeholder="E-posta adresiniz" value={email} readOnly/>
              <label>Ad Soyad :</label>
              <input type="text" placeholder="Adınız Soyadınız" value={`${TechInfo.name} ${TechInfo.surname}`} readOnly />
              <label>Telefon Numarası :</label>
              <input type="text" placeholder="Telefon Numaranız" value={TechInfo.phone} readOnly />
              <label>Adres :</label>
              <input type="text" placeholder="Adres" value={TechInfo.adres} readOnly />
            </div>

            {/* 3. Kargo Seçimi */}
            <div className={styles.shippingSection}>
              <h3><span>2</span>🚚 Kargo Seçimi</h3>

              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="shipping"
                  value="CargoNova"
                  checked={selectedShipping === "CargoNova"}
                  onChange={() => {
                    setSelectedShipping("CargoNova");
                    setSelectedShippingPrice(49.99); // buraya kargo fiyatı!
                  }}
                />
                <p>CargoNova - ₺49,99</p>
              </label>

              <label className={styles.radioLabel}>
                <input 
                  type="radio" 
                  name="shipping"
                  value="FlyTakip"
                  checked={selectedShipping === "FlyTakip"}
                  onChange={() => {
                    setSelectedShipping("FlyTakip");
                    setSelectedShippingPrice(54.99);
                  }}
                />
                <p>FlyTakip Kargo - ₺54,99</p>
              </label>

              <label className={styles.radioLabel}>
                <input 
                  type="radio"
                  name="shipping"
                  value="TrendyTasima"
                  checked={selectedShipping === "TrendyTasima"}
                  onChange={() => {
                    setSelectedShipping("TrendyTasima");
                    setSelectedShippingPrice(80.49);
                  }}
                />
                <p>TrendyTaşıma - ₺80,49</p>
              </label>
            </div>
            {errors.shipping && <p className={styles.errorMessage}>{errors.shipping}</p>}


            {/* 4. Ödeme Bilgileri */}
            <div className={styles.paymentSection}>
              <h3><span>3</span>💳 Ödeme Bilgileri</h3>
              <div className={styles.paymentSectionCard}>
                <h4>Kredi Kartı</h4>
                <input
                  className={styles.paymentSectionInput}
                  type="text"
                  placeholder="Kart Numarası"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                <input
                  className={styles.paymentSectionInput}
                  type="text"
                  placeholder="Kart Üzerindeki İsim"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />

                <div className={styles.expiryCVV}>
                <input
                  className={styles.paymentSectionInput}
                  type="text"
                  placeholder="Ay / Yıl"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
                <input
                  className={styles.paymentSectionInput}
                  type="text"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCVV(e.target.value)}
                />
                </div>
              </div>

              {errors.cardNumber && <p className={styles.errorMessage}>{errors.cardNumber}</p>}
              {errors.cardName && <p className={styles.errorMessage}>{errors.cardName}</p>}
              {errors.expiryDate && <p className={styles.errorMessage}>{errors.expiryDate}</p>}
              {errors.cvv && <p className={styles.errorMessage}>{errors.cvv}</p>}
              {errors.registeredCard && <p className={styles.errorMessage}>{errors.registeredCard}</p>}

              <div className={styles.optionsRow}>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    checked={saveCard}
                    onChange={(e) => setSaveCard(e.target.checked)}
                  />
                  <p>Kart bilgilerimi kaydet</p>
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <p>3D Secure ile ödeme</p>
                </label> 
                <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <p><b>Gizlilik Sözleşmesini</b> ve <b>Satış Sözleşmesini</b> okudum, onaylıyorum.</p>
              </label>                                  
              </div>
              {errors.terms && <p className={styles.errorMessage}>{errors.terms}</p>}

              <button className={styles.paymentButton} onClick={handlePayment} disabled={isPaying}>
                {isPaying ? "⏳ Ödeme İşleniyor..." : "💳 Ödemeyi Tamamla"}
              </button>
            </div>
          </div>

          {/* Sağ taraf - Ürün Bilgileri */}
          <div className={styles.paymentRight}>
            <h3>📦 Sepetiniz</h3>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItemSummary}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.quantity} x ₺{formatPrice(item.price)}</p>
                  <p>Toplam: {formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}

            <div className={styles.cartTotal}>
              <p>Ürünler Toplamı: {formatPrice(cartTotal)}</p>
              <p>Kargo Ücreti: {formatPrice(selectedShippingPrice)}</p>
              <hr />
              <h3>Genel Toplam: {formatPrice(grandTotal)}</h3>
            </div>
          </div>
        </div>
      )}


      {/* TechDepo kullanıcı bilgileri sayfası */}
      {page === "userProfile" && (
        <div className={styles.userProfile}>
          <div className={styles.sidebar}>
            <h3>Hesabım</h3>
            <ul>
               <li onClick={() => setSubPage("orders")}>Siparişlerim</li>
               <li onClick={() => setSubPage("profileInfo")}>Kullanıcı Bilgilerim</li>
               <li onClick={() => setSubPage("cards")}>Kayıtlı Kartlarım</li>
            </ul>
          </div>

          <div className={styles.profileContent}>

            {subPage === "orders" && (
              <div className={styles.ordersSection}>
                <h2>Siparişlerim</h2>
                {orders.length === 0 ? (
                  <p>Henüz sipariş verilmedi.</p>
                ) : (
                  orders.map(order => (
                    <div key={order.id} className={styles.orderCard}>
                      <h4>🆔 Sipariş No: {order.id}</h4>
                      <p>📦 Kargo Firması: {order.shipping}</p>
                      <p>💵 Toplam Tutar: {formatPrice(order.total)}</p>
                      <p>📅 Sipariş Tarihi: {order.date}</p>
                      <div className={styles.orderItems}>
                        {order.items.map((item, index) => (
                          <div key={index}>
                            <p>🔹 {item.name} ({item.quantity} adet)</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

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
                {TechInfo.cardNumber ? (
                  <div className={styles.savedCard}>
                    <p>💳 Kart Numarası: {maskCardNumber(TechInfo.cardNumber)}</p>
                    <p>👤 Kart Sahibi: {TechInfo.cardName}</p>
                    <p>📅 Son Kullanma Tarihi: {TechInfo.cardExpiryDate}</p>
                  </div>
                ) : (
                  <p style={{color: "black"}}>💳 Henüz kart eklenmemiş.</p>
                )}
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