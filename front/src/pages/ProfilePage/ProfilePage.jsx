import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useAuthContext } from "../../Contexts/AuthContext";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: "John Doe",
    email: "johndoe@example.com",
    avatar: "/user (1).png", // Varsayılan profil resmi
  });

  const { user } = useAuthContext();

  useEffect(() => {
    // Kullanıcı bilgilerini yükle
    if (user) {
      setUserData({
        username: user.username || "John",
        email: user.email || "johndoe@example.com",
        surname: user.surname || "Doe",
        password: "******", // Şifreyi genelde göstermezsiniz
      });
    }
  }, [user]);
  
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // API veya veri kaydetme işlemi yapılabilir
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>Profil Sayfası</h2>
        <div className="profile-avatar">
            <img
                src="/user (1).png"
                alt="user"
                className="avatar"
            />
        </div>
        {isEditing ? (
          <div className="profile-edit">
            <div className="profile-edits">
                <p><strong>Ad:</strong></p>
                <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                placeholder="Adınız"
                />
            </div>

            <div className="profile-edits">
                <p><strong>E-posta: </strong></p>
                <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                placeholder="E-posta"
                />
            </div>
                <button className="save-button" onClick={handleSave}>
                Kaydet
                </button>
                
          </div>
        ) : (
          <div className="profile-info">
            <p><strong>Ad:</strong></p>
            <p>{user.firstName}</p>
            <p><strong>Soyad:</strong> {user.lastName}</p>
            <p><strong>Kullanıcı Adı:</strong></p>
            <p>{user.username}</p>
            <p><strong>E-posta:</strong> {user.email}</p>
            <p><strong>Şifre:</strong> {user.password}</p>
            <button className="edit-button" onClick={handleEditToggle}>
              Düzenle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
