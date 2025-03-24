// Postify.jsx
import React, { useState } from 'react';
import styles from './Postify.module.css';

const initialPosts = [
  {
    id: 1,
    name: 'Ahmet Kaya',
    time: '2 saat önce',
    avatar: '/avatars/avatar1.png',
    content: 'Ofis içinde bir Wi-Fi sıkıntısı var mı? Bağlanamıyorum.',
    likes: 120,
    commands: 50,
  },
  {
    id: 2,
    name: 'IT Departmanı',
    time: '5 saat önce',
    avatar: '/avatars/avatar2.png',
    content: (
      <span>
        Yeni sistem güncellemesi yayınlandı. Buradan indirin: 
        <a href="#" className={styles.maliciousLink} onClick={() => alert('Virüs bulaştı!')}>sistemguncelleme.exe</a>
      </span>
    ),
    likes: 70,
    commands: 30,
  },
  {
    id: 3,
    name: 'Personel İşleri',
    time: '1 gün önce',
    avatar: '/avatars/avatar3.png',
    content: (
      <span>
        Yeni çalışanlara özel yemek kartı için kayıt olun: 
        <a href="#" className={styles.phishingLink} onClick={() => alert('Kimlik bilgilerin çalındı!')}>kaydolunburaya.com</a>
      </span>
    ),
    likes: 500,
    commands: 120,
  },
];

const getRelativeTime = (timestamp) => {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 60) return 'Şimdi';
  if (diff < 3600) return `${Math.floor(diff / 60)} dakika önce`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} saat önce`;
  return `${Math.floor(diff / 86400)} gün önce`;
};


const Postify = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [likes, setLikes] = useState(() => {
    const initial = {};
    initialPosts.forEach((post) => {
      initial[post.id] = {
        count: post.likes,
        liked: false,
      };
    });
    return initial;
  });
  const [newPostContent, setNewPostContent] = useState('');
  const [timestamps, setTimestamps] = useState({});

  const toggleLike = (postId) => {
    setLikes((prev) => {
      const currentCount = prev[postId]?.count || 0;
      const isLiked = prev[postId]?.liked || false;
      return {
        ...prev,
        [postId]: {
          count: isLiked ? currentCount - 1 : currentCount + 1,
          liked: !isLiked,
        },
      };
    });
  };

  const handlePostShare = () => {
    if (newPostContent.trim() === '') return;
    const timestamp = Date.now();
    const newPost = {
      id: timestamp,
      name: 'Sen',
      time: timestamp,
      avatar: '/avatars/avatar9.png',
      content: newPostContent,
      likes: 0,
      commands: 0,
    };
    setPosts([newPost, ...posts]);
    setLikes((prev) => ({ ...prev, [newPost.id]: { count: 0, liked: false } }));
    setTimestamps((prev) => ({ ...prev, [newPost.id]: timestamp }));
    setNewPostContent('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <div className={styles.logo}>Postify</div>
        <input type="text" className={styles.search} placeholder="Ara..." />
        <div className={styles.menu}>
          <span>🔔</span>
          <img className={styles.avatar} src="/avatars/avatar9.png" alt="Profil" />
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.sidebar}>
          <ul>
            <li>📄 Profilim</li>
            <li>💬 Mesajlar</li>
            <li>👥 Takip</li>
            <li>🧑‍💼 Gruplar</li>
            <li>📅 Etkinlikler</li>
          </ul>
          <h4>Sponsorlu</h4>
          <p>Yeni güvenlik rehberimize göz atın!</p>
          <hr />
          <h4>Popüler Gruplar</h4>
          <div className={styles.groups}>
            <label>👩‍💻 Kadınlar İçin Teknoloji</label>
            <label>💻 Yazılım Ekibi</label>
            <label>🔒 Güvenlik Farkındalığı</label>
            <label>🎨 Tasarım Dünyası</label>
          </div>
        </div>

        <div className={styles.feed}>
        <div className={styles.shareBox}>
            <textarea
              placeholder="Ne düşünüyorsun?"
              className={styles.input}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            ></textarea>
            <button className={styles.button} onClick={handlePostShare}>Paylaş</button>
          </div>

          {posts.map((post) => (
            <div key={post.id} className={styles.card}>
              <div className={styles.header}>
                <img src={post.avatar} className={styles.avatar} alt="user" />
                <div>
                  <div className={styles.name}>{post.name}</div>
                  <div className={styles.time}>
                    {typeof post.time === 'number' ? getRelativeTime(post.time) : post.time}
                  </div>
                </div>
              </div>
              <div className={styles.content}>{post.content}</div>

              <div className={styles.metaInfo}>
                <span>👍 {likes[post.id]?.count || 0}</span>
                <span>💬 {post.commands}</span>
                <span>📤 Paylaş</span>
              </div>

              <div className={styles.actions}>
              <button
                  onClick={() => toggleLike(post.id)}
                  className={likes[post.id]?.liked ? styles.likedButton : ''}
                >
                  {likes[post.id]?.liked ? '💙 Beğenildi' : '👍 Beğen'}
                </button>
                <button>💬 Yorum Yap</button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.rightExtras}>
          <div className={styles.securityTips}>
            <h4>🔐 Güvenlik İpuçları</h4>
            <ul>
              <li>🔸Gelen bağlantıları tıklamadan önce kontrol et.</li>
              <li>🔸Kişisel bilgilerini paylaşmadan önce emin ol.</li>
              <li>🔸“.exe” uzantılı dosyalar kötü amaçlı olabilir.</li>
            </ul>
          </div>

          <div className={styles.onlineUsers}>
            <h4>🟢 Aktif Kullanıcılar</h4>
            <div className={styles.userList}>
              <img src="/avatars/avatar4.png" alt="user" />
              <img src="/avatars/avatar5.png" alt="user" />
              <img src="/avatars/avatar6.png" alt="user" />
            </div>
          </div>

          <div className={styles.trending}>
            <h4>🔥 Gündemdekiler</h4>
            <ul>
              <li>#SiberGüvenlik2025</li>
              <li>#YeniÇalışanlar</li>
              <li>#OfisNetworkSorunu</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postify;