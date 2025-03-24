// PostifyAuth.jsx
import React, { useState } from 'react';
import Postify from './Postify';
import styles from './PostifyAuth.module.css';

const PostifyAuth = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: '', avatar: '/avatars/avatar9.png' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.name.trim()) {
      if (!isRegistered) setIsRegistered(true);
      else setIsLoggedIn(true);
    }
  };

  if (isLoggedIn) return <Postify user={user} />;

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
      <div className={styles.authRight}>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <h2>{isRegistered ? 'Giriş Yap' : 'Kayıt Ol'}</h2>
          <input
            type="text"
            placeholder="Kullanıcı adınızı girin"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <button type="submit">{isRegistered ? 'Giriş Yap' : 'Kayıt Ol'}</button>
          {isRegistered ? (
            <p>
              Hesabın yok mu?{' '}
              <span className={styles.switchLink} onClick={() => setIsRegistered(false)}>Kayıt Ol</span>
            </p>
          ) : (
            <p>
              Zaten bir hesabın var mı?{' '}
              <span className={styles.switchLink} onClick={() => setIsRegistered(true)}>Giriş Yap</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostifyAuth;