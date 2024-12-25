import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useEffect, useState } from "react";


const Navbar = () =>
{
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/game");
      };
      const LoginClick = () => {
        navigate("/login");
      };
      const [scrolled, setScrolled] = useState(false);

      useEffect(() => {
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
   
    return (
    
        <div > 
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
         
                <div className="logo-container">
                <div className="logo"onClick={handleLogoClick}></div>
                </div>

            <h1 className="h1">SafeClicks</h1>

                <div className="rightPart">
                    <a href="https://www.w3schools.com/" className="a">Hakkında</a>
                    <a href="about.html" className="a">İletişim</a>
                    <a href="about.html" className="a">Görüşler</a>

                    <div className="loginPart">
                    {/* <img  onClick={LoginClick} src="/login_simgesi.png" alt="login" /> */}
                    <button className="login" onClick={LoginClick}> GİRİŞ
                      <span></span>
                    </button>
                    
                    </div> 
                </div>
                

        </nav>
        </div>

    );
}
export default Navbar;