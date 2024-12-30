import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useAuthContext } from "../../Contexts/AuthContext";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, fetchUserProfile } = useAuthContext(); // fetchUserProfile fonksiyonunu alın

  useEffect(() => {
    fetchUserProfile(); // Kullanıcı profil bilgilerini backend'den al
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>Profil Sayfası</h2>
        <div className="profile-avatar">
          <img
            src={/*user.avatar ||*/ "/user (1).png"}
            alt="user"
            className="avatar"
          />
        </div>
        {!isEditing ? (
          <div className="profile-info">
            <p><strong>Ad:</strong> {user.firstName}</p>
            <p><strong>Soyad:</strong> {user.lastName}</p>
            <p><strong>Kullanıcı Adı:</strong> {user.username}</p>
            <p><strong>E-posta:</strong> {user.email}</p>
            <p><strong>Toplam Puan:</strong> {user.score}</p>
            <p><strong>Üyelik Tarihi:</strong>
            {new Date(user.createdAt).toLocaleDateString('tr-TR', 
            { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </p>
            <button className="edit-button" onClick={handleEditToggle}>
              Düzenle
            </button>
          </div>
        ) : (
          <div className="profile-edit">
            <input
              type="text"
              name="firstName"
              value={user.firstName || ""}
              onChange={(e) => console.log(e.target.value)} // Düzenleme işlemi yapılacak
            />
            {/* Diğer düzenleme alanları */}
            <button className="save-button" onClick={handleEditToggle}>
              Kaydet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
