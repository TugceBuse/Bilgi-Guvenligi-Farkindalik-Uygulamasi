import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useAuthContext } from "../../Contexts/AuthContext";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, fetchUserProfile } = useAuthContext(); // fetchUserProfile fonksiyonunu alın
  const [newPassword, setNewPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  useEffect(() => {
    fetchUserProfile(); // Kullanıcı profil bilgilerini backend'den al
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handlePasswordChange = () => {
    // Şifre değiştirme işlemleri burada yapılacak
    console.log('Yeni şifre:', newPassword);
  };
  return (
    <div className="profile-page">
      <div className="profile-container">
        {isEditing && <h1>Düzenle</h1>}
        {!isEditing && <h1>Profil Sayfası</h1>}
        
        <div className="profile-avatar">
          <img
            src={/*user.avatar ||*/ "/user (1).png"}
            alt="user"
            className="avatar"
          />
        </div>
        {!isEditing ? (
          <div className="profile-info">
            <p><strong>Ad </strong> <label>:</label> {user.firstName}</p>
            <p><strong>Soyad </strong> <label>:</label> {user.lastName}</p>
            <p><strong>Kullanıcı Adı </strong> <label>:</label> {user.username}</p>
            <p><strong>E-posta </strong> <label>:</label> {user.email}</p>
            <p><strong>Toplam Puan </strong> <label>:</label> {user.score}</p>
            <p><strong>Üyelik Tarihi </strong>
            <label>:</label> {new Date(user.createdAt).toLocaleDateString('tr-TR', 
            { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </p>
            <button className="edit-button" onClick={handleEditToggle}>
              Düzenle
            </button>
          </div>
        ) : (
          <div className="profile-edit">
            <p><strong>Ad </strong> <label>:</label>
              <input
                type="text"
                name="firstName"
                value={user.firstName || ""}
                onChange={(e) => console.log(e.target.value)} // Düzenleme işlemi yapılacak
              />
            </p>
            
            <p><strong>Soyad </strong> <label>:</label>
              <input
                type="text"
                name="firstName"
                value={user.lastName || ""}
                onChange={(e) => console.log(e.target.value)} // Düzenleme işlemi yapılacak
              />
            </p>

            <p><strong>Kullanıcı Adı </strong> <label>:</label>
              <input
                type="text"
                name="firstName"
                value={user.username || ""}
                onChange={(e) => console.log(e.target.value)} // Düzenleme işlemi yapılacak
              />
            </p>

            <p><strong>E-posta </strong> <label>:</label>
              <input
                type="text"
                name="firstName"
                value={user.email || ""}
                onChange={(e) => console.log(e.target.value)} // Düzenleme işlemi yapılacak
              />
            </p>

              {showPasswordInput && (
                <p><strong>Şifre </strong> <label>:</label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={(e) => console.log(e.target.value)} // Düzenleme işlemi yapılacak
                  />
                </p>
              )}
            
            {/* Diğer düzenleme alanları */}
              <div style={{ display: "flex", justifyContent: "space-between", gap:10 }}>
                <button className="save-button" onClick={handleEditToggle}>
                  Kaydet
                </button>
                <label 
                  style={{
                  textDecoration:"underline", 
                  color:"royalblue", 
                  cursor:"pointer",
                  width: 150,
                  alignSelf: "end"
                  }}
                  onClick={() => setShowPasswordInput(!showPasswordInput)}
                  >Şifremi Değiştir
                </label>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
