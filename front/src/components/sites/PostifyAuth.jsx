// PostifyAuth.jsx
import React, { useEffect, useState } from 'react';
import Postify from './Postify';
import styles from './PostifyAuth.module.css';
import { useGameContext } from "../../Contexts/GameContext";

const PostifyAuth = () => {
    const { PostifyInfo, setPostifyInfo } = useGameContext();

    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const [password, setPassword] = useState("");
    const isPasswordStrongEnough = (password) => {
      return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&._-]).{8,}$/.test(password);
    };
    const passwordStrong = isPasswordStrongEnough(password);

    const email = PostifyInfo.email;
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleAuth = () => {
      if (!isLogin) {
        if (PostifyInfo.isRegistered && PostifyInfo.email === email) {
          setErrorMessage("Bu e-posta adresi ile zaten bir hesap oluşturulmuş!");
          return;
        }
        if (!name || !surname || !password) {
          setErrorMessage("Lütfen tüm alanları doldurun!");
          return;
        }
    
        setPostifyInfo({
          ...PostifyInfo,
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
        if (!PostifyInfo.isRegistered || PostifyInfo.email !== email) {
          setErrorMessage("Bu e-posta ile kayıtlı bir hesap bulunmamaktadır.");
          return;
        }
        if (!password || password !== PostifyInfo.password) {
          setErrorMessage("Hatalı şifre! Lütfen tekrar deneyin.");
          return;
        }
    
        setPostifyInfo({
          ...PostifyInfo,
          isLoggedIn: true,
        });
        setErrorMessage("");
      }
    };
  
  useEffect(() => {
        if(!PostifyInfo.isLoggedIn) {
            setName("");
            setSurname("");
            setPassword("");
            setErrorMessage("");
        } 
  }, [PostifyInfo.isLoggedIn]);

  const handleSignInOut = () => {
      setIsLogin(!isLogin);
      setName("");
      setSurname("");
      setPassword("");
      setErrorMessage("");
    };

  if (PostifyInfo.isLoggedIn) return <Postify />;

  return (
    <div className={styles.authContainer}>
      <div className={styles.authLeft}>
        <h1>
            <span>🌟</span> Postify <span>🚀</span>
        </h1>
        <p>Arkadaşlarınla paylaşımlarını yap, beğen ve yorum yap!</p>
        <div className={styles.avatars}>
            <img src="/avatars/avatar1.png" alt="avatar" />
            <img src="/avatars/avatar2.png" alt="avatar" />
            <img src="/avatars/avatar3.png" alt="avatar" />
            <img src="/avatars/avatar4.png" alt="avatar" />
            <img src="/avatars/avatar5.png" alt="avatar" />
            <img src="/avatars/avatar6.png" alt="avatar" />
            <img src="/avatars/avatar7.png" alt="avatar" />
            <img src="/avatars/avatar8.png" alt="avatar" />
            <img src="/avatars/avatar9.png" alt="avatar" />
            <img src="/avatars/avatar10.png" alt="avatar" />
            <img src="/avatars/avatar11.png" alt="avatar" />
            <img src="/avatars/avatar12.png" alt="avatar" />
            <img src="/avatars/avatar13.png" alt="avatar" />
            <img src="/avatars/avatar14.png" alt="avatar" />
            <img src="/avatars/avatar15.png" alt="avatar" />
            <img src="/avatars/avatar16.png" alt="avatar" />
            <img src="/avatars/avatar17.png" alt="avatar" />
            <img src="/avatars/avatar18.png" alt="avatar" />
            <img src="/avatars/avatar19.png" alt="avatar" />
            <img src="/avatars/avatar20.png" alt="avatar" />
            <img src="/avatars/avatar1.png" alt="avatar" />
            <img src="/avatars/avatar2.png" alt="avatar" />
            <img src="/avatars/avatar3.png" alt="avatar" />
            <img src="/avatars/avatar4.png" alt="avatar" />
            <img src="/avatars/avatar5.png" alt="avatar" />
            <img src="/avatars/avatar6.png" alt="avatar" />
            <img src="/avatars/avatar7.png" alt="avatar" />
        </div>
        <div className={styles.mainPic}>
            <img src="/avatars/postifyAuth3.png" alt="avatar" />
            <img src="/avatars/postifyAuth1.png" alt="avatar" />
            <img src="/avatars/postifyAuth2.png" alt="avatar" />
        </div>
        
      </div>


      {/* Auth Right */}
      <div className={styles.authRight}>

        {/* Giriş / Kayıt Paneli */}
        {!PostifyInfo.isLoggedIn && (
          <div className={styles.authBox}>
            <h2>{isLogin ? "Giriş Yap" : "Kayıt Ol"}</h2>
            {!isLogin && <input type="text" placeholder="Ad" value={name} onChange={(e) => setName(e.target.value)} />}
            {!isLogin && <input type="text" placeholder="Soyad" value={surname} onChange={(e) => setSurname(e.target.value)} />}
            <input type="email" placeholder="E-posta adresiniz" value={PostifyInfo.email} disabled />
            <input type="password" placeholder="Şifreniz" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleAuth}>{isLogin ? "Giriş Yap" : "Kayıt Ol"}</button>
            {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}

            <p onClick={handleSignInOut}>
              {isLogin ? "Hesabınız yok mu? Kayıt olun!" : "Zaten üye misiniz? Giriş yapın!"}
            </p>
          </div>
        )}
      </div>


    </div>
  );
};

export default PostifyAuth;