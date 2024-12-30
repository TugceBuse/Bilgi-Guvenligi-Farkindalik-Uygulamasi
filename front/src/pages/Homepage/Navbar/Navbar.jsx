import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../Contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthContext();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Scroll durumunu yönet
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {

  }, []);

  const handleLogoClick = () => {
    navigate("/game");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  // const handleLogout = () => {
  //   logout(); // AuthContext'teki logout fonksiyonunu çağır
  //   navigate("/"); // Ana sayfaya yönlendir
  // };

  return (
    <div>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="logo-container">
          <div className="logo" onClick={handleLogoClick}></div>
        </div>

        <h1 className="h1">SafeClicks</h1>

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
              <div className="user-info">
                {/* Kullanıcı adı ve çıkış butonu */}
                <span className="username">{user.username}</span>
                <button className="logout" onClick={logout}>
                  Çıkış
                </button>
              </div>
            ) : (
              <button className="login" onClick={handleLoginClick}>
                GİRİŞ
                <span></span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
