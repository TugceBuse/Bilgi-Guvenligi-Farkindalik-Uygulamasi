import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./ProfilePage.css";
import { useAuthContext } from "../../Contexts/AuthContext";


const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { user, fetchUserProfile, isAuthenticated, updateUser, changePassword } =
    useAuthContext();
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setShowPasswordInput(false);
    if (!isEditing) {
      setEditedUser({ ...user });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateUser(user._id, { ...editedUser, currentPassword: passwords.currentPassword }); // currentPassword'ü ekledik
      alert("Bilgiler başarıyla güncellendi!");
      setIsEditing(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleChangePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Yeni şifreler eşleşmiyor!");
      return;
    }
    try {
      await changePassword(user._id, passwords.newPassword);
      alert("Şifre başarıyla değiştirildi!");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordInput(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        
        <img src="/logo2.png" alt="SafeClicksLogo" className="backHome" title="www.safeClicks.com" onClick={() => navigate("/")}/>
        {isEditing && <h1>Düzenle</h1>}
        {!isEditing && <h1>Profil Sayfası</h1>}
        <div className="profile-avatar">
          <img src="/user (1).png" alt="user" className="avatar" />
        </div>
        {!isEditing ? (
          <div className="profile-info">
            <p><strong>Ad </strong>: {user.firstName}</p>
            <p><strong>Soyad </strong>: {user.lastName}</p>
            <p><strong>Kullanıcı Adı </strong>: {user.username}</p>
            <p><strong>E-posta </strong>: {user.email}</p>
            <p><strong>Toplam Skor </strong>: {user.score}</p>
            <p> <strong>Şifre </strong>: ********</p>
            <p><strong>Üyelik Tarihi</strong>: {new Date(user.createdAt).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
            <button className="edit-button" onClick={handleEditToggle}>
              Düzenle
            </button>
          </div>
        ) : (
          <div>
            {!showPasswordInput && (
              <div className="profile-edit">
                <p><strong>Ad </strong> <label>:</label>
                <input
                  type="text"
                  name="firstName"
                  value={editedUser?.firstName || ""}
                  onChange={handleInputChange}
                />
                </p>
                <p><strong>Soyad </strong> <label>:</label>
                <input
                  type="text"
                  name="lastName"
                  value={editedUser?.lastName || ""}
                  onChange={handleInputChange}
                />
                </p>
                <p><strong>Kullanıcı Adı </strong> <label>:</label>
                <input
                  type="text"
                  name="username"
                  value={editedUser?.username || ""}
                  onChange={handleInputChange}
                />
                </p>
                <p><strong>E-posta </strong> <label>:</label>
                <input
                  type="email"
                  name="email"
                  value={editedUser?.email || ""}
                  onChange={handleInputChange}
                />
                </p>
                <p><strong>Mevcut Şifre </strong> <label>:</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
                </p>
                <button className="save-button" onClick={handleSave}>
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
              
            )}

            {showPasswordInput && (
              <div className="profile-edit">
                 <p style={{justifyContent:"center", justifySelf:"center", alignContent:"center"}}><strong> Eski Şifre </strong> <label>:</label>
                  <input
                    type="password"
                    name="eskiSifre"
                    placeholder="Eski Şifre"
                    value={passwords.currentPassword}
                    onChange={handlePasswordChange}
                  />
                  </p>
                <p><strong>Yeni Şifre </strong> <label>:</label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Yeni Şifre"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                />
                </p>
                <p><strong>Yeni Şifre Tekrar </strong> <label>:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Yeni Şifre Tekrar"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                />
                </p>
                <button className="save-button" onClick={handleChangePassword}>
                  Şifreyi Kaydet
                </button>
                <button className="cancel-button" onClick={() => setShowPasswordInput(false)}>         
                  İptal
                </button>
                <br/>
                
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
