import React, { useState, useEffect, useRef } from "react";
import styles from "./TechDepo.module.css";
import { useGameContext } from "../../Contexts/GameContext";
import { usePhoneContext } from "../../Contexts/PhoneContext"; 
import cardsData from "../../constants/cards";
const cards = cardsData.cards;

const TechDepo = ({scrollRef}) => {
  const { TechInfoF, setTechInfoF } = useGameContext();
  const [productInfo, setProductInfo] = useState({
    productIDs: []
  });

  // Context hook
  const { clearCode } = usePhoneContext();

  const [page, setPage] = useState("welcome");
  const [subPage, setSubPage] = useState("orders");


  // Ödeme sayfasına geçiş yaparken kullanıcı durumunu kontrol et
  const secureSetPage = (nextPage) => {
    if (nextPage === "payment" && !(TechInfoF.isLoggedIn || TechInfoF.isGuest)) {
      setPage("authChoice");
    } else {
      setPage(nextPage);
    }
  };

  const [orders] = useState([]);

  const [cartItems, setCartItems] = useState([]);

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [password, setPassword] = useState("");
  const isPasswordStrongEnough = (password) => {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&._-]).{8,}$/.test(password);
  };
  const passwordStrong = isPasswordStrongEnough(password);

  const [errorMessage, setErrorMessage] = useState("");
  const errorRef = useRef(null);

  const email = TechInfoF.email;

  useEffect(() => {
    if(!TechInfoF.isLoggedIn) {
        setName("");
        setSurname("");
        setPassword("");
        setErrorMessage("");
    } 
  }, [TechInfoF.isLoggedIn]);

  useEffect(() => {
    scrollRef?.current?.scrollTo?.({ top: 0, behavior: "auto" });
  }, [page, subPage]);


  const handleAuth = () => {
  
    if (!isLogin) {
      // if (TechInfoF.isRegistered && TechInfoF.email === email) {
      //   showTemporaryError("Bu e-posta adresi ile zaten bir hesap oluşturulmuş!");
      //   return;
      // }
      // if (!name || !surname || !password) {
      //   showTemporaryError("Lütfen tüm alanları doldurun!");
      //   return;
      // }
  
      setTechInfoF({
        ...TechInfoF,
        name,
        surname,
        password,
        phone: "05416494438",
        isRegistered: true,
        isLoggedIn: true,
        isGuest: false,
        isPasswordStrong: passwordStrong,
      });
      setErrorMessage("");
    } else {
      // if (!TechInfoF.isRegistered || TechInfoF.email !== email) {
      //   showTemporaryError("Bu e-posta ile kayıtlı bir hesap bulunmamaktadır.");
      //   return;
      // }
      // if (!password || password !== TechInfoF.password) {
      //   showTemporaryError("Hatalı şifre! Lütfen tekrar deneyin.");
      //   return;
      // }

      setTechInfoF({
        ...TechInfoF,
        isLoggedIn: true,
        isGuest: false,
      });
      setErrorMessage("");
    }
  
    setPage("welcome");
  };
  
  useEffect(() => {
    return () => {
      clearCode("techdepo");
    };
  }, []);

  const handleLogout = () => {
    setTechInfoF({
      ...TechInfoF,
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

  // Sepete ekleme bildirimi ve ödeme bildirimi için state
  const [showCartNotice, setShowCartNotice] = useState(false);
  const [noticeType, setNoticeType] = useState(""); // "" | "cart" | "payment"

  const cartNoticeRef = useRef(null);

  useEffect(() => {
    if (showCartNotice && cartNoticeRef.current) {
      cartNoticeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [showCartNotice]);

  // Sepete ekleme bildirimi için fonksiyon
  const addToCart = (product) => {
    if (!product.id) {
      console.error("Ürün ID'si eksik! Eklenemedi:", product);
      return;
    }
  
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
  
      if (existing) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  
    setProductInfo({ productID: product.id });
  
    setNoticeType("cart");
    setShowCartNotice(true);
  
    setTimeout(() => {
      setShowCartNotice(false);
    }, 2000);
  };

  useEffect(() => {
    if (productInfo.productID !== 0) { // Başlangıçta 0 olduğu için gereksiz console spam olmasın diye
      console.log("🛒 Güncellenen Ürün ID:", productInfo.productID);
    }
  }, [productInfo.productID]);
  
  
  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  

  // Sepetten kaldırmak için fonksiyon
  const removeFromCart = (productId, forceDelete = false) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems
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
        .filter(Boolean); // null olanları at
  
      // 🆕 Eğer artık o ürün kalmadıysa, productInfo'yu sıfırla
      const stillExists = updatedItems.find(item => item.id === productId);
      if (!stillExists) {
        setProductInfo({ productID: 0 });
      }
  
      return updatedItems;
    });
    console.log("Sepetten çıkarılan ürün:", productInfo.productID);
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
  const [saveCard, setSaveCard] = useState(true);

  // Hata geldikçe scroll o hataya kayar
  useEffect(() => {
    if (page === "payment" && Object.keys(errors).length > 0 && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [errors]);


  const finalizePayment = () => {
    // if (cardBalance < grandTotal) {
    //   setErrors({ balance: "Kart bakiyesi yetersiz." });
    //   addMessage("NovaBank", "💳 Bakiyeniz yetersiz olduğundan ödemeniz gerçekleştirilemedi.");

    //   setCardNumber("");
    //   setCardName("");
    //   setExpiryDate("");
    //   setCVV("");
    //   setSelectedShipping("");
    //   setAcceptedTerms(false);
    //   setSaveCard(false);
    //   setSelectedShippingPrice(0);
    //   setCartItems([]);

    //   setIsPaying(false);
    //   setTimeout(() => {
    //     setErrors({});
    //   }, 3000);
    //   return;
    // }

    if (saveCard) {
      setTechInfoF((prev) => ({
        ...prev,
        cardNumber,
        cardName,
        cardExpiryDate: expiryDate,
        cardCVV: cvv,
        savedCard: true
      }));
    }

    // const orderNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    //   setOrders(prevOrders => [
    //     ...prevOrders,
    //     {
    //       id: orderNumber,
    //       items: cartItems,
    //       shipping: selectedShipping,
    //       total: grandTotal,
    //       date: new Date().toLocaleString(),
    //     }
    //   ]);

    //   setCardBalance(prev => prev - grandTotal);

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
      setIsPaying(false);

      setNoticeType("payment");
      setShowCartNotice(true);
      setTimeout(() => setShowCartNotice(false), 2000);
      setTechInfoF(prev => ({
        ...prev,
        tckn: "",
        birthDate: "",
        motherMaiden: "",
        isGuest: false
      }));
  };

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
  
    // Kişisel Bilgiler Kontrolü
    if (!TechInfoF.tckn) {
     newErrors.tckn = "TC Kimlik numarası zorunludur.";
    } else if (!/^\d{11}$/.test(TechInfoF.tckn)) {
     newErrors.tckn = "TC Kimlik numarası 11 haneli olmalıdır.";
    }
    if (!TechInfoF.birthDate) newErrors.birthDate = "Doğum tarihi girilmelidir.";
    if (!TechInfoF.motherMaiden) {
     newErrors.motherMaiden = "Anne kızlık soyadının ilk harfi zorunludur.";
    } else if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ]$/.test(TechInfoF.motherMaiden)) {
     newErrors.motherMaiden = "Yalnızca harf girilmelidir.";
    }
    if (!TechInfoF.acceptedCampaignTerms) {
     newErrors.campaignTerms = "Kampanya şartlarını onaylamalısınız.";
    }

    // // Kayıtlı kartla eşleşme kontrolü
    // if (TechInfoF) {
    //   const cardMatches =
    //     cardNumber === TechInfoF.cardNumber &&
    //     cardName === TechInfoF.cardName &&
    //     expiryDate === TechInfoF.cardExpiryDate &&
    //     cvv === TechInfoF.cardCVV;
    
    //   if (!cardMatches) {
    //     newErrors.registeredCard = "Kart bilgileri kayıtlı bilgilerle eşleşmiyor.";
    //   }
    // }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    
      // 3 saniye sonra hataları sıfırla
      setTimeout(() => {
        setErrors({});
      }, 3000);
    
      // 🆕 Hata oluştuysa errorRef'e scroll yap
      setTimeout(() => {
        if (errorRef.current) {
          errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100); 
      return; 
    }

    // Hatalar yoksa işlemi başlat
    setErrors({});
    setIsPaying(true);

    setTimeout(() => {
      finalizePayment();
    }, 2000);
  };

  const maskCardNumber = (cardNumber) => {
    if (!cardNumber) return "";
    return "**** **** **** " + cardNumber.slice(-4);
  };

  const handleEdit = () => {
    setTechInfoF({
      ...TechInfoF,
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
   const [editableName, setEditableName] = useState(TechInfoF.name);
   const [editableSurname, setEditableSurname] = useState(TechInfoF.surname);

   useEffect(() => {
     setEditableName(TechInfoF.name);
     setEditableSurname(TechInfoF.surname);
   }, [TechInfoF.name, TechInfoF.surname]);

   const [infoUpdated, setInfoUpdated] = useState(false); // ✔ güncellendi bildirimi
   const isChanged =
   editableName !== TechInfoF.name ||
   editableSurname !== TechInfoF.surname;


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

  // Sayfa ödeme değilse veya ödeme tamamlandıysa bilgileri temizle
  useEffect(() => {
    if (page !== "payment") {
        setTechInfoF(prev => ({
        ...prev,
        tckn: "",
        birthDate: "",
        motherMaiden: ""
        }));
    }
    }, [page]);

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
        <div className={styles.cartNotice} ref={cartNoticeRef}>
          {noticeType === "payment" ? "✅ Ödemeniz başarıyla gerçekleştirildi!" : "✅ Sepetiniz başarıyla güncellendi!"}
        </div>
      )}
      
      {/* TechDepo navbar */}
      <div className={styles.header}>
            <div className={styles.logoContainer} 
              onClick={() => {
                setPage("welcome");
              }}>
              <img src="/techDepo/techHome.png" alt="TechDepo Logo" className={styles.logo} />
              <h1>TechDepo</h1>
              <h4>Teknoloji Deposu</h4>
            </div>

            <div className={styles.navbarRight}>
              <div className={styles.addToCart} 
                onClick={() => {
                    setPage("cart");                 
                }}>
                <img src="/techDepo/add-to-cart (1).png" alt="Sepete Ekle" />
                <h4> Sepetim</h4>
                {getCartItemCount() > 0 && (
                  <span className={styles.cartCounter}>{getCartItemCount()}</span>
                )}
              </div>
              {TechInfoF.isLoggedIn ? (
                <div className={styles.userPanel} onClick={toggleUserMenu}>
                  <p className={styles.userName}>
                    <img src={"/techDepo/programmer.png"} alt="user" /> 
                    {TechInfoF.name} {TechInfoF.surname}
                  </p>
                  {showUserMenu && (
                    <div className={styles.userActions} ref={userMenuRef}>
                      <button className={styles.settingsButton} onClick={() => setPage("userProfile")}>
                        Kullanıcı Bilgilerim
                      </button>
                      <button className={styles.logoutButton} onClick={handleLogout}>
                        Çıkış Yap
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.guestPanel}>
                  {TechInfoF.isGuest && (
                    <p className={styles.guestLabel}>
                      <img src="/avatars/guest-user.png" alt="guest" /> Misafir
                    </p>
                  )}
                  <button
                    className={styles.loginButton}
                    onClick={() => {
                      setIsLogin(true);
                      setPage("login");
                      setPassword("");
                    }}
                  >
                    Giriş Yap
                  </button>
                </div>
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
              onClick={() => {
                if (!TechInfoF.isLoggedIn && TechInfoF.isGuest === null) {
                  setPage("authChoice"); // kullanıcı daha önce seçim yapmamışsa
                } else {
                  secureSetPage("payment");
                }
              }}
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
                  addToCart(card);                 
                }}  
              >    
                <img src={card.image} alt={card.name} className={styles.productImage} />
                <h3>{card.name}</h3>
                <p>{formatPrice(card.price)}</p>
                <button
                  className={styles.addButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(card);                 
                  }}
                >
                  Sepete Ekle
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TechDepoF misafir/kullanıcı olarak devam etme ekranı */}
      {page === "authChoice" && (
        <div className={styles.authChoice}>
          <h2>Devam Etmeden Önce</h2>
          <p>Lütfen bir seçenek belirleyin:</p>
          <div className={styles.authChoiceButtons}>
            <button
              className={styles.guestButton}
              onClick={() => {
                setTechInfoF(prev => ({
                  ...prev,
                  isLoggedIn: false,
                  isGuest: true
                }));
                setPage("payment");
              }}
            >
              Misafir Olarak Devam Et
            </button>
            <button
              className={styles.loginButton}
              onClick={() => {
                setTechInfoF(prev => ({
                  ...prev,
                  isGuest: false
                }));
                setPage("login");
              }}
            >
              Giriş Yap
            </button>
          </div>
        </div>
      )}

      {/* TechDepoF giriş/kayıt olma sayfası */}
      {page === "login" && !TechInfoF.isLoggedIn && (
        <div className={styles.loginForm}>           
          <h2>{isLogin ? "Giriş Yap" : "Kayıt Ol"}</h2>
          {!isLogin && (
            <>
              <input type="text" placeholder="Ad" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="text" placeholder="Soyad" value={surname} onChange={(e) => setSurname(e.target.value)} />
            </>
          )}
          <input className="disabled-input" type="email" placeholder="E-posta adresiniz" readOnly value={email} />
          <input type="text" placeholder="Şifreniz" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button
            onClick={handleAuth}
          >
            {isLogin ? "Giriş Yap" : "Kayıt Ol"}
          </button>
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
              <input type="text" placeholder="Adınız Soyadınız" value={`${TechInfoF.name} ${TechInfoF.surname}`} readOnly />
              <label>Telefon Numarası :</label>
              <input type="text" placeholder="Telefon Numaranız" value={TechInfoF.phone} readOnly />
              <label>Adres :</label>
              <input type="text" placeholder="Adres" value={TechInfoF.adres} readOnly />
              <label>TC Kimlik Numarası :</label>
              <input
                type="text"
                placeholder="TC No"
                value={TechInfoF.tckn || ""}
                onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) { // sadece sayılar
                    setTechInfoF(prev => ({ ...prev, tckn: value }));
                    }
                }}
                maxLength={11}
                inputMode="numeric"
              />
              {errors.tckn && <p ref={errorRef} className={styles.errorMessage}>{errors.tckn}</p>}

              <label>Doğum Tarihi :</label>
              <input
                type="date"
                placeholder="GG/AA/YYYY"
                value={TechInfoF.birthDate || ""}
                onChange={(e) => setTechInfoF(prev => ({ ...prev, birthDate: e.target.value }))}
              />
              {errors.birthDate && <p ref={errorRef} className={styles.errorMessage}>{errors.birthDate}</p>}

              <label>Anne Kızlık Soyadının İlk Harfi :</label>
              <input
                type="text"
                placeholder="A"
                maxLength={1}
                value={TechInfoF.motherMaiden || ""}
                onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-ZğüşıöçĞÜŞİÖÇ]?$/.test(value)) {
                    setTechInfoF(prev => ({ ...prev, motherMaiden: value }));
                    }
                }}
                inputMode="text"
              />
              {errors.motherMaiden && <p ref={errorRef} className={styles.errorMessage}>{errors.motherMaiden}</p>}

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
            {errors.shipping && <p ref={errorRef} className={styles.errorMessage}>{errors.shipping}</p>}

            {/* 4. Ödeme Bilgileri */}
            <div className={styles.paymentSection}>
              <div className={styles.fakeCampaignBox}>
                <h4>🎁 Ön Onaylı Kampanyadan Faydalanmak İster misiniz?</h4>
                <label>
                    <input
                    type="checkbox"
                    checked={TechInfoF.acceptedPreApprovedLoan}
                    onChange={(e) =>
                        setTechInfoF((prev) => ({ ...prev, acceptedPreApprovedLoan: e.target.checked }))
                    }
                    />
                    <p>TC ve doğum tarihinize göre size özel %10 indirim fırsatını değerlendirmek istiyorum.</p>
                </label>
              </div>
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
                {TechInfoF.isLoggedIn && TechInfoF.savedCard && (
                  <button
                    type="button"
                    className={styles.fillSavedCardButton}
                    onClick={() => {
                      setCardNumber(TechInfoF.cardNumber);
                      setCardName(TechInfoF.cardName);
                      setExpiryDate(TechInfoF.cardExpiryDate);
                      // CVV boş bırakılacak
                      setCVV("");
                    }}
                  >
                    💳 Kayıtlı Kart Bilgilerimi Doldur
                  </button>
                )}
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
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <p><b>Gizlilik Sözleşmesini</b> ve <b>Satış Sözleşmesini</b> okudum, onaylıyorum.</p>
              </label>                                  
              </div>
              <label className={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    checked={TechInfoF.acceptedCampaignTerms}
                    onChange={(e) =>
                    setTechInfoF(prev => ({ ...prev, acceptedCampaignTerms: e.target.checked }))
                    }
                />
                <p><b>Kampanya Katılım Şartlarını</b> okudum ve onaylıyorum.</p>
              </label>

              {errors.campaignTerms && <p className={styles.errorMessage}>{errors.campaignTerms}</p>}
              {errors.terms && <p className={styles.errorMessage}>{errors.terms}</p>}

              <button className={styles.paymentButton} onClick={handlePayment} disabled={isPaying}>
                {isPaying ? "⏳ Ödeme İşleniyor..." : "💳 Ödemeyi Tamamla"}
              </button>
              {errors.balance && <p ref={errorRef} className={styles.errorMessage}>{errors.balance}</p>}
            </div>
          </div>

          {/* Sağ taraf - Ürün Bilgileri */}
          <div className={styles.paymentRight}>
            <div className={styles.userSummaryBox}>
              <p>👤 Kullanıcı: {TechInfoF.isLoggedIn ? `${TechInfoF.name} ${TechInfoF.surname}` : "Misafir Kullanıcı"}</p>
              {!TechInfoF.isLoggedIn && (
                <button
                  className={styles.loginSmallButton}
                  onClick={() => setPage("login")}
                >
                  Giriş Yap
                </button>
              )}
            </div>
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
                          <div key={index} className={styles.orderItemRow}>
                            <p>🔹 {item.name} ({item.quantity} adet) - ₺{formatPrice(item.price)}</p>
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
                  <input value={TechInfoF.phone} disabled />

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
                        checked={true}
                        disabled
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
                {TechInfoF.savedCard ? (
                  <div className={styles.savedCard}>
                    <p>💳 Kart Numarası: {maskCardNumber(TechInfoF.cardNumber)}</p>
                    <p>👤 Kart Sahibi: {TechInfoF.cardName}</p>
                    <p>📅 Son Kullanma Tarihi: {TechInfoF.cardExpiryDate}</p>
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