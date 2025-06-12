import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../Contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthContext();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const handleClickOutside = (event) => {
        if (!event.target.closest(".user-info")) {
          setMenuOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [menuOpen]);

  const handleLogoClick = () => {
    window.location.reload(); // Sayfayı yeniler
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleAvatarClick = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="logo-container">
          <div className="logo" onClick={handleLogoClick}></div>
          <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800&display=swap" rel="stylesheet"></link>
          <h1 className="h1">PhishVille</h1>
        </div>
     

        <div className="rightPart">
          <a href="https://www.w3schools.com/" className="a">
            Hakkında
          </a>
          <a href="about.html" className="a">
            İletişim
          </a>
          <a href="about.html" className="a">
            Görüşler
          </a>

          <div className="loginPart">
            {isAuthenticated ? (
              <div className="user-info" onClick={handleAvatarClick}>
                <img
                  src="/user (1).png"
                  alt="user"
                  className="avatar"
                />
                <span className="username">{user.username}</span>

                {menuOpen && (
                  <div className="dropdown-menu">
                    <a href="/profile">👤 Profil</a>
                    <button onClick={logout}>🚪 Çıkış Yap</button>
                  </div>
                )}
              </div>
            ) : (
              <button className="login" onClick={handleLoginClick}>
                GİRİŞ
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
